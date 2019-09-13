addLoadListener(initSortableTables);

function initSortableTables()
{
  if (identifyBrowser() != "ie5mac")
  {
    var tables = getElementsByAttribute("class", "sortableTable");

    for (var i = 0; i < tables.length; i++)
    {
      var ths = tables[i].getElementsByTagName("th");

      for (var k = 0; k < ths.length; k++)
      {
        var newA = document.createElement("a");
        newA.setAttribute("href", "#");
        newA.setAttribute("title", "Sort by this column in descending order");

        for (var m = 0; m < ths[k].childNodes.length; m++)
        {
          newA.appendChild(ths[k].childNodes[m]);
        }

        ths[k].appendChild(newA);

        attachEventListener(newA, "click", sortColumn, false);
      }
    }
  }

  return true;
}

function sortColumn(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var targetA = getEventTarget(event);

  while (targetA.nodeName.toLowerCase() != "a")
  {
  targetA = targetA.parentNode;
  }

  var targetTh = targetA.parentNode;
  var targetTr = targetTh.parentNode;
  var targetTrChildren = targetTr.getElementsByTagName("th");
  var targetTable = targetTr.parentNode.parentNode;
  var targetTbody = targetTable.getElementsByTagName("tbody")[0];
  var targetTrs = targetTbody.getElementsByTagName("tr");
  var targetColumn = 0;

  for (var i = 0; i < targetTrChildren.length; i++)
  {
    targetTrChildren[i].className = targetTrChildren[i].className.replace(/(^| )sortedDescending( |$)/, "$1");
    targetTrChildren[i].className = targetTrChildren[i].className.replace(/(^| )sortedAscending( |$)/, "$1");

    if (targetTrChildren[i] == targetTh)
    {
      targetColumn = i;

      if (targetTrChildren[i].sortOrder == "descending" && targetTrChildren[i].clicked)
      {
        targetTrChildren[i].sortOrder = "ascending";
        targetTrChildren[i].className += " sortedAscending";
        targetA.setAttribute("title", "Sort by this column in descending order");
      }
      else
      {
        if (targetTrChildren[i].sortOrder == "ascending" && !targetTrChildren[i].clicked)
        {
          targetTrChildren[i].className += " sortedAscending";
        }

        else
        {
          targetTrChildren[i].sortOrder = "descending";
          targetTrChildren[i].className += " sortedDescending";
          targetA.setAttribute("title", "Sort by this column in ascending order");
        }
      }

      targetTrChildren[i].clicked = true;
    }
    else
    {
      targetTrChildren[i].clicked = false;

      if (targetTrChildren[i].sortOrder == "ascending")
      {
        targetTrChildren[i].firstChild.setAttribute("title", "Sort by this column in ascending order");
      }
      else
      {
        targetTrChildren[i].firstChild.setAttribute("title", "Sort by this column in descending order");
      }
    }
  }

  var newTbody = targetTbody.cloneNode(false);

  for (var i = 0; i < targetTrs.length; i++)
  {
    var newTrs = newTbody.childNodes;
    var targetValue = getInternalText(targetTrs[i].getElementsByTagName("td")[targetColumn]);

    for (var j = 0; j < newTrs.length; j++)
    {
      var newValue = getInternalText(newTrs[j].getElementsByTagName("td")[targetColumn]);

      if (targetValue == parseInt(targetValue, 10) && newValue == parseInt(newValue, 10))
      {
        targetValue = parseInt(targetValue, 10);
        newValue = parseInt(newValue, 10);
      }
      else if (targetValue == parseFloat(targetValue) && newValue == parseFloat(newValue))
      {
        targetValue = parseFloat(targetValue, 10);
        newValue = parseFloat(newValue, 10);
      }

      if (targetTrChildren[targetColumn].sortOrder == "descending")
      {
        if (targetValue >= newValue)
        {
          break;
        }
      }
      else
      {
        if (targetValue <= newValue)
        {
          break;
        }
      }
    }

    if (j >= newTrs.length)
    {
      newTbody.appendChild(targetTrs[i].cloneNode(true));
    }
    else
    {
      newTbody.insertBefore(targetTrs[i].cloneNode(true), newTrs[j]);
    }
  }

  targetTable.replaceChild(newTbody, targetTbody);

  stopDefaultAction(event);

  return false;
}

function getInternalText(target)
{
  var elementChildren = target.childNodes;
  var internalText = "";

  for (var i = 0; i < elementChildren.length; i++)
  {
    if (elementChildren[i].nodeType == 3)
    {
      if (!/^\s*$/.test(elementChildren[i].nodeValue))
      {
        internalText += elementChildren[i].nodeValue;
      }
    }
    else
    {
      internalText += getInternalText(elementChildren[i]);
    }
  }

  return internalText;
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