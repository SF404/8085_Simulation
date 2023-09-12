const decimal = document.getElementById("decimal");
const hex = document.getElementById("hex");
const addr = document.getElementById("address");
const val = document.getElementById("value");
const sel = document.getElementById("dropdown");
const nameY = document.getElementById("name");

function decimalToHex() {
  hex.value = parseInt(decimal.value).toString(16).toUpperCase();
}

function hexToDecimal() {
  hex.value = hex.value.toUpperCase().padStart(4, "0");
  if (!/^[0-9A-F]{4}$/.test(hex.value) || hex.value.length > 4) {
    document.querySelector(".Output").innerHTML +=
      "HEX is not in the Range of (0000H-FFFFH)";
    return;
  }
  decimal.value = parseInt(hex.value, 16);
}
function updateName() {
  nameY.textContent = sel.value === "io" ? "I/O" : "Memory";
}
function updateData() {
  let msj;
  const outputDiv = document.querySelector(".Output");
  outputDiv.innerHTML = "";
  val.value = val.value.toUpperCase().padStart(2, "0");
  if (!/^[0-9A-F]{2}$/.test(val.value) || val.value.length > 2) {
    outputDiv.innerHTML += "Data is not in the Range of (00H-FFH)";
    return;
  }
  if (sel.value === "io") {
    addr.value = addr.value.toUpperCase().padStart(2, "0");
    if (!/^[0-9A-F]{2}$/.test(addr.value) || addr.value.length > 2) {
      outputDiv.innerHTML += "Port Address is not in the Range of (00H-FFH)";
      return;
    }
    const p3 = document.querySelector(`.io${parseInt(addr.value, 16)}`);
    p3.textContent = val.value;
    msj = `Port Updated at ${addr.value}H`;
  } else {
    addr.value = addr.value.toUpperCase().padStart(4, "0");
    if (!/^[0-9A-F]{4}$/.test(addr.value) || addr.value.length > 4) {
      outputDiv.innerHTML +=
        "Memory Address is not in the Range of (0000H-FFFFH)";
      return;
    }
    const p3 = document.querySelector(`.me${parseInt(addr.value, 16)}`);
    p3.textContent = val.value;
    msj = `Memory Updated at ${addr.value}H`;
  }

  outputDiv.innerHTML += msj;
  return;
}
