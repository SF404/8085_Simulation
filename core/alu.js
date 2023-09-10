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
  Stk.innerHTML = "XX";
  Ptr.innerHTML = "XX";
  Int.innerHTML = "XX";
  let byte = 0;
  const [instruction, ...operandArray] = line.trim().split(/\s+/);
  const operand = operandArray.join(" ").replace(/\s+/g, "");
  const inst = instruction.toLowerCase();
  const operandsArray = operand.split(",");
  // console.log(line);
  // console.log("Instruction: ", inst);
  // console.log("operand: ", operandsArray);
  switch (inst) {
    // Data Transfer
    case "mov": //MOV A,B
      byte = 1;
      mov(operandsArray);
      break;
    case "add": //Arithematic Inputs
      byte = 1;
      add(operandsArray);
      break;
    case "sub":
      byte = 1;
      sub(operandsArray);
      break;
    case "inr":
      byte = 1;
      inr(operandsArray);
      break;
    case "dcr":
      byte = 1;
      dcr(operandsArray);
      break;
    case "ana": //Logic Bit Manupulation Inst
      byte = 1;
      ana(operandsArray);
      break;
    case "ora":
      byte = 1;
      ora(operandsArray);
      break;
    case "xra": //ADD C
      byte = 1;
      xra(operandsArray);
      break;
    case "adi": //Arithematic Inputs
      byte = 2;
      adi(operandsArray);
      break;
    case "sui":
      byte = 2;
      sui(operandsArray);
      break;
    case "ani": //Logic Bit Manupulation Inst
      byte = 2;
      ani(operandsArray);
      break;
    case "ori":
      byte = 2;
      ori(operandsArray);
      break;
    case "xri":
      byte = 2;
      xri(operandsArray);
      break;
    case "out":
      byte = 2;
      out(operandsArray);
      break;
    case "in": //ADI 34h
      byte = 2;
      in_(operandsArray);
      break;
    case "mvi": //MVI A,34h
      byte = 2;
      mvi(operandsArray);
      break;
    case "lxi": //LXI A,3456h
      byte = 3;
      lxi(operandsArray);
      break;
    case "lda":
      byte = 3;
      lda(operandsArray);
      break;
    case "sta":
      byte = 3;
      sta(operandsArray);
      break;
    case "jmp": //Branch inst
      byte = 3;
      jmp(operandsArray);
      break;
    case "jc":
      byte = 3;
      jc(operandsArray);
      break;
    case "jnc":
      byte = 3;
      jnc(operandsArray);
      break;
    case "jz":
      byte = 3;
      jz(operandsArray);
      break;
    case "jnz":
      byte = 3;
      jnz(operandsArray);
      break;
    case "jp":
      byte = 3;
      jp(operandsArray);
      break;
    case "call": //LDA 3423h
      byte = 3;
      call(operandsArray);
      break;
    case "ldax":
      byte = 1;
      ldax(operandsArray);
      break;
    case "stax":
      byte = 1;
      stax(operandsArray);
      break;
    case "inx": //Arithematic Inputs
      byte = 1;
      inx(operandsArray);
      break;
    case "dcx": //inx M
      byte = 1;
      dcx(operandsArray);
      break;
    case "rlc": //Compare inst
      byte = 1;
      rlc();
      break;
    case "rrc":
      byte = 1;
      rrc();
      break;
    case "ral":
      byte = 1;
      ral();
      break;
    case "rar":
      byte = 1;
      rar();
      break;
    case "hlt": //Machine Ctrl Inst
      byte = 1;
      hlt();
      break;
    case "nop":
      byte = 1;
      nop();
      break;
    case "return":
      byte = 1;
      return_();
      break;
    default:
      const obj = opcodeFetch(operandArray.join(" "));
      return true;
  }
  const Rp = Pgr.innerHTML + Ctr.innerHTML;
  const inc = (parseInt(Rp, 16) + byte)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
  Pgr.innerHTML = inc.substring(0, 2);
  Ctr.innerHTML = inc.substring(2, 4);
  return true;
}

function mov(operandsArray) {
  if (operandsArray[0] === "M") H.innerHTML = $(operandsArray[1]).innerHTML;
  if (operandsArray[1] === "M") $(operandsArray[0]).innerHTML = H.innerHTML;
  else $(operandsArray[0]).innerHTML = $(operandsArray[1]).innerHTML;
} //MOV A,B

function add(operandsArray) {
  // let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  const val1 = parseInt(k, 16);
  const val2 = parseInt(A.innerHTML, 16);
  console.log(val1);
  console.log(val2);
  const result = val1 + val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;

  if (result === 0) Z_flag.innerHTML = 1;

  if (result > 0xff) C_flag.innerHTML = 1;
} //Arithematic Inputs

