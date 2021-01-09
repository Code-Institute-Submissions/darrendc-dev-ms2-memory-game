    var flippedCard = false;
    var pauseGame = false;
    var selected;
    var firstFlip, secondFlip;
    var shuffleArray = document.querySelectorAll('.playingCard');

    window.onload = function() {
        $('.playingCard').addClass('flipCard');
        shuffleCards();
        moveDisplay();
        startTimer();
        hideScore()
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
            moveAdd();
        } else {
                console.log("Second card");
                flippedCard = false;
                secondFlip = this;
                moveAdd();
                cardCheck();
            };  
        });

    //Check Are 2 cards matching


    function cardCheck() {
        console.log(firstFlip)
        console.log(secondFlip)
        if ( firstFlip.dataset.type === secondFlip.dataset.type){
                console.log("Match");
                $(firstFlip).addClass('matched');
                $(secondFlip).addClass('matched');
                addPair();
                addScore();
                finishGame();
        }else{
            console.log("Not matching");
            pauseGame = true;
            $(firstFlip).addClass('mismatch');
            $(secondFlip).addClass('mismatch');
            setTimeout ( function () {
                $(firstFlip).addClass('flipCard').removeClass('mismatch');
                $(secondFlip).addClass('flipCard').removeClass('mismatch');
                pauseGame = false;
                subScore();
            }, 1500);
        };
    }; 

    // Restart Game

    $('#reset').click(function (){
        $('.playingCard').removeClass('matched active-playingcard').addClass('unmatched flipCard');
        shuffleCards();
        resetMove();
        resetScore();
        resetTimer();
        moveDisplay();
    });

    // Randomise Cards

    function shuffleCards() {
        shuffleArray.forEach ( playingCard => {
            var ranNum = Math.floor(Math.random() * (shuffleArray.length-1));
            playingCard.style.order = ranNum;
            console.log("Randomised")
        });
    };

    // All Cards Matched????

    var matchedPair = 0;

    function finishGame(){
        if(matchedPair === 8){
            stopTimer();
            resetMove();
            calculateScore();
        }
    }

    function addPair(){
        matchedPair++;
    }

    function resetPair(){
        if(matchedPair > 0){matchedPair = 0}
    };

    // Counting Moves


    var moveUsed = document.getElementById("moveUsed");
    var move = 1;

     function moveDisplay(){
         document.getElementById("moveUsed").innerHTML =  move ;
     }

    function resetMove() {
        if (move > 0) { move = 0 }
    }

    function moveAdd() {
        moveUsed.innerHTML = move;
        move = move +1;
    }

    // timer


    var timeCounter = document.getElementById("timeCounter");
    var timer = 0;


    function startTimer() {
        timePassed = setInterval(function(){
           document.getElementById("timeCounter").innerHTML =  timer;
           timer++;
        }, 1000);
    }


    function resetTimer() {
        if (timer > 0 ){timer = 0}
    };

    function stopTimer(){
        clearInterval(timePassed)
    };

    // Score ------

     var totalScore = 0;

     function calculateScore() {
        document.getElementById("scoredisplay").innerHTML = "Your final score is " + (Math.floor((totalScore * 5) - (move * 5) / 5));
     }   

     function addScore(){
        console.log("add 20 points")
        totalScore += 20;
     }

     function subScore(){
        console.log("take 8 points")
        totalScore -= 8;
     }

     function resetScore() {
        if (totalScore > 0) { totalScore = 0 };
     };

     function hideScore(){
        document.getElementById("scoredisplay").innerHTML = " -- !Finish the game to display your final score! -- ";
     }

