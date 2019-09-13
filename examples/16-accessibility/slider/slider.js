addLoadListener(initSliders);

function initSliders()
{
  var sliderReplacements = getElementsByAttribute("class", "slider");

  for (var i = 0; i < sliderReplacements.length; i++)
  {
    var container = document.createElement("div");
    var slider = document.createElement("button");
    slider.setAttribute("type", "button");

    container.className = "sliderContainer";
    slider.className = "sliderWidget";
    slider.style.left = sliderReplacements[i].getAttribute("value") + "px";
    slider.valueX = parseInt(sliderReplacements[i].getAttribute("value"), 10);
    sliderReplacements[i].className += " offleft";

    container.appendChild(slider);
    sliderReplacements[i].parentNode.insertBefore(container, sliderReplacements[i]);

    container.input = sliderReplacements[i];

    attachEventListener(slider, "mousedown", mousedownSlider, false);
    attachEventListener(slider, "focus", focusSlider, false);
    attachEventListener(slider, "blur", blurSlider, false);

    document.ismouse = false;
    attachEventListener(slider, "mouseover", mouseoverSlider, false);
    attachEventListener(slider, "mouseout", mouseoutSlider, false);
  }

  return true;
}

function incrementSlider(slider, sliderLeft, increment, event)
{
  if (sliderLeft < 0)
  {
    sliderLeft = 0;
  }
  else if (sliderLeft > (slider.parentNode.offsetWidth - slider.offsetWidth))
  {
    sliderLeft = slider.parentNode.offsetWidth - slider.offsetWidth;
  }
  else
  {
    slider.originX = typeof event != "undefined" ? event.clientX : 0;
  }

  slider.style.left = Math.round(sliderLeft / increment) * increment + "px";
  slider.parentNode.input.value = Math.round(sliderLeft / increment) * increment;
  slider.valueX = sliderLeft;
}

function mousedownSlider(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  document.currentSlider = target;
  target.originX = event.clientX;

  attachEventListener(document, "mousemove", mousemoveSlider, false);
  attachEventListener(document, "mouseup", mouseupSlider, false);

  return true;
}

function mousemoveSlider(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var slider = document.currentSlider;
  var sliderLeft = slider.valueX;
  var increment = 1;

  if (isNaN(sliderLeft))
  {
    sliderLeft = 0;
  }

  sliderLeft += event.clientX - slider.originX;

  incrementSlider(slider, sliderLeft, increment, event);

  stopDefaultAction(event);

  return true;
}

function mouseupSlider(event)
{
  detachEventListener(document, "mousemove", mousemoveSlider, false);
  detachEventListener(document, "mouseup", mouseupSlider, false);

  return true;
}

function focusSlider(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }
  var target = getEventTarget(event);

  target.className += " sliderFocus";

  if (document.ismouse) { return false; }

  document.currentSlider = target;
  target.originX = 0;

  target.pressed = false;
  target.repeatRate = 400;
  target.currentRate = target.repeatRate;

  attachEventListener(document, "keydown", keydownSlider, false);
  attachEventListener(document, "keyup", keyupSlider, false);

  return true;
}

function blurSlider(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }
  var target = getEventTarget(event);

  target.className = target.className.replace(" sliderFocus", "");

  detachEventListener(document, "keydown", keydownSlider, false);

  return true;
}

function keydownSlider(event, repeatKey)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var slider = document.currentSlider;
  var sliderLeft = slider.valueX;
  var increment = 1;

  if (isNaN(sliderLeft))
  {
    sliderLeft = 0;
  }

  if (slider.pressed && event != null) { return false; }
  else { slider.pressed = true; }

  if (event != null)
  {
    repeatKey = event.keyCode;
  }
  else if (slider.currentRate == slider.repeatRate)
  {
    slider.currentRate = slider.repeatRate / 20;
  }
  else
  {
    increment = 3;
  }

  sliderLeft += repeatKey == 39 ? increment
      : repeatKey == 37 ? 0 - increment
      : 0;

  incrementSlider(slider, sliderLeft, increment);

  slider.repeater = setTimeout(function()
  {
    keydownSlider(null, repeatKey);

  }, slider.currentRate);

  return true;
}

function keyupSlider(event)
{
  var slider = document.currentSlider;

  clearTimeout(slider.repeater);
  slider.currentRate = slider.repeatRate;
  slider.pressed = false;
}

function mouseoverSlider()
{
  document.ismouse = true;
}

function mouseoutSlider()
{
  document.ismouse = false;
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

function detachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.removeEventListener != "undefined")
  {
    target.removeEventListener(eventType, functionRef, capture)
  }
  else if (typeof target.detachEvent != "undefined")
  {
    target.detachEvent("on" + eventType, functionRef);
  }
  else
  {
    target["on" + eventType] = null;
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

function stopDefaultAction(event)
{
  event.returnValue = false;

  if (typeof event.preventDefault != "undefined")
  {
    event.preventDefault();
  }

  return true;
}

function getElementsByAttribute(attribute, attributeValue)
{
  var elementArray = new Array();
  var matchedArray = new Array();

  if (document.all)
  {
    elementArray = document.all;
  }
  else
  {
    elementArray = document.getElementsByTagName("*");
  }

  for (var i = 0; i < elementArray.length; i++)
  {
    if (attribute == "class")
    {
      var pattern = new RegExp("(^| )" + attributeValue + "( |$)");

      if (elementArray[i].className.match(pattern))
      {
        matchedArray[matchedArray.length] = elementArray[i];
      }
    }
    else if (attribute == "for")
    {
      if (elementArray[i].getAttribute("htmlFor") || elementArray[i].getAttribute("for"))
      {
        if (elementArray[i].htmlFor == attributeValue)
        {
          matchedArray[matchedArray.length] = elementArray[i];
        }
      }
    }
    else if (elementArray[i].getAttribute(attribute) == attributeValue)
    {
      matchedArray[matchedArray.length] = elementArray[i];
    }
  }

  return matchedArray;
}
