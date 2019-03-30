function Bird() {
    this.y = height/2;
    this.x = 64;

    this.gravity = 0.7;
    this.velocity = 0;
    this.lift = 12;

    this.src = 'images/bird.png';
    this.img;

    this.init = () => {
        this.img = loadImage(this.src);
    }
    
    this.show = () => {
        // fill(255);
        // ellipse(this.x, this.y, 32, 32);
        
        image(this.img, this.x, this.y, this.img.width, this.img.height);
    }

    this.update = () => {
        rotate(0);
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.velocity *= 0.9

        if(this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
        if(this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    this.up = () => {
        this.velocity -= this.lift;
        rotate(PI / 12);
    }
}
