import * as THREE from 'three';

export class Controls {
    constructor() {
        window.addEventListener("keydown", this, false);
        window.addEventListener("keyup", this, false);

        this.pressed = {}

        // Slight shift to the left since there is more mandels to the left
        this.center = new THREE.Vector2(-0.5, 0.0);

        this.zoom = 1.0;
        this.moveSpeed = 1.0;
        this.zoomSpeed = 0.5;
        this.minZoom = 0.1;
    }

    // Event callback method, called because of registering with
    // `window.addEventListener`
    handleEvent(event) {
        switch (event.type) {
            case "keydown":
                this.pressed[event.key] = true;
                break;
            case "keyup":
                this.pressed[event.key] = false;
                break;
            default:
                break;
        }
    }

    // Perform camera movement
    update(dt) {
        var speedUp = 1.0;
        if (this.pressed["Shift"])
            speedUp = 2.0;

        var dir = new THREE.Vector2(0.0, 0.0)
        if (this.pressed["d"]) 
            dir.x += 1.0;
        if (this.pressed["a"]) 
            dir.x -= 1.0;
        if (this.pressed["w"]) 
            dir.y += 1.0;
        if (this.pressed["s"]) 
            dir.y -= 1.0;

        this.center.addScaledVector(dir, this.moveSpeed * speedUp / this.zoom * dt);

        if (this.pressed["PageUp"])
            this.zoom += this.zoomSpeed * this.zoom * speedUp * dt;
        if (this.pressed["PageDown"]) {
            this.zoom -= this.zoomSpeed * this.zoom * speedUp * dt;
            this.zoom = Math.max(this.zoom, this.minZoom);
        }
    }
}