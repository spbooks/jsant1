
addLoadListener(initWYSIWYG);

function initWYSIWYG()
{
  if (typeof(document.designMode) == "string" && (document.all || document.designMode == "off"))
  {
    var textareas = getElementsByAttribute("class", "wysiwyg");

    for (var i = 0; i < textareas.length; i++)
    {
      convertWYSIWYG(textareas[i]);
    }
  }

  return true;
}

function convertWYSIWYG(textarea)
{
  var textareaID = textarea.getAttribute("id");
  var textareaName = textarea.getAttribute("name");
  var textareaValue = textarea.value;

  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("id", textareaID);
  input.setAttribute("name", textareaName);
  input.value = textareaValue;

  var iframe = document.createElement("iframe");
  iframe.className = "wysiwygIframe";
  textarea.parentNode.replaceChild(iframe, textarea);

  if (typeof iframe.document != "undefined" && typeof iframe.contentDocument == "undefined" && typeof iframe.contentWindow == "undefined")
  {
    iframe.parentNode.replaceChild(textarea, iframe);

    return false;
  }

  iframe.parentNode.insertBefore(input, iframe);

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write('<html><head><style type="text/css">@import "css/editable_elements_iframe.css";</style></head><body>' + input.value + '</body></html>');
  iframe.contentWindow.document.close();
  iframe.contentWindow.document.designMode = "on";

  var form  = iframe.parentNode;

  while (form != null && form.nodeName.toLowerCase() != "form")
  {
    form = form.parentNode;
  }

  if (form != null)
  {
    attachEventListener(form, "submit", function(){input.value = iframe.contentWindow.document.getElementsByTagName("body")[0].innerHTML;}, false);
  }

  var toolbar = document.createElement("div");
  toolbar.className = "wysiwygToolbar";
  iframe.parentNode.insertBefore(toolbar, iframe);

  var buttonBold = document.createElement("a");
  buttonBold.className = "wysiwygButtonBold";
  buttonBold.setAttribute("href", "#");
  buttonBold.appendChild(document.createTextNode("Bold"));
  buttonBold.command = "bold";
  buttonBold.iframe = iframe;
  buttonBold.onmousedown = mousedownToolbar;
  buttonBold.onclick = executeWYSIWYG;
  toolbar.appendChild(buttonBold);

  var buttonItalic = document.createElement("a");
  buttonItalic.className = "wysiwygButtonItalic";
  buttonItalic.setAttribute("href", "#");
  buttonItalic.appendChild(document.createTextNode("Italic"));
  buttonItalic.command = "italic";
  buttonItalic.iframe = iframe;
  buttonItalic.onmousedown = mousedownToolbar;
  buttonItalic.onclick = executeWYSIWYG;
  toolbar.appendChild(buttonItalic);

  var buttonSmile = document.createElement("a");
  buttonSmile.className = "wysiwygButtonSmile";
  buttonSmile.setAttribute("href", "#");
  buttonSmile.appendChild(document.createTextNode("Smile"));
  buttonSmile.emoticon = ":)";
  buttonSmile.iframe = iframe;
  buttonSmile.onmousedown = mousedownToolbar;
  buttonSmile.onclick = insertEmoticon;
  toolbar.appendChild(buttonSmile);

  return true;
}

function insertEmoticon()
{
  var iframeWindow = this.iframe.contentWindow;
  var iframeDocument = iframeWindow.document;
  var selection = null;
  var range = null;

  if (typeof iframeWindow.getSelection != "undefined")
  {
    selection = iframeWindow.getSelection();

    if (typeof selection.getRangeAt != "undefined")
    {
      range = selection.getRangeAt(0);
    }
    else if (typeof selection.baseNode != "undefined")
    {
      range = iframeDocument.createRange();
      range.setStart(selection.baseNode, selection.baseOffset);
      range.setEnd(selection.extentNode, selection.extentOffset);

      if (range.collapsed)
      {
        range.setStart(selection.extentNode, selection.extentOffset);
        range.setEnd(selection.baseNode, selection.baseOffset);
      }
    }

    var rangeCopy = range.cloneRange();
    var insertText = iframeDocument.createTextNode(this.emoticon);

    rangeCopy.collapse(true);
    range.deleteContents();
    rangeCopy.insertNode(insertText);

    selection.collapse(insertText, this.emoticon.length);
  }
  else if (typeof iframeDocument.selection != "undefined")
  {
    selection = iframeDocument.selection;
    range = selection.createRange();
    range.pasteHTML(this.emoticon);
  }
  else
  {
    return false;
  }

  iframeWindow.focus();

  return true;
}

function executeWYSIWYG(event)
{
  this.iframe.contentWindow.document.execCommand(this.command, false, null);
  this.iframe.contentWindow.focus();

  return false;
}

function mousedownToolbar()
{
  return false;
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