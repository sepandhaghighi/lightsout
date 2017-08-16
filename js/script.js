var CSS_COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "ForestGreen", "Fuchsia", "Gainsboro", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "Yellow", "YellowGreen"];
var color;
var reset_counter = 0;
var lamp_awsome = '<i class="fa fa-lightbulb-o fa-3x" aria-hidden="true"></i>';
var spinner = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';
var first_init = 0;
var player_name=null;
var score=0;
var first_move=true;
function getname(){
    while(player_name==null||player_name.length<1||player_name.length>10){
    player_name=prompt("Please Enter Your Name ;-)\n(1-10 Character)");
    }
}
function init(flag) {
    first_init = 1;
    color = CSS_COLOR_NAMES[Math.floor((Math.random() * CSS_COLOR_NAMES.length) + 1)].toLowerCase();
    var i, random_number, random_counter, move, game_name, random_init, reset;
    var random_list = [];
    random_counter = 0;
    game_name = document.getElementById("game_name");
    game_name.style.color = color;
    game_name.innerHTML = "Lights Out Game";
    move = document.getElementById("move");
    reset = document.getElementById("reset");
    random_init = 0;
    if (flag == 2) {
        reset_counter = reset_counter + 1;
        reset.innerHTML = "Reset" + " (" + reset_counter + ")";
    }
    while (random_init < 10) {
        random_init = Math.floor((Math.random() * 15) + 1);
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
        reply_click(random_list[i].toString(),true);
    }

    move.innerHTML = 0;

}




var reply_click = function (e,init_flag=false) {
    var input_id, ele, move;
    move = document.getElementById("move");
    if (first_move==true&&init_flag==false){
                display = document.querySelector('#time');
                startTimer(60, display);
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
        move.innerHTML = parseInt(move.innerHTML) + 1;
        toggle(input_id)

        end_game();
    }

}


function toggle(input_id) {
    var press_button;
    press_button = document.getElementById(input_id.toString());
    if (press_button.style.backgroundColor == color) {
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
        if (document.getElementById(i.toString()).style.backgroundColor == "white") {
            on_lamp = on_lamp + 1;
            break;
        }
    }
    if (on_lamp == 0) {
        score=score+1
        win = document.getElementById("win");
        win.innerHTML = parseInt(win.innerHTML) + 1;
        init();
    }
}

function savescore(){
    getname();
    saveToFirebase(player_name,score);
    
    
}

function get_data(){
    var leadsRef = firebase.database().ref('subscription-entries').orderByChild("score").limitToLast(10); 
    var counter=0;
leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var name = childSnapshot.val().name;
      var score= childSnapshot.val().score;
      document.getElementById("N"+(10-counter).toString()).innerHTML=name;
      document.getElementById("S"+(10-counter).toString()).innerHTML=score;
     counter=counter+1;
    });
});
}

function saveToFirebase(name,score) {
    var submit_button
    submit_button=document.getElementById("submit_button");
    var scoreObject = {
        name: name,
        score: score
    };
    try{
    firebase.database().ref('subscription-entries').push().set(scoreObject)
        .then(function(snapshot) {
            alert("Your Score Saved :-)")
            submit_button.style.display="none";
        }, function(error) {
            console.log('error' + error);
            alert("Error In Score Submit :-(");
        });
    }
    catch(e){
        alert("Error In Score Submit :-(");
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval_id=setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert("Time is up\n Score:"+score.toString()+"\n Reset:"+reset_counter.toString());
            timer = duration;
            display.textContent = 10 + ":" + "00";
            win = document.getElementById("win");
            win.innerHTML = 0;
            score=0;
            init();
            clearInterval(interval_id);
        }
    }, 1000);
}


