window.onload = function() {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", onInput, false);
    }
    
    function onInput() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + "px";
    }

    const form = document.getElementsByTagName('form')[0];
    form.addEventListener('submit', event => {
        if (!validate() || !form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            form.classList.add('was-validated');
        }
    }, false);
}

function validate() {
    var valid = true;

    var players = document.getElementById('players');
    if (players.value.split("\n").length < 4) {
        players.classList.add('is-invalid');
        players.classList.remove('is-valid');
        valid = false;
    } else {
        players.classList.remove('is-invalid');
        players.classList.add('is-valid');
    }

    var teams = document.getElementById('teams');
    var clubs = document.querySelectorAll('div.teamClubs input');
    var clubCount = 0;
    clubs.forEach(club => {if (club.checked) clubCount++;});
    var nations = document.querySelectorAll('div.teamNations input');
    var nationCount = 0;
    nations.forEach(nation => {if (nation.checked) nationCount++;});
    if (teams.value.split("\n").length < 11 && !clubCount && !nationCount) {
        teams.classList.add('is-invalid');
        teams.classList.add('is-valid');
        valid = false;
    } else {
        teams.classList.remove('is-invalid');
        teams.classList.add('is-valid');
    }

    var swaps = document.getElementById('swaps');
    var swapsNo = document.getElementById('swapsNo');
    if (swaps.checked && !swapsNo.value) {
        swapsNo.style.width = '6rem';
        swapsNo.classList.add('is-invalid');
        swapsNo.classList.add('is-valid');
        valid = false;
    } else {
        swapsNo.classList.remove('is-invalid');
        swapsNo.classList.add('is-valid');
    }

    return valid;
}

window.addEventListener('unload', function(event) {
    var teamSwitchClubs = document.getElementById('teamSwitchClubs');
    teamSwitchClubs.checked = false;
    var teamSwitchNations = document.getElementById('teamSwitchNations');
    teamSwitchNations.checked = false;
}, false);

function toggleSwaps(e) {
    if (e.target.checked) {
        document.getElementById("swapsHidden").style.display = 'block';
    } else {
        document.getElementById("swapsHidden").style.display = 'none';
    }
}

function toggleTeams(e) {
    if (e.target.id == 'teamSwitchClubs') {
        var showDivs = document.getElementsByClassName('teamClubs');
        var hideDivs = document.getElementsByClassName('teamNations');
    } else if (e.target.id == 'teamSwitchNations') {
        var showDivs = document.getElementsByClassName('teamNations');
        var hideDivs = document.getElementsByClassName('teamClubs');
    }

    for (let i = 0; i < showDivs.length; i++) {
        showDivs[i].style.display = 'block';
    }
    for (let i = 0; i < hideDivs.length; i++) {
        hideDivs[i].style.display = 'none';
        hideDivs[i].getElementsByTagName('input')[0].checked = false;
    }
}

function toggle4starTeams(e) {
    if (e.target.checked) {
        document.getElementById("4starHidden").style.display = 'block';
    } else {
        document.getElementById("4starHidden").style.display = 'none';
    }
}

function updateCount(e) {
    var label = document.querySelector('label[for=' + e.target.id + ']');
    var count = parseInt(label.innerText.match(/\(([^)]+)\)/)[1]);
    count = e.target.value.split("\n").filter(Boolean).length;
    if (e.target.id == 'players') {
        label.innerText = 'Players (' + count.toString() + ')';
    } else if (e.target.id == 'teams') {
        label.innerText = 'Teams (' + count.toString() + ')';
    }
}