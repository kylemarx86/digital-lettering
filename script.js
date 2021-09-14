$(document).ready(function(){
    console.log('ready');
    make_char("A");
    make_char("B");
    make_char("C");
    make_char("D");
    make_char("E");
    make_char("F");
    make_char("G");
    make_char("H");
    make_char("I");
    make_char("J");
    make_char("K");
    make_char("L");
    make_char("M");
});

// character array
// stores values for each character are the LEDs to be unlit
// NEED TO CREATE DEFAULT VALUE TO RETURN IF CHARACTER NOT FOUND IN ARRAY. MOST LIKELY
    // THIS WILL BE IN ANOTHER METHOD THAT WILL BE CATCH IF NOT FOUND HERE
let char_arr = {
    "A": [5, 6, 9, 10, 12, 13, 14, 16],
    "B": [7, 8, 10, 12, 14, 15, 16],
    "C": [3, 4, 9, 10, 11, 12, 13, 14, 15, 16],
    "D": [7, 8, 10, 11, 12, 14, 15, 16],
    "E": [3, 4, 9, 10, 12, 13, 14, 16],
    "F": [3, 4, 5, 6, 9, 10, 12, 13, 14, 16],
    "G": [3, 9, 10, 12, 13, 14, 15, 16],
    "H": [1, 2, 5, 6, 9, 10, 12, 13, 14, 16],
    "I": [3, 4, 7, 8, 10, 11, 12, 14, 15, 16],
    "J": [1, 2, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    "K": [1, 2, 3, 4, 5, 6, 9, 11, 13, 14, 16],
    "L": [1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16],
    "M": [1, 2, 5, 6, 9, 11, 12, 14, 15]
    // "N": [],
    // "O": [],
    // "P": [],
    // "Q": [],
    // "R": [],
    // "S": [],
    // "T": [],
    // "U": [],
    // "V": [],
    // "W": [],
    // "X": [],
    // "Y": [],
    // "Z": [],
    // "0": [],
    // "1": [],
    // "2": [],
    // "3": [],
    // "4": [],
    // "5": [],
    // "6": [],
    // "7": [],
    // "8": [],
    // "9": []
};

//make letter funciton
function make_char(char_to_write){
    create_fully_lit_char(char_to_write);
    light_LEDs(char_to_write);
}


function light_LEDs(char_to_write){
    var char_class = "char_" + char_to_write;
    console.log("char class: ", char_class);
    console.log("char to write", char_arr[char_to_write]);
    // ensure all LEDs are lit
    $(char_class).removeClass('unlit');
    // gather values of LEDs to be unlit
    var unlit_arr = char_arr[char_to_write];
    // for each value in the array, make that LED unlit
    unlit_arr.forEach(element => {
        // capture text of led number and format if less than 10 to account for leading zero
        var led_number = "led" + (element < 10 ? "0" : "") + element;
        // add unlit to LED within that character
        $('.' + char_class + ' .' + led_number).addClass('unlit');
    });
}

/**
 * param:
 */
 function create_fully_lit_char(char_to_write){
    var char_class = "char_" + char_to_write;
    var $char = $('<div>').addClass('char').addClass(char_class);
    $('.container').append($char);

    //create outer LEDs in character
    for(var i = 1; i <= 8; i++){
        //recall all integers i <= 8 are also less than 10, thus needing leading zero
        var led_class_number = "led0" + i;
        // orientation class to state whether led is horizontal or vertical
            // if remainder when divided by 4 of i -1 is less than 2, orientation is horiz, else vert
        var orientation_class;
        if( (i - 1) % 4 < 2){
            orientation_class = "outer_horiz";
        }else{
            orientation_class = "outer_vert";
        }
        var $led = $('<div>').addClass('led').addClass('outer').addClass(orientation_class).addClass(led_class_number);

        var $ext = $('<div>').addClass('ext');
        var $int = $('<div>').addClass('int');
        
        $led.append($ext, $int);
        $char.append($led);
    }

    //create inner LEDs in character
    for(var i = 9; i <= 16; i++){
        // if i is 
        var led_class_number = "led" + (i < 10 ? "0" : "") + i;
        var orientation_class;
        var $led = $('<div>').addClass('led').addClass('inner');

        // class to state orientation of inner led
            // if remainder when divided by 2 of i -1 is  equal to 0, orientation is horiz or vert, else is diagonal
        if( (i-1) % 2 == 0){
            // orientation is horiz or vert
            if( (i-1) % 4 == 0){
                // orientation is vert
                orientation_class = "inner_vert";
                var $left = $('<div>').addClass('left');
                var $right = $('<div>').addClass('right');
                $led.append($left, $right);
            }else{
                // orientation is horiz
                orientation_class = "inner_horiz";
                var $top = $('<div>').addClass('top');
                var $bottom = $('<div>').addClass('bottom');
                $led.append($top, $bottom);
            }
        }else{
            // orientation is diag
            orientation_class = "diag";
            var $outer_end = $('<div>').addClass('outer_end');
            var $middle_left = $('<div>').addClass('middle').addClass('left');
            var $middle_right = $('<div>').addClass('middle').addClass('right');
            var $inner_end = $('<div>').addClass('inner_end');
            $led.append($outer_end, $middle_left, $middle_right, $inner_end);
        }
        $led.addClass(orientation_class).addClass(led_class_number);
        $char.append($led);
    }
}