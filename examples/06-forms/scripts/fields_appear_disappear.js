addLoadListener(init);

function init()
{
  var optional = document.getElementById("optional");
  optional.className = "hidden";

  var readYes = document.getElementById("readYes");
  readYes.onclick = showOptional;

  var readNo = document.getElementById("readNo");
  readNo.onclick = hideOptional;

  return true;
}

function showOptional()
{
  var optional = document.getElementById("optional");
  optional.className = "";

  return true;
}

function hideOptional()
{
  var optional = document.getElementById("optional");
  optional.className = "hidden";

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