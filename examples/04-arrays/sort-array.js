// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter'];
planets.sort();


function compare(a, b)
{
  return a - b;
}

var gravities = [0.38, 0.91, 1, 0.38, 2.54];
gravities.sort(compare);
