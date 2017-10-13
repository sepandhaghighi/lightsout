var CSS_COLOR_NAMES = ["Aqua", "Aquamarine", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "ForestGreen", "Fuchsia", "Gainsboro", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "Yellow", "YellowGreen"];
var color;
var reset_counter = 0;
var lamp_awsome = '<i class="fa fa-lightbulb-o fa-3x" aria-hidden="true"></i>';
var spinner = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';
var sound_on='<i class="fa fa-volume-up fa-3x" aria-hidden="true" ></i>';
var sound_off='<i class="fa fa-volume-off fa-3x" aria-hidden="true"></i>'
var first_init = 0;
var player_name = null;
var score = 0;
var best_score=0;
var first_move = true;
var init_flag = false;
var total_move = 0;
var overall_move=0;
var restart_flag = 0;
var overall_reset=0;
var no_move_counter=0;
var random_init=1;
var complete_game=0;
var hr = (new Date()).getHours();
var music_list=["files/bensound-anewbeginning.mp3","files/bensound-happiness.mp3","files/bensound-tenderness.mp3","files/bensound-cute.mp3","files/bensound-buddy.mp3"];
var music_random=Math.floor(Math.random()*music_list.length);
var audio = new Audio(music_list[music_random]);
var play_status=false;
var player_name_object;
audio.onended = function(){
    music_random=Math.floor(Math.random()*music_list.length);
    audio.src=music_list[music_random];
    audio.load();
    audio.play();
};
// var rythm = new Rythm();
    // rythm.setMusic("files/rythmD.mp3");
// rythm.addRythm('lightsout', 'pulse', 0, 10, {
              // min: 0.7,
             //  max: 1.4
            // })
   //  rythm.start();

//var config = {
  //  apiKey: "AIzaSyCpXbAwzFbnVtsL-YS1K80fWB1puHYuSxY",
//    authDomain: "lightsout-d1728.firebaseapp.com",
  //  databaseURL: "https://lightsout-d1728.firebaseio.com",
//    projectId: "lightsout-d1728",
  //  storageBucket: "lightsout-d1728.appspot.com",
