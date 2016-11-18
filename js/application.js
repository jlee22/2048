$(document).ready(function() {
  display_board();
  Mousetrap.bind('up', function() { up(); });
  Mousetrap.bind('down', function() { down(); });
  Mousetrap.bind('left', function() { left(); });
  Mousetrap.bind('right', function() { right(); });
  $("button").on('click', function() {reset_board();})
});
