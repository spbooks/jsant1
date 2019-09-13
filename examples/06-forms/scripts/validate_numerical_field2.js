addLoadListener(init);

function init()
{
  var submit = document.getElementById("submit");
  submit.onclick = validate;

  return true;
}

function validate()
{
  var textField = document.getElementById("number");

  if (textField.value != parseFloat(textField.value, 10))
  {
    alert("The field value isn't numerical");
  }
  else
  {
    alert("The field value is numerical");
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