//this code takes in the generates subkeys and text message and generate an encrypted text
//it also padds the text with X so each block can be 64 bits
//it returns an encrypted text and number of padding added
//
//buffer is used to process each block at a time
import {Buffer} from '@craftzdog/react-native-buffer';
const IP = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];

const IP_N1 = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];

const E_bit = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];
const S1 = [
  [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
  [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
  [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
  [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
];

const S2 = [
  [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
  [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
  [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
  [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
];

const S3 = [
  [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
  [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
  [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
  [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
];

const S4 = [
  [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
  [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
  [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
  [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
];

const S5 = [
  [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
  [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
  [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
  [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
];

const S6 = [
  [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
  [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
  [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
  [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
];

const S7 = [
  [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
  [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
  [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
  [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
];

const S8 = [
  [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
  [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
  [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
  [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
];
const F_permutation = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];
//main function
function cipherGenerator(text, key) {
  let encrypted_text = ''; //variable to hold final encrypted text
  let encrypted_text_hex = ''; //variable to hold final encrypted text in hex format
  let encrypted_chunk_permutated = ''; //variable to hold the final encrypted  output of a block
  let textspadding = 0; //variable to hold padding
  //while loop is used to check the amount of padded the text requires and adds it
  //all counts how many paddings are added
  while (text.length % 8 !== 0) {
    text += 'X';
    textspadding++;
  }
  //create a buffer text
  const buffertext = Buffer.from(text, 'utf8');
  //set one chunk to be 8 char since its 64 bit block
  const chunkSize = 8;

  //this for loop iterates from block to block
  //onces a block has been encrypted it loops until all blokcs are encrypted
  for (let a = 0; a < buffertext.length; a += chunkSize) {
    let chunkString = ''; //variable to hold block to be processed
    let chunkinbinary = ''; //variable to hold block in binary
    let Chunktext_IP = ''; //variable to hold block after initiatl permute
    let encrypted_chunk = ''; //variable to hold encrypted block before final permute

    //slice the current block to be processed
    const chunk = buffertext.slice(a, a + chunkSize);
    //convert it to string
    chunkString = chunk.toString('utf8');
    //you will notice the variables all have different names
    //lot of for loops inside so it created some bugs thats why
    //
    //for loop that to convert to binary and padd each charater to be 8 bits(so its adds to 64)
    for (let b = 0; b < chunkString.length; b++) {
      let charCode = chunkString.charCodeAt(b).toString(2);

      let paddedChar = '0'.repeat(8 - charCode.length) + charCode;
      chunkinbinary += paddedChar;
    }
    // call function to do intial permute
    intialpermutation(chunkinbinary);
    //funciton that does inital permute
    function intialpermutation(chunkinbinary) {
      for (let c = 0; c < IP.length; c++) {
        Chunktext_IP += chunkinbinary[IP[c] - 1]; //save initial permute into variable
      }
      //call function that splits the text into
      SPlitChunk(Chunktext_IP);
    }
    //funciton that splits the text into
    function SPlitChunk(Chunktext_IP) {
      let Chunktext_IP_left = Chunktext_IP.slice(0, 32);
      let Chunktext_IP_right = Chunktext_IP.slice(32, 64);
      //call a function tat does roudning
      Rounds(Chunktext_IP_left, Chunktext_IP_right);
    }
    //the rounding funciton
    function Rounds(Chunktext_IP_left, Chunktext_IP_right) {
      let keynumber = 1; //the key number is for the sub keys generated to iterate for each round
      Ln = Chunktext_IP_left; //save the left chunk in a new variable easier to view as Ln
      Rn = Chunktext_IP_right; //save the right chunk in a new variable easier to view as Rn

      //the festial network loop
      //does the 16 rounds
      for (let d = 1; d <= 16; d++) {
        Rn_expanded = ''; //vairiable to hold the expanded bits from E_bit table
        Rn_Xored = ''; //variable to hold the Xored bits with the key
        Rn_S1_boxed = ''; //varible to hold the S_boxed bits from the Sbox table
        Rn_F_out = ''; //variable to hold the out put of the Function
        Ln_temp = Ln; //create a temp variable to hold Ln-1 bits to eventually Xor with output of the festial network
        Ln = Rn; // create the new Ln as Rn according to the algorithm

        // start of the F(k,R)function
        //-------------------------------------------------------------------------------------------------
        //expand the right side using E_bit table
        for (let e = 0; e < E_bit.length; e++) {
          Rn_expanded += Rn[E_bit[e] - 1];
        }
        //Xor the expanded right side with the first round subkey
        for (let f = 0; f < 48; f++) {
          Rn_Xored +=
            (Rn_expanded[f] === '1') ^ (key[`index${keynumber}`][f] === '1')
              ? '1'
              : '0';
        }
        //the following devids the right side 48 bits into 6 bits and  holds the values for the 6 bits in a row and column variables according to the algorithm
        //S1
        row_number_S1_box = parseInt(Rn_Xored[0].concat(Rn_Xored[5]), 2);
        column_number_S1_box = parseInt(Rn_Xored.substring(1, 5), 2);
        //S2
        row_number_S2_box = parseInt(Rn_Xored[6].concat(Rn_Xored[11]), 2);
        column_number_S2_box = parseInt(Rn_Xored.substring(7, 11), 2);
        //S3
        row_number_S3_box = parseInt(Rn_Xored[12].concat(Rn_Xored[17]), 2);
        column_number_S3_box = parseInt(Rn_Xored.substring(13, 17), 2);
        //S4
        row_number_S4_box = parseInt(Rn_Xored[18].concat(Rn_Xored[23]), 2);
        column_number_S4_box = parseInt(Rn_Xored.substring(19, 23), 2);
        //S5
        row_number_S5_box = parseInt(Rn_Xored[24].concat(Rn_Xored[29]), 2);
        column_number_S5_box = parseInt(Rn_Xored.substring(25, 29), 2);
        //S6
        row_number_S6_box = parseInt(Rn_Xored[30].concat(Rn_Xored[35]), 2);
        column_number_S6_box = parseInt(Rn_Xored.substring(31, 35), 2);
        //S7
        row_number_S7_box = parseInt(Rn_Xored[36].concat(Rn_Xored[41]), 2);
        column_number_S7_box = parseInt(Rn_Xored.substring(37, 41), 2);

        //S8
        row_number_S8_box = parseInt(Rn_Xored[42].concat(Rn_Xored[47]), 2);
        column_number_S8_box = parseInt(Rn_Xored.substring(43, 47), 2);
        //the following uses the row and column corrdinates to set the value from the S_ box table and concats all 4bit groups to form 32 bit S_box output
        let Rn_S1_boxed =
          S1[row_number_S1_box][column_number_S1_box]
            .toString(2)
            .padStart(4, '0') +
          S2[row_number_S2_box][column_number_S2_box]
            .toString(2)
            .padStart(4, '0') +
          S3[row_number_S3_box][column_number_S3_box]
            .toString(2)
            .padStart(4, '0') +
          S4[row_number_S4_box][column_number_S4_box]
            .toString(2)
            .padStart(4, '0') +
          S5[row_number_S5_box][column_number_S5_box]
            .toString(2)
            .padStart(4, '0') +
          S6[row_number_S6_box][column_number_S6_box]
            .toString(2)
            .padStart(4, '0') +
          S7[row_number_S7_box][column_number_S7_box]
            .toString(2)
            .padStart(4, '0') +
          S8[row_number_S8_box][column_number_S8_box]
            .toString(2)
            .padStart(4, '0');

        //do final permutation to the S_box output
        for (let g = 0; g < F_permutation.length; g++) {
          Rn_F_out += Rn_S1_boxed[F_permutation[g] - 1];
        }
        Rn = ''; //reset Rn for the next round iteration
        //Xor the output from the Final permutation (P-BOX) table witht the Left side of the bits
        for (let h = 0; h < 32; h++) {
          Rn += (Rn_F_out[h] === '1') ^ (Ln_temp[h] === '1') ? '1' : '0'; //save the result in Rn which will be the new rounds input Rn
        }

        //incrment the key so next subkey can be used in the next round
        keynumber++;
      }
      //end of 16 sub key rounds
      //-----------------------------------------------------------------------
      encrypted_chunk = Rn + Ln; //take the output of the rounds and invert the left side and right said and save it in encrypted chucnk variable
      //do the final inverse permutation on the block
      for (let i = 0; i < IP_N1.length; i++) {
        encrypted_chunk_permutated += encrypted_chunk[IP_N1[i] - 1];
      }
    }
  }
  //add the encrypted block to the encrypted text
  encrypted_text += encrypted_chunk_permutated;
  //convert the encrypted text to hex
  for (let i = 0; i < encrypted_text.length; i += 4) {
    let hexDigit = parseInt(encrypted_text.slice(i, i + 4), 2).toString(16);
    encrypted_text_hex += hexDigit;
  }
  //return the encryted text and the orginal paddings added to it
  return {Encrypted: encrypted_text_hex, padding: textspadding};
}

export {cipherGenerator};