//    messagingSenderId: "778988693702"
//  };
//firebase.initializeApp(config); 
if (hr>=19||hr<6){
    lamp_awsome='<i class="fa fa-lightbulb-o fa-3x" aria-hidden="true" style="color:gold"></i>';
}
function audio_control(){
    if (play_status==true){
        audio.pause();
        play_status=false;
        document.getElementById("sound_on_off").innerHTML=sound_off;
    }
    else{
        audio.play();
        play_status=true;
        document.getElementById("sound_on_off").innerHTML=sound_on;
    }
}
function redirect(flag){
    switch(flag){
        case 1:
            window.open("https://saythanks.io/to/lightsout");
            break;
        case 2:
            swal("Bitocin Wallet","1XGr9qbZjBpUQJJSB6WtgBQbDTgrhPLPA");
            break;
        case 3:
            window.open("https://beerpay.io/sepandhaghighi/lightsout");
            break;
        case 4:
            window.open("https://www.payping.ir/sepandhaghighi");
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
                        swal({
    title: "Hint",
    text: '<table align="center" style="font-size:30px"><tr style="font-size:31px"><th >Bottom</th><th >Top</th></tr><tr><td>O---O</td><td>OO---</td></tr><tr><td>-O-O-</td><td>O--O-</td></tr><tr><td>OOO--</td><td>-O---</td></tr><tr><td>--OOO</td><td>---O-</td></tr><tr><td>O-OO-</td><td>----O</td></tr><tr><td>-OO-O</td><td>O----</td></tr><tr><td>OO-OO</td><td>--O--</td> </tr></table>',
    html: true
});
            break;
        case 9:
            if (complete_game>0){
            swal({
                    title:"Score",
                    text: "Best Score : "+best_score.toString()+"\nGame : "+complete_game.toString()+"\nTotal Move : "+overall_move.toString()+"\nTotal Reset : "+overall_reset.toString()
                    });
            }
                    break;
        default:
            window.open("https://saythanks.io/to/lightsout");
            
    }
    
}
function getname(){
    //getMobileOperatingSystem();
   // swal({
 // title: "Enter Your Name",
  //text: "1-10 Character",
  //type: "input",
  //closeOnConfirm: false,
  //animation: "slide-from-top",
 // inputPlaceholder: "Player Name"
//},
//function(inputValue){
 // if (inputValue === "") {
  //  swal.showInputError("Enter Your Name!");
  //  return false;
 // }
  //  player_name=inputValue;
  //if (inputValue.length>10){
  //    player_name=player_name.substring(0,10);
  //}
  //player_name_object=document.getElementById("player_name");
  //player_name_object.innerHTML=player_name;
  //player_name_object.style.color=color;
swal({
    title: "Help",
    text: '<p style="text-align:justify">The game consists of a 5 by 5 grid of lights. When the game starts, a random number or a stored pattern of these lights is switched on. Pressing any of the lights will toggle it and the four adjacent lights. The goal of the puzzle is to switch all the lights off, preferably in as few button presses as possible. After first touch you have 3 minutes to win as many as possible ;-)</p>',
    html: true,
    customClass: 'swal-wide'
});
//});
    
        init(1);
}
function init(flag) {
    first_init = 1;
    color = CSS_COLOR_NAMES[Math.floor((Math.random() * CSS_COLOR_NAMES.length))].toLowerCase();
    var i, random_number, random_counter, move, game_name, reset;
    var random_list = [];
    random_counter = 0;
    //document.getElementById("player_name").style.color=color;
    game_name = document.getElementById("game_name");
    game_name.style.color = color;
    game_name.innerHTML = "Lights Out Game";
    move = document.getElementById("move");
    reset = document.getElementById("reset");
    init_flag=true;
    if (flag == 2) {
        reset_counter = reset_counter + 1;
        overall_reset = overall_reset + 1;
        reset.innerHTML = "Reset" + " (" + reset_counter + ")";
    }
    while (random_counter < random_init) {
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
    init_flag=false;
}




function reply_click(e) {
    var input_id, ele, move;
    move = document.getElementById("move");
    if (first_move==true&&init_flag==false){
                display = document.querySelector('#time');
                // rythm.stop();
                // document.getElementById("lightsout").style=null;
                startTimer(60*3, display);
        first_move=false;
    }
    input_id = parseInt(e);
    if (first_init == 1) {
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
        if (init_flag==false){
        move.innerHTML = parseInt(move.innerHTML) + 1;
        total_move=total_move+1;
        overall_move=overall_move+1;
        }
        toggle(input_id);

        end_game();
    }
    no_move_counter=0;

}


function toggle(input_id) {
    var press_button;
    press_button = document.getElementById(input_id.toString());
    if (press_button.style.backgroundColor != "white") {
        press_button.style.backgroundColor = "white";
        press_button.innerHTML = lamp_awsome;
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
        random_init=Math.min(random_init+1,15);
        init(1);
    }
}
//function get_data(){
  //  var leadsRef = firebase.database().ref('subscription-entries').orderByChild("score").limitToLast(10); 
//    var counter = 0;
//leadsRef.on('value', function(snapshot) {
  //  snapshot.forEach(function(childSnapshot) {
    //  var name = childSnapshot.val().name;
    //  var score= childSnapshot.val().score;
    //  document.getElementById("N"+(10-counter).toString()).innerHTML=name;
    //  document.getElementById("S"+(10-counter).toString()).innerHTML=score;
    // counter=counter+1;
//    });
//});
//}

//function saveToFirebase(name,score,total_move,player_reset) {
//    var scoreObject = {
  //      name: name,
//        score: score,
//        reset: player_reset,
//        move:total_move
//    };
//    try{
//    firebase.database().ref('subscription-entries').push().set(scoreObject)
//        .then(function(snapshot) {
//        }, function(error) {
//            console.log('error' + error);
//        });
//    }
//    catch(e){
//    }
//}
function restart_game(){
    if (reset_counter==0&&first_move==true){
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
    if (first_move==false){
    restart_flag=1;
    }
    else{
            reset = document.getElementById("reset");
            reset.innerHTML = "Reset!";
            reset_counter=0;
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

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        no_move_counter+=1;
        if (timer==(duration/2)){
            display.style.color="orange";
        }
        else if (timer==60){
            display.style.color="red";
        }
        if (no_move_counter>=60&&timer>100){
            swal({
            title: "Hurry Up!!!",
            imageUrl: "images/hurry.png"
            });
            no_move_counter=0;
        }
        if ((--timer < 0)||(restart_flag==1)) {
            if (restart_flag==0){
                //saveToFirebase(player_name,score,total_move,reset_counter);
                if (best_score<score){
                    best_score=score;
                }
                complete_game=complete_game+1;
                if (complete_game==1){
                    document.getElementById("score_button").style.display="inline";
                }
                swal({
                    title:"Time's Up",
                    text: "Score : "+score.toString()+"\nReset : "+reset_counter.toString()+"\nTotal Move : "+total_move.toString(),
                    imageUrl: "images/timeup.png"
                    });}
            timer = duration;
            restart_config(display);
            clearInterval(interval_id);
            
        }
    }, 1000);
}

function restart_config(display){
    display.textContent = "TI" + ":" + "ME";
    total_move=0;
    random_init=1;
    display.style.color="black";
    win = document.getElementById("win");
            win.innerHTML = 0;
    score=0;
    reset = document.getElementById("reset");
            reset.innerHTML = "Reset!";
            reset_counter=0;
     first_move=true;
            restart_flag=0;
    init(1);
    
}


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
    }

    if (/android/i.test(userAgent)) {
        //document.getElementById("smartabanner").style.display="block";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    }

}
function close_banner(){
    document.getElementById("smartabanner").style.display="none";
}