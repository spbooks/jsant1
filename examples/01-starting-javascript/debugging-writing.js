// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var test = document.getElementById('testdiv');

test.innerHTML += '<ul>';
for (var i = 0; i < data.length; i++)
{
  test.innerHTML += '<li>' + i + '=' + data[i] + '</li>';
}
test.innerHTML += '</ul>';



var win = window.open('', win, 'width=320,height=240');

win.document.open();
win.document.write('<ul>');
for (var i = 0; i < data.length; i++)
{
  win.document.write('<li>' + i + '=' + data[i] + '</li>');
}
win.document.write('</ul>');
win.document.close();



document.title = "0 = " + data[0];
