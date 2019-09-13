addLoadListener(initSortableList);

function initSortableList()
{
  if (identifyBrowser().indexOf("ie") != -1 && identifyOS() == "mac")
  {
    return false;
  }
  
  var LIs = document.getElementById("footballLadder").getElementsByTagName("li");

  for (var i = 0; i < LIs.length; i++)
  {
    attachEventListener(LIs[i], "mousedown", mousedownSortableList, false);
    LIs[i].style.cursor = "move";
  }
}

function mousedownSortableList(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }
  
  if (typeof event.pageY == "undefined")
  {
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "li")
  {
    target = target.parentNode;
  }

  document.currentTarget = target;

  target.clickOriginY = event.pageY;

  attachEventListener(document, "mousemove", mousemoveCheckThreshold, false);
  attachEventListener(document, "mouseup", mouseupCancelThreshold, false);

  stopDefaultAction(event);

  return true;
}

function mousemoveCheckThreshold(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }
  
  if (typeof event.pageY == "undefined")
  {
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var target = document.currentTarget;

  if (Math.abs(target.clickOriginY - event.pageY) > 3)
  {
    if (typeof document.selection != "undefined")
    {
      var textRange = document.selection.createRange();
      textRange.collapse();
      textRange.select();
    }

    detachEventListener(document, "mousemove", mousemoveCheckThreshold, false);
    detachEventListener(document, "mouseup", mouseupCancelThreshold, false);

    attachEventListener(document, "mousemove", mousemoveSortableList, false);
    attachEventListener(document, "mouseup", mouseupSortableList, false);

    var cloneItem = target.cloneNode(true);
    cloneItem.setAttribute("class", "clone");
    cloneItem.style.position = "absolute";
    cloneItem.style.top = getPosition(target)[1] + "px";
    cloneItem.differenceY = parseInt(cloneItem.style.top) - event.pageY;

    cloneItem = target.parentNode.appendChild(cloneItem);

    target.clone = cloneItem;
    target.style.visibility = "hidden";
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

function mousemoveSortableList(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }
  
  if (typeof event.pageY == "undefined")
  {
    event.pageY = event.clientY + getScrollingPosition()[1];
  }

  var target = document.currentTarget;
  var clone = target.clone;
  var plannedCloneTop = event.pageY + clone.differenceY;
  var listItems = clone.parentNode.getElementsByTagName("li");
  var firstItemPosition = getPosition(listItems[0]);
  var lastItemPosition = getPosition(listItems[listItems.length - 2]);

  if (plannedCloneTop < firstItemPosition[1])
  {
    plannedCloneTop = firstItemPosition[1];
  }
  else if (plannedCloneTop > lastItemPosition[1])
  {
    plannedCloneTop = lastItemPosition[1];
  }

  clone.style.top = plannedCloneTop + "px";

  var LIs = target.parentNode.getElementsByTagName("li");
  var currentItemHigher = true;

  for (var i = 0; i < LIs.length; i++)
  {
    if (LIs[i] != target && LIs[i] != target.clone)
    {
      if (event.pageY < getPosition(LIs[i])[1] + LIs[i].offsetHeight && currentItemHigher)
      {
        target.parentNode.insertBefore(target, LIs[i]);

        break;
      }
      else if (event.pageY > getPosition(LIs[i])[1] && !currentItemHigher)
      {
        target.parentNode.insertBefore(LIs[i], target);
      }
    }
    else
    {
      currentItemHigher = false;
    }
  }

  stopDefaultAction(event);

  return true;
}

function mouseupSortableList()
{
  var target = document.currentTarget;
  var clone = target.clone;

  clone.parentNode.removeChild(clone);

  target.style.visibility = "visible";

  detachEventListener(document, "mousemove", mousemoveSortableList, false);
  detachEventListener(document, "mouseup", mouseupSortableList, false);

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

function stopDefaultAction(event)
{
  event.returnValue = false;

  if (typeof event.preventDefault != "undefined")
  {
    event.preventDefault();
  }

  return true;
}

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
}

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
}

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
}