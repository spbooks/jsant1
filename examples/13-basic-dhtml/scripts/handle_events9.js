addLoadListener(initEvents);

function initEvents()
{
  var mylink = document.getElementById("mylink");

  attachEventListener(mylink, "click", engage, false);
  
  var paragraph = document.getElementsByTagName("p")[0];
  
  attachEventListener(paragraph, "click", engage, false);
  
  return true;
}

function engage(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  alert("She canna take no more cap'n!");
  
  stopEvent(event);
  
  return true;
}

function stopEvent(event)
{
  if (typeof event.stopPropagation != "undefined")
  {
    event.stopPropagation();
  }
  else
  {
    event.cancelBubble = true;
  }

  return true;
}

function attachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.addEventListener != "undefined")
  {
    target.addEventListener(eventType, functionRef, capture);
  }
  else if (typeof target.attachEvent != "undefined")
  {
    target.attachEvent("on" + eventType, functionRef);
  }
  else
  {
    eventType = "on" + eventType;

    if (typeof target[eventType] == "function")
    {
      var oldListener = target[eventType];

      target[eventType] = function()
      {
        oldListener();

        return  functionRef();
      }
    }
    else
    {
      target[eventType] = functionRef;
    }
  }

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
