import * as THREE from 'three';
import { ScreenQuad } from './screen-quad';
import { Controls } from './controls';

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var screenQuad = new ScreenQuad(window.innerWidth, window.innerHeight, {
    time: { type: "f", value: 1.0 },
})

document.body.appendChild(renderer.domElement);

var frameStartTime = Date.now();

var controls = new Controls();

function animate() {
    requestAnimationFrame(animate);

    var nowTime = Date.now();
    var elapsedSeconds = (nowTime - frameStartTime) / 1000.0;
    frameStartTime = nowTime;
    
    controls.update(elapsedSeconds);
    renderer.render(screenQuad.scene, screenQuad.camera);
}

animate();