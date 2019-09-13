// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function identifyBrowser() {
  var agent = navigator.userAgent.toLowerCase();

  if (typeof navigator.vendor != "undefined" && navigator.vendor == "KDE" &&
      typeof window.sidebar != "undefined")
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
