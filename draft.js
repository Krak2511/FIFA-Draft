var vars = {};

var formationsUsed = [];
var formationPositionsUsed = [];
var draftPicks = [];
var draftOrder = [];
var currentRound = 0;

var swapPicks = [];
var swapRound = 0;
var swapCount = 0;

var stats = ["Acceleration", "Sprint Speed",
            "Agility", "Balance", "Reactions", "Ball Control", "Dribbling", "Composure",
            "Positioning", "Finishing", "Shot Power", "Long Shots", "Volleys", "Penalties",
            "Interceptions", "Heading Accuracy", "Defensive Awareness", "Standing Tackle", "Sliding Tackle",
            "Vision", "Crossing", "Free Kick Accuracy", "Short Passing", "Long Passing", "Curve",
            "Jumping", "Stamina", "Strength", "Aggression"]
var gkStats = ["Diving", "Handling", "Kicking", "Reflexes", "Speed", "Positioning"]
var formationPositions = {
    "451 Attack" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "CM", "RM", "LAM", "RAM", "ST"],
    "4141" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "LCM", "RCM", "RM", "ST"],
    "4231 Narrow" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LAM", "CAM", "RAM", "ST"],
    "4231 Wide" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LM", "RM", "CAM", "ST"],
    "451 Flat" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "CCM", "RCM", "RM", "ST"],
    "4411 Midfield" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "CAM", "ST"],
    "4411 Attack" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "CF", "ST"],
    "442 Holding" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LM", "RM", "LS", "RS"],
    "442 Flat" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LS", "RS"],
    "41212 Narrow" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "CAM", "LS", "RS"],
    "41212 Wide" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "RM", "CAM", "LS", "RS"],
    "4222" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LAM", "RAM", "LS", "RS"],
    "4312" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CCM", "RCM", "CAM", "LS", "RS"],
    "4132" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "CM", "RM", "LS", "RS"],
    "433 False 9" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "CF", "LW", "RW"],
    "433 Attack" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "CAM", "LW", "ST", "RW"],
    "433 Defend" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "CM", "LW", "ST", "RW"],
    "433 Holding" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "LW", "ST", "RW"],
    "433 Flat" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CCM", "RCM", "LW", "ST", "RW"],
    "4321" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CCM", "RCM", "LF", "RF", "ST"],
    "424" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "LW", "LS", "RS", "RW"],
    "541 Diamond" : ["GK", "LCB", "CCB", "RCB", "LWB", "RWB", "CDM", "LM", "RM", "CAM", "ST"],
    "541 Flat" : ["GK", "LCB", "CCB", "RCB", "LWB", "RWB", "LM", "LCM", "RCM", "RM", "ST"],
    "5212" : ["GK", "LCB", "CCB", "RCB", "LWB", "RWB", "LCM", "RCM", "CAM", "LS", "RS"],
    "532" : ["GK", "LCB", "CCB", "RCB", "LWB", "RWB", "LCM", "CCM", "RCM", "LS", "RS"],
    "523" : ["GK", "LCB", "CCB", "RCB", "LWB", "RWB", "LCM", "RCM", "LW", "ST", "RW"],
    "3142" : ["GK", "LCB", "CCB", "RCB", "CDM", "LM", "LCM", "RCM", "RM", "LS", "RS"],
    "3412" : ["GK", "LCB", "CCB", "RCB", "LM", "LCM", "RCM", "RM", "CAM", "LS", "RS"],
    "352" : ["GK", "LCB", "CCB", "RCB", "LDM", "RDM", "LM", "RM", "CAM", "LS", "RS"],
    "3511" : ["GK", "LCB", "CCB", "RCB", "LDM", "RDM", "LM", "CM", "RM", "CF", "ST"],
    "3421" : ["GK", "LCB", "CCB", "RCB", "LM", "LCM", "RCM", "RM", "LF", "RF", "ST"],
    "343 Flat" : ["GK", "LCB", "CCB", "RCB", "LM", "LCM", "RCM", "RM", "LW", "ST", "RW"],
    "343 Diamond" : ["GK", "LCB", "CCB", "RCB", "CDM", "LM", "RM", "CAM", "LW", "ST", "RW"]
}

