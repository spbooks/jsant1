function Bird()
{
  this.feet = 2;
  this.feathers = true;

  return true;
}

function Canary()
{
  this.superclass = Bird;
  this.superclass();

  this.color = "yellow";

  return true;
}

var tweety = new Canary();
var tweetyFeet = tweety.feet;
var tweetyColor = tweety.color;

alert('The object "tweety" inherits ' + tweetyFeet + ' feet\nThe object "tweety" inherits the color ' + tweety.color);