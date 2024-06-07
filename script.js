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