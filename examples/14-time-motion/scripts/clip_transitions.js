addLoadListener(function(){setTimeout(function(){initTransitions();}, 0);});

function initTransitions()
{
  var elements = getElementsByAttribute("class", "transition");

  for (var i = 0; i < elements.length; i++)
  {
    attachEventListener(elements[i], "click", clickTransition, false);
  }

  return true;
}

function clickTransition(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  while (!/(^| )transition( |$)/.test(target.className))
  {
    target = target.parentNode;
  }

  transitionSquash(target);

  return true;
}

function transitionSquash(target)
{
  if (typeof target == "undefined" || typeof target.style == "undefined")
  {
    target = this;
  }

  var increment = 5;
  var width = target.offsetWidth;
  var height = target.offsetHeight;

  if (target.style.clip.indexOf("rect") == -1)
  {
    target.style.clip = "rect(" + increment + "px," + width + "px," + (height - increment) + "px,0)";
  }
  else
  {
    var clipDimensions = getClipDimensions(target.style.clip);

    if ((clipDimensions[2] - increment) - (clipDimensions[0] + increment) > 0)
    {
      target.style.clip = "rect(" + (clipDimensions[0] + increment) + "px," +
          clipDimensions[1] + "px," + (clipDimensions[2] - increment) + "px," +
          clipDimensions[3] + "px)";
    }
    else
    {
      target.style.clip = "rect(" + parseInt(height / 2) + "px," +
          clipDimensions[1] + "px," + parseInt(height / 2) + "px," +
          clipDimensions[3] + "px)";

      return true;
    }
  }

  setTimeout(function(){transitionSquash(target)}, 50);

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

function getClipDimensions(clipString)
{
  var clipValue = clipString.replace(/rect\((.*)\)/, "$1");

  if (/,/.test(clipValue))
  {
    var clipDimensions = clipValue.split(",");
  }
  else
  {
    var clipDimensions = clipValue.split(" ");
  }

  for (var i = 0; i < clipDimensions.length; i++)
  {
    clipDimensions[i] = parseInt(clipDimensions[i]);
  }

  return clipDimensions;
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

        return functionRef();
      }
    }
    else
    {
      target[eventType] = functionRef;
    }
  }

  return true;
}

function getEventTarget(event)
{
  var targetElement = null;

  if (typeof event.target != "undefined")
  {
    targetElement = event.target;
  }
  else
  {
    targetElement = event.srcElement;
  }

  while (targetElement.nodeType == 3 && targetElement.parentNode != null)
  {
    targetElement = targetElement.parentNode;
  }

  return targetElement;
}

function getElementsByAttribute(attribute, attributeValue)
{
  var elementArray = new Array();
  var matchedArray = new Array();

  if (document.all)
  {
    elementArray = document.all;
  }
  else
  {
    elementArray = document.getElementsByTagName("*");
  }

  for (var i = 0; i < elementArray.length; i++)
  {
    if (attribute == "class")
    {
      var pattern = new RegExp("(^| )" + attributeValue + "( |$)");

      if (elementArray[i].className.match(pattern))
      {
        matchedArray[matchedArray.length] = elementArray[i];
      }
    }
    else if (attribute == "for")
    {
      if (elementArray[i].getAttribute("htmlFor") || elementArray[i].getAttribute("for"))
      {
        if (elementArray[i].htmlFor == attributeValue)
        {
          matchedArray[matchedArray.length] = elementArray[i];
        }
      }
    }
    else if (elementArray[i].getAttribute(attribute) == attributeValue)
    {
      matchedArray[matchedArray.length] = elementArray[i];
    }
  }

  return matchedArray;
}