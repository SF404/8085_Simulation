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
  decimal.value = parseInt(hex.value, 16);
  hex.value = hex.value.toUpperCase();
}
function updateName() {
  nameY.textContent = sel.value === "io" ? "I/O" : "Memory";
}
function updateData() {
  let msj;
  const outputDiv = document.querySelector(".Output");
  outputDiv.innerHTML = "";
  if (addr.value > 1000) {
    msj = "Memory Overflow";
    outputDiv.innerHTML = msj;
    return;
  }
  if (sel.value === "io") {
    const p3 = document.querySelector(`.io${addr.value}`);
    p3.textContent = val.value;
    msj = "Port Updated";
  } else {
    const p3 = document.querySelector(`.me${addr.value}`);
    p3.textContent = val.value;
    msj = "Memory Updated";
  }

  outputDiv.innerHTML = msj;
  return;
}
