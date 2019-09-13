addLoadListener(initNewsTicker);

function initNewsTicker()
{
  var newsScroller = document.getElementById("newsScroller");

  newsScroller.style.left = 0;

  if (retrieveComputedStyle(newsScroller, "position") == "relative")
  {
    var relativeWidth = newsScroller.offsetWidth;

    newsScroller.style.position = "absolute";
    newsScroller.calculatedWidth = newsScroller.offsetWidth;

    if (relativeWidth > newsScroller.calculatedWidth)
    {
      newsScroller.calculatedWidth = relativeWidth;
    }

    newsScroller.style.position = "relative";
  }
  else
  {
    newsScroller.calculatedWidth = newsScroller.clientWidth;
  }

  var stopLink = document.createElement("a");
  stopLink.setAttribute("id", "");
  stopLink.id = "stopLink";
  stopLink.setAttribute("href", "");
  stopLink.href = "#";
  stopLink.appendChild(document.createTextNode("Stop/start news ticker"));
  attachEventListener(stopLink, "click", clickStopLink, false);

  var stopButton = document.createElement("div");

  stopButton.appendChild(stopLink);

  var newsTicker = document.getElementById("newsTicker");

  if (newsTicker.nextSibling != null)
  {
    newsTicker.parentNode.insertBefore(stopButton, newsTicker.nextSibling);
  }
  else
  {
    newsTicker.parentNode.appendChild(stopButton);
  }

  moveNewsScroller();

  return true;
}

function moveNewsScroller()
{
  var increment = 5;
  var newsScroller = document.getElementById("newsScroller");
  var currLeft = parseInt(newsScroller.style.left);

  if (currLeft < newsScroller.calculatedWidth * -1)
  {
    newsScroller.style.left = newsScroller.parentNode.offsetWidth + "px";
  }
  else
  {
    newsScroller.style.left = (parseInt(newsScroller.style.left) - increment) + "px";
  }

  newsScroller.timeout = setTimeout("moveNewsScroller()", 50);

  return true;
}

function clickStopLink()
{
  var stopLink = document.getElementById("stopLink");

  if (typeof stopLink.stopped != "undefined" && stopLink.stopped)
  {
    moveNewsScroller();
    stopLink.stopped = false;
  }
  else
  {
    clearTimeout(document.getElementById("newsScroller").timeout);
    stopLink.stopped = true;
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