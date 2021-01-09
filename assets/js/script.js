    var flippedCard = false;
    var pauseGame = false;
    var selected;
    var firstFlip, secondFlip;
    var shuffleArray = document.querySelectorAll('.playingCard');

    window.onload = function() {
        $('.playingCard').addClass('flipCard');
    };

    // Card Event Listener

    $('.playingCard').click(function(){
        if (pauseGame) return;
        $(this).removeClass('flipCard');
        if(!flippedCard){
            console.log("First card");
            flippedCard = true;
            selected = this;
            firstFlip = this;
        } else {
                console.log("Second card");
                flippedCard = false;
                secondFlip = this;
            };  
        });