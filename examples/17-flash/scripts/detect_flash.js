var flashInfo = getFlashVersion();

alert("This browser has Flash version: " + flashInfo["major"] + "." + flashInfo["build"]);

function getFlashVersion()
{
  var flashVersion = new Array();

  flashVersion["major"] = 0;
  flashVersion["build"] = 0;

  if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object")
  {
    var description = navigator.plugins["Shockwave Flash"].description;

    if (description != null)
    {
      var versionString = description.replace(/^.*\s+(\S+\s+\S+$)/, "$1");

      flashVersion["major"] = parseInt(versionString.replace(/^(.*)\..*$/, "$1"));
      flashVersion["build"] = parseInt(versionString.replace(/^.*r(.*)$/, "$1"));
    }
  }
  else if (typeof window.ActiveXObject != "undefined")
  {
    try
    {
      var flashObject = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      var description = flashObject.GetVariable("$version");

      if (description != null)
      {
        var versionNumbers = description.replace(/^\S+\s+(.*)$/, "$1").split(",");

        flashVersion["major"] = parseInt(versionNumbers[0]);
        flashVersion["build"] = parseInt(versionNumbers[2]);
      }
    }
    catch(error)
    {
    }
  }

  return flashVersion;
}