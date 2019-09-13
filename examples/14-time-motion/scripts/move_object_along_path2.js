addLoadListener(initSoccerBall);

function initSoccerBall()
{
  document.getElementById("soccerBall").animationTimer = setInterval('moveObjectDecelerate(document.getElementById("soccerBall"), 500, 0, 25)', 50);
}

function moveObjectDecelerate(target, destinationLeft, destinationTop, maxSpeed)
{
  var currentLeft = parseInt(retrieveComputedStyle(target, "left"));
  var currentTop = parseInt(retrieveComputedStyle(target, "top"));

  if (isNaN(currentLeft))
  {
    currentLeft = 0;
  }

  if (isNaN(currentTop))
  {
    currentTop = 0;
  }

  if (typeof target.floatingPointLeft == "undefined")
  {
    target.floatingPointLeft = currentLeft;
    target.floatingPointTop = currentTop;
  }

  var decelerateLeft = 1 + Math.abs(destinationLeft - target.floatingPointLeft) / 10;
  var decelerateTop = 1 + Math.abs(destinationTop - target.floatingPointTop) / 10;

  if (decelerateLeft > maxSpeed)
  {
    decelerateLeft = maxSpeed;
  }

  if (decelerateTop > maxSpeed)
  {
    decelerateTop = maxSpeed;
  }

  if (target.floatingPointLeft < destinationLeft)
  {
    target.floatingPointLeft += decelerateLeft;

    if (target.floatingPointLeft > destinationLeft)
    {
      target.floatingPointLeft = destinationLeft;
    }
  }
  else
  {
    target.floatingPointLeft -= decelerateLeft;

    if (target.floatingPointLeft < destinationLeft)
    {
      target.floatingPointLeft = destinationLeft;
    }
  }

  if (target.floatingPointTop < destinationTop)
  {
    target.floatingPointTop += decelerateTop;

    if (target.floatingPointTop > destinationTop)
    {
      target.floatingPointTop = destinationTop;
    }
  }
  else
  {
    target.floatingPointTop -= decelerateTop;

    if (target.floatingPointTop < destinationTop)
    {
      target.floatingPointTop = destinationTop;
    }
  }

  target.style.left = parseInt(target.floatingPointLeft) + "px";
  target.style.top = parseInt(target.floatingPointTop) + "px";

  if (target.floatingPointLeft == destinationLeft && target.floatingPointTop == destinationTop)
  {
    clearInterval(target.animationTimer);
  }
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

function retrieveComputedStyle(element, styleProperty)
{
  var computedStyle = null;

  if (typeof element.currentStyle != "undefined")
  {
    computedStyle = element.currentStyle;
  }
  else
  {
    computedStyle = document.defaultView.getComputedStyle(element, null);
  }

  return computedStyle[styleProperty];
}