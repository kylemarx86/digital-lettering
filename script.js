$(document).ready(function(){
    console.log('ready');
    make_char("A");
    make_char("B");
    make_char("X");
    create_fully_lit_char("B");
});




//letters array
let char_arr = {
        "A": [true, true, true, true,
            false, false, true, true,
            false, false, true, false,
            false, false, true, false],
        "B": [true, true, true, true,
            true, true, false, false,
            true, false, true, false,
            true, false, false, false
        ]
    };

//make letter funciton
function make_char(char_to_write){
    if(char_to_write == "A"){
        $('.char_A .led').removeClass('unlit');
        $('.char_A .led05').addClass('unlit');
        $('.char_A .led06').addClass('unlit');
        $('.char_A .led09').addClass('unlit');
        $('.char_A .led10').addClass('unlit');
        $('.char_A .led12').addClass('unlit');
        $('.char_A .led13').addClass('unlit');
        $('.char_A .led14').addClass('unlit');
        $('.char_A .led16').addClass('unlit');
    }else if (char_to_write == "B"){
        $('.char_B .led').removeClass('unlit');
        $('.char_B .led07').addClass('unlit');
        $('.char_B .led08').addClass('unlit');
        $('.char_B .led10').addClass('unlit');
        $('.char_B .led12').addClass('unlit');
        $('.char_B .led14').addClass('unlit');
        $('.char_B .led15').addClass('unlit');
        $('.char_B .led16').addClass('unlit');
    }else if(char_to_write == "X"){
        $('.char_X .led').removeClass('unlit');
        $('.char_X .led01').addClass('unlit');
        $('.char_X .led02').addClass('unlit');
        $('.char_X .led03').addClass('unlit');
        $('.char_X .led04').addClass('unlit');
        $('.char_X .led05').addClass('unlit');
        $('.char_X .led06').addClass('unlit');
        $('.char_X .led07').addClass('unlit');
        $('.char_X .led08').addClass('unlit');
        $('.char_X .led09').addClass('unlit');
        $('.char_X .led11').addClass('unlit');
        $('.char_X .led13').addClass('unlit');
        $('.char_X .led15').addClass('unlit');
    }
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