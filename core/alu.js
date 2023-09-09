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
let p_flag = $("p_flag");
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
    case "jn":
      jn(operandsArray);
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

function add(operandsArray) {} //Arithematic Inputs

function sub(operandsArray) {}

function inr(operandsArray) {}

function dcr(operandsArray) {}

function ana(operandsArray) {} //Logic Bit Manupulation Inst

function ora(operandsArray) {}

function xra(operandsArray) {} //ADD C

function adi(operandsArray) {} //Arithematic Inputs

function sui(operandsArray) {}

function ani(operandsArray) {} //Logic Bit Manupulation Inst

function ori(operandsArray) {}

function xri(operandsArray) {}

function out(operandsArray) {}

function in_(operandsArray) {} //ADI 34h

function mvi(operandsArray) {
  console.log(operandsArray);
}

function lxi(operandsArray) {
  console.log("working");
}
function lda(operandsArray) {}

function sta(operandsArray) {}

function jmp(operandsArray) {} //Branch inst

function jc(operandsArray) {}

function jnc(operandsArray) {}

function jz(operandsArray) {}

function jnz(operandsArray) {}

function jp(operandsArray) {}

function jn(operandsArray) {}

function call(operandsArray) {} //LDA 3423h

function ldax(operandsArray) {}

function stax(operandsArray) {}

function inx(operandsArray) {} //Arithematic Inputs

function dcx(operandsArray) {}

function rlc() {}

function rrc() {}

function ral() {}

function rar() {}

function hlt() {}

function nop() {}

function return_() {}
