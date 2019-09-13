function test1()
{
  return 'Test string'.indexOf('str') != -1;
}
function test2()
{
  return /str/.test('Test string');
}
function test3(a, b)
{
  return a + b;
}
function test4()
{
  return arguments[0] + arguments[1];
}

window.onload = function()
{
  var i = 0;

  var start1 = new Date();
  for (i = 0; i < 200000; i++)
  {
    test1();
  }
  var end1 = new Date();

  var start2 = new Date();
  for (i = 0; i < 200000; i++)
  {
    test2();
  }
  var end2 = new Date();

  alert('Test 1 = ' + (end1.getTime() - start1.getTime()) + 'ms\n'
      + 'Test 2 = ' + (end2.getTime() - start2.getTime()) + 'ms');

  start1 = new Date();
  for (i = 0; i < 200000; i++)
  {
    test1(1, i);
  }
  end1 = new Date();
  start2 = new Date();
  for (i = 0; i < 200000; i++)
  {
    test2(1, i);
  }
  end2 = new Date();

  alert('Test 3 = ' + (end1.getTime() - start1.getTime()) + 'ms\n'
      + 'Test 4 = ' + (end2.getTime() - start2.getTime()) + 'ms');
};


