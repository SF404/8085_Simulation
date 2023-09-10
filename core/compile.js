let index;
let opc = "tmp";
function tokenizeAndCompile(line, index) {
  k(index);
  const [instruction, ...operandArray] = line.trim().split(/\s+/);
  const operand = operandArray.join(" ").replace(/\s+/g, "");
  const Register = ["A", "B", "C", "D", "E", "H", "L"];
  const inst = instruction.toLowerCase();
  let comp;
  //total 74 opcodes

  switch (inst) {
    // Data Transfer
    case "mov": //MOV A,B
      $s();
      comp = onebyte(operand);
      break;
    case "add": //Arithematic Inputs
    case "sub":
    case "inr":
    case "dcr":
    case "ana": //Logic Bit Manupulation Inst
    case "ora":
    case "xra": //ADD C
      $s();
      comp = onebyteNoReg(operand);
      break;
    case "adi": //Arithematic Inputs
    case "sui":
    case "ani": //Logic Bit Manupulation Inst
    case "ori":
    case "xri":
    case "out":
    case "in": //ADI 34h
      $s();
      comp = multibyteNoReg(operand, 1);
      break;
    case "mvi": //MVI A,34h
      $s();
      comp = multibyte(operand, 1);
      break;
    case "lxi": //LXI A,3456h
      $s();
      comp = multibyte(operand, 2);
      break;
    case "lda":
    case "sta":
    case "jmp": //Branch inst
    case "jc":
    case "jnc":
    case "jz":
    case "jnz":
    case "jp":
    case "call": //LDA 3423h
      $s();
      comp = multibyteNoReg(operand, 2);
      break;
    case "ldax":
    case "stax":
    case "inx": //Arithematic Inputs
    case "dcx": //inx M
      $s();
      comp = regPair(operand);
      break;
    case "rlc": //Compare inst
    case "rrc":
    case "ral":
    case "rar":
    case "hlt": //Machine Ctrl Inst
    case "nop":
    case "return":
      $s();
      comp = !operand.length
        ? { success: true, machineCode: 1 }
        : { success: false, machineCode: "Must have empty Operand" };
      break;
    default:
      comp = { success: false, machineCode: "Opcode Not Found" };
      break;
  }
  return { success: comp.success, machineCode: comp.machineCode };

  function onebyte(operand) {
    const operandsArray = operand.split(",");
    const isValid = operandsArray.every((item) =>
      Register.includes(item.trim())
    );
    if (operandsArray.length !== 2) {
      return { success: false, machineCode: "There Must be two Register" };
    }
    if (isValid) {
      return { success: true, machineCode: 2 };
    } else return { success: false, machineCode: "Register Not Found" };
  }

  function onebyte(operand) {
    const operandsArray = operand.split(",");

    const isValid =
      operandsArray.every((item) => Register.includes(item.trim())) ||
      operandsArray[0] === "M" ||
      operandsArray[1] === "M";
    if (operandsArray.length !== 2) {
      return { success: false, machineCode: "There Must be two Register" };
    }
    console.log(operandsArray);
    if (isValid) {
      return { success: true, machineCode: 2 };
    } else return { success: false, machineCode: "Register Not Found" };
  }

  function multibyte(operand, hexByte) {
    const operandArray = operand.split(",");
    if (operandArray.length !== 2)
      return { success: false, machineCode: "Operand must be two byte" };
    if (!Register.includes(operandArray[0]))
      return { success: false, machineCode: "Register Not Found" };
    if (!checkHex(operandArray[1].trim(), hexByte))
      return { success: false, machineCode: "Invalid hexadecimal number" };
    return { success: true, machineCode: hexByte + 1 };
  }
  function onebyteNoReg(operand) {
    if (
      operand.length === 1 &&
      (operand[0] === "M" || Register.includes(operand))
    ) {
      if (operand[0] !== "A") {
        return { success: true, machineCode: index };
      }
      return { success: false, machineCode: "Accumulator cannot be added" };
    }
    return { success: false, machineCode: "Invalid operand" };
  }

  function multibyteNoReg(operand, hexByte) {
    if (checkHex(operand, hexByte)) {
      return { success: true, machineCode: hexByte + 1 };
    }
    return { success: false, machineCode: "Invalid hexadecimal number" };
  }
  function regPair(operand) {
    if (!operand.length)
      return {
        success: false,
        machineCode: "Operand must be only one register pair",
      };
    if (
      operand[0] === "B" ||
      operand[0] === "D" ||
      operand[0] === "H" ||
      operand[0] === "M" ||
      operand[0] === "SP"
    ) {
      return {
        success: true,
        machineCode: 1,
      };
    }
    return {
      success: false,
      machineCode: "Register Pair not recognizable",
    };
  }

  function checkHex(inputString, num = 2) {
    const hexPattern =
      num === 2 ? /^(0x)?[0-9A-Fa-f]{1,4}h$/ : /^[0-9A-Fa-f]{2}h$/;
    if (hexPattern.test(inputString) && inputString.length === 5 && num === 2) {
      $s(parseInt(inputString.substring(2, 4)));
      $s(parseInt(inputString.substring(0, 2)));
      return true;
    } else if (
      hexPattern.test(inputString) &&
      inputString.length === 3 &&
      num === 1
    ) {
      $s(parseInt(inputString.substring(0, 2)));
      return true;
    }
    return false;
  }
}
function $s(data = false) {
  const p3 = document.querySelector(`.me${index}`);
  p3.textContent = !data ? opc : data;
  index++;
}
function k(ind) {
  index = ind;
}
