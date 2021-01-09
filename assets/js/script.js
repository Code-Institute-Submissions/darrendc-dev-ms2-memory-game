    var flippedCard = false;
    var pauseGame = false;
    var selected;
    var firstFlip, secondFlip;
    var shuffleArray = document.querySelectorAll('.playingCard');

    window.onload = function() {
        $('.playingCard').addClass('flipCard');
        shuffleCards();
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
        }else{
            console.log("Not matching");
            pauseGame = true;
            $(firstFlip).addClass('mismatch');
            $(secondFlip).addClass('mismatch');
            setTimeout ( function () {
                $(firstFlip).addClass('flipCard').removeClass('mismatch');
                $(secondFlip).addClass('flipCard').removeClass('mismatch');
                pauseGame = false;
            }, 1500);
        };
    }; 

    // Randomise Cards

    function shuffleCards() {
        shuffleArray.forEach ( playingCard => {
            var ranNum = Math.floor(Math.random() * (shuffleArray.length-1));
            playingCard.style.order = ranNum;
            console.log("Randomised")
        });
    };
