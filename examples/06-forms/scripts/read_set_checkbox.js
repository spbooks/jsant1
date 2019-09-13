addLoadListener(init);

function init()
{
  var checkbox1 = document.forms["characterForm"]["checkbox1"];
  var checkbox2 = document.forms["characterForm"]["checkbox2"];
  var checkedState1 = checkbox1.checked;
  var checkedState2 = checkbox2.checked;

  alert("Checkbox 1 is checked: " + checkedState1 + "\nCheckbox 2 is checked: " + checkedState2);

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