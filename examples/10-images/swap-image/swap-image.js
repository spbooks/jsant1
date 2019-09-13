addLoadListener(function()
{
  var img = document.getElementById('father');

  var newimg = new Image;

  newimg.onload = function()
  {
    img.src = newimg.src;
    img.width = newimg.width;
    img.height = newimg.height;
  }

  newimg.src = 'chewbacca.gif';
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
