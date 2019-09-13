// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function identifyOS()
{
  var agent = navigator.userAgent.toLowerCase();

  if (agent.indexOf("win") != -1)
  {
    return "win";
  }
  else if (agent.indexOf("mac") != -1)
  {
    return "mac";
  }
  else
  {
    return "unix";
  }

  return false;
}
