var date = new Date("June 3, 2010");
var cookieDate = date.toGMTString();

var cookieName = "login";
var cookieValue = "choc_chip";
var theCookie = cookieName + "=" + cookieValue;

theCookie += ";expires=" + cookieDate;
document.cookie = theCookie;

alert("document.cookie is: " + document.cookie);