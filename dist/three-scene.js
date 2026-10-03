const startScene = async () => {
  const host = document.querySelector("#three-background");
  if (!host) return;

  const showFallback = () => {
    host.classList.add("three-fallback");
    const dots = Array.from({ length: 72 }, (_, index) => {
      const left = 2 + ((index * 37) % 96);
      const top = 4 + ((index * 53) % 90);
      const size = 2 + (index % 3);
      const opacity = 0.24 + (index % 5) * 0.09;
      return `<span class="fallback-dot" style="left:${left}%;top:${top}%;width:${size}px;height:${size}px;opacity:${opacity}"></span>`;
    }).join("");

    host.innerHTML = `<div class="fallback-dot-field" aria-hidden="true">${dots}</div>`;
  };

  if (!window.WebGLRenderingContext) {
    showFallback();
    return;
  }

  try {
    const THREE = await import("./vendor/three.module.min.js");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.innerWidth < 720;
    const particleCount = isMobile ? 72 : 138;
    const maxConnections = isMobile ? 3 : 4;
    const maxSegments = particleCount * maxConnections;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      50,
    );
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const bounds = {
      x: isMobile ? 4.9 : 10.8,
      y: isMobile ? 8.4 : 6.2,
      z: 2.5,
    };
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    let seed = 8317;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      positions[offset] = (random() - 0.5) * bounds.x * 2;
      positions[offset + 1] = (random() - 0.5) * bounds.y * 2;
      positions[offset + 2] = (random() - 0.5) * bounds.z * 2 - 0.8;
      velocities[offset] = (random() - 0.5) * 0.005;
      velocities[offset + 1] = (random() - 0.5) * 0.005;
      velocities[offset + 2] = (random() - 0.5) * 0.002;
    }

    const pointGeometry = new THREE.BufferGeometry();
    const pointAttribute = new THREE.BufferAttribute(positions, 3);
    pointAttribute.setUsage(THREE.DynamicDrawUsage);
    pointGeometry.setAttribute("position", pointAttribute);

    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 64;
    textureCanvas.height = 64;
    const textureContext = textureCanvas.getContext("2d");
    const gradient = textureContext.createRadialGradient(32, 32, 2, 32, 32, 31);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.98)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0.4)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    textureContext.fillStyle = gradient;
    textureContext.fillRect(0, 0, 64, 64);
    const dotTexture = new THREE.CanvasTexture(textureCanvas);

    const pointMaterial = new THREE.PointsMaterial({
      color: 0xc3cbd1,
      size: isMobile ? 0.11 : 0.09,
      map: dotTexture,
      transparent: true,
      opacity: 0.88,
      alphaTest: 0.06,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pointGeometry, pointMaterial);

    const linePositions = new Float32Array(maxSegments * 6);
    const lineColors = new Float32Array(maxSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    const linePositionAttribute = new THREE.BufferAttribute(linePositions, 3);
    const lineColorAttribute = new THREE.BufferAttribute(lineColors, 3);
    linePositionAttribute.setUsage(THREE.DynamicDrawUsage);
    lineColorAttribute.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute("position", linePositionAttribute);
    lineGeometry.setAttribute("color", lineColorAttribute);
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const connections = new THREE.LineSegments(lineGeometry, lineMaterial);

    const constellation = new THREE.Group();
    constellation.add(connections, particles);
    scene.add(constellation);

    const pointer = new THREE.Vector3(100, 100, 0);
    const pointerNdc = new THREE.Vector2(2, 2);
    const raycaster = new THREE.Raycaster();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let pointerEnergy = 0;

    const updatePointerPosition = (clientX, clientY) => {
      pointerNdc.set(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
      );
      raycaster.setFromCamera(pointerNdc, camera);
      raycaster.ray.intersectPlane(interactionPlane, pointer);
      pointerEnergy = 1;
    };

    const onPointerMove = (event) => updatePointerPosition(event.clientX, event.clientY);
    const onPointerLeave = () => {
      pointerEnergy = 0;
      pointer.set(100, 100, 0);
    };

    const updateParticles = (time) => {
      const interactionRadius = isMobile ? 2.1 : 2.8;
      const radiusSquared = interactionRadius * interactionRadius;

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        let x = positions[offset];
        let y = positions[offset + 1];
        let z = positions[offset + 2];
        let velocityX = velocities[offset];
        let velocityY = velocities[offset + 1];

        const deltaX = pointer.x - x;
        const deltaY = pointer.y - y;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;

        if (pointerEnergy > 0.02 && distanceSquared < radiusSquared) {
          const distance = Math.sqrt(distanceSquared) || 0.001;
          const influence = (1 - distance / interactionRadius) * pointerEnergy;
          const attraction = 0.0018 * influence;
          const orbit = 0.00115 * influence;
          velocityX += (deltaX / distance) * attraction - (deltaY / distance) * orbit;
          velocityY += (deltaY / distance) * attraction + (deltaX / distance) * orbit;
          z += influence * 0.007;
        }

        velocityX += Math.sin(time * 0.22 + index * 1.7) * 0.000025;
        velocityY += Math.cos(time * 0.2 + index * 1.3) * 0.000025;
        velocityX *= 0.992;
        velocityY *= 0.992;
        velocityX = Math.max(-0.018, Math.min(0.018, velocityX));
        velocityY = Math.max(-0.018, Math.min(0.018, velocityY));

        x += velocityX;
        y += velocityY;
        z += velocities[offset + 2] + Math.sin(time * 0.35 + index) * 0.00035;

        if (x > bounds.x) x = -bounds.x;
        else if (x < -bounds.x) x = bounds.x;
        if (y > bounds.y) y = -bounds.y;
        else if (y < -bounds.y) y = bounds.y;
        if (z > 1.7) z = -3.3;
        else if (z < -3.3) z = 1.7;

        positions[offset] = x;
        positions[offset + 1] = y;
        positions[offset + 2] = z;
        velocities[offset] = velocityX;
        velocities[offset + 1] = velocityY;
      }

      pointerEnergy *= 0.975;
      pointAttribute.needsUpdate = true;
    };

    const updateConnections = () => {
      const normalDistance = isMobile ? 1.45 : 1.6;
      const activeDistance = normalDistance * 1.34;
      const cursorRadiusSquared = 3.1 * 3.1;
      const connectionCounts = new Uint8Array(particleCount);
      let segmentCount = 0;

      for (let first = 0; first < particleCount; first += 1) {
        if (connectionCounts[first] >= maxConnections) continue;
        const firstOffset = first * 3;
        const firstX = positions[firstOffset];
        const firstY = positions[firstOffset + 1];
        const firstZ = positions[firstOffset + 2];
        const pointerDeltaX = firstX - pointer.x;
        const pointerDeltaY = firstY - pointer.y;
        const nearPointer =
          pointerEnergy > 0.02 &&
          pointerDeltaX * pointerDeltaX + pointerDeltaY * pointerDeltaY < cursorRadiusSquared;
        const linkDistance = nearPointer ? activeDistance : normalDistance;
        const linkDistanceSquared = linkDistance * linkDistance;

        for (let second = first + 1; second < particleCount; second += 1) {
          if (
            segmentCount >= maxSegments ||
            connectionCounts[first] >= maxConnections ||
            connectionCounts[second] >= maxConnections
          ) {
            continue;
          }

          const secondOffset = second * 3;
          const deltaX = firstX - positions[secondOffset];
          const deltaY = firstY - positions[secondOffset + 1];
          const deltaZ = (firstZ - positions[secondOffset + 2]) * 0.68;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
          if (distanceSquared >= linkDistanceSquared) continue;

          const strength = 1 - Math.sqrt(distanceSquared) / linkDistance;
          const brightness = nearPointer
            ? 0.42 + strength * 0.46
            : 0.2 + strength * 0.32;
          const writeOffset = segmentCount * 6;

          linePositions[writeOffset] = firstX;
          linePositions[writeOffset + 1] = firstY;
          linePositions[writeOffset + 2] = firstZ;
          linePositions[writeOffset + 3] = positions[secondOffset];
          linePositions[writeOffset + 4] = positions[secondOffset + 1];
          linePositions[writeOffset + 5] = positions[secondOffset + 2];

          for (let component = 0; component < 6; component += 3) {
            lineColors[writeOffset + component] = brightness * 0.82;
            lineColors[writeOffset + component + 1] = brightness * 0.87;
            lineColors[writeOffset + component + 2] = brightness * 0.91;
          }

          connectionCounts[first] += 1;
          connectionCounts[second] += 1;
          segmentCount += 1;
        }
      }

      lineGeometry.setDrawRange(0, segmentCount * 2);
      linePositionAttribute.needsUpdate = true;
      lineColorAttribute.needsUpdate = true;
    };

    const applyTheme = () => {
      const isLight = document.documentElement.dataset.theme === "light";
      pointMaterial.color.setHex(isLight ? 0x46525b : 0xc3cbd1);
      pointMaterial.opacity = isLight ? 0.68 : 0.88;
      lineMaterial.opacity = isLight ? 0.3 : 0.42;
    };

    applyTheme();
    new MutationObserver(applyTheme).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize, { passive: true });

    let frameId;
    const clockStart = performance.now();

    const render = () => {
      const elapsed = reducedMotion.matches ? 1.2 : (performance.now() - clockStart) / 1000;
      if (!reducedMotion.matches) updateParticles(elapsed);
      updateConnections();

      constellation.rotation.y += (pointerNdc.x * 0.018 - constellation.rotation.y) * 0.018;
      constellation.rotation.x += (-pointerNdc.y * 0.012 - constellation.rotation.x) * 0.018;
      renderer.render(scene, camera);

      if (!reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(render);
      }
    };

    const restart = () => {
      cancelAnimationFrame(frameId);
      render();
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else restart();
    });
    reducedMotion.addEventListener("change", restart);
    render();
  } catch (error) {
    console.warn("Three.js constellation could not start; using the fallback.", error);
    showFallback();
  }
};

startScene();
