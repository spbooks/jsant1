function Bird()
{
  this.feet = 2;
  this.feathers = true;

  return true;
}

function Canary()
{
  this.color = "yellow";

  return true;
}

Canary.prototype = new Bird();

var tweety = new Canary();
var tweetyFeet = tweety.feet;
var tweetyColor = tweety.color;

alert('The object "tweety" inherits ' + tweetyFeet + ' feet\nThe object "tweety" inherits the color ' + tweety.color);