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

function toggleSwaps(e) {
    if (e.target.checked) {
        document.getElementById("swapsHidden").style.display = 'block';
    } else {
        document.getElementById("swapsHidden").style.display = 'none';
    }
}

function togglePL(e) {
    if (e.target.checked) {
        if (e.target.id == 'plTeams23') {
            document.getElementById('plTeams24').checked = false;
        } else if (e.target.id == 'plTeams24') {
            document.getElementById('plTeams23').checked = false;
        }
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
    }
}