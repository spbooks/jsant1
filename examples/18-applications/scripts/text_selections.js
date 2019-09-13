addLoadListener(initSelections);

function initSelections()
{
  attachEventListener(document, "mouseup", function(){alert(retrieveSelection())}, false);

  return true;
}

function retrieveSelection()
{
  var selectedText = "";

  if (typeof window.getSelection != "undefined")
  {
    selectedText = window.getSelection();
  }
  else if (typeof document.getSelection != "undefined")
  {
    selectedText = document.getSelection();
  }
  else if (typeof document.selection != "undefined")
  {
    selectedText = document.selection.createRange().text;
  }

  return selectedText;
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
};




function attachEventListener(target, eventType, functionRef, capture)
{
    if (typeof target.addEventListener != "undefined")
    {
        target.addEventListener(eventType, functionRef, capture);
    }
    else if (typeof target.attachEvent != "undefined")
    {
        target.attachEvent("on" + eventType, functionRef);
    }
    else
    {
        eventType = "on" + eventType;

        if (typeof target[eventType] == "function")
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
};