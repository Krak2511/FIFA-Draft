var vars = {};
var leagueTable;

window.onload = function() {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        value = value.replaceAll('%0D%0A', ',');
        if(value.includes('+')) value = value.replaceAll('+', ' ');
        if(value.includes(',')) value = value.split(',');
        vars[key] = value;
    });

    leagueTable = new DataTable('#leagueTable', {
        order: [[9, 'desc'], [8, 'desc']],
        paging: false,
        info: false,
        searching: false,
        columnDefs: [
            {
                targets: [9],
                orderData: [9, 8]
            }
        ],
        columns: [{width: '5%', targets: 0}]
    });

    vars.players.forEach(player => {
        leagueTable.row.add([1, player, 0, 0, 0, 0, 0, 0, 0, 0]).draw(false);
    });

    var matches = roundRobin(vars.players.length, vars.players);
    shuffle(matches);
    var tbody = document.querySelector('#fixtureTable tbody');
    matches.forEach(matchGroup => {
        var row = tbody.insertRow();
        matchGroup.forEach(match => {
            var cell = row.insertCell();
            var id0 = (row.rowIndex-1).toString() + '|' + cell.cellIndex.toString() + '|' + '0';
            var input0 = '<input class="form-control" type="number" value="" id="' + id0 + '" name="' + id0 + '" min="0" style="display: inline; width: 4rem" onfocus="this.oldvalue = this.value;" onchange="update(this); this.oldvalue = this.value;"></input>';
            var id1 = (row.rowIndex-1).toString() + '|' + cell.cellIndex.toString() + '|' + '1';
            var input1 = '<input class="form-control" type="number" value="" id="' + id1 + '" name="' + id1 + '" min="0" style="display: inline; width: 4rem" onfocus="this.oldvalue = this.value;" onchange="update(this); this.oldvalue = this.value;"></input>';
            cell.innerHTML = match[0] + ' ' + input0 + ' - ' + input1 + ' ' + match[1];
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
}

function update(e) {
}