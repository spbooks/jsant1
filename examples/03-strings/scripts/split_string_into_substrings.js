var a = "Bytes and bits";
var b = a.substring(10, 13);

alert("String: " + a + "\nSubstring(10, 13): " + b);

var url = "http://www.sitepoint.com/javascript.htm#chapter_3";
var hash = url.indexOf("#");
var anchor = url.substring(hash + 1, url.length);

alert("URL: " + url + "\nAnchor substring: " + anchor);

var c = "Chico,Groucho,Gummo,Harpo,Zeppo";
var d = c.split(",");

alert("String: " + c + "\nSubstring 1: " + d[0] + "\nSubstring 2: " + d[1] + "\nSubstring 3: " + d[2] + "\nSubstring 4: " + d[3] + "\nSubstring 5: " + d[4]);