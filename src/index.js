import * as THREE from 'three';
import { ScreenQuad } from './screen-quad';

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var screenQuad = new ScreenQuad(window.innerWidth, window.innerHeight, {
    time: { type: "f", value: 1.0 },
})

document.body.appendChild(renderer.domElement);

var startTime = Date.now();

function animate() {
    requestAnimationFrame(animate);

    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    screenQuad.uniforms.time.value = 60. * elapsedSeconds;
    
    renderer.render(screenQuad.scene, screenQuad.camera);
}

animate();