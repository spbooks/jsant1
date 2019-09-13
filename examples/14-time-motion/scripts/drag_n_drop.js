addLoadListener(initDragNDrop);

function initDragNDrop()
{
  if (identifyBrowser().indexOf("ie") >= 0 && identifyOS() == "mac")
  {
    return false;
  }

  var LIs= document.getElementById("products").getElementsByTagName("li");

  for (var i = 0; i < LIs.length; i++)
  {
    attachEventListener(LIs[i], "mousedown", mousedownDragNDrop, false);
    LIs[i].style.cursor = "move";
  }
}

function mousedownDragNDrop(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  if (typeof event.pageX == "undefined")
  {
    event.pageX = event.clientX + getScrollingPosition()[0];
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "li")
  {
    target = target.parentNode;
  }

  document.currentTarget = target;

  var currentLeft = parseInt(target.style.left);
  var currentTop = parseInt(target.style.top);

  if (isNaN(currentLeft))
  {
    currentLeft = "0";
  }

  if (isNaN(currentTop))
  {
    currentTop = "0";
  }

  if (typeof target.originLeft == "undefined")
  {
    target.originLeft = currentLeft;
    target.originTop = currentTop;
  }

  target.clickOriginX = event.pageX;
  target.clickOriginY = event.pageY;
  target.differenceX = currentLeft - event.pageX;
  target.differenceY = currentTop - event.pageY;

  attachEventListener(document, "mousemove", mousemoveCheckThreshold, false);
  attachEventListener(document, "mouseup", mouseupCancelThreshold, false);

  stopDefaultAction(event);

  return false;
}

