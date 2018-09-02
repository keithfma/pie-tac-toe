// globals
var markers = ['x', 'o'];
var players = [
    "Adam", 
    "Erik", 
    "Keith",
    "Odin" 
];
var board_width = 3;
var board_height = 3;
var curr_players = {
    x: null,
    o: null
};

// update board to reflect selected players
function update_player(event) {
    // update curr_players global
    menu_elem = event.target;
    marker = menu_elem.id.slice(-1);
    curr_players[marker] = menu_elem.value;
    // update player image
    img_elem = document.getElementById('player-image-' + marker);
    img_elem.src = 'icons/' + [menu_elem.value] + '.jpg';
    // DEBUG
    console.log(marker, curr_players[marker], img_elem.src);
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
        menu.addEventListener('change', update_player);
        rand_player = players[Math.floor(Math.random() * players.length)];
        menu.value = rand_player;
        menu.dispatchEvent(new Event('change'));
   
    }

}, false);
