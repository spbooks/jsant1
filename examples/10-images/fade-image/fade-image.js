var fps = 10;

function fade(img, time, dir)
{
  img = document.getElementById(img);
  var steps = time * fps;

  if (typeof img.style.opacity != 'undefined')
  {
    var otype = 'w3c';
  }
  else if (typeof img.style.MozOpacity != 'undefined')
  {
    otype = 'moz';
  }
  else if (typeof img.style.KhtmlOpacity != 'undefined')
  {
    otype = 'khtml';
  }
  else if (typeof img.filters == 'object')
  {
    otype = (img.filters.length > 0
        && typeof img.filters.alpha == 'object'
        && typeof img.filters.alpha.opacity == 'number')
        ? 'ie' : 'none';
  }
  else { otype = 'none'; }

  if (otype != 'none')
  {
    if (dir == 'out') { dofade(steps, img, 1, false, otype); }
    else { dofade(steps, img, 0, true, otype); }
  }
}

function dofade(steps, img, value, targetvisibility, otype)
{
  value += (targetvisibility ? 1 : -1) / steps;
  if (targetvisibility ? value > 1 : value < 0)
      value = targetvisibility ? 1 : 0;

  setfade(img, value, otype);

  if (targetvisibility ? value < 1 : value > 0)
  {
    setTimeout(function()
    {
      dofade(steps, img, value, targetvisibility, otype);
    }, 1000 / fps);
  }
}

function setfade(img, value, otype)
{
  switch(otype)
  {
    case 'ie':
      img.filters.alpha.opacity = value * 100;
      break;

    case 'khtml':
      img.style.KhtmlOpacity = value;
      break;

    case 'moz':
      img.style.MozOpacity = (value == 1 ? 0.9999999 : value);
      break;

    default:
      img.style.opacity = (value == 1 ? 0.9999999 : value);
  }
}

addLoadListener(function()
{
  fade('before', 5, 'out');
  fade('after', 5, 'in');
});

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
