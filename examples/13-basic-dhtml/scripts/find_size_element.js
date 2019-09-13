addLoadListener(initSizeElement);

function initSizeElement()
{
  var starShip = document.getElementById("enterprise");
  var pixelWidth = starShip.offsetWidth;
  var pixelHeight = starShip.offsetHeight;
  
  alert("The width of the Enterprise is: " + pixelWidth + "px\nThe height of the Enterprise is: " + pixelHeight + "px");

  return true;
}

function addLoadListener(fn)
{
  if (typeof window.addEventListener != 'undefined')
  {
    window.addEventListener('load', fn, false);
  }
  else if (typeof document.addEventListener != 'undefined')
  {
    document.addEventListener('load', fn, false);
  }
  else if (typeof window.attachEvent != 'undefined')
  {
    window.attachEvent('onload', fn);
  }
  else
  {
    var oldfn = window.onload;
    if (typeof window.onload != 'function')
    {
      window.onload = fn;
    }
    else
    {
      window.onload = function()
      {
        oldfn();
        fn();
      };
    }
  }
}