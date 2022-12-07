const version = "0.1.3";
var CSS_COLOR_NAMES = ["Aqua", "Aquamarine", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "ForestGreen", "Fuchsia", "Gainsboro", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "Yellow", "YellowGreen"];
var color;
var resetCounter = 0;
var lampAwsome = '<i class="fa fa-lightbulb-o fa-3x" aria-hidden="true"></i>';
var spinner = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';
var soundOn='<i class="fa fa-volume-up fa-3x" aria-hidden="true" ></i>';
var soundOff='<i class="fa fa-volume-off fa-3x" aria-hidden="true"></i>'
var firstInit = 0;
var playerName = null;
var score = 0;
var bestScore=0;
var firstMove = true;
var initFlag = false;
var totalMove = 0;
var overallMove=0;
var restartFlag = 0;
var overallReset=0;
var hintCounter=0;
var totalHintCounter=0;
var noMoveCounter=0;
var randomInit=1;
var musicTemp=[];
var completeGame=0;
var hr = (new Date()).getHours();
var musicList=["files/bensound-anewbeginning.mp3","files/bensound-happiness.mp3","files/bensound-tenderness.mp3","files/bensound-cute.mp3","files/bensound-buddy.mp3"];
var musicRandom=Math.floor(Math.random()*musicList.length);
var audio = new Audio(musicList[musicRandom]);
var playStatus=false;
var newRecordNotif="";
var playerNameObject;
var focusFlag=false;
var smartBannerFlag=0;
var time=3*60;


audio.onended = function(){
    musicTemp.push(musicList.splice(musicRandom,1));
    musicRandom=Math.floor(Math.random()*musicList.length);
    audio.src=musicList[musicRandom];
    audio.load();
    if(musicList.length==1){
       musicList.push.apply(musicList,musicTemp);
        musicTemp=[];
    } 
    audio.play();
};

if (hr>=19||hr<6){
    lampAwsome='<i class="fa fa-lightbulb-o fa-3x" aria-hidden="true" style="color:gold"></i>';
}
function audio_control(){
    if (playStatus==true){
        audio.pause();
        playStatus=false;
        document.getElementById("sound_on_off").innerHTML=soundOff;
    }
    else{
        audio.play();
        playStatus=true;
        document.getElementById("sound_on_off").innerHTML=soundOn;
    }
}

function local_save(s,m,r,c,h){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("score", s);
        localStorage.setItem("move", m);
        localStorage.setItem("reset", r);
        localStorage.setItem("complete", c);
        localStorage.setItem("hint",h);
    }
    
}
function local_load(){
     if (typeof(Storage) !== "undefined") {
        completeGame=parseInt(localStorage.getItem("complete"));
        if (completeGame){
            bestScore=parseInt(localStorage.getItem("score"));
            if (bestScore==NaN){
                bestScore=0;
            }
            overallMove=parseInt(localStorage.getItem("move"));
            if (isNaN(overallMove)){
                overallMove=0;
            }
            overallReset=parseInt(localStorage.getItem("reset")); 
            if (isNaN(overallReset)){
                overallReset=0;
            }
            totalHintCounter=parseInt(localStorage.getItem("hint"));
            if (isNaN(totalHintCounter)){
                totalHintCounter=0;
            }
            document.getElementById("score_button").innerHTML="SCORE("+bestScore.toString()+")";
            document.getElementById("score_button").style.display="inline";
        }
         else{
             
             completeGame=0;
         }
         
         smartBannerFlag=parseInt(localStorage.getItem("smartflag"));
          if (isNaN(smartBannerFlag)){
             smartBannerFlag=0;
            }
         
    }
    
    
}
function redirect(flag){
    switch(flag){
        case 1:
            window.open("https://github.com/sepandhaghighi/lightsout");
            break;
        case 2:
            swal({
                
            title:"Bitocin Wallet",
            text:"1KtNLEEeUbTEK9PdN6Ya3ZAKXaqoKUuxCy",
            customClass: 'swal-bitcoin'
            });
            break;
        case 3:
            window.open("mailto:info@lightsout.ir");
            break;
        case 4:
            window.open("https://www.coffeete.ir/opensource");
            break;
        case 5:
            window.open("help.html","_self")
            break;
        case 6:
            window.open("donate.html","_self")
            break;
        case 7:
            window.open("index.html","_self")
            break;
        case 8:
            hintCounter=hintCounter+1;
            totalHintCounter=totalHintCounter+1;
            document.getElementById("Hint").innerHTML = "Hint" + " (" + hintCounter + ")";
                        swal({
    title: "Hint",
    text: '<table align="center" style="font-size:26px"><tr style="font-size:31px"><th >Bottom</th><th >Top</th></tr><tr><td>O---O</td><td>OO---</td></tr><tr><td>-O-O-</td><td>O--O-</td></tr><tr><td>OOO--</td><td>-O---</td></tr><tr><td>--OOO</td><td>---O-</td></tr><tr><td>O-OO-</td><td>----O</td></tr><tr><td>-OO-O</td><td>O----</td></tr><tr><td>OO-OO</td><td>--O--</td> </tr></table>',
    html: true
});
            break;
        case 9:
            if (completeGame>0){
            swal({
                    title:"Score!",
                    text: '<table align="center" style="font-size:26px"><tr><td>Best Score</td><td>'+bestScore.toString()+'</td></tr><tr><td>Game</td><td>'+completeGame.toString()+'</td></tr><tr><td>Total Move</td><td>'+overallMove.toString()+'</td></tr><tr><td>Total Reset</td><td>'+overallReset.toString()+'</td></tr><tr><td>Total Hint</td><td>'+totalHintCounter.toString()+'</td></tr></table>',
                    html: true,
                    customClass: "swal-score"
                    });
            }
                    break;
        default:
            window.open("https://github.com/sepandhaghighi/lightsout");
            
    }
    
}

