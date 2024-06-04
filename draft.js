window.onload = function() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        value = value.replaceAll('%0D%0A', ',');
        if(value.includes(',')) value = value.split(',');
        vars[key] = value;
    });
    
    shuffle(vars.players);

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

    const playerRow = document.getElementById('playerRow');
    const formationRow = document.getElementById('formationRow');
    vars.players.forEach(player => {
        playerRow.children[vars.players.indexOf(player)].innerHTML = player;
        var formation = formations[Math.floor(Math.random()*formations.length)];
        formationRow.children[vars.players.indexOf(player)].innerHTML = formation;
    });
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