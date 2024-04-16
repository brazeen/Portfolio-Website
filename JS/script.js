/*
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
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
//create a renderer in order to render out the objects to the scene
const renderer = new THREE.WebGLRenderer(
  //select which element to render in
  {canvas: document.querySelector('#homebg'),}
);
//set ratio and make the size fullscreen
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//add a light (ambient light because it lights up everything)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//raycaster to see where is the mouse hovering on
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera( pointer, camera );

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects( scene.children, true );

  for ( let i = 0; i < intersects.length; i ++ ) {

    intersects[ i ].object.material.color.set( 0xff0000 );
    

  }

  if (intersects.length == 0) {
    scene.traverse(function(child) {
      if (child.isMesh) {
        child.material.color.set( 0xffffff );
      }
    });
  }
}




//variable to store pc
var computer;
//load the pc model
loader.load('assets/computer.gltf', function(gltf){
  computer = gltf.scene;
  computer.scale.set(5,5,5);
  //add  to the scene
  scene.add(computer);
  computer.position.set(10,0,0)
  computer.rotation.y -= 300
})

//variable to store head
var head;
//load the head model
loader.load('assets/head/head.gltf', function(gltf){
  head = gltf.scene;
  head.scale.set(0.55,0.55,0.55);
  //add spaceship to the scene
  scene.add(head);
  head.position.set(-20,1.5,0)
})

//variable to store pin
var pin;
//load the pin model
loader.load('assets/pin/pin.gltf', function(gltf){
  pin = gltf.scene;
  pin.scale.set(0.75,0.75,0.75);
  //add spaceship to the scene
  scene.add(pin);
  pin.position.set(-10,2,0)
  pin.rotation.y -= 300
})

//variable to store phone
var phone;
//load the phone model
loader.load('assets/phone/phone.gltf', function(gltf){
  phone = gltf.scene;
  phone.scale.set(0.75,0.75,0.75);
  //add spaceship to the scene
  scene.add(phone);
  phone.position.set(-10,2,0)
  phone.rotation.y -= 300
})


function animate(){
    
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
  }
  
  animate()
  
  //if the window gets resized, change the aspect ratio
  window.onresize = function(e){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  //for raycaster
  window.addEventListener( 'pointermove', onPointerMove );

  //to move the mouse with the camera like a parallax effect
  //oldx and oldy are the old position of the camera (or current position before it gets changed?)
  /*
  let oldx = 0;
  let oldy = 0;
  //when the mouse moves, alter the camera position according to the mouse position to make a parallax effect
  window.onmousemove = function(ev){
    let changex = ev.x - oldx;
    let changey = ev.y - oldy;
    camera.position.x += changex/100;
    camera.position.y += changey/100;
    //set the new 'old' position
    oldx = ev.x;
    oldy = ev.y;
  }
  */
  