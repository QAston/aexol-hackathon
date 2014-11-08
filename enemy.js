AI = function(moveSpeed) {
  this.moveSpeed = moveSpeed
}

Enemy = function(gameobj, ai) {
  this.gravity = true;
  this.ai = ai;
  this.go = gameobj;
}

getNonCollidingNeighbours = function(go) {
  return [new Vector(go.x + 1.0, go.y, go.z + 1.0),
          new Vector(go.x, go.y, go.z + 1.0),
          new Vector(go.x, go.y, go.z),
          new Vector(go.x, go.y, go.z - 1.0),
          new Vector(go.x + 1.0, go.y, go.z),
          new Vector(go.x - 1.0, go.y, go.z),
          new Vector(go.x - 1.0, go.y, go.z - 1.0),
          new Vector(go.x + 1.0, go.y, go.z - 1.0),
          new Vector(go.x - 1.0, go.y, go.z + 1.0)];
}

updateAi = function(obj, delta) {
  if (obj.hasOwnProperty("ai")) {
    this.go.x += randomSign() *delta/1000 * this.ai.moveSpeed;
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
