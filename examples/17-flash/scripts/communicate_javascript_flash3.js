function movie_DoFSCommand(command, args)
{
  switch (command)
  {
    case "changeColor":
      changeColor(args);
      break;

    case "changeBackgroundColor":
      changeBackgroundColor(args);
      break;
  }

  return true;
}

function changeColor(newColor)
{
  document.getElementsByTagName("body")[0].style.color = newColor;

  return true;
}

function changeBackgroundColor(newColor)
{
  document.getElementsByTagName("body")[0].style.backgroundColor = newColor;

  return true;
}