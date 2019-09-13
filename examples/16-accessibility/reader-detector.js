function readerDetector()
{
  var isreader = (typeof window.opera == 'undefined'
      && navigator.vendor != 'Apple Computer, Inc.');

  var test = document.getElementById('testlink');

  function keyupTest(e)
  {
    if (!e) { e = window.event; }
    if (e.keyCode == 9)
    {
      isreader = false;
    }
  }

  var moves = 0;
  function mousemoveTest()
  {
    if (isreader)
    {
      moves ++;
      if (moves > 2) { isreader = false; }
    }
  }

  attachEventListener(test, 'keyup', keyupTest, false);
  attachEventListener(test, 'mousemove', mousemoveTest, false);


  test.onclick = function()
  {
    alert(isreader
        ? 'Screen reader' + '  [isreader=' + isreader + ']'
        : 'Vanilla browser' + '  [isreader=' + isreader + ']');

    detachEventListener(test, 'keyup', keyupTest);
    detachEventListener(test, 'mousemove', mousemoveTest);

    return false;
  };
}

function attachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.addEventListener != 'undefined')
  {
    target.addEventListener(eventType, functionRef, capture);
  }
  else if (typeof target.attachEvent != 'undefined')
  {
    target.attachEvent('on' + eventType, functionRef);
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


function detachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.removeEventListener != 'undefined')
  {
    target.removeEventListener(eventType, functionRef, capture)
  }
  else if (typeof target.detachEvent != 'undefined')
  {
    target.detachEvent('on' + eventType, functionRef);
  }
  else
  {
    target['on' + eventType] = null;
  }

  return true;
}
