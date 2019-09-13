var cookieName = "login";
var cookieValue = "choc_chip";
var theCookie = cookieName + "=" + cookieValue;

theCookie += ";domain=.sitepoint.com";
theCookie += ";path=/";
document.cookie = theCookie;

alert("document.cookie is: " + document.cookie);