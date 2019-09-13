addLoadListener(init);

function init()
{
  document.forms[0].onsubmit = validateFields;

  return true;
}

function validateFields()
{
  var firstName = document.forms[0].elements["firstName"];

  if (firstName.value != "")
  {
    /* Continue with submission */
    return true;
  }
  else
  {
    alert("Please fill in your first name");

    /* Abort submission */
    return false;
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
};