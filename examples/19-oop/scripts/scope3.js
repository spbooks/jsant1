function function1()
{
  var global = "available";
}

function function2()
{
  return global;
}

function1();
var isAvailable = function2();

alert("The global variable is: " + isAvailable);