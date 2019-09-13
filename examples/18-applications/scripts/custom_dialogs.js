addLoadListener(initDialog);

function initDialog()
{
  var permissions = document.getElementById("permissions");

  permissions.onclick = createDialog;

  return true;
}

function createDialog()
{
  try
  {
    var body = document.getElementsByTagName("body")[0];

    var dialog = document.createElement("div");
    dialog.className = "customDialog";
    dialog.style.visibility = "hidden";
    dialog.style.position = "absolute";

    var dialogTitle = document.createElement("h1");
    dialogTitle.appendChild(document.createTextNode("Change Security Permissions"));
    dialog.appendChild(dialogTitle);

    var dialogMessage = document.createElement("p");
    dialogMessage.appendChild(document.createTextNode("Do you wish to give Clayface access to the self destruct codes?"));
    dialog.appendChild(dialogMessage);

    var dialogButton1 = document.createElement("input");
    dialogButton1.setAttribute("type", "button");
    dialogButton1.setAttribute("value", "Yes");
    attachEventListener(dialogButton1, "click", dialogClick, false);
    dialog.appendChild(dialogButton1);

    var dialogButton2 = document.createElement("input");
    dialogButton2.setAttribute("type", "button");
    dialogButton2.setAttribute("value", "No");
    attachEventListener(dialogButton2, "click", dialogClick, false);
    dialog.appendChild(dialogButton2);

    var dialogButton3 = document.createElement("input");
    dialogButton3.setAttribute("type", "button");
    dialogButton3.setAttribute("value", "Cancel");
    attachEventListener(dialogButton3, "click", dialogClick, false);
    dialog.appendChild(dialogButton3);

    body.appendChild(dialog);

    var scrollingPosition = getScrollingPosition();
    var viewportSize = getViewportSize();

    dialog.style.left = scrollingPosition[0] + parseInt(viewportSize[0] / 2) - parseInt(dialog.offsetWidth / 2) + "px";
    dialog.style.top = scrollingPosition[1] + parseInt(viewportSize[1] / 2) - parseInt(dialog.offsetHeight / 2) + "px";
    dialog.style.visibility = "visible";

    dialogButton1.focus();
  }
  catch(error)
  {
    return true;
  }

  return false;
}

function dialogClick(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "input")
  {
    target = target.parentNode;
  }

  var value = target.getAttribute("value");

  if (value == "Cancel")
  {
    var dialog = target;

    while (dialog.className != "customDialog")
    {
      dialog = dialog.parentNode;
    }

    closeDialog(dialog);
  }
  else
  {
    window.location.href = "permissions.php?action=" + value;
  }

  return true;
}

function closeDialog(dialog)
{
  dialog.parentNode.removeChild(dialog);

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
}

function getEventTarget(event)
{
  var targetElement = null;

  if (typeof event.target != "undefined")
  {
    targetElement = event.target;
  }
  else
  {
    targetElement = event.srcElement;
  }

  while (targetElement.nodeType == 3 && targetElement.parentNode != null)
  {
    targetElement = targetElement.parentNode;
  }

  return targetElement;
}

function getScrollingPosition()
{
  var position = [0, 0];

  if (typeof window.pageYOffset != 'undefined')
  {
    position = [
        window.pageXOffset,
        window.pageYOffset
    ];
  }

  else if (typeof document.documentElement.scrollTop != 'undefined'
      && document.documentElement.scrollTop > 0)
  {
    position = [
        document.documentElement.scrollLeft,
        document.documentElement.scrollTop
    ];
  }

  else if (typeof document.body.scrollTop != 'undefined')
  {
    position = [
        document.body.scrollLeft,
        document.body.scrollTop
    ];
  }

  return position;
}

function getViewportSize()
{
  var size = [0,0];

  if (typeof window.innerWidth != 'undefined')
  {
    size = [
        window.innerWidth,
        window.innerHeight
    ];
  }
  else if (typeof document.documentElement != 'undefined'
      && typeof document.documentElement.clientWidth != 'undefined'
      && document.documentElement.clientWidth != 0)
  {
    size = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
    ];
  }
  else
  {
    size = [
        document.getElementsByTagName('body')[0].clientWidth,
        document.getElementsByTagName('body')[0].clientHeight
    ];
  }

  return size;
}