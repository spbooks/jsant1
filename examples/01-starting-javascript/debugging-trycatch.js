// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

try
{
  //some code
}
catch (err)
{
  //this gets run if the try{} block results in an error
  for (var i in err)
  {
    alert(i + ': ' + err[i]);
  }
}
