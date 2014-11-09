AI = function(moveSpeed) {
  this.moveSpeed = moveSpeed;
  this.current_target = null;
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
    var ai = obj.ai;
    if (_isNull(ai.current_target) || _.isEqual(nextTarget, ai.current_target)) {
      var neighbours = getNonCollidingNeighbours(obj.go)
      var nextTarget = neighbours[_.random(0, max)];
      ai.current_target = nextTarget;
    }
    obj.position = ai.current_target;
  }
}

randomSign = function() {
  return randomBool() ? 1 : -1;
}

randomBool = function() {
  return Math.random() > 0.5;
}
