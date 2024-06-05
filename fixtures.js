var vars = {};

window.onload = function() {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        value = value.replaceAll('%0D%0A', ',');
        if(value.includes('+')) value = value.replaceAll('+', ' ');
        if(value.includes(',')) value = value.split(',');
        vars[key] = value;
    });

    new DataTable('#leagueTable', {
        order: [[9, 'desc'], [8, 'desc']],
        paging: false,
        info: false,
        searching: false,
        columnDefs: [
            {
                targets: [9],
                orderData: [9, 8]
            }
        ]
    });

    var matches = roundRobin(vars.players.length, vars.players);
    shuffle(matches);
    console.log(matches);
    var tbody = document.querySelector('#fixturesTable tbody');
    matches.forEach(matchGroup => {
        var row = tbody.insertRow();
        matchGroup.forEach(match => {
            var cell = row.insertCell();
            cell.innerHTML = match[0] + ' vs ' + match[1];
        })
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

function roundRobin (n, ps) {  
    const DUMMY = -1;           // n = num players
    const rs = [];              // rs = round array
    if (!ps) {
        ps = [];
        for (let k = 1; k <= n; k += 1) {
        ps.push(k);
        }
    } else {
        ps = ps.slice();
    }

    if (n % 2 === 1) {
        ps.push(DUMMY); // so we can match algorithm for even numbers
        n += 1;
    }
    for (let j = 0; j < n - 1; j += 1) {
        rs[j] = []; // create inner match array for round j
        for (let i = 0; i < n / 2; i += 1) {
        const o = n - 1 - i;
        if (ps[i] !== DUMMY && ps[o] !== DUMMY) {
            // flip orders to ensure everyone gets roughly n/2 home matches
            const isHome = i === 0 && j % 2 === 1;
            // insert pair as a match - [ away, home ]
            rs[j].push([isHome ? ps[o] : ps[i], isHome ? ps[i] : ps[o]]);
        }
        }
        ps.splice(1, 0, ps.pop()); // permutate for next round
    }
    return rs;
};