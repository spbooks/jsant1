var string = "Want to test a string? Use a regular expression!";
var pattern = /test.*regular/;

if (pattern.test(string))
{
  var result = "Matched";
}
else
{
  var result = "Not matched";
}

alert("String: " + string + "\nRegular expression: /test.*regular/\nTest: " + result);