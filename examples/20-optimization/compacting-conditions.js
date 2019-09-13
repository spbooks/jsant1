// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function getFirstElement(root, tag)
{
  var collection = root.getElementsByTagName(tag);
  if (collection.length > 0)
  {
    var first = collection[0];
  }
  else
  {
    var first = null;
  }

  return first;
}

function getFirstElement(root, tag)
{
  var collection = root.getElementsByTagName(tag);
  var first = collection.length > 0 ? collection[0] : null;

  return first;
}

function getFirstElement(root, tag)
{
  var collection = root.getElementsByTagName(tag);

  return collection.length > 0 ? collection[0] : null;
}
