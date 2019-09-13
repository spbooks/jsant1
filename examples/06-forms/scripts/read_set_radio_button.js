addLoadListener(init);

function init()
{
  var characterGroup = document.forms["characterForm"]["character"];
  var currValue = characterGroup[0].value;
  var currChecked = characterGroup[0].checked;

  alert("Radio button 1 is checked: " + currChecked);

  return true;
};

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
};