var items = [
    'First news item',
    'Second news item',
    'Third news item',
    'Fourth news item',
    'Fifth news item',
    'Sixth news item',
    'Seventh news item',
    'Eighth news item',
    'Ninth news item',
    'Tenth news item'
];

var count = 0;
function updateNews()
{
  var list = document.getElementById('news');
  while (list.childNodes.length > 0)
  {
    list.removeChild(list.firstChild);
  }

  for (var i = count; i < count + 5; i++)
  {
    var n = i >= items.length ? i - items.length : i;
    var li = document.createElement('li');
    var a = li.appendChild(document.createElement('a'));
    a.href = '#';
    a.appendChild(document.createTextNode(items[n]));
    list.appendChild(li);
  }
}

window.onload = function()
{
  updateNews();

  window.setInterval(function()
  {
    count++;
    if (count == items.length) { count = 0; }
    updateNews();

  }, 5000);
};