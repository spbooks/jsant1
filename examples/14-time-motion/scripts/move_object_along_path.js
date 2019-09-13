addLoadListener(initSoccerBall);

function initSoccerBall()
{
  document.getElementById("soccerBall").animationTimer = setInterval('moveObject(document.getElementById("soccerBall"), 500, 0, 25)', 50);
}

function moveObject(target, destinationLeft, destinationTop, maxSpeed)
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

  if (currentLeft < destinationLeft)
  {
    currentLeft += maxSpeed;

    if (currentLeft > destinationLeft)
    {
      currentLeft = destinationLeft;
    }
  }
  else
  {
    currentLeft -= maxSpeed;

    if (currentLeft < destinationLeft)
    {
      currentLeft = destinationLeft;
    }
  }

  if (currentTop < destinationTop)
  {
    currentTop += maxSpeed;

    if (currentTop > destinationTop)
    {
      currentTop = destinationTop;
    }
  }
  else
  {
    currentTop -= maxSpeed;

    if (currentTop < destinationTop)
    {
      currentTop = destinationTop;
    }
  }

  target.style.left = currentLeft + "px";
  target.style.top = currentTop + "px";

  if (currentLeft == destinationLeft && currentTop == destinationTop)
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