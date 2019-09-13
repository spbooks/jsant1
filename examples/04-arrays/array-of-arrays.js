// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var planets = new Array(
    new Array('mercury', 'venus', 'earth'),
    new Array('uranus', 'neptune', 'pluto')
    );

var planets = [
    ['mercury', 'venus', 'earth'],
    ['uranus', 'neptune', 'pluto']
    ];

var results = [
    [1, 'K Raikkonen', 'Fin', 'McLaren', '1:45:15.556'],
    [2, 'N Heidfeld', 'Ger', 'McLaren', '+13.8'],
    [3, 'M Webber', 'Aus', 'Williams', '+18.4'],
    [4, 'F Alonso', 'Spa', 'Renault', '+36.4'],
    [5, 'JP Montoya', 'Col', 'McLaren', '+36.6']
    ];

for (var i = 0; i < results.length; i++)
{
  for (var j = 0; j < results[i].length; j++)
  {
    alert('results[' + i + '][' + j + '] = ' + results[i][j]);
  }
}
