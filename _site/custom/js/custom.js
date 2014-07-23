
function popup(url) {
  newwindow=window.open(url,'name','height=450,width=550');
  if (window.focus) {newwindow.focus()}
  return false;
}
