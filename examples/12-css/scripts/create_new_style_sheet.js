addLoadListener(initNewStyleSheet);

function initNewStyleSheet()
{
  var styleSheet = createNewStyleSheet();

  addHeadStyleRule(styleSheet, "body", "background-color: #000000; color: #FFFFFF;");

  return true;
}

function createNewStyleSheet(media)
{
  var isSafari = /safari/.test(identifyBrowser());

  var styleSheet = document.createElement("style");
  styleSheet.setAttribute("type", "text/css");

  if (typeof media == "undefined")
  {
    styleSheet.setAttribute("media", "all");
  }
  else
  {
    styleSheet.setAttribute("media", media);
  }

  styleSheet = document.getElementsByTagName("head")[0].appendChild(styleSheet);

  if (typeof document.styleSheets != "undefined" && document.styleSheets.length > 0 && !isSafari)
  {
    styleSheet = document.styleSheets[document.styleSheets.length - 1];
  }

  return styleSheet;
}

function addHeadStyleRule(styleSheet, selector, properties)
{
  var isSafari = /safari/.test(identifyBrowser());

  if (typeof styleSheet.addRule != "undefined" && !isSafari)
  {
    styleSheet.addRule(selector, properties);
  }
  else if (typeof styleSheet.insertRule != "undefined" && !isSafari)
  {
    styleSheet.insertRule(selector + " {" + properties + "}", styleSheet.cssRules.length);
  }
  else
  {
    styleSheet.appendChild(document.createTextNode(selector + " {" + properties + "}"));
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