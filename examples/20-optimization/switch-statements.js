// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

switch (true)
{
  case score >= 90:
    var grade = 'distinction';
    break;

  case score >= 70:
    var grade = 'merit';
    break;

  case score >= 40:
    var grade = 'pass';
    break;

  default:
    var grade = 'fail';
}

switch (score)
{
  case 90:
    var grade = 'distinction';
    break;

  case 70:
    var grade = 'merit';
    break;

  case 40:
    var grade = 'pass';
    break;

  default:
    var grade = 'fail';
}

switch (score >= 40)
{
  case true:
    var grade = 'pass';
    break;

  case false:
    var grade = 'fail';
    break;

  default:
    var grade = 'infinity plus one';
}
