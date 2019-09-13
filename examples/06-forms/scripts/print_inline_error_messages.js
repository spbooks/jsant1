addLoadListener(init);

function init()
{
  document.forms[0].onsubmit = validateFields;

  return true;
}

function validateFields()
{
  var firstName = document.forms["contactForm"]["firstName"];

  if (firstName.value == "")
  {
    var errorSpan = document.createElement("span");
    var errorMessage = document.createTextNode("Please enter a first name");

    errorSpan.appendChild(errorMessage);
    errorSpan.className = "errorMsg";

    var fieldLabel = firstName.previousSibling;

    while (fieldLabel.nodeName.toLowerCase() != "label")
    {
      fieldLabel = fieldLabel.previousSibling;
    }

    fieldLabel.appendChild(errorSpan);

    return false;
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