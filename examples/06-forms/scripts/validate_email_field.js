addLoadListener(init);

function init()
{
  var submit = document.getElementById("submit");
  submit.onclick = validate;

  return true;
}

function validate()
{
  var textField = document.getElementById("email");

  if (!/^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/.test(textField.value))
  {
    alert("That is not a valid e-mail address");
  }
  else
  {
    alert("The text field contains a valid e-mail address");
  }

  return false;
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