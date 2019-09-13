addLoadListener(initRPC);

function initRPC()
{
  createIframeRPC();

  var newA = document.createElement("a");
  newA.setAttribute("href", "#");
  newA.appendChild(document.createTextNode("Get remote data"));
  newA.onclick = function()
  {
    executeIframeRPC("retrieve_data_iframe_query.html");

    return false;
  };

  document.getElementsByTagName("body")[0].appendChild(newA);

  return true;
}

function createIframeRPC()
{
  var body = document.getElementsByTagName("body")[0];
  var iframe = document.createElement("iframe");

  iframe.setAttribute("id", "iframeRPC");

  body.appendChild(iframe);

  if (typeof iframe.document != "undefined" && typeof iframe.contentDocument == "undefined" && typeof iframe.contentWindow == "undefined")
  {
    body.removeChild(iframe);

    var iframeHTML = '<iframe id="iframeRPC"></iframe>';

    body.innerHTML += iframeHTML;

    iframe = document.getElementById("iframeRPC");
    iframe.contentWindow = new Object();
    iframe.contentWindow.document = new Object();
    iframe.contentWindow.document.location = new Object();
    iframe.contentWindow.document.location.iframeRef = iframe;
    iframe.contentWindow.document.location.replace = locationReplaceIE5;
  }

  iframe.style.position = "absolute";
  iframe.style.left = "-1500em";
  iframe.style.top = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.setAttribute("tabIndex", "-1");

  return true;
}

function locationReplaceIE5(URL)
{
  this.iframeRef.setAttribute("src", URL);

  return true;
}

function executeIframeRPC(URL)
{
  var iframe = document.getElementById("iframeRPC");

  if (typeof iframe.contentDocument != "undefined")
  {
    iframeDocument = iframe.contentDocument;
  }
  else if (typeof iframe.contentWindow != "undefined")
  {
    iframeDocument = iframe.contentWindow.document;
  }
  else
  {
    return false;
  }

  iframeDocument.location.replace(URL);

  return true;
}

function handleRPCData(data)
{
  alert("The remote data was: " + data);

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