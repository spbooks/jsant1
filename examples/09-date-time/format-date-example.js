var today = new Date();
var sentence = today.getDateString(
    '%day the %date%ordinal of %month %year');

alert(sentence);
