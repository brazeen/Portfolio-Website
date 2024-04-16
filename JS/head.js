//FOR THREE.JS LIBRARY--------------------------------------------------------------------------------------------------------------------
//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//import gltfloader
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
//loader object
let loader = new GLTFLoader();

//HOME PAGE--------------------------------------------------------------------------------------------------------------------
//import a scene (kind of a container with all the cameras lights and everything)
const scene = new THREE.Scene();
//get a camera, specifically a perspective camera (designed to mimic human eyeball vision)
//PerspectiveCamera takes in 4 arguments, (fov, aspectratio, camera frustrum near plane, camera frustrum far plane)
//camera frustrum is effectively the view perspective of the camera
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
//create a renderer in order to render out the objects to the scene
const renderer = new THREE.WebGLRenderer(
  //select which element to render in
  {canvas: document.querySelector('#head'),}
);
//set ratio and make the size fullscreen
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(300, 300);
camera.position.setZ(10);

//add a light (ambient light because it lights up everything)
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );
//add a light (ambient light because it lights up everything)
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight2 );
directionalLight2.position.set(0,-1,0)
//raycaster to see where is the mouse hovering on
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
    // Get canvas dimensions
    const canvasRect = renderer.domElement.getBoundingClientRect();
    const canvasWidth = canvasRect.width;
    const canvasHeight = canvasRect.height;

    // Calculate pointer position in normalized device coordinates
    pointer.x = ( ( event.clientX - canvasRect.left ) / canvasWidth ) * 2 - 1;
    pointer.y = - ( ( event.clientY - canvasRect.top ) / canvasHeight ) * 2 + 1;

    // Update the picking ray with the camera and pointer position
    raycaster.setFromCamera( pointer, camera );

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children, true );

    for ( let i = 0; i < intersects.length; i ++ ) {
        intersects[ i ].object.material.color.set( 0xff0000 );
        //GSAP animations
        head.tl = new TimelineMax().delay(0.1);
        //rotate by 360 degrees in radians lol
        head.tl.to(head.rotation, 0.5, {y: 0, ease: Expo.easeOut})
    }

    if (intersects.length == 0) {
        scene.traverse(function(child) {
            if (child.isMesh) {
                child.material.color.set( 0xffffff );
            }
        });
    }
}


//variable to store head
var head;
//load the head model
loader.load('assets/head/head.gltf', function(gltf){
  head = gltf.scene;
  head.scale.set(0.55,0.55,0.55);
  scene.add(head);
  head.position.set(0,1.5,0)
})



function animate(){
    
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    if (head){
        head.rotation.y += 0.01;
    }
  }
  
  animate()
  
  /*
  //if the window gets resized, change the aspect ratio
  window.onresize = function(e){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  */
  //for raycaster
  window.addEventListener( 'pointermove', onPointerMove );


  