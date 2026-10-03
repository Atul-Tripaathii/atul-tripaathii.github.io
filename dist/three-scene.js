const startScene = async () => {
  const host = document.querySelector("#three-background");
  if (!host) return;

  const showFallback = () => {
    host.classList.add("three-fallback");
    host.innerHTML = '<span class="fallback-cube cube-one"></span><span class="fallback-cube cube-two"></span><span class="fallback-cube cube-three"></span>';
  };

  if (!window.WebGLRenderingContext) {
    showFallback();
    return;
  }

  try {
  const THREE = await import("./vendor/three.module.min.js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(0, 0, 11);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.devicePixelRatio < 2 });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const cubeCount = window.innerWidth < 720 ? 20 : 42;
  const solidCount = window.innerWidth < 720 ? 5 : 9;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x77838f,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });
  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x85929e,
    transparent: true,
    opacity: 0.055,
    roughness: 0.82,
    metalness: 0.22,
    depthWrite: false,
  });

  const wires = new THREE.InstancedMesh(geometry, wireMaterial, cubeCount);
  const solids = new THREE.InstancedMesh(geometry, solidMaterial, solidCount);
  wires.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  solids.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(wires, solids);
  scene.add(new THREE.HemisphereLight(0xe8edf1, 0x15191d, 1.5));

  const dummy = new THREE.Object3D();
  const pointer = { x: 0, y: 0 };
  let randomSeed = 2147483647;
  const random = () => {
    randomSeed = (randomSeed * 16807) % 2147483647;
    return (randomSeed - 1) / 2147483646;
  };

  const horizontalRange = window.innerWidth < 720 ? 5.5 : 20;
  const createState = (count, solid = false) =>
    Array.from({ length: count }, () => ({
      x: (random() - 0.5) * (solid ? horizontalRange * 0.82 : horizontalRange),
      y: (random() - 0.5) * (solid ? 11 : 14),
      z: -1 - random() * 10,
      size: (solid ? 0.28 : 0.18) + random() * (solid ? 1.15 : 1.45),
      rx: random() * Math.PI,
      ry: random() * Math.PI,
      drift: 0.08 + random() * 0.22,
      phase: random() * Math.PI * 2,
    }));

  const wireState = createState(cubeCount);
  const solidState = createState(solidCount, true);

  const updateMesh = (mesh, states, time) => {
    states.forEach((cube, index) => {
      dummy.position.set(
        cube.x + Math.sin(time * cube.drift + cube.phase) * 0.25,
        cube.y + Math.cos(time * cube.drift * 0.7 + cube.phase) * 0.22,
        cube.z,
      );
      dummy.rotation.set(cube.rx + time * cube.drift * 0.14, cube.ry + time * cube.drift * 0.18, time * cube.drift * 0.08);
      dummy.scale.setScalar(cube.size);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  const applyTheme = () => {
    const isLight = document.documentElement.dataset.theme === "light";
    wireMaterial.color.setHex(isLight ? 0x53616d : 0x77838f);
    wireMaterial.opacity = isLight ? 0.16 : 0.2;
    solidMaterial.color.setHex(isLight ? 0x42515d : 0x85929e);
    solidMaterial.opacity = isLight ? 0.035 : 0.055;
  };

  applyTheme();
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });

  let timeOrigin = performance.now();
  let frameId;
  const render = () => {
    const time = (performance.now() - timeOrigin) / 1000;
    updateMesh(wires, wireState, reducedMotion.matches ? 0 : time);
    updateMesh(solids, solidState, reducedMotion.matches ? 0 : time * 0.85);
    camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.025;
    camera.position.y += (-pointer.y * 0.28 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, -4);
    renderer.render(scene, camera);
    if (!reducedMotion.matches && !document.hidden) frameId = requestAnimationFrame(render);
  };

  const restart = () => {
    cancelAnimationFrame(frameId);
    timeOrigin = performance.now();
    render();
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else restart();
  });
  reducedMotion.addEventListener("change", restart);
  render();
  } catch (error) {
    showFallback();
  }
};

startScene();
