import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 300, 0 );
scene.add( hemiLight );

var dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 75, 300, -75 );
scene.add( dirLight );

const loader = new GLTFLoader();

camera.position.set( 5, 5, 8 );
controls.update();

const geometry = new THREE.BoxGeometry( 5, 0.5, 5 );
const material = new THREE.MeshBasicMaterial( { color: 0x999999 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.set(0, -0.3, 0)

loader.load( './toy.glb', function ( gltf ) {

	scene.add( gltf.scene );
    console.log("added")

}, undefined, function ( error ) {

	console.error( error );
    console.log("nejj")

} );

function animate() {
    controls.update()
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
