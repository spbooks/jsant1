String.prototype.convertUnderscores = function()
{
  return this.replace(/_/g, " ");
};

var underscored = "Are_there_any_spaces_in_here?";
var spaced = underscored.convertUnderscores();

alert("Original string: " + underscored + "\nUnderscores removed: " + spaced);