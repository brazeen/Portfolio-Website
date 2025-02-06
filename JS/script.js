import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

(function () {
  "use strict";

  // Select timeline items
  const items = document.querySelectorAll(".timeline li");

  // Check if an element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Apply animation if in viewport
  function callbackFunc() {
    items.forEach(item => {
      if (isElementInViewport(item)) {
        item.classList.add("in-view");
      }
    });
  }

  // Listen for viewport changes
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

// 🎲 Cube Canvas Class
class CubeCanvas {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });

    this.textureLoader = new THREE.TextureLoader();
    this.loadTexture("../assets/MYFACE.jpg"); // Loads texture properly

    this.init();
  }

  loadTexture(imagePath) {
    this.textureLoader.load(
      imagePath,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;  // Prevents stretching
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const aspectRatio = texture.image.width / texture.image.height;
        this.geometry = new THREE.BoxGeometry(1 * aspectRatio, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ map: texture });

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
      },
      undefined,
      (error) => console.error("Texture loading error:", error)
    );
  }

  init() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.position.z = 1.2;
    this.resize();
    this.animate();
  }

  resize() {
    const container = this.renderer.domElement.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.cube) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }
    this.renderer.render(this.scene, this.camera);
  }
}

// 🖥️ Initialize Canvases
const canvases = document.querySelectorAll('.hero canvas');
const cubes = Array.from(canvases).map(canvas => new CubeCanvas(canvas));

// Handle Window Resize
window.addEventListener('resize', () => {
  cubes.forEach(cube => cube.resize());
});




