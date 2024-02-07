import * as THREE from 'three';

// import vertexShader from './shaders/vertex.glsl.js/index.js'
// import fragmentShader from './shaders/fragment.glsl.js'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// import colorfulTexture from './images/image.jpg'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x101114)


const geometry = new THREE.BoxGeometry(3, 25, 25);
// const material = new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide })
const material = new THREE.ShaderMaterial({
    // vertexShader: vshader,
    // fragmentShader: fshader
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    // wireframe: true
    side: THREE.DoubleSide
})

material.uniforms.uRadius = { value : 0.2 }
material.uniforms.uTexture = { value : new THREE.TextureLoader().load('./images/image.jpg')}


console.log('material')
console.log(material)

console.log('geometry.attributes')
console.log(geometry.attributes)

material.uniforms.uTime = { value: 0 }

console.log("geometry")
console.log(geometry)

const plane = new THREE.Mesh(geometry, material)

scene.add(plane)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.position.z = 0
ambientLight.position.y = 0

scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

let prevTime = 0


function animate(time) {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();

    // useTick(({ timestamp, timeDiff}) => {
        // const time = timestamp / 1000
        // material.uniforms.uTime.value = time
    // })

    const dt = (time - prevTime) / 1000;
    const wt = time / 12000

    material.uniforms.uTime.value = wt
    // console.log(dt)

    prevTime = time;

}

animate()