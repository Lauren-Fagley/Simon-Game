document.addEventListener('DOMContentLoaded', function() {

    var start = document.querySelector('.start');
    var redcircle = document.querySelector('.toprightcircle');
    var bluecircle = document.querySelector('.bottomrightcircle');
    var yellowcircle = document.querySelector('.bottomleftcircle');
    var greencircle = document.querySelector('.topleftcircle');
    var offon = document.querySelector('.off');
    var score = document.querySelector('.score');
    var best = document.querySelector('.best');

var simonsequence = [];
var playersequence = [];

var level = 0;
var currentIndex = 0; // Keep track of the current index in the sequence
var bestscore = 0;

//Turns red light on
function redlight() {
    redcircle.style.backgroundColor = 'red';
    setTimeout(resetLights, 1000); // Reset light after 1 second
}

//Turns blue light on
function bluelight() {
    bluecircle.style.backgroundColor = 'blue';
    setTimeout(resetLights, 1000);
}

//Turns yellow light on
function yellowlight() {
    yellowcircle.style.backgroundColor = 'yellow';
    setTimeout(resetLights, 1000);
}

//Turns green light on
function greenlight() {
    greencircle.style.backgroundColor = 'green';
    setTimeout(resetLights, 1000);
}
//https://bobbyhadz.com/blog/javascript-change-button-color-onclick

function resetLights(){
    redcircle.style.backgroundColor = 'rgb(195, 88, 88)';
    bluecircle.style.backgroundColor = 'rgb(103, 103, 193)';
    yellowcircle.style.backgroundColor = 'rgb(192, 192, 91)';
    greencircle.style.backgroundColor = 'rgb(90, 145, 90)';

    // After resetting lights, next light plays in sequence
    if (currentIndex < level+1) {
        playNextLight();
    }else{
        currentIndex=0;// Reset currentIndex for the next round
    }
}


function endofgame(){
    sequence = [];
    playersequence =[];
    score.textContent = '00';
    if (bestscore<level+1){
        bestscore = level;
        best.textContent = bestscore;
    }
    level = 0;
    offon.style.backgroundColor = 'red';
    console.log('GAME OVER');
    
}

function playNextLight() {
    if(currentIndex<=level){
       switch (simonsequence[currentIndex]) {
        case 1:
            redlight();
            break;
        case 2:
            bluelight();
            break;
        case 3:
            yellowlight();
            break;
        case 4:
            greenlight();
            break;
        }
        currentIndex++; 
    }
    
}


start.addEventListener('click', function(event) {
    // Reset game variables
    simonsequence = [];
    playersequence = [];
    level = 0;
    currentIndex = 0;
    
    offon.style.backgroundColor='green';

    for(var i=0;i<20;i++){
        simonsequence.push(Math.floor(Math.random() * 4) + 1);
    }
    
    /**Generates random numbers between 1 and 4 to fill simon sequence array. 
     * These numbers will determine which circle lights up later 
     * */
    playNextLight();

});


// Event listeners for player clicks on colored circles
redcircle.addEventListener('click', function() {
    if (playersequence.length < level + 1) {
        playersequence.push(1);
    }
    checkPlayerSequence();
});

bluecircle.addEventListener('click', function() {
    if (playersequence.length < level + 1) {
        playersequence.push(2);
    }
    checkPlayerSequence();
});

yellowcircle.addEventListener('click', function() {
    if (playersequence.length < level + 1) {
        playersequence.push(3);
    }
    checkPlayerSequence();
});

greencircle.addEventListener('click', function() {
    if (playersequence.length < level + 1) {
        playersequence.push(4);
    }
    checkPlayerSequence();
});

function checkPlayerSequence() {
        // Compare playersequence with simonsequence

        if(playersequence.length == level+1){
            for (var k = 0; k < level+1; k++) {
            if (playersequence[k] !== simonsequence[k]) {
                endofgame();
                return;
            }
            
        }
        // Player sequence matches simon sequence
            console.log('Player sequence matches Simon sequence!');
            // Clear player sequence for the next level
            playersequence = [];

            currentIndex = 0; // Reset currentIndex to replay the sequence
        
            level++;
        
            score.textContent = level;
            setTimeout(playNextLight(),5000);
            }
        
    
}


});

//https://jsfiddle.net/ayoisaiah/Lxwhder6/20/
