// globals
var markers = ['x', 'o'];
var players = [
    "Adam", 
    "Erik", 
    "Keith",
    "Odin", 
    "Karl",
    "Zosia",
    "Pei"
];
// NOTE: victory conditions are hard-coded, for now, so the board size *cannot* be changed
var board_width = 3;
var board_height = 3;
var board = [];
var curr_players = {
    x: null,
    o: null
};
var on_deck = 1;
var game_over = false;


// update board to reflect selected players
function set_player(event) {
    // update curr_players global
    menu_elem = event.target;
    marker = menu_elem.id.slice(-1);
    curr_players[marker] = menu_elem.value;
    // update player image
    img_elem = document.getElementById('player-image-' + marker);
    img_elem.src = 'icons/' + [menu_elem.value] + '.jpg';
}

// create (blank) game board of specified size
function create_game_board() {
    board_div = document.getElementById('game-board-div');
    // TODO: update dimensions from menus
    // remove existing board
    if (document.contains(document.getElementById('game-board-table'))) {
        document.getElementById('game-board-table').remove();
        board = [];
    }
    // create new board
    var board_tbl = document.createElement('table');
    board_tbl.id = 'game-board-table';
    for (let ii = 0; ii < board_height; ii++) {
        board.push([]);
        var row = document.createElement('tr');
        for (let jj = 0; jj < board_width; jj++) {
            board[ii].push(null);
            var col = document.createElement('td');
            col.id = ii.toString() + '-' + jj.toString();
            col.addEventListener('click', mark_board);
            row.appendChild(col);
        }
        board_tbl.appendChild(row);
    }
    board_div.appendChild(board_tbl);
}

// switch to the next player's turn
function update_player() {
    curr_marker = markers[on_deck];
    curr_player = document.getElementById('player-' + curr_marker);
    curr_player.classList.remove('my-turn');
    curr_player.classList.add('not-my-turn');
    on_deck = (on_deck + 1) % 2;
    next_marker = markers[on_deck];
    next_player = document.getElementById('player-' + next_marker);
    next_player.classList.remove('not-my-turn');
    next_player.classList.add('my-turn');
}

// return list of [row, col] indices  if current player has won the game, else false
// TODO: flexible algorithm for arbitrary boad size
function victory() {
    var idx = false;
    var mrk = markers[on_deck];
    if (       board[0][0] == mrk && board[0][1] == mrk && board[0][2] == mrk) {
        idx = [     [0, 0],               [0, 1],               [0, 2]]; 

    } else if (board[1][0] == mrk && board[1][1] == mrk && board[1][2] == mrk) {
        idx = [     [1, 0],               [1, 1],               [1, 2]]; 

    } else if (board[2][0] == mrk && board[2][1] == mrk && board[2][2] == mrk) {
        idx = [     [2, 0],               [2, 1],               [2, 2]]; 

    } else if (board[0][0] == mrk && board[1][0] == mrk && board[2][0] == mrk) {
        idx = [     [0, 0],               [1, 0],               [2, 0]]; 

    } else if (board[0][1] == mrk && board[1][1] == mrk && board[2][1] == mrk) {
        idx = [     [0, 1],               [1, 1],               [2, 1]]; 

    } else if (board[0][2] == mrk && board[1][2] == mrk && board[2][2] == mrk) {
        idx = [     [0, 2],               [1, 2],               [2, 2]]; 

    } else if (board[0][0] == mrk && board[1][1] == mrk && board[2][2] == mrk) {
        idx = [     [0, 0],               [1, 1],               [2, 2]]; 

    } else if (board[0][2] == mrk && board[1][1] == mrk && board[2][0] == mrk) {
        idx = [     [0, 2],               [1, 1],               [2, 0]]; 
    } 
    return idx;
}

// update display to show the winner
function show_winner(win_idx) {
    game_over = true;
    console.log(win_idx);
    for (let ij of win_idx) {
        console.log(ij);
        elem = document.getElementById(ij[0].toString() + '-' + ij[1].toString());
        elem.classList.add('winner');
    }
}

// add marker in response to user click on a board box
function mark_board(event) {
    var board_elem = event.target;
    if (board_elem.innerHTML == "" && game_over == false) {
        // update board visual
        var curr_marker = markers[on_deck];
        board_elem.innerHTML = curr_marker;
        // update board array
        var tmp = board_elem.id.split("-");
        var ii = parseInt(tmp[0]);
        var jj = parseInt(tmp[1]);
        board[ii][jj] = curr_marker;
        // handle victory
        var win_idx = victory();
        if (win_idx) {
            show_winner(win_idx);
        } else {
            update_player();
        }
    }
}

// (re)start new game
function start_new_game() {
    on_deck = 1;
    game_over = false;
    update_player();
    create_game_board();
}

// init function, runs automatically on page load
document.addEventListener('DOMContentLoaded', function() {
  
    // populate player selection lists
    for (let marker of markers) {
        choose_player = document.getElementById("choose-player-" + marker);
            for (let player of players) {
                var option = document.createElement('option');
                option.text = player;
                choose_player.add(option);
            } 
    }

    // player selection: initialize and assign listeners
    for (let marker of markers) {
        var menu = document.getElementById("choose-player-" + marker);
        menu.addEventListener('change', set_player);
        rand_player = players[Math.floor(Math.random() * players.length)];
        menu.value = rand_player;
        menu.dispatchEvent(new Event('change'));
    }
    update_player();

    // initialize game board, assign listeners
    create_game_board();
    document.getElementById('new-game').addEventListener('click', start_new_game);
    // TODO: listeners for changed board size

}, false);
