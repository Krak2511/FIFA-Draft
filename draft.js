var vars = {};
var formationsUsed = [];
var draftPicks = [];
var draftOrder = [];
var currentRound = 0;

window.onload = function() {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        value = value.replaceAll('%0D%0A', ',');
        if(value.includes(',')) value = value.split(',');
        vars[key] = value;
    });    

    if ('4atb' in vars) {
        var formations = ["451 Attack", "4141", "4231 Narrow", "4231 Wide", "451 Flat",
                        "4411 Midfield", "4411 Attack", "442 Holding", "442 Flat",
                        "41212 Narrow", "41212 Wide", "4222", "4312", "4132",
                        "433 False 9", "433 Attack", "433 Defend", "433 Holding",
                        "433 Flat", "4321", "424"]
    } else {
        var formations = ["451 Attack", "4141", "4231 Narrow", "4231 Wide", "451 Flat",
                        "4411 Midfield", "4411 Attack", "442 Holding", "442 Flat",
                        "41212 Narrow", "41212 Wide", "4222", "4312", "4132",
                        "433 False 9", "433 Attack", "433 Defend", "433 Holding",
                        "433 Flat", "4321", "424", "541 Diamond", "541 Flat", "5212",
                        "532", "523", "3142", "3412", "352", "3511", "3421", "343 Flat",
                        "343 Diamond"]
    }

    shuffle(vars.players);
    const playerRow = document.getElementById('playerRow');
    const formationRow = document.getElementById('formationRow');
    vars.players.forEach(player => {
        playerRow.children[vars.players.indexOf(player)].innerHTML = player;

        var formation = formations[Math.floor(Math.random()*formations.length)];
        formationsUsed.push(formation);
        formationRow.children[vars.players.indexOf(player)].innerHTML = formation;

        draftPicks.push([]);
    });

    for (let i = 0; i < 11; i++) {
        if (i % 2 == 0) {
            draftOrder = draftOrder.concat(vars.players);
        } else {
            draftOrder = draftOrder.concat(vars.players.toReversed());
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function draft() {
    var player = draftOrder.shift();
    var team = pickTeam(player);
    draftPicks[vars.players.indexOf(player)].push(team);
    document.querySelectorAll('tbody tr')[currentRound].children[vars.players.indexOf(player)].innerHTML = team;
    if (draftOrder.length % 4 == 0) currentRound++;
}

function pickTeam(player) {
    var draftList = draftPicks[vars.players.indexOf(player)];
    var index = Math.floor(Math.random()*vars.teams.length);
    while (draftList.includes(vars.teams[index])) {
        index = Math.floor(Math.random()*vars.teams.length);
    }
    return vars.teams[index];
}