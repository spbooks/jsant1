addLoadListener(initEvents);

function initEvents()
{
  var mylink = document.getElementById("mylink");

  mylink.onclick = engage;
  
  return true;
}

function engage(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  alert("The screen co-ordinates of your click were: " + event.screenX + ", " + event.screenY);

  return false;
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
