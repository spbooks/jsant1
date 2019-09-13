if (typeof com == "undefined")
{
  com = new Object();
}

if (typeof com.sitepoint == "undefined")
{
  com.sitepoint = new Object();
}

com.sitepoint.Bird = function()
{
  this.feet = 2;
  this.feathers = true;

  return true;
}

var tweety = new com.sitepoint.Bird();

alert('The object "com.sitepoint.bird" has ' + tweety.feet + ' feet');
