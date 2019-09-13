addLoadListener(initTooltips);

function initTooltips()
{
  var keyflag = false;
  attachEventListener(document, 'keydown', function()
  {
    keyflag = true;
  }, false);
  attachEventListener(document, 'keyup', function()
  {
    keyflag = false;
  }, false);

  var eles = typeof document.all != 'undefined'
    ? document.all : document.getElementsByTagName('*');
  for (var i = 0; i < eles.length; i++)
  {
    if (eles[i].getAttribute('title'))
    {
      attachEventListener(eles[i], 'focus', createTooltip, false);
      attachEventListener(eles[i], 'blur', removeTooltip, false);
      attachEventListener(eles[i], 'mouseover', function()
      {
        if (!keyflag) { removeTooltip(); }
      }, false);
    }
  }
}

var timer, tooltip = null;

function createTooltip(e)
{
  var target = typeof e.target != 'undefined'
      ? e.target : e.srcElement;
  timer = window.setTimeout(function()
  {
    removeTooltip();

    if (!tooltip)
    {
      tooltip = document.createElement('div');
      tooltip.appendChild(document.createTextNode(target.title));
      tooltip.className = 'tooltip';
      document.getElementsByTagName('body')[0].appendChild(tooltip);

      if (tooltip.offsetWidth > 300)
      {
        tooltip.style.width = '300px';
      }

      var position = [
          (getRoughPosition(target, 'x')),
          (getRoughPosition(target, 'y') + target.offsetHeight + 5)
      ];

      tooltip.style.left = position[0] + 'px';
      tooltip.style.top = position[1] + 'px';

      var size = [
          tooltip.offsetWidth,
          tooltip.offsetHeight
      ];
      var viewport = getViewportSize();
      var scrolling = getScrollingPosition();

      if ((position[0] + size[0]) >= (viewport[0] + scrolling[0]))
      {
        position[0] -= (size[0] - target.offsetWidth);
        if (position[0] < 0) { position[0] = 0; }
        tooltip.style.left = position[0] + 'px';
      }
      if ((position[1] + size[1]) >= (viewport[1] + scrolling[1]))
      {
        position[1] -= (size[1] + target.offsetHeight + 10);
        if (position[1] < 0) { position[1] = 0; }
        tooltip.style.top = position[1] + 'px';
      }
    }
  }, 400);
}

function removeTooltip()
{
  if (tooltip)
  {
    tooltip.parentNode.removeChild(tooltip);
    tooltip = null;
  }
  clearTimeout(timer);
}

function getRoughPosition(ele, dir)
{
  var pos = dir == 'x' ? ele.offsetLeft : ele.offsetTop;
  var tmp = ele.offsetParent;
  while (tmp != null)
  {
    pos += dir == 'x' ? tmp.offsetLeft : tmp.offsetTop;
    tmp = tmp.offsetParent;
  }
  return pos;
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
