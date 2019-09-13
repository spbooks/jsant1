// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var p1 = document.getElementById('p1');
p1.style.color = 'red';

var p2 = document.getElementById('p2');
p2.style.color = 'red';

var p3 = document.getElementById('p3');
p3.style.color = 'red';

for (var i = 1; i < 4; i++)
{
  var p = document.getElementById('p' + i);
  p.style.color = 'red';
}

var colors = ['red', 'gold', 'green'];
for (var i = 1; i < 4; i++)
{
  var p = document.getElementById('p' + i);
  p.style.color = colors[i - 1];
}


