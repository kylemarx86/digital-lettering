$(document).ready(function(){
    write_sentence("HEY WhaTS GoING ON?");
});

/**
 * Character array
 * 
 * Description: Stores values for which LED numbers are to be unlit in each corresponding character.
 *    Available characters are A-Z, 0-9, " ", and "*".
 *    Wild card character '*' is intended for use with any character not currently in the array.
 */
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
    "M": [1, 2, 5, 6, 9, 11, 12, 14, 15],
    "N": [1, 2, 5, 6, 9, 10, 11, 13, 14, 15],
    "O": [9, 10, 11, 12, 13, 14, 15, 16],
    "P": [4, 5, 6, 9, 10, 12, 13, 14, 16],
    "Q": [9, 10, 11, 13, 14, 15, 16],
    "R": [4, 5, 6, 9, 10, 13, 14, 16],
    "S": [3, 7, 9, 10, 12, 13, 14, 16],
    "T": [3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16],
    "U": [1, 2, 9, 10, 11, 12, 13, 14, 15, 16],
    "V": [1, 2, 3, 4, 5, 6, 9, 11, 12, 13, 15, 16],
    "W": [1, 2, 5, 6, 10, 11, 13, 15, 16],
    "X": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15],
    "Y": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15],
    "Z": [3, 4, 7, 8, 9, 11, 12, 13, 15, 16],
    "0": [9, 10, 11, 12, 13, 14, 15, 16],
    "1": [1, 2, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16],
    "2": [4, 8, 9, 10, 12, 13, 14, 16],
    "3": [7, 8, 9, 10, 12, 13, 14, 16],
    "4": [1, 2, 5, 6, 7, 9, 10, 12, 13, 14, 16],
    "5": [3, 7, 9, 10, 12, 13, 14, 16],
    "6": [3, 9, 10, 12, 13, 14, 16],
    "7": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    "8": [9, 10, 12, 13, 14, 16],
    "9": [7, 9, 10, 12, 13, 14, 16],
    " ": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    "*": []  //wild card character to catch any character that is not in this array
};

/**
 * Summary: Inputs a string sentence and prints in digital characters for each character in string.
 * 
 * @see make_char
 * 
 * @param {string} sentence String of characters to create digital characters from.
 */
function write_sentence(sentence){
    //sanitize string of characters by changing all characters to uppercase since no lowercase characters in the char_arr
    sentence = sentence.toUpperCase();
    //loop through the characters in the sentence and create character for them.
    for(i = 0; i < sentence.length; i++){
        make_char(sentence.substring(i, i+1));
    }
}

/**
 * Summary: Prints character to DOM as series of lit html LED elements.
 * 
 * Description: Takes input of character to attempt to write converts it to a character than can be written. Takes character
 *    to write and will create DOM element array of fully lit LEDs. Finally, adds classes to DOM elements that do not need to be lit
 *    based on the character by adding classes to them.
 * 
 * @see sanitize_character
 * @see create_fully_lit_char
 * @see light_LEDs
 * 
 * @param {string} char_to_write Character attempting to write. 
 */
function make_char(char_to_write){
    //filter out characters that can't be written
    char_to_write = sanitize_character(char_to_write);
    create_fully_lit_char(char_to_write);
    light_LEDs(char_to_write);
}

/**
 * Summary: Filters out characters that cannot currently be written.
 * 
 * Description: Compares character to list of available characters in char_arr. Returns the 
 *    wild card character '*' if it is not in the char_arr. Otherwise, returns the character.
 * 
 * @param {*} char_to_write 
 * 
 * @returns {string} 
 */
function sanitize_character(char_to_write){
    if(!char_arr.hasOwnProperty(char_to_write)){
        return '*';
    }else{
        return char_to_write;
    }
}

/**
 * Summary: Identifies html elements to add the unlit class to based on char_to_write
 * 
 * Description: Ensures all html LED elements with current character are 'lit'. Uses name of character to identify 
 *   which LEDs to add 'unlit' class to from char_arr.
 * 
 * @param {string} char_to_write 
 */
function light_LEDs(char_to_write){
    var char_class = "char_" + char_to_write;
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
 * Summary: Creates html elements with classes to represent the 16 LEDs.
 * 
 * Description: Creates div elements to represent the 16 LEDs that compose a character.
 *    All LED divs will be lit, i.e. they are created without the unlit class.
 *    Creates and adds class to represent which alphanumeric character this will be.
 *    Outer LEDs are labeled as led01 through led08. Inner LEDs are labeled led09 through led16.
 * 
 * @param {string} char_to_write Character attempting to write. Character should be pre-sanitized.
 */
 function create_fully_lit_char(char_to_write){
    var char_class = "char_" + char_to_write;
    var $char = $('<div>').addClass('char').addClass(char_class);
    $('.container').append($char);

    //creates outer LEDs in character
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

    //creates inner LEDs in character
    for(var i = 9; i <= 16; i++){
        // if i is less than 10, i.e. i=9, then a leading zero is required
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