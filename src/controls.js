export class Controls {
    constructor() {
        window.addEventListener("keydown", this, false);
        window.addEventListener("keyup", this, false);

        this.pressed = {}
        this.center = [0.0, 0.0];
        this.zoom = 1.0;
        this.moveSpeed = 1.0;
        this.zoomSpeed = 0.1;
        this.minZoom = 0.1;
    }

    // Event callback method
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
        var dx = 0.0;
        var dy = 0.0;
        if (this.pressed["d"]) 
            dx += 1.0;
        if (this.pressed["a"]) 
            dx -= 1.0;
        if (this.pressed["w"]) 
            dy += 1.0;
        if (this.pressed["s"]) 
            dy -= 1.0;

        this.center[0] += this.moveSpeed / this.zoom * dx * dt;
        this.center[1] += this.moveSpeed / this.zoom * dy * dt;

        if (this.pressed["PageUp"])
            this.zoom += this.zoomSpeed * dt;
        if (this.pressed["PageDown"]) {
            this.zoom -= this.zoomSpeed * dt;
            this.zoom = Math.max(this.zoom, this.minZoom);
        }
    }
}