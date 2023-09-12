function tokenizeAndCompile(line) {
  const [instruction, ...operandArray] = line.trim().split(/\s+/);
  const operand = operandArray.join(" ").replace(/\s+/g, "");
  const Register = ["A", "B", "C", "D", "E", "H", "L"];
  const inst = instruction.toLowerCase();
  let comp;
  //total 74 opcodes

  switch (inst) {
    // Data Transfer
    case "mov": //MOV A,B
      $s(inst);
      comp = onebyte(operand);
      break;
    case "add": //Arithematic Inputs
    case "sub":
    case "inr":
    case "dcr":
    case "ana": //Logic Bit Manupulation Inst
    case "ora":
    case "xra": //ADD C
      $s(inst);
      comp = onebyteNoReg(operand);
      break;
    case "adi": //Arithematic Inputs
    case "sui":
    case "ani": //Logic Bit Manupulation Inst
    case "ori":
    case "xri":
    case "out":
    case "in": //ADI 34h
      $s(inst);
      comp = multibyteNoReg(operand, 1);
      break;
    case "mvi": //MVI A,34h
      $s(inst);
      comp = multibyte(operand, 1);
      break;
    case "lxi": //LXI A,3456h
      $s(inst);
      comp = multibyte(operand, 2);
      break;
    case "jmp": //Branch inst
    case "jc":
    case "jnc":
    case "jz":
    case "jnz":
    case "jp":
      // $s(inst);
      comp = label(operand);
      break;
    case "lda":
    case "sta":
    case "call": //LDA 3423h
      $s(inst);
      comp = multibyteNoReg(operand, 2);
      break;
    case "ldax":
    case "stax":
    case "inx": //Arithematic Inputs
    case "dcx": //inx M
      $s(inst);
      comp = regPair(operand);
      break;
    case "rlc": //Compare inst
    case "rrc":
    case "ral":
    case "rar":
    case "hlt": //Machine Ctrl Inst
    case "nop":
    case "return":
      $s(inst);
      comp = !operand.length
        ? { success: true, machineCode: 1 }
        : { success: false, machineCode: "Must have empty Operand" };
      break;
    default:
      if (!instruction.endsWith(":")) {
        return {
          success: false,
          machineCode: `${instruction}Opcode or Label is unknown `,
        };
      } else {
        if (labelMap.get(instruction) == undefined) {
          const data = localStorage.getItem("code").split("\n");
          const labelCood = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].includes(instruction.slice(0, -1))) {
              labelCood.push(i);
            }
          }
          if (labelCood.length === 2) {
            const temp = labelCood[0];
            labelCood[0] = labelCood[1];
            labelCood[1] = temp;
            labelMap.set(instruction, labelCood);
            console.log(labelMap);
            return {
              success: true,
              label: `${instruction} updated`,
            };
          }
          return {
            success: false,
            machineCode: `cannot find the initialiazed label ${instruction}`,
          };
        } else {
          const obj = tokenizeAndCompile(operandArray.join(" "));
          return {
            success: obj.success,
            machineCode: obj.machineCode,
          };
        }
      }
  }
  return { success: comp.success, machineCode: comp.machineCode };

  function onebyte(operand) {
    const temp = [...Register];
    temp.push("M");
    const operandsArray = operand.split(",");

    const isValid = operandsArray.every((item) => temp.includes(item.trim()));
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
      return { success: true, machineCode: "Compile Sccessfully" };
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
  function label(operand) {
    if (operand.endsWith(":"))
      return {
        success: false,
        machineCode: `initialing laber cannot ends with ':'`,
      };
    if (labelMap.get(operand + ":") != undefined) {
      return {
        success: true,
        label: `${operand} updated`,
      };
    }
    const data = localStorage.getItem("code").split("\n");
    const labelCood = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].includes(operand)) labelCood.push(i);
    }
    if (labelCood.length === 2) {
      labelMap.set(operand + ":", labelCood);
      return {
        success: true,
        label: `${operand} updated`,
      };
    }
    return {
      success: false,
      machineCode: "Address of the label cannot found",
    };
  }

  function checkHex(inputString, num = 2) {
    const hexPattern =
      num === 2 ? /^(0x)?[0-9A-Fa-f]{1,4}h$/ : /^[0-9A-Fa-f]{2}h$/;
    if (hexPattern.test(inputString) && inputString.length === 5 && num === 2) {
      $s(inputString.substring(2, 4));
      $s(inputString.substring(0, 2));

      return true;
    } else if (
      hexPattern.test(inputString) &&
      inputString.length === 3 &&
      num === 1
    ) {
      $s(inputString.substring(0, 2));
      return true;
    }
    return false;
  }
}
function $s(data = false) {
  const p3 = document.querySelector(`.me${localCounter}`);
  p3.textContent = data;
  localCounter += 1;
}
