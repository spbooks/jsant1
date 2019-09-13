var telephoneString = "(03) 9555 5555";
var emailString = "bill@microsoft.com";
var pattern = /^(\(\d+\) ?)?(\d+[\- ])*\d+$/;

var a = pattern.test(telephoneString);
var b = pattern.test(emailString);

alert("Phone number 1: " + telephoneString + "\nPhone number 1 is valid: " + a + "\nPhone number 2: " + emailString + "\nPhone number 2 is valid: " + b);