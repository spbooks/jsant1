addLoadListener(init);

function init()
{
  var anchorText = document.createTextNode("monoceros");

  var newAnchor = document.createElement("a");
  newAnchor.appendChild(anchorText);

  var existingAnchor = document.getElementById("sirius");
  var parent = existingAnchor.parentNode;
  var newChild = parent.replaceChild(newAnchor, existingAnchor);

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