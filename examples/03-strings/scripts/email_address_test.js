var validEmail = "anakin36@tatooine.com";
var invalidEmail = "darth@thedeathstar";
var pattern = /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/;

var a = pattern.test(validEmail);
var b = pattern.test(invalidEmail);

alert("E-mail address 1: " + validEmail + "\nE-mail address 1 is valid: " + a + "\nE-mail address 2: " + invalidEmail + "\nE-mail address 2 is valid: " + b);