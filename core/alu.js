function $(str) {
  return document.getElementById(str);
}
//regdit
let register = {};
let A = $("A");
let B = $("B");
let C = $("C");
let D = $("D");
let E = $("E");
let H = $("H");
let L = $("L");
let PW = $("PW");
let S = $("S");
let Pgr = $("Pgr");
let Ctr = $("Ctr");
let Stk = $("Stk");
let Ptr = $("Ptr");
let Int = $("Int");

//flag
let S_flag = $("S_flag");
let Z_flag = $("Z_flag");
let P_flag = $("P_flag");
let C_flag = $("C_flag");
let AC_flag = $("AC_flag");

// const p3 = document.querySelector(`.me${nmbr}`);
function opcodeFetch(line) {
  const [instruction, ...operandArray] = line.trim().split(/\s+/);
  const operand = operandArray.join(" ").replace(/\s+/g, "");
  const inst = instruction.toLowerCase();
  const operandsArray = operand.split(",");
  console.log(line);
  console.log("Instruction: ", inst);
  console.log("operand: ", operandsArray);
  switch (inst) {
    // Data Transfer
    case "mov": //MOV A,B
      mov(operandsArray);
      break;
    case "add": //Arithematic Inputs
      add(operandsArray);
      break;
    case "sub":
      sub(operandsArray);
      break;
    case "inr":
      inr(operandsArray);
      break;
    case "dcr":
      dcr(operandsArray);
      break;
    case "ana": //Logic Bit Manupulation Inst
      ana(operandsArray);
      break;
    case "ora":
      ora(operandsArray);
      break;
    case "xra": //ADD C
      xra(operandsArray);
      break;
    case "adi": //Arithematic Inputs
      adi(operandsArray);
      break;
    case "sui":
      sui(operandsArray);
      break;
    case "ani": //Logic Bit Manupulation Inst
      ani(operandsArray);
      break;
    case "ori":
      ori(operandsArray);
      break;
    case "xri":
      xri(operandsArray);
      break;
    case "out":
      out(operandsArray);
      break;
    case "in": //ADI 34h
      in_(operandsArray);
      break;
    case "mvi": //MVI A,34h
      mvi(operandsArray);
      break;
    case "lxi": //LXI A,3456h
      lxi(operandsArray);
      break;
    case "lda":
      lda(operandsArray);
      break;
    case "sta":
      sta(operandsArray);
      break;
    case "jmp": //Branch inst
      jmp(operandsArray);
      break;
    case "jc":
      jc(operandsArray);
      break;
    case "jnc":
      jnc(operandsArray);
      break;
    case "jz":
      jz(operandsArray);
      break;
    case "jnz":
      jnz(operandsArray);
      break;
    case "jp":
      jp(operandsArray);
      break;
    case "call": //LDA 3423h
      call(operandsArray);
      break;
    case "ldax":
      ldax(operandsArray);
      break;
    case "stax":
      stax(operandsArray);
      break;
    case "inx": //Arithematic Inputs
      inx(operandsArray);
      break;
    case "dcx": //inx M
      dcx(operandsArray);
      break;
    case "rlc": //Compare inst
      rlc();
      break;
    case "rrc":
      rrc();
      break;
    case "ral":
      ral();
      break;
    case "rar":
      rar();
      break;
    case "hlt": //Machine Ctrl Inst
      hlt();
      break;
    case "nop":
      nop();
      break;
    case "return":
      return_();
      break;
    default:
      return false;
  }
  return true;
}

function mov(operandsArray) {} //MOV A,B

function add(operandsArray) {
  // let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  console.log(parseInt(A.innerHTML, 16));
  const val1 = parseInt(k, 16);
  const val2 = parseInt(A.innerHTML, 16);
  console.log(k);
  A.innerHTML = (val1 + val2).toString(16).toUpperCase();
} //Arithematic Inputs

function sub(operandsArray) {
  let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  const val1 = parseInt(k, 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 - val2).toString(16).toUpperCase();
}

