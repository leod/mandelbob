import * as THREE from 'three';
import { ScreenQuad } from './screen-quad';
import { Controls } from './controls';

var container = document.getElementById("view");

var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
console.log(container.clientWidth);
console.log(container.clientHeight);

var screenQuad = new ScreenQuad(container.clientWidth, container.clientHeight, {
    time: { type: "f", value: 1.0 },
    center: { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
    zoom: { type: "f", value: 1.0 },
})

container.appendChild(renderer.domElement);

var frameStartTime = Date.now();

var controls = new Controls();

function animate() {
    requestAnimationFrame(animate);

    var nowTime = Date.now();
    var elapsedSeconds = (nowTime - frameStartTime) / 1000.0;
    frameStartTime = nowTime;

    controls.update(elapsedSeconds);

    screenQuad.uniforms.center.value.x = controls.center.x;
    screenQuad.uniforms.center.value.y = controls.center.y;
    screenQuad.uniforms.zoom.value = controls.zoom;
    
    renderer.render(screenQuad.scene, screenQuad.camera);
}

animate();