addLoadListener(init);

function init()
{
  if (typeof document.styleSheets != "undefined")
  {
    var printStyleSheet = document.styleSheets[1];
    var printRules = null;

    if (typeof printStyleSheet.rules != "undefined")
    {
      printRules = printStyleSheet.rules;
    }
    else
    {
      printRules = printStyleSheet.cssRules;
    }

    for (var i = 0; i < printRules.length; i++)
    {
      if (printRules[i].selectorText.toLowerCase() == "a")
      {
        printRules[i].style.textDecoration = "overline";

        break;
      }
    }
  }
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