// globals
var markers = ['x', 'o'];
var players = [
    {name: "Adam", img: null},
    {name: "Erik", img: null},
    {name: "Keith", img: null},
    {name: "Odin", img: null}
];
var board_width = 3;
var board_height = 3;

// update board to reflect selected players
function update_players() {
    for (let marker of markers) {
        console.log("Update player " + marker);
    }
}

// init function, runs automatically on page load
document.addEventListener('DOMContentLoaded', function() {
  
    // populate player selection lists
    for (let marker of markers) {
        choose_player = document.getElementById("choose-player-" + marker);
            for (let player of players) {
                var option = document.createElement('option');
                option.text = player.name;
                choose_player.add(option);
            } 
    }

    // TODO: randomize initial player selection
    update_players();

}, false);
