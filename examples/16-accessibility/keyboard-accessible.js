//Please note: this file contains snippets for comparison
//it is not self-contained or ready-to-use code as such

attachEventListener(link, 'mouseover', function()
{
  link.className = 'rollover';
}, false);

attachEventListener(link, 'mouseout', function()
{
  link.className = '';
}, false);


attachEventListener(link, 'focus', function()
{
  link.className = 'rollover';
}, false);

attachEventListener(link, 'blur', function()
{
  link.className = '';
}, false);

function checkUsernameForm(frm)
{
  if(frm['username'].value == '')
  {
    alert('Please enter your username');

    frm['username'].focus();

    return false;
  }

  return true;
}