window.onload = function() {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        value = value.replaceAll('%0D%0A', ',');
        if(value.includes('+')) value = value.replaceAll('+', ' ');
        if(value.includes(',')) value = value.split(',');
        vars[key] = value;
    });

    if (!vars.teams) {
        vars.teams = [];
    }

    if ('plTeams23' in vars) {
        vars.teams = vars.teams.concat(["Man City", "Arsenal", "Liverpool", "Aston Villa", "Tottenham",
                    "Chelsea", "Newcastle", "Man United", "West Ham", "Crystal Palace",
                    "Brighton", "Bournemouth", "Fulham", "Wolves", "Everton",
                    "Brentford", "Nottm Forest", "Luton Town", "Burnley", "Sheffield United"]);
    }

    if ('plTeams24' in vars) {
        vars.teams = vars.teams.concat(["Man City", "Arsenal", "Liverpool", "Aston Villa", "Tottenham",
                    "Chelsea", "Newcastle", "Man United", "West Ham", "Crystal Palace",
                    "Brighton", "Bournemouth", "Fulham", "Wolves", "Everton",
                    "Brentford", "Nottm Forest", "Leicester City", "Ipswich Town", "Southampton"]);
    }

    if ('euroTeams' in vars) {
        vars.teams = vars.teams.concat(["Germany", "Scotland", "Hungary", "Switzerland",
                    "Spain", "Croatia", "Italy", "Albania",
                    "Slovenia", "Denmark", "Serbia", "England",
                    "Poland", "Netherlands", "Austria", "France",
                    "Belgium", "Slovakia", "Romania", "Ukraine",
                    "Turkey", "Georgia", "Portugal", "Czech Republic"]);
    }

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
    const playerRows = document.getElementsByClassName('playerRow');
    const formationRow = document.getElementById('formationRow');
    vars.players.forEach(player => {
        playerRows[1].insertCell().outerHTML = '<th scope="col">' + player + '</th>';
        playerRows[0].insertCell().outerHTML = '<th scope="col">' + player + '</th>';

        var formation = formations[Math.floor(Math.random()*formations.length)];
        formationsUsed.push(formation);
        formationPositionsUsed.push([].concat(formationPositions[formation]));
        formationRow.insertCell().outerHTML = '<th>' + formation + '</th>';

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
    if (draftOrder.length == 0) return;
    if (draftOrder.length % vars.players.length == 0) {
        var row = document.querySelector('#draftTable tbody').insertRow();
        for (let i = 0; i < vars.players.length; i++) {
            row.insertCell();
        }
    }

    var player = draftOrder.shift();
    var team = pickTeam(player);
    draftPicks[vars.players.indexOf(player)].push(team);
    
    var cell = document.querySelectorAll('#draftTable tbody tr')[currentRound].children[vars.players.indexOf(player)];
    cell.innerHTML = team;

    if ('positionLock' in vars) {
        var index = Math.floor(Math.random()*formationPositionsUsed[vars.players.indexOf(player)].length);
        cell.innerHTML += ' ' + formationPositionsUsed[vars.players.indexOf(player)][index];
        formationPositionsUsed[vars.players.indexOf(player)].splice(index, 1);
    }
    
    if (draftOrder.length % vars.players.length == 0) currentRound++;
    if (draftOrder.length == 0 && 'swaps' in vars) showSwaps();
}

function pickTeam(player) {
    var draftList = draftPicks[vars.players.indexOf(player)];
    var index = Math.floor(Math.random()*vars.teams.length);
    while (draftList.includes(vars.teams[index])) {
        index = Math.floor(Math.random()*vars.teams.length);
    }
    return vars.teams[index];
}

function showSwaps() {
    document.getElementById("swapsHeader").style.display = 'block';
    document.getElementById("swapsTable").style.display = 'table';
    for (let i = 0; i < 11; i++) {
        swapPicks.push(i);
        swapPicks.push(i);
    }
    swaps();
}

function swaps() {
    if (swapPicks.length == 0) return;

    document.getElementById("swapButtons").style.display = 'inline-flex';

    var row = document.querySelector('#swapsTable tbody').insertRow();
    var cell = row.insertCell();
    for (let i = 0; i < vars.players.length; i++) {
        row.insertCell();
    }

    var posIndex = swapPicks[Math.floor(Math.random()*swapPicks.length)];

    if (posIndex == 0) {
        var statIndex = Math.floor(Math.random()*gkStats.length);
        cell.innerText = gkStats[statIndex];
        gkStats.splice(statIndex, 1);
    } else {
        var statIndex = Math.floor(Math.random()*stats.length);
        cell.innerText = stats[statIndex];
        stats.splice(statIndex, 1);
    }
    
    vars.players.forEach(player => {
        var formation = formationsUsed[vars.players.indexOf(player)];
        var positions = formationPositions[formation];
        document.querySelectorAll('#swapsTable tbody tr')[swapRound].children[vars.players.indexOf(player)+1].innerHTML = positions[posIndex];
    });

    swapPicks.splice(swapPicks.indexOf(posIndex), 1);
    swapRound++;
}

function swapYes() {
    swapCount++;
    if (swapCount < vars.swapsNo) {
        swaps();
    } else {
        var params = new URLSearchParams(window.location.search);
        params.delete('teams');
        window.location.href = 'fixtures.html?' + params.toString();
    }
}