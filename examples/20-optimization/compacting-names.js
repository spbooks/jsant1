// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function castSpell(incantation, potion)
{
  if (typeof potion == 'undefined') { potion = 'felix'; }

  var spell = document.getElementById(incantation);
  if (spell)
  {
    spell.style.display = 'block';
    spell.firstChild.nodeValue = 'Potion: ' + potion;
  }
}

function castSpell(n, p)
{
  if (typeof p == 'undefined') { p = 'felix'; }

  var s = document.getElementById(n);
  if (s)
  {
    s.style.display = 'block';
    s.firstChild.nodeValue = 'Potion: ' + p;
  }
}
