var global = "available";

function function1()
{
  var global = "unavailable";

  return global;
}

var isAvailable = function1();

alert("The global variable is: " + isAvailable);