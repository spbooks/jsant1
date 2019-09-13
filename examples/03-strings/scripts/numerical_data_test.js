var numericalString = "3.14159265";
var characterString = "3 point 1";
var pattern = /^-?\d+(\.\d+)?$/;

var a = pattern.test(numericalString);
var b = pattern.test(characterString);

alert("String 1: " + numericalString + "\nString 1 is numerical: " + a + "\nString 2: " + characterString + "\nString 2 is numerical: " + b);