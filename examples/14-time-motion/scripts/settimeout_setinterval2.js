setInterval("showTime()", 5000);

function showTime()
{
  var today = new Date();
  alert("The time is: " + today.toString());
}