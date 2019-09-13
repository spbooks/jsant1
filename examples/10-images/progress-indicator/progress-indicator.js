function progressBy(n)
{
  var prog = document.getElementById('progress');

  var current = parseInt(prog.firstChild.nodeValue, 10);
  current += n;
  if (current > 100) { current = 100; }

  prog.style.width = (current * 2) + 'px';
  prog.firstChild.nodeValue = current + '%';
}

function progressTo(n)
{
  var prog = document.getElementById('progress');

  prog.style.width = (n * 2) + 'px';
  prog.firstChild.nodeValue = n + '%';
}

addLoadListener(function()
{
  var photoNames = ['mountains', 'cliffs', 'moon'];
  var photoObjects = [];

  for (var i = 0; i < photoNames.length; i++)
  {
    photoObjects[i] = new Image();
    photoObjects[i].src = 'photos/' + photoNames[i] + '.jpg';

    photoObjects[i].onload = function()
    {
      progressBy(Math.ceil(100 / photoNames.length));
    };
  }
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
