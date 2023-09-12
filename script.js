$(document).ready(function(){
    // write_sentence("HEY WhaTS GoING ON?");
    write_sentence("HEY");
});

/**
 * LED array
 * 
 * Description: Stores values of SVG paths to create a full character
 */
const LED_array = [
    "M 17 2 L 69 2 L 69 8 L 63 14 L 17 14 L 11 8 Z",    //1
    "M 73 2 L 125 2 L 131 8 L 125 14 L 79 14 L 73 8 Z", //2
    "M 126 17 L 133 10 L 140 17 L 140 92 L 133 99 L 126 92 Z",  //3
    "M 133 105 L 140 112 L 140 187 L 133 194 L 126 187 L 126 112 Z",    //4    
    "M 79 190 L 125 190 L 131 196 L 125 202 L 73 202 L 73 196 Z",   //5
    "M 17 190 L 63 190 L 69 196 L 69 202 L 17 202 L 11 196 Z",  //6
    "M 9 105 L 16 112 L 16 187 L 9 194 L 2 187 L 2 112 Z",  //7
    "M 2 17 L 9 10 L 16 17 L 16 92 L 9 99 L 2 92 Z",    //8

    "M 64 17 L 71 10 L 78 17 L 78 92 L 71 99 L 64 92 Z",    //9
    "M 110 17 L 123 17 L 123 32 L 93 92 L 81 92 L 81 75 Z", //10
    "M 80 95 L 126 95 L 133 102 L 126 109 L 80 109 L 73 102 Z", //11
    "M 81 112 L 93 112 L 123 172 L 123 187 L 110 187 L 81 129 Z",    //12
    "M 71 105 L 78 112 L 78 187 L 71 194 L 64 187 L 64 112 Z",  //13
    "M 49 112 L 61 112 L 61 129 L 32 187 L 19 187 L 19 172 Z",  //14
    "M 17 95 L 63 95 L 70 102 L 63 109 L 17 109 L 10 102 Z",    //15
    "M 19 17 L 32 17 L 61 75 L 61 92 L 49 92 L 19 32 Z"    //16
];

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
    var $svg = $('<svg>').attr("height", "204").attr("width", "143");

    // creates all LEDs in character
    for(var i = 0; i < 16; i++){
        var led_class_number = `led${i+1 < 10 ? "0" : ""}${i+1}`; // added an i+1 here
        var $led = $('<path>').addClass('led').addClass(led_class_number).addClass('lit').attr('d', LED_array[i]);
        $svg.append($led);
    }
    $char.append($svg);
    $("body").html($("body").html()); // Hack to refresh the reading of the svg. See https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
}