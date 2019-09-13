addLoadListener(init);

function init()
{
  var h1 = document.getElementsByTagName("h1")[0];
  var fontSize = retrieveComputedStyle(h1, "fontSize");
  
  alert("The computed font-size of the h1 is: " + fontSize);
  
  return true;
}

function retrieveComputedStyle(element, styleProperty)
{
  var computedStyle = null;

  if (typeof element.currentStyle != "undefined")
  {
    computedStyle = element.currentStyle;
  }
  else
  {
    computedStyle = document.defaultView.getComputedStyle(element, null);
  }

  return computedStyle[styleProperty];
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