//chunk function for underscore
_.mixin({
  chunk : function (array, unit) {
    if (!_.isArray(array)) return array;
    unit = Math.abs(unit);
    var results = [],
    length = Math.ceil(array.length / unit);

    for (var i = 0; i < length; i++) {
        results.push(array.slice( i * unit, (i + 1) * unit));
    }
    return results;
  }
});

// sample function for arrays
Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)];
}

var gen_board = function() {
  var zero_board = Array(14).fill(0);
  zero_board.push(2, 2);
  var board_array = _.shuffle(zero_board);
  return _.chunk(board_array, 4);
};

var smush = function(array) {
  var com_array = _.compact(array);
  var num_zero = 4 - com_array.length;
  for(var i = 0; i < num_zero ;i++) {
    com_array.push(0);
  }
  return com_array;
};

var add = function(array) {
  for(var i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      array[i] = 2 * array[i];
      update_score(array[i]);
      array[i + 1] = 0;
    };
  };
  return array;
};

var rotate = function(board) {
  var rotated_board = [
  [board[3][0],board[2][0],board[1][0],board[0][0]],
  [board[3][1],board[2][1],board[1][1],board[0][1]],
  [board[3][2],board[2][2],board[1][2],board[0][2]],
  [board[3][3],board[2][3],board[1][3],board[0][3]]
  ];
  return rotated_board;
};

var main_move = function(board) {
  var changed_board = []
  board.forEach(function(row) {
    changed_board.push(smush(add(smush(row))));
  });
  return changed_board;
};

var left = function() {
  smushed = true;
  if(_.isEqual(current_board, main_move(current_board))){
    smushed = false;
  };
  current_board = main_move(current_board);
  generate_number();
  display_board();
};

var right = function() {
  smushed = true;
  var temp_board = rotate(rotate(current_board));
  var moved_board = main_move(temp_board);
  if(_.isEqual(temp_board, moved_board)){
    smushed = false;
  };
  current_board = rotate(rotate(moved_board));
  generate_number();
  display_board();
};

var up = function() {
  smushed = true;
  var temp_board = rotate(rotate(rotate(current_board)));
  var moved_board = main_move(temp_board);
  if(_.isEqual(temp_board, moved_board)){
    smushed = false;
  };
  current_board = rotate(moved_board);
  generate_number();
  display_board();
};

var down = function() {
  smushed = true;
  var temp_board = rotate(current_board);
  var moved_board = main_move(temp_board);
  if(_.isEqual(temp_board, moved_board)){
    smushed = false;
  };
  current_board = rotate(rotate(rotate(moved_board)));
  generate_number();
  display_board();
};

var generate_number = function() {
  var flat_board = [].concat.apply([], current_board);
  var generation = true

  if (smushed === true) {
    if (flat_board.includes(0)) {
      while (generation) {
        var random_num = Math.floor(Math.random() * 16)
        var gen_num = [2,4].sample();
          if (flat_board[random_num] === 0 && current_score > 100 ) {
            flat_board[random_num] = gen_num;
            generation = false;
          } else if (flat_board[random_num] === 0) {
            flat_board[random_num] = 2;
            generation = false;
          };
      };
    };
  };
  current_board = _.chunk(flat_board, 4);
};

var display_board = function() {
  var flat_board = [].concat.apply([], current_board);
    $('#score').empty().text(current_score);
  for (var i = 0; i < 16; i++) {
    $('#box_' + i).removeClass('hidden').empty().append(flat_board[i]);
    if(flat_board[i] === 0) {
      $('#box_' + i).addClass('hidden');
    };
  };
};

var update_score = function (sum) {
  current_score += sum
}

var reset_board = function() {
  current_board = gen_board();
  current_score = 0;
  display_board();
}

var smushed = true;
var current_board = gen_board();
var current_score = 0;
