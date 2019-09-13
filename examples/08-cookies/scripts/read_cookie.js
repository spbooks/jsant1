document.cookie = "name=Cookie_Monster";

var monsterName = getCookie("name");

alert('The value of the cookie "name" is: ' + monsterName);

function getCookie(searchName)
{
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++)
  {
    var cookieCrumbs = cookies[i].split("=");
    var cookieName = cookieCrumbs[0];
    var cookieValue = cookieCrumbs[1];

    if (cookieName == searchName)
    {
      return cookieValue;
    }
  }
  return false;
}