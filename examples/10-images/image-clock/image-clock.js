var digits = [];
for (var i = 0; i < 10; i++)
{
  digits[i] = new Image;
  digits[i].src = 'digits/' + i + '.gif';
}

function displayTime()
{
  var now = new Date();
  var time = [];

  var hrs = now.getHours();
  hrs = (hrs < 10 ? '0' : '') + hrs;
  time[0] = hrs.charAt(0);
  time[1] = hrs.charAt(1);

  var mins = now.getMinutes();
  mins = (mins < 10 ? '0' : '') + mins;
  time[2] = mins.charAt(0);
  time[3] = mins.charAt(1);

  var secs = now.getSeconds();
  secs = (secs < 10 ? '0' : '') + secs;
  time[4] = secs.charAt(0);
  time[5] = secs.charAt(1);

  for (var i = 0; i < time.length; i++)
  {
    var digit = document.getElementById('d' + i);
    digit.src = digits[time[i]].src;
    digit.alt = time[i];
  }
}

addLoadListener(function()
{
  displayTime();
  window.setInterval('displayTime()', 1000);
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
