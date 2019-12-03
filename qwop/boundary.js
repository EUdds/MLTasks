function Boundry(x,y,w,h, a) {
    let options = {
        friction: 0 ,
        restitution: 0.1,
        isStatic: true,
        angle: a 
    }
    this.body = Bodies.rectangle(x,y,w,h, options);
    this.w = w;
    this.h = h;
    this.position = this.body.position;
    World.add(world, [this.body]);

    console.log(this.body);

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
        rect(0,0,this.w,this.h); 
        pop();
    }
}
