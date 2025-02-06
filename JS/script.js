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
    this.cubes = [];

    this.mouse = new THREE.Vector2();
    this.windowHalf = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    
    // Add mouse move listener
    document.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX - this.windowHalf.x) / this.windowHalf.x;
      this.mouse.y = (event.clientY - this.windowHalf.y) / this.windowHalf.y;
    });
    
    // Define image paths and positions for 4 cubes
    const cubeConfigs = [
      { image: '../assets/html.png', position: [-3, 2, 0] },
      { image: '../assets/css.png', position: [3, 2, 0] },
      { image: '../assets/javascript.png', position: [-3, -2, 0] },
      { image: '../assets/nodejs.png', position: [3, -2, 0] }
    ];

    cubeConfigs.forEach(config => this.loadTexture(config));
    this.init();
  }

  loadTexture(config) {
    this.textureLoader.load(
      config.image,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const aspectRatio = texture.image.width / texture.image.height;
        const geometry = new THREE.BoxGeometry(1 * aspectRatio, 1, 1);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(...config.position);
        this.cubes.push(cube);
        this.scene.add(cube);
      },
      undefined,
      (error) => console.error("Texture loading error:", error)
    );
  }

  init() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.position.z = 4; // Moved camera back to see all cubes
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
    
    // Make cubes follow cursor with different intensities
    this.cubes.forEach((cube, index) => {
      const intensity = 0.5 + (index * 0.2);
      
      // Smooth rotation based on mouse position
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
      
      // Target rotation based on mouse position
      const targetRotationX = this.mouse.y * intensity;
      const targetRotationY = this.mouse.x * intensity;
      
      // Smooth interpolation
      cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;
      cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;
      
      // Add subtle floating motion
      cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
    });
    
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




