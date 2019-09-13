addLoadListener(init);

function init()
{
  if (typeof document.styleSheets != "undefined")
  {
    addStyleRule(document.styleSheets[0], "body", "background-color: #000000; color: #FFFFFF;");
  }
  
  return true;
}

function addStyleRule(styleSheet, selector, properties, index)
{
  if (typeof styleSheet.addRule != "undefined")
  {
    styleSheet.addRule(selector, properties, index);
  }
  else if (typeof styleSheet.insertRule != "undefined")
  {
    if (typeof index == "undefined")
    {
      index = styleSheet.cssRules.length;
    }

    styleSheet.insertRule(selector + " {" + properties + "}", index);
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