function inr(operandsArray) {
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    const incrementedValue = parseInt(p3.textContent, 16) + 1;

    p3.textContent = incrementedValue.toString(16).toUpperCase();
  } else {
    const incrementedValue = parseInt($(operandsArray[0]).innerHTML, 16) + 1;
    console.log(incrementedValue.toString(16));

    $(operandsArray[0]).innerHTML = incrementedValue.toString(16).toUpperCase();
  }
}

function dcr(operandsArray) {
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    const incrementedValue = parseInt(p3.textContent, 16) + 1;

    p3.textContent = incrementedValue.toString(16).toUpperCase();
  } else {
    const incrementedValue = parseInt($(operandsArray[0]).innerHTML, 16) - 1;
    console.log(incrementedValue.toString(16));

    $(operandsArray[0]).innerHTML = incrementedValue.toString(16).toUpperCase();
  }
}

function ana(operandsArray) {
  let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  const val1 = parseInt(k, 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 & val2).toString(16).toUpperCase();
} //Logic Bit Manupulation Inst

function ora(operandsArray) {
  let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  const val1 = parseInt(k, 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 | val2).toString(16).toUpperCase();
}

function xra(operandsArray) {
  let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  const val1 = parseInt(k, 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 ^ val2).toString(16).toUpperCase();
} //ADD C

function adi(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 + val2).toString(16).toUpperCase();
} //Arithematic Inputs

function sui(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 - val2).toString(16).toUpperCase();
}

function ani(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 & val2).toString(16).toUpperCase();
} //Logic Bit Manupulation Inst

function ori(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 | val2).toString(16).toUpperCase();
}

function xri(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  A.innerHTML = (val1 ^ val2).toString(16).toUpperCase();
}

function out(operandsArray) {
  const dec = parseInt(operandsArray[0], 16);
  const p3 = document.querySelector(`.io${dec}`);
  p3.textContent = A.innerHTML;
}

function in_(operandsArray) {
  const dec = parseInt(operandsArray[0], 16);
  const p3 = document.querySelector(`.io${dec}`);
  A.innerHTML = p3.textContent;
} //ADI 34h

function mvi(operandsArray) {
  console.log($(operandsArray[0]));
  $(operandsArray[0]).innerHTML = operandsArray[1].substring(0, 2);
}

function lxi(operandsArray) {
  const dec = parseInt(operandsArray[0], 16);
  const p3 = document.querySelector(`.me${dec}`);
  value = p3.textContent.padStart(4, "0");
  switch (operandsArray[0]) {
    case "B":
      B.innerHTML = value.substring(3, 4);
      C.innerHTML = value.substring(0, 2);
      break;
    case "D":
      D.innerHTML = value.substring(3, 4);
      E.innerHTML = value.substring(0, 2);
      break;
    case "H":
    case "M":
      H.innerHTML = value.substring(3, 4);
      L.innerHTML = value.substring(0, 2);
      break;
  }
}
function lda(operandsArray) {
  const dec = parseInt(operandsArray[0], 16);
  const p3 = document.querySelector(`.me${dec}`);
  A.innerHTML = p3.textContent;
}

function sta(operandsArray) {
  const dec = parseInt(operandsArray[0], 16);
  const p3 = document.querySelector(`.me${dec}`);
  p3.textContent = A.innerHTML;
}

function jmp(operandsArray) {} //Branch inst

function jc(operandsArray) {
  if (C_flag.innerHTML == 1) jmp(operandsArray);
}

function jnc(operandsArray) {
  if (C_flag.innerHTML == 1) jmp(operandsArray);
}

function jz(operandsArray) {
  if (Z_flag.innerHTML == 1) jmp(operandsArray);
}

function jnz(operandsArray) {
  if (Z_flag.innerHTML == 0) jmp(operandsArray);
}

function jp(operandsArray) {
  if (P_flag.innerHTML == 1) jmp(operandsArray);
}

function call(operandsArray) {} //LDA 3423h

function ldax(operandsArray) {
  let rp;
  switch (operandsArray[0]) {
    case "B":
      rp = B.innerHTML + C.innerHTML;
      break;
    case "D":
      rp = D.innerHTML + E.innerHTML;
      break;
    case "H":
    case "M":
      rp = H.innerHTML + L.innerHTML;
      break;
  }
  const dec = parseInt(rp, 16);
  const p3 = document.querySelector(`.me${dec}`);
  A.innerHTML = p3.textContent;
}

