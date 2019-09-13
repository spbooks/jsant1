document.onclick = function(e)
{
  var target = e ? e.target : window.event.srcElement;

  while (target && !/^(a|body)$/i.test(target.nodeName))
  {
    target = target.parentNode;
  }

  if (target && target.getAttribute('rel')
      && target.rel == 'external')
  {
    var external = window.open(target.href);

    return external.closed;
  }
}
