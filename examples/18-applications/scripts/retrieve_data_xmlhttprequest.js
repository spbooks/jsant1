addLoadListener(initXMLHR);

function initXMLHR()
{
  var requester;
  try
  {
    requester = new XMLHttpRequest();
  }
  catch (error)
  {
    try
    {
      requester = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (error)
    {
      requester = null;
    }
  }

  if (requester != null)
  {
    requester.onreadystatechange = function()
    {
      if (requester.readyState == 4)
      {
        if (requester.status == 200 || requester.status == 304)
        {
          success(requester);
        }
        else
        {
          failure(requester);
        }
      }

      return true;
    };

    requester.open("GET", "query.php?name=Clark&email=superman@justiceleague.xmp");
    requester.send(null);
  }
  else
  {
    return false;
  }

  return true;
}

function success(requester)
{
  var users = requester.responseXML.getElementsByTagName("user");

  for (var i = 0; i < users.length; i++)
  {
    alert("User " + (i + 1) + " name: " + users[i].getElementsByTagName("name")[0].firstChild.nodeValue + "\nUser " + (i + 1) + " e-mail: " + users[i].getElementsByTagName("email")[0].firstChild.nodeValue);
  }

  return true;
}

function failure(requester)
{
  alert("The XMLHttpRequest failed with status code: " + requester.status);

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