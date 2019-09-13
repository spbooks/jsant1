function domFunction(fn, dependencies)
{
  var counter = 0, collections = {}, timer = setInterval(function()
  {
    var ready = false;
    counter++;

    if (typeof document.getElementsByTagName != 'undefined'
        && (document.getElementsByTagName('body')[0] || document.body))
    {
      ready = true;

      if (typeof dependencies == 'object')
      {
        for (var i in dependencies)
        {
          if (dependencies[i] == 'id' && !document.getElementById(i))
          {
            ready = false;
            break;
          }
          else if (dependencies[i] == 'tag')
          {
            var len = document.getElementsByTagName(i).length;
            if (typeof collections[i] == 'undefined' || collections[i] != len || len < 1)
            {
              collections[i] = len;
              ready = false;
              break;
            }
          }
        }
      }
      if (ready)
      {
        clearInterval(timer);
        fn();
      }
    }

    if (counter >= 40)
    {
      clearInterval(timer);
    }

  }, 250);
}
