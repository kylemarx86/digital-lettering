$(document).ready(function(){
    console.log('ready');
    make_char("A");
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
        $('.letter_A .led').removeClass('unlit');
        $('.letter_A .led05').addClass('unlit');
        $('.letter_A .led06').addClass('unlit');
        $('.letter_A .led09').addClass('unlit');
        $('.letter_A .led10').addClass('unlit');
        $('.letter_A .led12').addClass('unlit');
        $('.letter_A .led13').addClass('unlit');
        $('.letter_A .led14').addClass('unlit');
        $('.letter_A .led16').addClass('unlit');
    }
}

