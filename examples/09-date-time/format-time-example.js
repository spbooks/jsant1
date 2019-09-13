var today = new Date();
var now12 = today.getTimeString(12);
var now24 = today.getTimeString(24);

alert('12 hour time: ' + now12);
alert('24 hour time: ' + now24);

var message = today.getDateString('Created at'
    + today.getTimeString(24)
    + ', on %day, %onth the %date%ordinal');
alert(message);
