$(document).ready(function() {
  display_board();
  // display_score();
  Mousetrap.bind('up', function() { up(); });
  Mousetrap.bind('down', function() { down(); });
  Mousetrap.bind('left', function() { left(); });
  Mousetrap.bind('right', function() { right(); });
});
