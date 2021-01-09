    var flippedCard = false;
    var pauseGame = false;
    var selected;
    var firstFlip, secondFlip;
    var shuffleArray = document.querySelectorAll('.playingCard');

    window.onload = function() {
        $('.playingCard').addClass('flipCard');
    };