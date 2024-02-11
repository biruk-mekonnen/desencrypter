import {Buffer} from '@craftzdog/react-native-buffer';

IP = [
  17, 54, 11, 37, 51, 58, 2, 60, 33, 41, 47, 35, 45, 52, 24, 5, 38, 21, 43, 42,
  3, 32, 18, 16, 63, 53, 0, 14, 34, 62, 23, 29, 9, 10, 50, 28, 36, 19, 61, 31,
  15, 40, 59, 8, 30, 49, 46, 48, 6, 1, 57, 4, 44, 12, 56, 7, 55, 22, 13, 27, 25,
  39, 26, 20,
];

E_bit = [
  31, 0, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14, 15,
  16, 15, 16, 17, 18, 19, 20, 19, 20, 21, 22, 23, 24, 23, 24, 25, 26, 27, 28,
  27, 28, 29, 30, 31, 1,
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
  0, 5, 15, 8, 26, 12, 27, 10, 30, 20, 29, 31, 7, 19, 3, 18, 13, 24, 28, 16, 22,
  4, 6, 14, 23, 2, 11, 9, 1, 17, 21, 25,
];

function chiperGenerator(text, key) {
  let encrypted_text = '';
  let encrypted_text_hex = '';

  while (text.length % 8 !== 0) {
    text += 'X';
  }

  //console.log(text);
  const buffertext = Buffer.from(text, 'utf8');
  //console.log(buffertext.length);
  const chunkSize = 8;

  for (let a = 0; a < buffertext.length; a += chunkSize) {
    let chunkString = '';
    let chunkinbinary = '';
    let Chunktext_IP = '';
    let encrypted_chunk = '';

    const chunk = buffertext.slice(a, a + chunkSize);

    chunkString = chunk.toString('utf8');
    // console.log(chunkString);
    for (let b = 0; b < chunkString.length; b++) {
      let charCode = chunkString.charCodeAt(b).toString(2);

      let paddedChar = '0'.repeat(8 - charCode.length) + charCode;
      chunkinbinary += paddedChar;
    }
    // console.log(chunkinbinary);
    intialpermutation(chunkinbinary);
    function intialpermutation(chunkinbinary) {
      for (let c = 0; c < IP.length; c++) {
        Chunktext_IP += chunkinbinary[IP[c]];
      }
      SPlitChunk(Chunktext_IP);
    }

    function SPlitChunk(Chunktext_IP) {
      let Chunktext_IP_left = Chunktext_IP.slice(0, 32);
      let Chunktext_IP_right = Chunktext_IP.slice(32, 64);

      Rounds(Chunktext_IP_left, Chunktext_IP_right);
    }

    function Rounds(Chunktext_IP_left, Chunktext_IP_right) {
      // console.log(Rn);
      let keynumber = 1;
      Ln = Chunktext_IP_left;
      Rn = Chunktext_IP_right;

      for (let d = 1; d <= 2; d++) {
        Rn_expanded = '';
        Rn_Xored = '';
        Rn_S1_boxed = '';
        Rn_F_out = '';
        Ln_temp = Ln;
        Ln = Rn;

        for (let e = 0; e < E_bit.length; e++) {
          Rn_expanded += Rn[E_bit[e]];
        }

        for (let f = 0; f < 48; f++) {
          Rn_Xored +=
            (Rn_expanded[f] === '1') ^ (key[`index${keynumber}`][f] === '1')
              ? '1'
              : '0';
        }
        console.log(' vhgvgjh' + Rn_Xored);
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
          Rn_F_out += Rn_S1_boxed[F_permutation[g]];
        }
        Rn = '';

        for (let h = 0; h < 32; h++) {
          Rn += (Rn_F_out[h] === '1') ^ (Ln_temp[h] === '1') ? '1' : '0';
        }

        keynumber++;
      }

      encrypted_chunk = Ln + Rn;
      // console.log(encrypted_chunk);
    }

    encrypted_text += encrypted_chunk;
  }
  //console.log(encrypted_text);
  for (let i = 0; i < encrypted_text.length; i += 4) {
    //console.log(encrypted_text.slice(i, i + chunkSize));
    let hexDigit = parseInt(encrypted_text.slice(i, i + 4), 2).toString(16);
    encrypted_text_hex += hexDigit;
  }
  console.log(encrypted_text_hex);
  //console.log(encrypted_text);
  return encrypted_text_hex;
}

export {chiperGenerator};

/*
    Rn_S1_boxed = parseInt(S1[row_number_S1_box][column_number_S1_box])
          .concat(parseInt(S2[row_number_S2_box][column_number_S2_box]))
          .concat(parseInt(S3[row_number_S3_box][column_number_S3_box]))
          .concat(parseInt(S4[row_number_S4_box][column_number_S4_box]))
          .concat(parseInt(S5[row_number_S5_box][column_number_S5_box]))
          .concat(parseInt(S6[row_number_S6_box][column_number_S6_box]))
          .concat(parseInt(S7[row_number_S7_box][column_number_S7_box]))
          .concat(parseInt(S8[row_number_S8_box][column_number_S8_box]));
*/
