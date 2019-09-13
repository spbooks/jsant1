stylesheetCookie = getCookie("stylesheet");

if (stylesheetCookie != "")
{
  switchStyleSheet(stylesheetCookie);
}

addLoadListener(initStyleSwitcher);
addLoadListener(checkStyleSheet);

function initStyleSwitcher()
{
  if (identifyBrowser() != "ie5mac")
  {
    var links = document.getElementsByTagName("link");
    var newSelect = document.createElement("select");
    var defaultOption = document.createElement("option");

    defaultOption.setAttribute("value", "");
    defaultOption.appendChild(document.createTextNode("Select an alternate style sheet"));
    newSelect.appendChild(defaultOption);

    for (var i = 0; i < links.length; i++)
    {
      var rel = links[i].getAttribute("rel");
      var linkTitle = links[i].getAttribute("title");
      var linkMedia = links[i].getAttribute("media");

      if (rel.match(/(^| )stylesheet( |$)/) && linkTitle != null && linkTitle != (""))
      {
        var newOption = document.createElement("option");
        newOption.setAttribute("value", linkTitle + "," + linkMedia);
        newOption.appendChild(document.createTextNode(linkTitle + " (" + linkMedia + ")"));
        newSelect.appendChild(newOption);
      }
    }

    newSelect.onchange = function()
    {
      switchStyleSheet(this.value.replace(/(.*),.*/, "$1"), this.value.replace(/.*,(.*)/, "$1"));
      return true;
    };

    document.getElementsByTagName("body")[0].appendChild(newSelect);

    return true;
  }

  return false;
}

function checkStyleSheet()
{
  if (typeof document.styleSheetLinks == "undefined")
  {
    document.styleSheetLinks = [];

    var links = document.getElementsByTagName("link");

    for (var i = 0; i < links.length; i++)
    {
      var rel = links[i].getAttribute("rel");
      var linkTitle = links[i].getAttribute("title");

      if (rel.match(/(^| )stylesheet( |$)/) && linkTitle != null && linkTitle != "")
      {
        document.styleSheetLinks[document.styleSheetLinks.length] = links[i];
      }
    }
  }

  for (var i = 0; i < document.styleSheetLinks.length; i++)
  {
    if (document.styleSheetLinks[i].disabled == false)
    {
      document.cookie = "stylesheet=" + document.styleSheetLinks[i].getAttribute("title");
      break;
    }
  }

  setTimeout("checkStyleSheet()", 2000);
}

function switchStyleSheet(title, media)
{
  if (typeof media == "undefined" || media == "")
  {
    media = ".*";
  }

  var mediaPattern = new RegExp("(^|,)\s*" + media + "(\s*,|$)");

  var links = document.getElementsByTagName("link");

  for (var i = 0; i < links.length; i++)
  {
    var rel = links[i].getAttribute("rel");
    var linkTitle = links[i].getAttribute("title");

    if (/(^| )stylesheet( |$)/.test(rel) && linkTitle != null && linkTitle != "")
    {
      var styleMedia = links[i].getAttribute("media");
      if (styleMedia == null || styleMedia == ""
          || styleMedia == "all"
          || mediaPattern.test(styleMedia))
      {
        links[i].disabled = true;
        links[i].rel = "alternate stylesheet";

        if (linkTitle == title)
        {
          links[i].disabled = false;
          links[i].rel = "stylesheet";
        }
      }
    }
  }

  document.cookie = "stylesheet=" + title;
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

function getCookie(searchName)
{
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++)
  {
    var cookieCrumbs = cookies[i].split("=");
    var cookieName = cookieCrumbs[0];
    var cookieValue = cookieCrumbs[1];

    if (cookieName == searchName)
    {
      return cookieValue;
    }
  }

  return false;
}