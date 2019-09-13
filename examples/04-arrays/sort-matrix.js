// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

function compare(a, b)
{
  return a[1] - b[1];
}

var planets = [
    ['mercury', 0.38],
    ['venus', 0.91],
    ['earth', 1],
    ['mars', 0.38],
    ['jupiter', 2.54]
    ];

planets.sort(compare);
