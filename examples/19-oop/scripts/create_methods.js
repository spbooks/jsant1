var tweety = new Bird();
var numFeet = tweety.getFeetNum();

alert('The object "tweety" inherits ' + numFeet + ' feet');

function Bird()
{
  this.feet = 2;
  this.feathers = true;
  this.getFeetNum = getFeetNum;

  return true;
}

function getFeetNum()
{
  return this.feet;
}