function sub(operandsArray) {
  let k;
  if (operandsArray[0] == "M") {
    const rp = H.innerHTML + L.innerHTML;
    const dec = parseInt(rp, 16);
    const p3 = document.querySelector(`.me${dec}`);
    k = p3.textContent;
  } else k = $(operandsArray[0]).innerHTML;
  const val2 = parseInt(k, 16);
  const val1 = parseInt(A.innerHTML, 16);
  const result = val1 - val2;
  A.innerHTML = Math.abs(result).toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) {
    S_flag.innerHTML = 1;
    C_flag.innerHTML = 1;
  }
  if (result === 0) Z_flag.innerHTML = 1;
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

    $(operandsArray[0]).innerHTML = incrementedValue.toString(16).toUpperCase();
    Parity_Flag_check(incrementedValue);
    if (incrementedValue === 0) Z_flag.innerHTML = 1;
    if (incrementedValue > 0xff) C_flag.innerHTML = 1;
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
    Parity_Flag_check(incrementedValue);
    if (incrementedValue < 0) S_flag.innerHTML = 1;
    if (incrementedValue === 0) Z_flag.innerHTML = 1;
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
  const result = val1 & val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
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
  const result = val1 | val2;
  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
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
  const result = val1 ^ val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
} //ADD C

function adi(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  const result = val1 + val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
} //Arithematic Inputs

function sui(operandsArray) {
  const val2 = parseInt(operandsArray[0], 16);
  const val1 = parseInt(A.innerHTML, 16);
  const result = val1 - val2;
  A.innerHTML = Math.abs(result).toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) {
    S_flag.innerHTML = 1;
    C_flag.innerHTML = 1;
  }
  if (result === 0) Z_flag.innerHTML = 1;
}

function ani(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  const result = val1 & val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
} //Logic Bit Manupulation Inst

function ori(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  const result = val1 | val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
}

function xri(operandsArray) {
  const val1 = parseInt(operandsArray[0], 16);
  const val2 = parseInt(A.innerHTML, 16);
  const result = val1 ^ val2;

  A.innerHTML = result.toString(16).toUpperCase();
  Parity_Flag_check(result);
  if (result < 0) S_flag.innerHTML = 1;
  if (result === 0) Z_flag.innerHTML = 1;
  if (result > 0xff) C_flag.innerHTML = 1;
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
  // const dec = parseInt(operandsArray[1], 16);
  // const p3 = document.querySelector(`.me${dec}`);
  // value = p3.textContent.padStart(4, "0");
  // console.log(value);
  switch (operandsArray[0]) {
    case "B":
      C.innerHTML = operandsArray[1].substring(2, 4);
      B.innerHTML = operandsArray[1].substring(0, 2);
      break;
    case "D":
      E.innerHTML = operandsArray[1].substring(2, 4);
      D.innerHTML = operandsArray[1].substring(0, 2);
      break;
    case "H":
    case "M":
      L.innerHTML = operandsArray[1].substring(2, 4);
      H.innerHTML = operandsArray[1].substring(0, 2);
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

function jmp(operandsArray) {
  console.log(operandsArray + " executed");
  instruction = labelMap.get(operandsArray[0] + ":")[1] - 1;
} //Branch inst

function jc(operandsArray) {
  if (C_flag.innerHTML == 1) jmp(operandsArray);
}

function jnc(operandsArray) {
  if (C_flag.innerHTML == 0) jmp(operandsArray);
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
  const incrementedValue = parseInt(temp.innerHTML, 16) + 1;
  temp.innerHTML = incrementedValue.toString(16).toUpperCase();
  Parity_Flag_check(incrementedValue);
  if (incrementedValue === 0) Z_flag.innerHTML = 1;
  if (incrementedValue > 0xff) C_flag.innerHTML = 1;
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
  const incrementedValue = parseInt(temp.innerHTML, 16) - 1;
  temp.innerHTML = incrementedValue.toString(16).toUpperCase();
  Parity_Flag_check(incrementedValue);
  if (incrementedValue === 0) Z_flag.innerHTML = 1;
  if (incrementedValue < 0) S_flag.innerHTML = 1;
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
  Parity_Flag_check(A.innerHTML);
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
  Parity_Flag_check(A.innerHTML);
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
  Parity_Flag_check(A.innerHTML);
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
  Parity_Flag_check(A.innerHTML);
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
function Parity_Flag_check(result) {
  const binaryResult = decimalToBinary(parseInt(result, 16));
  const setBitsCount = (binaryResult.match(/1/g) || []).length;
  if (setBitsCount % 2 === 0) P_flag.innerHTML = 1;
}
