import * as THREE from 'three';

var scene = new THREE.Scene();

var camera = new THREE.Camera();
camera.position.z = 1.0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var uniforms = {
    time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: new THREE.Vector2() }
};

var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
});

var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(mesh);

uniforms.resolution.value.x = window.innerWidth;
uniforms.resolution.value.y = window.innerHeight;
renderer.setSize(window.innerWidth, window.innerHeight);

var startTime = Date.now();

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = 60. * elapsedSeconds;
    renderer.render(scene, camera);
}

animate();