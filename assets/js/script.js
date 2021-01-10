$(document).ready(function () {

    var flippedCard = false;
    var pauseGame = false;
    var selected;
    var firstFlip, secondFlip;
    var shuffleArray = document.querySelectorAll('.playingCard');

    window.onload = function () {
        $('.playingCard').addClass('flipCard');
        hideScore();
        shuffleCards();
        startTimer();
    };

    // Card Event Listener

    $('.playingCard').click(function () {
        if (pauseGame) return;
        $(this).removeClass('flipCard').addClass('active-playingcard');
        if ($(this).hasClass('matched')) {
            $(this).removeClass('active-playingcard')
            return;
        } else if (!flippedCard) {
            console.log("First card");
            flippedCard = true;
            selected = this;
            firstFlip = this;
            moveAdd();
        } else {
            if ($(this).is($(selected))) {
                return;
            } else {
                console.log("Second card");
                flippedCard = false;
                secondFlip = this;
                moveAdd();
                cardCheck();
            };
        };
    });

    //Check Are 2 cards matching

    function cardCheck() {
        console.log(firstFlip)
        console.log(secondFlip)
        if (firstFlip.dataset.type === secondFlip.dataset.type) {
            console.log("Match");
            $(firstFlip).addClass('matched').removeClass('active-playingcard');
            $(secondFlip).addClass('matched').removeClass('active-playingcard');
            addScore();
            addPair();
            finishGame();
        } else {
            console.log("Not matching");
            pauseGame = true;
            $(firstFlip).addClass(' mismatch').removeClass('active-playingcard');
            $(secondFlip).addClass('mismatch').removeClass('active-playingcard');
            setTimeout(function () {
                $(firstFlip).addClass('flipCard').removeClass('mismatch');
                $(secondFlip).addClass('flipCard').removeClass('mismatch');
                pauseGame = false;
                subScore();
            }, 1500);
        };
    };

    // Restart Game

    $('#reset').click(function () {
        $('.playingCard').removeClass('matched active-playingcard').addClass('unmatched flipCard');
        resetPair();
        shuffleCards();
        resetMove();
        resetScore();
        restartTimer();
        hideScore();
    });

    // Randomise Cards

    function shuffleCards() {
        shuffleArray.forEach(playingCard => {
            var ranNum = Math.floor(Math.random() * (shuffleArray.length - 1));
            playingCard.style.order = ranNum;
            console.log("Randomised")
        });
    };

    // All Cards Matched????

    var matchedPair = 0;

    function finishGame() {
        if (matchedPair === 8) {
            stopTimer();
            resetMove();
            calculateScore();
        }
    }

    function addPair() {
        matchedPair++;
    }

    function resetPair() {
        if (matchedPair > 0) { matchedPair = 0 }
    };

    // Counting Moves


    var moveUsed = document.getElementById("moveUsed");
    var move = 1;

    function resetMove() {
        if (move > 0) { move = 0 }
    }

    function moveAdd() {
        moveUsed.innerHTML = move;
        move = move + 1;
    }

    // timer


    var timeCounter = document.getElementById("timeCounter");
    var timer = 1;


    function startTimer() {
        timePassed = setInterval(function () {
            document.getElementById("timeCounter").innerHTML = timer;
            timer++;
        }, 1000);
    }

    function restartTimer() {
        timer = 0;
        timePassed = setInterval(function () {
            timeCounter.innerHTML = timer;
            timer++;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timePassed)
    };

    // Score

    var totalScore = 0;

    function calculateScore() {
        document.getElementById("scoredisplay").innerHTML = "Your final score is " + (Math.floor((totalScore * 5) - (move * 5) / 5));
    }

    function addScore() {
        console.log("add 20 points")
        totalScore += 20;
    }

    function subScore() {
        console.log("take 8 points")
        totalScore -= 8;
        if (totalScore < 0) { totalScore = 0; }
    }

    function resetScore() {
        if (totalScore > 0) { totalScore = 0; }
    }

    function hideScore() {
        document.getElementById("scoredisplay").innerHTML = " -- !Finish the game to display your final score! -- ";
    }

});

