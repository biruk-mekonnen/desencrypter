import {Buffer} from '@craftzdog/react-native-buffer';
IP = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];

IP_N1 = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];

E_bit = [
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

S3 = [
  [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
  [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
  [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
  [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
];

S4 = [
  [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
  [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
  [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
  [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
];

S5 = [
  [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
  [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
  [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
  [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
];

S6 = [
  [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
  [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
  [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
  [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
];

S7 = [
  [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
  [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
  [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
  [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
];

S8 = [
  [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
  [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
  [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
  [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
];
F_permutation = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];

function cipherDecryptor(E_msg, keys, padding) {
  let decrypted_text = '';

  //create a buffer to process text as blocks
  const bufferE_msg = Buffer.from(E_msg, 'utf8');
  const chunkSize = 16;
  // create a loop to iterate on each block
  for (let a = 0; a < bufferE_msg.length; a += chunkSize) {
    let chunkString = '';
    let decrypted_chunk_permutated = '';
    let decrypted_chunk = '';
    let E_msg_binary = '';
    let E_msg_unpermutated = '';
    //select the block to be processed
    const chunk = bufferE_msg.slice(a, a + chunkSize);
    chunkString = chunk.toString('utf8');

    //convert the encrypted msg from hex into binary format and save it into E_msg_binary
    for (let i = 0; i < chunkString.length; i++) {
      let hexDigit = parseInt(chunkString[i], 16).toString(2);
      while (hexDigit.length < 4) {
        hexDigit = '0' + hexDigit;
      }
      E_msg_binary += hexDigit;
    }
    // console.log(E_msg_binary);
    // reverse The final permutation done by using the IP table
    for (let i = 0; i < IP.length; i++) {
      E_msg_unpermutated += E_msg_binary[IP[i] - 1];
    }

    //console.log(E_msg_unpermutated);
    //call the function slplit the text
    SPlitChunk(E_msg_unpermutated);

    // split the bits in half and swap the left and right sides

    function SPlitChunk(E_msg_unpermutated) {
      let Chunktext_E_msg_left = E_msg_unpermutated.slice(0, 32);
      let Chunktext_E_msg_right = E_msg_unpermutated.slice(32, 64);
      // call the reverse rounding funciotn
      R_Rounds(Chunktext_E_msg_left, Chunktext_E_msg_right);
    }

    function R_Rounds(Chunktext_E_msg_left, Chunktext_E_msg_right) {
      let keynumber = 16;
      Ln = Chunktext_E_msg_left;
      Rn = Chunktext_E_msg_right;
      //console.log('right ' + Rn);
      for (let d = 1; d <= 16; d++) {
        Rn_expanded = '';
        Rn_Xored = '';
        Rn_S1_boxed = '';
        Rn_F_out = '';
        Ln_temp = Ln;
        Ln = Rn;
        for (let e = 0; e < E_bit.length; e++) {
          Rn_expanded += Rn[E_bit[e] - 1];
        }

        for (let f = 0; f < 48; f++) {
          Rn_Xored +=
            (Rn_expanded[f] === '1') ^ (keys[`index${keynumber}`][f] === '1')
              ? '1'
              : '0';
        }
        //  console.log('xored ' + Rn_Xored);
        //console.log(`index${keynumber}`);

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

        for (let g = 0; g < F_permutation.length; g++) {
          Rn_F_out += Rn_S1_boxed[F_permutation[g] - 1];
        }
        Rn = '';
        for (let h = 0; h < 32; h++) {
          Rn += (Rn_F_out[h] === '1') ^ (Ln_temp[h] === '1') ? '1' : '0';
        }
        keynumber--;
      }
      decrypted_chunk = Rn + Ln;

      for (let i = 0; i < IP_N1.length; i++) {
        decrypted_chunk_permutated += decrypted_chunk[IP_N1[i] - 1];
      }
    }
    console.log('decrypted binary ' + decrypted_chunk_permutated);

    decrypted_text += decrypted_chunk_permutated;
  }

  const asciiString = decrypted_text
    .match(/.{8}/g) // Split the binary string into 8-bit segments
    .map(byte => String.fromCharCode(parseInt(byte, 2))) // Convert each 8-bit segment to its ASCII character
    .join('');
  const orignalmessage = asciiString.slice(0, -padding);

  return orignalmessage;
}
export {cipherDecryptor};