function swal_help(){
    swal({
    title: "Hi",
    text: '<p style="text-align:justify">The game consists of a 5 by 5 grid of lights. When the game starts, a random number or a stored pattern of these lights is switched on. Pressing any of the lights will toggle it and the four adjacent lights. The goal of the puzzle is to switch all the lights off, preferably in as few button presses as possible. After first touch you have 3 minutes to win as many as possible ;-)</p>',
    html: true,
    customClass: "swal-wide"
});
}
function getname(){
local_load();
swal_help();
    
init(1);
}

function init(flag) {
    firstInit = 1;
    linear_gradient=Math.round(Math.random());
    color = CSS_COLOR_NAMES[Math.floor((Math.random() * CSS_COLOR_NAMES.length))].toLowerCase();
    var i, random_number, random_counter, move, game_name, reset;
    var random_list = [];
    random_counter = 0;
    game_name = document.getElementById("game_name");
    game_name.style.color = color;
    game_name.innerHTML = "Lights Out Game (v"+version+")";
    move = document.getElementById("move");
    reset = document.getElementById("reset");
    initFlag=true;
    if (flag == 2) {
        resetCounter = resetCounter + 1;
        overallReset = overallReset + 1;
        overallMove=overallMove-parseInt(move.innerHTML);
        totalMove=totalMove-parseInt(move.innerHTML);
        reset.innerHTML = "Reset" + " (" + resetCounter + ")";
    }
    while (random_counter < randomInit) {
        random_number = Math.floor((Math.random() * 25) + 1);
        if (random_list.indexOf(random_number) < 0) {
            random_list.push(random_number);
            random_counter = random_counter + 1;
        }
    }
    for (i = 1; i < 26; i++) {
        document.getElementById(i.toString()).style.backgroundColor = color;
        document.getElementById(i.toString()).innerHTML = "";
    }
    for (i = 0; i < random_list.length; i++) {
        reply_click(random_list[i].toString());
    }
    move.innerHTML = 0;
    initFlag=false;
}




function reply_click(e) {
    var input_id, ele, move;
    move = document.getElementById("move");
    if ((firstMove==true&&initFlag==false)||focusFlag==true){
                display = document.querySelector('#time');
                startTimer(time, display);
        firstMove=false;
        focusFlag=false;
    }
    input_id = parseInt(e);
    if (firstInit == 1) {
        if ((input_id + 5) <= 25) {
            toggle(input_id + 5);
        }
        if ((input_id - 5) >= 1) {
            toggle(input_id - 5);
        }
        if (((input_id - 1) % 5) == 0) {
            toggle(input_id + 1);
        }
        else if ((input_id % 5) == 0) {
            toggle(input_id - 1);

        }
        else {
            toggle(input_id - 1);
            toggle(input_id + 1);
        }
        if (initFlag==false){
        move.innerHTML = parseInt(move.innerHTML) + 1;
        totalMove=totalMove+1;
        overallMove=overallMove+1;
        }
        toggle(input_id);

        end_game();
    }
    noMoveCounter=0;

}


function toggle(input_id) {
    var press_button;
    press_button = document.getElementById(input_id.toString());
    if (press_button.style.backgroundColor != "white") {
        press_button.style.backgroundColor = "white";
        press_button.innerHTML = lampAwsome;
    }
    else {
        press_button.style.backgroundColor = color;
        press_button.innerHTML = "";
    }

}

