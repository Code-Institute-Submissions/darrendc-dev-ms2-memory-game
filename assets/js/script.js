$(document).ready(function () {
    const shuffleArray = document.querySelectorAll('.playingCard');
    const timeCounter = document.getElementById("timeCounter");
    const moveUsed = document.getElementById("moveUsed");
    var flippedCard = false;
    var pauseGame = false;
    var selected;
    var firstFlip, secondFlip;
    var matchedPair = 0;
    var move = 1;
    var timer = 1;
    var timePassed;
    var totalScore = 0;

    $('.playingCard').addClass('flipCard');
    hideScore();
    shuffleCards();
    startTimer();

    // Card Event Listener

    $('.playingCard').click(function () {
        if (pauseGame) {
            return;
        }
        $(this).removeClass('flipCard').addClass('active-playingcard');
        if ($(this).hasClass('matched')) {
            $(this).removeClass('active-playingcard');
        } else if (!flippedCard) {
            flippedCard = true;
            selected = this;
            firstFlip = this;
            moveAdd();
        } else {
            if (!$(this).is($(selected))) {
                flippedCard = false;
                secondFlip = this;
                moveAdd();
                cardCheck();
            }
        }
    });

    //Check Are 2 cards matching

    function cardCheck() {
        if (firstFlip.dataset.type === secondFlip.dataset.type) {
            $(firstFlip).addClass('matched').removeClass('active-playingcard');
            $(secondFlip).addClass('matched').removeClass('active-playingcard');
            addScore();
            addPair();
            finishGame();
        } else {
            pauseGame = true;
            $(firstFlip).addClass(' mismatch').removeClass('active-playingcard');
            $(secondFlip).addClass('mismatch').removeClass('active-playingcard');
            setTimeout(function () {
                $(firstFlip).addClass('flipCard').removeClass('mismatch');
                $(secondFlip).addClass('flipCard').removeClass('mismatch');
                pauseGame = false;
                subScore();
            }, 1500);
        }
    }

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
        });
    }

    // All Cards Matched????

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
        if (matchedPair > 0) {
            matchedPair = 0;
        }
    }

    // Counting Moves

    function resetMove() {
        if (move > 0) {
            move = 0;
        }
    }

    function moveAdd() {
        moveUsed.innerHTML = move;
        move = move + 1;
    }

    // timer

    function startTimer() {
        timePassed = setInterval(function () {
            document.getElementById("timeCounter").innerHTML = timer;
            timer++;
        }, 1000);
    }

    /**
     * 
     */
    function restartTimer() {
        timer = 0;
        timePassed = setInterval(function () {
            timeCounter.innerHTML = timer;
            timer++;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timePassed);
    }

    // Score

    function calculateScore() {
        document.getElementById("scoredisplay").innerHTML = "Your final score is " + (Math.floor((totalScore * 5) - (move * 5) / 5));
    }

    function addScore() {
        totalScore += 20;
    }

    function subScore() {
        totalScore -= 8;
        if (totalScore < 0) {
            totalScore = 0;
        }
    }

    function resetScore() {
        if (totalScore > 0) {
            totalScore = 0;
        }
    }

    function hideScore() {
        document.getElementById("scoredisplay").innerHTML = " -- !Finish the game to display your final score! -- ";
    }

});

