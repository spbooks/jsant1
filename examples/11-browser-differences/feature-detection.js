// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var xmlHttpExists = typeof XMLHttpRequest;

var byIdExists = typeof document.getElementById;

if (typeof document.designMode != undefined) {
  document.designMode = "on";
} else {
  return false;
}
