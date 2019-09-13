function parentFunction()
{
  var scopedVar = "available";
  var nestedFunction = function()
  {
    return scopedVar;
  }

  return nestedFunction();
}

var isAvailable = parentFunction();

alert("The scoped variable is: " + isAvailable);