function end_game() {
    var i, on_lamp, win;
    on_lamp = 0;
    for (i = 1; i < 26; i++) {
        if (document.getElementById(i.toString()).innerHTML != "") {
            on_lamp = on_lamp + 1;
            break;
        }
    }
    if (on_lamp == 0) {
        score=score+1
        win = document.getElementById("win");
        win.innerHTML = parseInt(win.innerHTML) + 1;
        randomInit=Math.min(randomInit+1,15);
        init(1);
    }
}

function restart_game(){
    if (resetCounter==0&&firstMove==true&&hintCounter==0){
        swal("Restart???!!!");
    }
    else{
    swal({
  title: "Are you sure?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
  closeOnConfirm: true,
  closeOnCancel: true
},
function(isConfirm){
  if (isConfirm) {
    if (firstMove==false){
        if (focusFlag==true){
            focusFlag=false;
            overallMove=overallMove-totalMove;
            overallReset=overallReset-resetCounter;
            totalHintCounter=totalHintCounter-hintCounter;
            time=3*60;
            restart_config(document.querySelector('#time'));
        }
        else{
            restartFlag=1;
        }
    
    }
    else{
            reset = document.getElementById("reset");
            reset.innerHTML = "Reset!";
            document.getElementById("Hint").innerHTML = "Hint";
            overallReset=overallReset-resetCounter;
            totalHintCounter=totalHintCounter-hintCounter;
            resetCounter=0;
            hintCounter=0;
    }
  } else {
  }
});
    }
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval_id = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        if ( !document.hasFocus() ) {
            focusFlag=true;
            clearInterval(interval_id);
            time=timer;
        }
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        noMoveCounter+=1;
        if (timer==90){
            display.style.color="orange";
        }
        else if (timer==60){
            display.style.color="red";
        }
        if (noMoveCounter>=60&&timer>100){
            swal({
            title: "Hurry Up!!!",
            imageUrl: "images/hurry.png"
            });
            noMoveCounter=0;
        }
        if ((--timer < 0)||(restartFlag==1)) {
            if (restartFlag==0){
                //saveToFirebase(playerName,score,totalMove,resetCounter);
                if (bestScore<score){
                    bestScore=score;
                    newRecordNotif="<h2>New Record!</h2>&nbsp;";
                }
                else{
                    newRecordNotif="";
                }
                completeGame=completeGame+1;
                document.getElementById("score_button").innerHTML="SCORE("+bestScore.toString()+")";
                local_save(bestScore,overallMove,overallReset,completeGame,totalHintCounter);
                if (completeGame==1){
                    document.getElementById("score_button").style.display="inline";
                }
                swal({
                    title:"Time's Up",
                    text: newRecordNotif+'<table align="center" style="font-size:26px"><tr><td>Score</td><td>'+score.toString()+'</td></tr><tr><td>Reset</td><td>'+resetCounter.toString()+'</td></tr><tr><td>Move</td><td>'+totalMove.toString()+'</td></tr><tr><td>Hint</td><td>'+hintCounter.toString()+'</td></tr></table>',
                    html: true,
                    customClass: "swal-score",
                    imageUrl: "images/timeup.png"
                    });}
            else{
                overallMove=overallMove-totalMove;
                overallReset=overallReset-resetCounter;
                totalHintCounter=totalHintCounter-hintCounter;
            }
            timer = duration;
            time=3*60;
            restart_config(display);
            clearInterval(interval_id);
            
        }
    }, 1000);
}

function restart_config(display){
    display.textContent = "TI" + ":" + "ME";
    totalMove=0;
    randomInit=1;
    display.style.color="black";
    win = document.getElementById("win");
            win.innerHTML = 0;
    score=0;
    reset = document.getElementById("reset");
            reset.innerHTML = "Reset!";
            document.getElementById("Hint").innerHTML = "Hint";
            hintCounter=0;
            resetCounter=0;
     firstMove=true;
            restartFlag=0;
    init(1);
    
}


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
    }

    if ((/android/i.test(userAgent)) && (smartBannerFlag < 3)) {
        document.getElementById("smartabanner").style.display="block";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    }

}
function close_banner(){
    document.getElementById("smartabanner").style.display="none";
    smartBannerFlag=smartBannerFlag+1;
    localStorage.setItem("smartflag",smartBannerFlag);
}


function apkdownload(){
    smartBannerFlag=3;
    localStorage.setItem("smartflag",smartBannerFlag);
}

shortcut.add("h",function(){redirect(8);});
shortcut.add("r",function(){init(2);});
shortcut.add("q",function(){swal_help();});
shortcut.add("Ctrl",function(){restart_game();});