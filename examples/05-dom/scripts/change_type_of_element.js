addLoadListener(init);

function init()
{
  var div = document.createElement("div");
  var paragraph = document.getElementById("starLinks");

  for (var i = 0; i < paragraph.childNodes.length; i++)
  {
    var clone = paragraph.childNodes[i].cloneNode(true);

    div.appendChild(clone);
  }

  div.id = paragraph.getAttribute("id");
  div.className = paragraph.className;

  paragraph.parentNode.replaceChild(div, paragraph);

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