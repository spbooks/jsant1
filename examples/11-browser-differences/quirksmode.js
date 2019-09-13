// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function detectQuirksMode()
{
  if (typeof document.compatMode != "undefined" &&
      /CSS.Compat/.test(document.compatMode))
  {
    return false;
  }

  return true;
}