function stax(operandsArray) {
  let rp;
  switch (operandsArray[0]) {
    case "B":
      rp = B.innerHTML + C.innerHTML;
      break;
    case "D":
      rp = D.innerHTML + E.innerHTML;
      break;
    case "H":
    case "M":
      rp = H.innerHTML + L.innerHTML;
      break;
  }
  const dec = parseInt(rp, 16);
  const p3 = document.querySelector(`.me${dec}`);
  console.log(dec);
  p3.textContent = A.innerHTML;
}

function inx(operandsArray) {
  let temp;
  switch (operandsArray[0]) {
    case "B":
      temp = C;
      break;
    case "D":
      temp = E;
      break;
    case "H":
    case "M":
      temp = L;
      break;
  }
  console.log(temp.innerHTML);
  const incrementedValue = parseInt(temp.innerHTML, 16) + 1;
  temp.innerHTML = incrementedValue.toString(16).toUpperCase();
} //Arithematic Inputs

function dcx(operandsArray) {
  let temp;
  switch (operandsArray[0]) {
    case "B":
      temp = C;
      break;
    case "D":
      temp = E;
      break;
    case "H":
    case "M":
      temp = L;
      break;
  }
  console.log(temp.innerHTML);
  const incrementedValue = parseInt(temp.innerHTML, 16) - 1;
  temp.innerHTML = incrementedValue.toString(16).toUpperCase();
}

function rlc() {
  const binaryNumber = decimalToBinary(parseInt(A.innerHTML, 16));
  const bits = binaryNumber.split("").map(Number);
  const shiftedOutBit = bits[0];
  for (let i = 0; i < bits.length - 1; i++) bits[i] = bits[i + 1];
  bits[bits.length - 1] = shiftedOutBit;
  const resultBinary = bits.join("");
  C_flag.innerHTML = shiftedOutBit;
  console.log(binaryNumber, resultBinary);
  A.innerHTML = binaryToDecimal(resultBinary).toString(16).toUpperCase();
}

function rrc() {
  const binaryNumber = decimalToBinary(parseInt(A.innerHTML, 16));
  const bits = binaryNumber.split("").map(Number);
  const shiftedOutBit = bits[bits.length - 1];
  for (let i = bits.length - 1; i >= 0; i--) bits[i] = bits[i - 1];
  bits[0] = shiftedOutBit;
  C_flag.innerHTML = shiftedOutBit;
  const resultBinary = bits.join("");
  console.log(binaryNumber, resultBinary);
  A.innerHTML = binaryToDecimal(resultBinary).toString(16).toUpperCase();
}

function ral() {
  const binaryNumber = decimalToBinary(parseInt(A.innerHTML, 16));
  const bits = binaryNumber.split("").map(Number);
  const shiftedOutBit = bits[0];
  for (let i = 0; i < bits.length - 1; i++) bits[i] = bits[i + 1];
  bits[bits.length - 1] = C_flag.innerHTML;
  C_flag.innerHTML = shiftedOutBit;
  const resultBinary = bits.join("");
  console.log(binaryNumber, resultBinary);
  A.innerHTML = binaryToDecimal(resultBinary).toString(16).toUpperCase();
}

function rar() {
  const binaryNumber = decimalToBinary(parseInt(A.innerHTML, 16));
  const bits = binaryNumber.split("").map(Number);
  const shiftedOutBit = bits[bits.length - 1];
  for (let i = bits.length - 1; i >= 0; i--) bits[i] = bits[i - 1];
  bits[0] = C_flag.innerHTML;
  C_flag.innerHTML = shiftedOutBit;
  const resultBinary = bits.join("");
  console.log(binaryNumber, resultBinary);
  A.innerHTML = binaryToDecimal(resultBinary).toString(16).toUpperCase();
}

function hlt() {}

function nop() {}

function return_() {}

function decimalToBinary(decimalNumber) {
  return (decimalNumber >>> 0).toString(2).padStart(8, "0");
}

function binaryToDecimal(binaryNumber) {
  return parseInt(binaryNumber, 2);
}
