function parentFunction()
{
  var scopedVar = "available";

  setTimeout(function() { alert(scopedVar); }, 1000);

  return true;
}

parentFunction();