function mousemoveCheckThreshold(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  if (typeof event.pageX == "undefined")
  {
    event.pageX = event.clientX + getScrollingPosition()[0];
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var target = document.currentTarget;

  if (Math.abs(target.clickOriginX - event.pageX) > 3 || Math.abs(target.clickOriginY - event.pageY) > 3)
  {
    detachEventListener(document, "mousemove", mousemoveCheckThreshold, false);
    detachEventListener(document, "mouseup", mouseupCancelThreshold, false);

    attachEventListener(document, "mousemove", mousemoveDragNDrop, false);
    attachEventListener(document, "mouseup", mouseupDragNDrop, false);
    attachEventListener(document, "click", clickDragNDrop, false);
  }

  stopDefaultAction(event);

  return true;
}

function mouseupCancelThreshold()
{
  detachEventListener(document, "mousemove", mousemoveCheckThreshold, false);
  detachEventListener(document, "mouseup", mouseupCancelThreshold, false);
  
  return true;
}

function mousemoveDragNDrop(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  if (typeof event.pageX == "undefined")
  {
    event.pageX = event.clientX + getScrollingPosition()[0];
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var target = document.currentTarget;

  target.style.left = event.pageX + target.differenceX + "px";
  target.style.top = event.pageY + target.differenceY + "px";

  stopDefaultAction(event);

  return true;
}

function mouseupDragNDrop(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  if (typeof event.pageX == "undefined")
  {
    event.pageX = event.clientX + getScrollingPosition()[0];
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var hotZone = document.getElementById("shoppingCart");
  var hotZonePosition = getPosition(hotZone);
  var target = document.currentTarget;

  if (!((event.pageX > hotZonePosition[0]) && (event.pageX < hotZonePosition[0] + hotZone.offsetWidth) && (event.pageY > hotZonePosition[1]) && (event.pageY < hotZonePosition[1] + hotZone.offsetHeight)))
  {
    target.style.left = target.originLeft + "px";
    target.style.top = target.originTop + "px";
  }
  else
  {
    var cartInput = document.getElementById("cartInput");

    if (cartInput == null)
    {
      var cartInput = document.createElement("input");

      cartInput.setAttribute("id", "cartInput");
      cartInput.setAttribute("name", "cartInput");
      cartInput.setAttribute("type", "hidden");
      cartInput.setAttribute("value", target.getAttribute("id"));
      document.getElementById("shoppingCart").appendChild(cartInput);
    }
    else
    {
      cartInput.setAttribute("value", cartInput.getAttribute("value") + "," + target.getAttribute("id"));
    }

    // In a practical system, you would probably submit the form here.
    alert("Item dropped on shopping cart!");
    target.style.left = target.originLeft + "px";
    target.style.top = target.originTop + "px";
  }

  detachEventListener(document, "mousemove", mousemoveDragNDrop, false);
  detachEventListener(document, "mouseup", mouseupDragNDrop, false);

  return true;
}

function clickDragNDrop(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  detachEventListener(document, "click", clickDragNDrop, false);

  stopDefaultAction(event);

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
};




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
};




function detachEventListener(target, eventType, functionRef, capture)
{
    if (typeof target.removeEventListener != "undefined")
    {
        target.removeEventListener(eventType, functionRef, capture)
    }
    else if (typeof target.detachEvent != "undefined")
    {
        target.detachEvent("on" + eventType, functionRef);
    }
    else
    {
        target["on" + eventType] = null;
    }

    return true;
};




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
};




function stopDefaultAction(event)
{
    event.returnValue = false;

    if (typeof event.preventDefault != "undefined")
    {
        event.preventDefault();
    }

    return true;
};




function getScrollingPosition()
{
  var position = [0, 0];

  if (typeof window.pageYOffset != 'undefined')
  {
    position = [
        window.pageXOffset,
        window.pageYOffset
    ];
  }

  else if (typeof document.documentElement.scrollTop != 'undefined'
      && document.documentElement.scrollTop > 0)
  {
    position = [
        document.documentElement.scrollLeft,
        document.documentElement.scrollTop
    ];
  }

  else if (typeof document.body.scrollTop != 'undefined')
  {
    position = [
        document.body.scrollLeft,
        document.body.scrollTop
    ];
  }

  return position;
}




function getPosition(theElement)
{
    var positionX = 0;
    var positionY = 0;

    while (theElement != null)
    {
        positionX += theElement.offsetLeft;
        positionY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }

    return [positionX, positionY];
};




function identifyBrowser()
{
    var agent = navigator.userAgent.toLowerCase();

    if (typeof navigator.vendor != "undefined" && navigator.vendor == "KDE" && typeof window.sidebar != "undefined")
    {
        return "kde";
    }
    else if (typeof window.opera != "undefined")
    {
      var version = parseFloat(agent.replace(/.*opera[\/ ]([^ $]+).*/, "$1"));

      if (version >= 7)
      {
        return "opera7";
      }
      else if (version >= 5)
      {
        return "opera5";
      }

      return false;
    }
    else if (typeof document.all != "undefined")
    {
        if (typeof document.getElementById != "undefined")
        {
          var browser = agent.replace(/.*ms(ie[\/ ][^ $]+).*/, "$1").replace(/ /, "");

      if (typeof document.uniqueID != "undefined")
      {
        if (browser.indexOf("5.5") != -1)
        {
          return browser.replace(/(.*5\.5).*/, "$1");
        }
        else
        {
          return browser.replace(/(.*)\..*/, "$1");
        }
      }
      else
      {
        return "ie5mac";
      }
        }

        return false;
    }
    else if (typeof document.getElementById != "undefined")
    {
        if (navigator.vendor.indexOf("Apple Computer, Inc.") != -1)
        {
            if (typeof window.XMLHttpRequest != "undefined")
            {
                return "safari1.2";
            }

            return "safari1";
        }
        else if (agent.indexOf("gecko") != -1)
        {
            return "mozilla";
        }
    }

    return false;
};




function identifyOS()
{
    var agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf("win") != -1)
    {
        return "win";
    }
    else if (agent.indexOf("mac"))
    {
        return "mac";
    }
    else
    {
        return "unix";
    }

    return false;
};