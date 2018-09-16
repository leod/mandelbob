import * as THREE from 'three';

export class ScreenQuad {
    constructor(width, height, uniforms) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.Camera();
        this.camera.position.z = 1.0;

        this.uniforms = {
            resolution: { type: "v2", value: new THREE.Vector2() },
        };
        Object.assign(this.uniforms, uniforms);

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
        });

        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
        this.scene.add(this.mesh);
    }
}
