addLoadListener(init);

function init()
{
  if (typeof document.styleSheets != "undefined")
  {
    var printStyleSheet = document.styleSheets[0];

    if (typeof printStyleSheet.removeRule != "undefined")
    {
      printStyleSheet.removeRule(0);
    }
    else if (typeof printStyleSheet.deleteRule != "undefined")
    {
      printStyleSheet.deleteRule(0);
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