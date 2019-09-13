function Bird()
{
  this.feet = 2;
  this.feathers = true;

  return true;
}

Bird.prototype.getFeetNum = function()
{
  return this.feet;
};

var tweety = new Bird();
var numFeet = tweety.getFeetNum();

alert('The object "tweety" inherits ' + numFeet + ' feet');