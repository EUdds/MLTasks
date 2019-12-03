function Circle(x,y,r, fixed) {
    let options = {
        friction: 0.5 ,
        restitution: 0.1,
        isStatic: fixed
    }
    this.body =box1 = Bodies.circle(x,y, r, options);
    this.r = r;
    this.d = r*2;
    World.add(world, [this.body]);

    this.show = () => {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        circle(0,0,this.r); 
        pop();
    }
}
