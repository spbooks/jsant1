var tweety = new Bird();
var numFeet = tweety.feet;

alert('The object "tweety" inherits ' + numFeet + ' feet');

function Bird()
{
  this.feet = 2;
  this.feathers = true;

  return true;
}