// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function bindListHandler(listid)
{
  var list = document.getElementById(listid);

  list.related = list.previousSibling;
  list.related.related = list;

  list.onclick = function()
  {
    this.related.style.color = 'red';
  };

  list.related.onclick = function()
  {
    this.related.style.color = 'red';
  };
}


