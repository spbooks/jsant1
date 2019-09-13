// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var oldfn = window.onload;
if (typeof window.onload != 'function')
{
  window.onload = fn;
}
else
{
  window.onload = function()
  {
    oldfn();
    fn();
  };
}

var oldfn=window.onload;if(typeof window.onload!='function'){window.onload=fn;
}else{window.onload=function(){oldfn(); fn();};}
