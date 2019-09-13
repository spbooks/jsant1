var branch;

function dropdownMenu(navid)
{
  var isie = typeof document.all != 'undefined'
     && typeof window.opera == 'undefined'
     && navigator.vendor != 'KDE';

  if (typeof document.getElementById == 'undefined'
      || (navigator.vendor == 'Apple Computer, Inc.'
      && typeof window.XMLHttpRequest == 'undefined')
      || (isie && typeof document.uniqueID == 'undefined'))
  {
    return;
  }

  var rollover = new Image;
  rollover.src = 'right-red.gif';
  rollover = new Image;
  rollover.src = 'down-red.gif';

  var tree = document.getElementById(navid);
  if (tree)
  {
    branch = tree;
    var items = tree.getElementsByTagName('li');
    for (var i = 0; i < items.length; i++)
    {
      dropdownTrigger(tree, items[i], navid, isie);
    }
  }
}

function dropdownTrigger(tree, li, navid, isie)
{
  var opentime, closetime;
  var a = li.getElementsByTagName('a')[0];
  var menu = li.getElementsByTagName('ul').length > 0
      ? li.getElementsByTagName('ul')[0] : null;
  var horiz = tree.className.indexOf('horizontal') != -1;
  var issub = li.parentNode.id == navid;

  if (menu)
  {
    li.className += (li.className == '' ? '' : ' ') + 'hasmenu';
  }

  attachEventListener(li, 'mouseover', function(e)
  {
    if (unwantedTextEvent()) { return; }
    clearTimeout(closetime);
    if (branch == li) { branch = null; }

    a.className += (a.className == '' ? '' : ' ') + 'rollover';

    var target = typeof e.target != 'undefined' ? e.target : window.event.srcElement;
    while (target.nodeName.toUpperCase() != 'LI')
    {
      target = target.parentNode;
    }
    if (target != li) { return; }

    if (menu)
    {
      opentime = window.setTimeout(function()
      {
        if (branch)
        {
          clearMenus(branch);
          branch = null;
        }

        menu.style.left = horiz
            ? (isie ? li.offsetLeft + 'px' : 'auto')
            : '0';

        menu.style.top = horiz && issub
            ? (isie ? a.offsetHeight + 'px' : 'auto')
            : (isie ? li.offsetTop + 'px' : '0');

        repositionMenu(menu);

        if (typeof document.uniqueID != 'undefined')
        {
          createIframeLayer(menu);
        }
      }, 250);
    }
  }, false);

  attachEventListener(li, 'mouseout', function(e)
  {
    if (unwantedTextEvent()) { return; }

    var related = typeof e.relatedTarget != 'undefined' ? e.relatedTarget : window.event.toElement;
    if (!li.contains(related))
    {
      clearTimeout(opentime);
      branch = li;

      a.className = a.className.replace(/ ?rollover/g, '');
      if (menu)
      {
        closetime = window.setTimeout(function()
        {
          menu.style.left = '-100em';

          if (toggleSelects('visible') && tree.contains(related))
          {
            toggleSelects('hidden');
          }
          else
          {
            removeIframeLayer(menu);
          }

        }, 600);
      }
    }
  }, false);

  if (!isie)
  {
    li.contains = function(node)
    {
      if (node == null) { return false; }
      if (node == this) { return true; }
      else { return this.contains(node.parentNode); }
    };
  }
}

function clearMenus(root)
{
  var menus = root.getElementsByTagName('ul');
  for (var i = 0; i < menus.length; i++)
  {
    menus[i].style.left = '-100em';
    removeIframeLayer(menus[i]);
  }
}

function unwantedTextEvent()
{
  return (navigator.vendor == 'Apple Computer, Inc.'
      && (event.target == event.relatedTarget.parentNode
      || (event.eventPhase == 3
      && event.target.parentNode == event.relatedTarget)));
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

function repositionMenu(menu)
{
  var extent = [
      getRoughPosition(menu, 'x') + menu.offsetWidth + 25,
      getRoughPosition(menu, 'y') + menu.offsetHeight + 25
  ];
  var viewsize = getViewportSize();

  if (extent[0] > viewsize[0])
  {
    var offset = menu.offsetWidth
        + menu.parentNode.parentNode.offsetWidth;
    var inset = menu.parentNode.offsetWidth
        - menu.offsetLeft;

    menu.style.left = (0 - offset + (inset * 2)) + 'px';
  }

  if (extent[1] > viewsize[1])
  {
    var current = parseInt(menu.style.top, 10);
    var difference = extent[1] - viewsize[1];

    menu.style.top = (current - difference) + 'px';
  }
}

function createIframeLayer(menu)
{
  if (!toggleSelects('hidden'))
  {
    var layer = document.createElement('iframe');
    layer.tabIndex = '-1';
    layer.src = 'javascript:false;';
    menu.parentNode.appendChild(layer);

    layer.style.left = menu.offsetLeft + 'px';
    layer.style.top = menu.offsetTop + 'px';
    layer.style.width = menu.offsetWidth + 'px';
    layer.style.height = menu.offsetHeight + 'px';
  }
}

function removeIframeLayer(menu)
{
  if (!toggleSelects('visible'))
  {
    var layers = menu.parentNode.getElementsByTagName('iframe');
    while (layers.length > 0)
    {
      layers[0].parentNode.removeChild(layers[0]);
    }
  }
}

function toggleSelects(vis)
{
  if (typeof document.uniqueID != 'undefined'
      && typeof document.body.style.scrollbarTrackColor == 'undefined')
  {
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++)
    {
      selects[i].style.visibility = vis;
    }

    return true;
  }

  return false;
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

addLoadListener(function() { dropdownMenu('navigation'); });
