AI = function(moveSpeed) {
  this.moveSpeed = moveSpeed
}

Enemy = function(gameobj, ai) {
  this.gravity = true;
  this.ai = ai;
  this.go = gameobj;
}

getPossibleAreas = function(go) {
  return [new Vector(1.0, 1.0, 1.0)];
}

updateAi = function(obj, delta) {
  if (obj.hasOwnProperty("ai")) {
    this.go.x += randomSigndelta/1000 * this.ai.moveSpeed;
    //this.go.y +=
    //this.go.z +=
  }
}

randomSign = function() {
  return randomBool() ? 1 : -1;
}

randomBool = function() {
  return Math.random() > 0.5;
}
