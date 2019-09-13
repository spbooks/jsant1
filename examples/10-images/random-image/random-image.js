addLoadListener(function()
{
  var people = [
      ['darth', 'Darth Vader'],
      ['palpatine', 'Emperor Palpatine'],
      ['boba', 'Boba Fett'],
      ['chewbacca', 'Chewbacca']
  ];

  var n = Math.floor(Math.random() * people.length);

  var img = document.getElementById('father');

  img.src = people[n][0] + '.gif';
  img.alt = people[n][1];
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

