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
  return [
          new Vector(go.x, go.y, go.z + 1.0),
          new Vector(go.x, go.y, go.z - 1.0),
          new Vector(go.x + 1.0, go.y, go.z),
          new Vector(go.x - 1.0, go.y, go.z)];
}

updateAi = function(obj, delta) {
  if (obj.hasOwnProperty("ai")) {
    var ai = obj.ai;
    if (_.isNull(ai.current_target) || _.isEqual(ai.current_target, obj.aexGroup.position)) {
      var neighbours = getNonCollidingNeighbours(obj.aexGroup.position)
      var nextTarget = neighbours[_.random(0, neighbours.length - 1)];
      ai.current_target = nextTarget;
      obj.moveAnim = new MoveAnim(obj, nextTarget, 1000, function(){obj.aexGroup.move(ai.current_target);});
    }
  }
}

MoveAnim = function(obj, targetPos, duration, callback) {
  this.startingPos = obj.aexGroup.position;
  this.targetPos = targetPos;
  this.duration = duration;
  this.currentDuration = 0;
  this.finishCallback = callback;
}

updateMoveAnim = function(obj, delta) {
  if (obj.hasOwnProperty("moveAnim")) {
    var moveAnim = obj.moveAnim;
    moveAnim.currentDuration += delta;
    obj.aexGroup.move(linearVectorAnim(moveAnim.startingPos, moveAnim.targetPos, moveAnim.duration, moveAnim.currentDuration));
    if (epsilEqual(obj.aexGroup.position, moveAnim.targetPos)) {
      obj.moveAnim = null;
      moveAnim.finishCallback(obj);
    }
  }
}

epsilEqual = function(a, b) {
  return Math.abs(a - b) < 0.0001;
}

linearVectorAnim = function(startingPos, targetPos, animationTargetLength, animationCurrentLength) {
  var a = animationCurrentLength/animationTargetLength;

  var intermediatePos = new Vector((1-a) * startingPos.x + a * targetPos.x,
                                  (1-a) * startingPos.z + a * targetPos.z)
  return intermediatePos;
}
