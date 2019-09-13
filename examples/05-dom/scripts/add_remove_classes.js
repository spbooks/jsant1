addLoadListener(init);

function init()
{
  var sirius = document.getElementById("sirius");
  var aldebaran = document.getElementById("aldebaran");

  addClass(sirius, "important");
  removeClass(aldebaran, "starLink");

  return true;
}

function addClass(target, classValue)
{
  var pattern = new RegExp("(^| )" + classValue + "( |$)");

  if (!pattern.test(target.className))
  {
    if (target.className == "")
    {
      target.className = classValue;
    }
    else
    {
      target.className += " " + classValue;
    }
  }

  return true;
}

function removeClass(target, classValue)
{
  var removedClass = target.className;
  var pattern = new RegExp("(^| )" + classValue + "( |$)");

  removedClass = removedClass.replace(pattern, "$1");
  removedClass = removedClass.replace(/ $/, "");

  target.className = removedClass;

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