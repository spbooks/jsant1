// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function changeBorder(element, to)
{
  element.style.borderColor = to;
}

var contentDiv = document.getElementById('content');

contentDiv.onmouseover = function()
{
  changeBorder(this,'red');
}

contentDiv.onmouseut = function()
{
  changeBorder(this,'black');
}
