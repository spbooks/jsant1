addLoadListener(init);

function init()
{
  var submit = document.getElementById("submit");
  submit.onclick = validate;

  return true;
}

function validate()
{
  var characterGroup = document.forms["characterForm"]["character"];
  var characterSelected = false;

  for (var i = 0; i < characterGroup.length; i++)
  {
    if (characterGroup[i].checked == true)
    {
      characterSelected = true;
      break;
    }
  }

  if (!characterSelected)
  {
    alert("No radio buttons are selected");
  }
  else
  {
    alert("A radio button is selected");
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