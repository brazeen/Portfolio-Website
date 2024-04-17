    //FOR THREE.JS LIBRARY--------------------------------------------------------------------------------------------------------------------
//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//import orbitcontrols
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

//list of skill
let skills = ["csharp", "python", "html", "css", "js", "sql", "java", "bootstrap", "git"]
function loadSkill(name){
    const scene = new THREE.Scene();
    //get a camera, specifically a perspective camera (designed to mimic human eyeball vision)
    //PerspectiveCamera takes in 4 arguments, (fov, aspectratio, camera frustrum near plane, camera frustrum far plane)
    //camera frustrum is effectively the view perspective of the camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    //create a renderer in order to render out the objects to the scene
    const renderer = new THREE.WebGLRenderer(
    //select which element to render in
    {canvas: document.querySelector(`#${name}`),}
    );
    //set ratio and make the size fullscreen
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(100, 100);
    camera.position.setZ(10);
    //controls object
    let controls = new OrbitControls(camera, renderer.domElement);

    //add a light (ambient light because it lights up everything)
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    
    //make the texture to put on the cube
    const texture = new THREE.TextureLoader().load(`assets/${name}.png`);

    //make the cube object
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshBasicMaterial({
          //color: 0xffffff,
          map: texture
        })
    );
    scene.add(cube);
    


    function animate(){
        controls.update();
        requestAnimationFrame(animate);
        renderer.render(scene,camera);
    }
    
    animate()

}

//run it for all the items in the lists
for (let i = 0; i < skills.length; i++){
    loadSkill(skills[i]);
}