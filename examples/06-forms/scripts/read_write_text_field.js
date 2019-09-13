addLoadListener(init);

function init()
{
  var formByIndex = document.forms[0];
  var formById = document.forms["contactForm"];

  var firstNameElement = document.forms["contactForm"].elements[0];
  var lastNameElement = document.forms["contactForm"].elements["lastName"];

  var contactForm = document.forms["contactForm"];
  var oldValue = contactForm["firstName"].value;
  contactForm["firstName"].value = "Zaphod";

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