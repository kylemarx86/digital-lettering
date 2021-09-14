$(document).ready(function(){
    console.log('ready');
    make_char("A");
    make_char("B");
    make_char("X");
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