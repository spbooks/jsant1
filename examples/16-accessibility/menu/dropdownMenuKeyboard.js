var branch;

function dropdownMenu(navid)
{
  var isopera = typeof window.opera != 'undefined';
  var isie = typeof document.all != 'undefined'
      && !isopera && navigator.vendor != 'KDE';
  var issafari = navigator.vendor == 'Apple Computer, Inc.';

  if (typeof document.getElementById == 'undefined'
      || (issafari && typeof window.XMLHttpRequest == 'undefined')
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
    var horiz = tree.className.indexOf('horizontal') != -1;
    branch = tree;
    var items = tree.getElementsByTagName('li');
    for (var i = 0; i < items.length; i++)
    {
      dropdownTrigger(tree, items[i], navid, isie, horiz);
    }

    if (!isopera)
    {
      cleanUselessWhitespace(tree);

      var keyevent = issafari || isie ? 'keydown' : 'keypress';
      attachEventListener(document, keyevent, function(e)
      {
        var target = typeof e.target != 'undefined'
            ? e.target : e.srcElement;
        if (tree.contains(target) && target.getAttribute('href'))
        {
          if (/^(37|38|39|40)$/.test(e.keyCode.toString()))
          {
            arrowKeyNavigation(tree, target, e.keyCode, horiz);

            if (typeof e.preventDefault != 'undefined')
            {
              e.preventDefault();
            }
            return false;
          }
        }
        return true;

      }, false);
    }

    var eles = typeof document.all != 'undefined'
        ? document.all : document.getElementsByTagName('*');
    for (i = 0; i < eles.length; i++)
    {
      attachEventListener(eles[i], 'focus', function(e)
      {
        var target = typeof e.target != 'undefined'
            ? e.target : e.srcElement;
        if (!tree.contains(target))
        {
          resetSiblingBranches(items[0]);
        }
      }, false);
    }

    if (!isie)
    {
      tree.contains = function(node)
      {
        if (node == null) { return false; }
        if (node == this) { return true; }
        else { return this.contains(node.parentNode); }
      };
    }
  }
}

function dropdownTrigger(tree, li, navid, isie, horiz)
{
  var opentime, closetime;
  var a = li.getElementsByTagName('a')[0];
  var menu = li.getElementsByTagName('ul').length > 0
      ? li.getElementsByTagName('ul')[0] : null;
  var issub = li.parentNode.id == navid;

  if (menu)
  {
    li.className += (li.className == '' ? '' : ' ') + 'hasmenu';
  }

  attachEventListener(a, 'focus', function(e)
  {
    clearTimeout(closetime);

    a.className += (a.className == '' ? '' : ' ') + 'rollover';

    resetSiblingBranches(li);
    if (menu)
    {
      showMenu(menu, horiz, issub, li, a, isie);
    }

    var parent = li.parentNode;
    if (parent != tree)
    {
      if (parent.style.left == '' || parent.style.left == '-100em')
      {
        showAncestors(tree, parent, horiz, issub, isie);
      }

      if (toggleSelects('visible') && tree.contains(e.srcElement))
      {
        toggleSelects('hidden');
      }
    }
  }, false);

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

        resetSiblingBranches(li);
        showMenu(menu, horiz, issub, li, a, isie);
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

function showMenu(menu, horiz, issub, li, a, isie)
{
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
}

function showAncestors(tree, menu, horiz, issub, isie)
{
  clearMenus(tree);

  while (menu.id != tree.id)
  {
    var li = menu.parentNode;
    var a = li.getElementsByTagName('a')[0];

    showMenu(menu, horiz, issub, li, a, isie);

    menu = li.parentNode;
  }
}

function resetSiblingBranches(trigger)
{
  clearMenus(trigger.parentNode);

  var links = trigger.parentNode.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++)
  {
    links[i].className = links[i].className.replace(/ ?rollover/g, '');
  }
}

function cleanUselessWhitespace(node)
{
  for (var x = 0; x < node.childNodes.length; x++)
  {
    var child = node.childNodes[x];
    if (child.nodeType == 3 && !/\S/.test(child.nodeValue))
    {
      node.removeChild(node.childNodes[x]);
      x--;
    }
    if (child.nodeType == 1)
    {
      cleanUselessWhitespace(child);
    }
  }
}

function mapKeyCode(keycode, type)
{
  switch (type)
  {
    case 0:
      if (keycode == 37) keycode = 39;
      else if (keycode == 39) keycode = 37;
      break;

    case 1:
      if (keycode % 2) keycode++;
      else keycode--;
      break;

    case 2:
      if (keycode == 38) { keycode = 37; }
      break;
  }

  return keycode;
}

function arrowKeyNavigation(tree, link, keycode, horiz)
{
  var li = link.parentNode;
  var menu = li.getElementsByTagName('ul').length > 0
      ? li.getElementsByTagName('ul')[0] : null;
  var parent = li.parentNode;

  if (menu)
  {
    if (getRoughPosition(menu, 'x')
        < getRoughPosition(li.parentNode, 'x'))
    {
      keycode = mapKeyCode(keycode, 0);
    }
  }
  else if (parent != tree)
  {
    if (getRoughPosition(parent.parentNode.parentNode, 'x')
        > getRoughPosition(parent, 'x'))
    {
      keycode = mapKeyCode(keycode, 0);
    }
  }

  if (horiz)
  {
    if (parent == tree)
    {
      keycode = mapKeyCode(keycode, 1);
    }
    else if (parent.parentNode.parentNode == tree
        && li == li.parentNode.firstChild)
    {
      keycode = mapKeyCode(keycode, 2);
    }
  }

  switch (keycode)
  {
    case 37:
      parent = parent.parentNode;
      if (tree.parentNode == parent) { parent = null; }
      if (parent)
      {
        parent.firstChild.focus();
      }
      break;

    case 38:
      var previous = li.previousSibling;
      if (!previous)
      {
        previous = li.parentNode.childNodes
            [li.parentNode.childNodes.length - 1];
      }
      previous.firstChild.focus();
      break;

    case 39:
      if (menu)
      {
        menu.firstChild.firstChild.focus();
      }
      break;

    case 40:
      var next = li.nextSibling;
      if (!next)
      {
        next = li.parentNode.childNodes[0];
      }
      next.firstChild.focus();
      break;
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
