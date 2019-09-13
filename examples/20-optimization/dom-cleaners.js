if (typeof window.attachEvent != 'undefined')
{
  window.attachEvent('onunload', function()
  {
    var expandos = ['mouseover', 'click'];

    var elen = expandos.length;
    var dlen = document.all.length;

    for (var i = 0; i < dlen; i++)
    {
      for (var j = 0; j < elen; j++)
      {
        document.all[i]['on' + expandos[j]] = null;
      }
    }
  });
}

var listeners = [];
function attachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.addEventListener != 'undefined')
  {
    target.addEventListener(eventType, functionRef, capture);
  }
  else if (typeof target.attachEvent != 'undefined')
  {
    target.attachEvent('on' + eventType, functionRef);
    listeners[listeners.length] = [target, eventType, functionRef];
  }
  else
  {
    eventType = 'on' + eventType;

    if (typeof target[eventType] == 'function')
    {
      var oldListener = target[eventType];

      target[eventType] = function()
      {
        oldListener();

        return functionRef();
      }
    }
    else
    {
      target[eventType] = functionRef;
    }
  }

  return true;
}

if (typeof window.attachEvent != 'undefined')
{
  window.attachEvent('onunload', function()
  {
    var len = listeners.length;

    for (var i = 0; i < len; i++)
    {
      listeners[i][0].detachEvent('on' + listeners[i][1], listeners[i][2]);
    }
  });
}


