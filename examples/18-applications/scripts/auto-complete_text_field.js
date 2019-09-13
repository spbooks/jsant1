var emailAddresses = [
    "greenarrow@justiceleague.xmp",
    "greenflame@justiceleague.xmp",
    "greenhornet@dccomics.xmp",
    "greenlantern@justiceleague.xmp",
    "magneto@example.net",
    "mistermiracle@justiceleague.xmp",
    "redronin@sitepoint.com",
    "redtornado@justiceleague.xmp"
];
var browserDetected = identifyBrowser();

addLoadListener(initAutoComplete);

function initAutoComplete()
{
  var email = document.getElementById("email");

  email.setAttribute("autocomplete", "off");
  attachEventListener(email, "keydown", keydownAutoComplete, false);
  attachEventListener(email, "blur", blurAutoComplete, false);

  return true;
}

function keydownAutoComplete(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  switch(event.keyCode)
  {
    case 9:     // tab
    case 13:    // enter
    case 16:    // shift
    case 17:    // ctrl
    case 18:    // alt
    case 20:    // caps lock
    case 27:    // esc
    case 33:    // page up
    case 34:    // page down
    case 35:    // end
    case 36:    // home
    case 37:    // left arrow
    case 39:    // right arrow
      break;

    case 38:    // up arrow

      var target = getEventTarget(event);
      var autoCompleteDropdown = document.getElementById("autoCompleteDropdown");

      if (autoCompleteDropdown != null)
      {
        var childLis = autoCompleteDropdown.childNodes;
        var selected = false;

        for (var i = 0; i < childLis.length; i++)
        {
          if (childLis[i].className == "hover")
          {
            selected = true;

            if (i > 0)
            {
              childLis[i].className = "";
              childLis[i - 1].className = "hover";

              target.value = childLis[i - 1].firstChild.nodeValue;
            }

            break;
          }
        }

        if (!selected)
        {
          childLis[0].className = "hover";

          target.value = childLis[0].firstChild.nodeValue;
        }
      }

      stopDefaultAction(event);

      break;

    case 40:    // down arrow
      var target = getEventTarget(event);
      var autoCompleteDropdown = document.getElementById("autoCompleteDropdown");

      if (autoCompleteDropdown != null)
      {
        var childLis = autoCompleteDropdown.childNodes;
        var selected = false;

        for (var i = 0; i < childLis.length; i++)
        {
          if (childLis[i].className == "hover")
          {
            selected = true;

            if (i < childLis.length - 1)
            {
              childLis[i].className = "";
              childLis[i + 1].className = "hover";

              target.value = childLis[i + 1].firstChild.nodeValue;
            }

            break;
          }
        }

        if (!selected)
        {
          childLis[0].className = "hover";

          target.value = childLis[0].firstChild.nodeValue;
        }
      }

      stopDefaultAction(event);

      break;

    case 8:     // backspace
    case 46:    // delete

      if (typeof autoCompleteTimer != "undefined")
      {
        clearTimeout(autoCompleteTimer);
      }

      autoCompleteTimer = setTimeout("generateDropdown(false)", 500);

      break;

    default:

      if (typeof autoCompleteTimer != "undefined")
      {
        clearTimeout(autoCompleteTimer);
      }

      var target = getEventTarget(event);
      var inputRanges = "false";

      if (typeof target.createTextRange != "undefined" || typeof target.setSelectionRange != "undefined")
      {
        inputRanges = "true";
      }

      autoCompleteTimer = setTimeout("generateDropdown(" + inputRanges + ")", 500);
  }

  return true;
}

function generateDropdown(doAutoComplete)
{
  closeDropdown();

  var input = document.getElementById("email");

  var newUl = document.createElement("ul");
  newUl.setAttribute("id", "autoCompleteDropdown");
  newUl.autoCompleteInput = input;
  newUl.style.position = "absolute";
  newUl.style.left = getPosition(input)[0] + "px";
  newUl.style.top = getPosition(input)[1] + input.offsetHeight - 2 + "px";
  newUl.style.width = input.offsetWidth - 3 + "px";


  for (var i = 0; i < emailAddresses.length; i++)
  {
    if (emailAddresses[i].indexOf(input.value) == 0)
    {
      var newLi = document.createElement("li");
      newLi.appendChild(document.createTextNode(emailAddresses[i]));

      if (browserDetected != "ie5mac")
      {
        attachEventListener(newLi, "mouseover", mouseoverDropdown, false);
        attachEventListener(newLi, "mouseout", mouseoutDropdown, false);
        attachEventListener(newLi, "mousedown", mousedownDropdown, false);
      }

      newUl.appendChild(newLi);
    }
  }

  if (newUl.firstChild != null)
  {
    document.getElementsByTagName("body")[0].appendChild(newUl);
  }

  if (typeof doAutoComplete != "undefined" && doAutoComplete)
  {
    autoComplete();
  }

  return true;
}

function autoComplete()
{
  var input = document.getElementById("email");
  var cursorMidway = false;

  if (typeof document.selection != "undefined")
  {
    var range = document.selection.createRange();

    if (range.move("character", 1) != 0)
    {
      cursorMidway = true;
    }

  }
  else if (typeof input.selectionStart != "undefined" && input.selectionStart < input.value.length)
  {
    cursorMidway = true;
  }

  var originalValue = input.value;
  var autoCompleteDropdown = document.getElementById("autoCompleteDropdown");

  if (autoCompleteDropdown != null && !cursorMidway)
  {
    autoCompleteDropdown.firstChild.className = "hover";
    input.value = autoCompleteDropdown.firstChild.firstChild.nodeValue;

    if (typeof input.createTextRange != "undefined")
    {
      var range = input.createTextRange();
      range.moveStart("character", originalValue.length);
      range.select();
    }
    else if (typeof input.setSelectionRange != "undefined")
    {
      input.setSelectionRange(originalValue.length, input.value.length);
    }

    if (autoCompleteDropdown.childNodes.length == 1)
    {
      setTimeout("closeDropdown();", 10);
    }
  }

  return true;
}

function mouseoverDropdown(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "li")
  {
    target = target.parentNode;
  }

  var childLis = target.parentNode.childNodes;

  for (var i = 0; i < childLis.length; i++)
  {
    childLis[i].className = "";
  }

  target.className = "hover";

  return true;
}

function mouseoutDropdown(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "li")
  {
    target = target.parentNode;
  }

  target.className = "";

  return true;
}

function mousedownDropdown(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "li")
  {
    target = target.parentNode;
  }

  target.parentNode.autoCompleteInput.value = target.firstChild.nodeValue;

  closeDropdown();

  return true;
}

function blurAutoComplete()
{
  if (typeof autoCompleteTimer != "undefined")
  {
    clearTimeout(autoCompleteTimer);
  }

  closeDropdown();

  return true;
}

function closeDropdown()
{
  var autoCompleteDropdown = document.getElementById("autoCompleteDropdown");

  if (autoCompleteDropdown != null)
  {
    autoCompleteDropdown.parentNode.removeChild(autoCompleteDropdown);
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