addLoadListener(init);

function init()
{
  var characterGroup = document.forms["characterForm"]["character"];

  for (var i = 0; i < characterGroup.length; i++)
  {
    if (characterGroup[i].checked == true)
    {
      alert("Your favorite character is " + characterGroup[i].value);
    }
  }

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