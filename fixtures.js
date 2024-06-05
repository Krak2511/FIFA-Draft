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
        order: [[7, 'desc'], [6, 'desc']],
        paging: false,
        info: false,
        searching: false,
        columnDefs: [
            {
                targets: [7],
                orderData: [7, 6]
            }
        ],
        columns: [{width: '5%', targets: 0}]
    });

    vars.players.forEach(player => {
        leagueTable.row.add([player, 0, 0, 0, 0, 0, 0, 0]).draw(false);
    });

    var matches = roundRobin(vars.players.length, vars.players);
    shuffle(matches);
    var tbody = document.querySelector('#fixtureTable tbody');
    matches.forEach(matchGroup => {
        var row = tbody.insertRow();
        matchGroup.forEach(match => {
            var cell = row.insertCell();
            var input0 = '<input class="form-control" type="number" value="" id="0" name="0" min="0" style="display: inline; width: 4rem" onfocus="this.oldvalue = this.value;" onchange="update(this); this.oldvalue = this.value;"></input>';
            var input1 = '<input class="form-control" type="number" value="" id="1" name="1" min="0" style="display: inline; width: 4rem" onfocus="this.oldvalue = this.value;" onchange="update(this); this.oldvalue = this.value;"></input>';
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
    var player0 = e.parentElement.innerText.split('-')[0].trim();
    var player1 = e.parentElement.innerText.split('-')[1].trim();

    var player = '';
    var oppPlayer = '';
    var firstEntry = (e.oldvalue.trim() == '');
    var goalsOnly = false;
    var score = parseInt(e.value);
    var oldScore = (!firstEntry) ? parseInt(e.oldvalue) : 0;
    var oppScore = 0;
    if (e.id == 0) {
        if (e.parentElement.children[1].value.trim() !== '') oppScore = parseInt(e.parentElement.children[1].value);
        else goalsOnly = true;
        player = player0;
        oppPlayer = player1;
    } else {
        if (e.parentElement.children[0].value.trim() !== '') oppScore = parseInt(e.parentElement.children[0].value);
        else goalsOnly = true;
        player = player1;
        oppPlayer = player0;
    }

    var rowData = leagueTable.row(':contains("' + player + '")').data();
    var oppRowData = leagueTable.row(':contains("' + oppPlayer + '")').data();
    if (!goalsOnly) {
        if (score > oppScore) { // win
            if (firstEntry) {
                rowData[1]++;
                oppRowData[3]++;
            } else {
                if (oldScore < oppScore) { // was loss
                    rowData[1]++;
                    rowData[3]--;
                    oppRowData[1]--;
                    oppRowData[3]++;
                } else if (oldScore == oppScore) { // was draw
                    rowData[1]++;
                    rowData[2]--;
                    oppRowData[2]--;
                    oppRowData[3]++;
                }
            }
        } else if (score < oppScore) { // loss
            if (firstEntry) {
                rowData[3]++;
                oppRowData[1]++;
            } else {
                if (oldScore > oppScore) { // was win
                    rowData[1]--;
                    rowData[3]++;
                    oppRowData[1]++;
                    oppRowData[3]--;
                } else if (oldScore == oppScore) { // was draw
                    rowData[2]--;
                    rowData[3]++;
                    oppRowData[1]++;
                    oppRowData[2]--;
                }
            }
        } else if (score == oppScore) { // draw
            if (firstEntry) {
                rowData[2]++;
                oppRowData[2]++;
            } else {
                if (oldScore > oppScore) { // was win
                    rowData[1]--;
                    rowData[2]++;
                    oppRowData[2]++;
                    oppRowData[3]--;
                } else if (oldScore < oppScore) { // was loss
                    rowData[2]++;
                    rowData[3]--;
                    oppRowData[1]--;
                    oppRowData[2]++;
                }
            }
        }
    }
    rowData[4] = rowData[4] - oldScore + score; // add goals for
    oppRowData[5] = oppRowData[5] - oldScore + score; // add goals against
    rowData[6] = rowData[4] - rowData[5]; // calculate goal difference
    rowData[7] = rowData[1] * 3 + rowData[2]; // calculate points
    oppRowData[6] = oppRowData[4] - oppRowData[5]; // calculate goal difference
    oppRowData[7] = oppRowData[1] * 3 + oppRowData[2]; // calculate points
    leagueTable.row(':contains("' + player + '")').data(rowData).draw(false);
    leagueTable.row(':contains("' + oppPlayer + '")').data(oppRowData).draw(false);
}