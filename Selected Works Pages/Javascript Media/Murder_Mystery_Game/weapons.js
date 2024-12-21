class Weapon {
  //objectNum is the type of object 0=knife 1=bat
  constructor(pos, vel, radius, color, objectNum) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.objectNum = objectNum;
  
  }x
  collide(other) {
    if (other == this) {
      return;
    }
    let relative = p5.Vector.sub(other.pos, this.pos);
    let dist = relative.mag() - (this.radius + other.radius);
    if (dist < 0) {
      let movement = relative.copy().setMag(abs(dist/2));
      this.pos.sub(movement);
      other.pos.add(movement);
      
      let thisToOtherNormal = relative.copy().normalize();
      let approachSpeed = this.vel.dot(thisToOtherNormal) + -other.vel.dot(thisToOtherNormal);
      let approachVector = thisToOtherNormal.copy().setMag(approachSpeed);
      this.vel.sub(approachVector);
      other.vel.add(approachVector);
    }
  }
  move() {
    this.vel.y += 0.1;
    this.pos.add(this.vel);
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.x > width-this.radius) {
      this.pos.x = width-this.radius;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      this.vel.y = -this.vel.y;
    }
    if (this.pos.y > height-100-this.radius) {
      this.pos.y = height-100-this.radius;
      this.vel.y = -this.vel.y;
    }
  }
  render() {
    if(this.objectNum == 0){ 
      tint(this.color)
      image(knifeImage, this.pos.x - 30, this.pos.y-40, this.radius*2, this.radius*2);
    } else if(this.objectNum == 1){  
      tint(this.color)
      image(batImage, this.pos.x - 30, this.pos.y-40, this.radius*2, this.radius*2);
    }
    noTint();
  }
  clicked() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.radius) {
      if(screen == 3){
        screen = 4;
      }
    }
  }
}
