var pattern = /closures/;
var string = "JavaScript programmers love closures";
var result = string.replace(pattern, "bananas");

alert("Original string: " + string + "\nString replaced using regular expression: " + result);


var pattern = /JavaScript (.*) closures/;
var string = "JavaScript programmers love closures";
var result = string.replace(pattern, "Visual Basic $1 debugging");

alert("Original string: " + string + "\nString replaced using regular expression: " + result);


function transformToLowercase(theString)
{
  return theString.toLowerCase();
}

var string = "Element names should be LOWERCASE.";
var pattern = /LOWERCASE/;
var result = string.replace(pattern, transformToLowercase);

alert("Original string: " + string + "\nString replaced using regular expression (callback function): " + result);