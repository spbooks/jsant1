addLoadListener(init);

function init()
{
  document.forms[0].onsubmit = validateFields;

  return true;
}

function validateFields()
{
  var elements = document.forms["contactForm"].elements;
  var emailPattern = /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/;

  for (var i = 0; i < elements.length; i++)
  {
    if (/(^| )checkRequired( |$)/.test(elements[i].className) && elements[i].value == "")
    {
      elements[i].focus();
      alert("Please fill out this field.");
      return false;
    }

    if (/(^| )checkEmail( |$)/.test(elements[i].className) && !emailPattern.test(elements[i].value))
    {
      elements[i].focus();
      alert("Please fill in a valid e-mail address.");
      return false;
    }
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