var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "8085", // Set to the assembly language mode you've created
  theme: "dracula", // Choose your preferred theme
  lineNumbers: true, // Show line numbers
  autofocus: true, // Automatically focus on the editor when the page loads
  indentUnit: 4, // Indent using 4 spaces
  matchBrackets: true, // Highlight matching brackets
  autoCloseBrackets: true, // Automatically close brackets
});
let instruction = 0;
let localCounter = 100;
let labelMap = new Map();
let instructionsArray = [];
const Sdata = localStorage.getItem("code");
if (Sdata !== null) editor.setValue(Sdata);
document.getElementById("compile").addEventListener("click", function () {
  const start = localCounter;
  localStorage.setItem("code", editor.getValue());
  const assemblyCode = editor.getValue().split("\n");
  const outputDiv = document.querySelector(".Output");
  outputDiv.innerHTML = "";
  let flag = 1;
  for (let i = 0; i < assemblyCode.length; i++) {
    const line = assemblyCode[i];
    instructionsArray.push(line);
    if (line == "" || line.startsWith(";")) continue;
    const result = tokenizeAndCompile(line);
    const machineCode = result.machineCode;
    if (result.success) {
      const StartHex = start.toString(16).toUpperCase().padStart(4, "0");
      $("Pgr").innerHTML = StartHex.substring(0, 2);
      $("Ctr").innerHTML = StartHex.substring(2, 4);
      outputDiv.innerHTML += `<p>Line ${i + 1
        }: "Instructions are stored from memory address 0x0064"</p>`;
    } else {
      flag = 0;
      outputDiv.innerHTML += `<p>Line ${i + 1}: ${machineCode}</p>`;
      break;
    }
  }
  if (flag) {
    document.getElementById("compile").classList.toggle("hide")
    document.getElementById("run").classList.toggle("hide")

  }
  console.log(instructionsArray);
  console.log(labelMap);
});
document.getElementById("run").addEventListener("click", function () {
  const assemblyCode = editor.getValue().split("\n");
  while (instruction < assemblyCode.length) {
    const line = assemblyCode[instruction];
    instruction++;
  }
  document.getElementById("compile").classList.toggle("hide")
  document.getElementById("run").classList.toggle("hide")
});

function appendAddressElement(container, hexAddress, k) {
  const div = document.createElement("div");
  div.className = "addr";
  const p1 = document.createElement("p");
  p1.textContent = `${hexAddress}`;
  const decimalAddress = parseInt(hexAddress, 16);
  const p2 = document.createElement("p");
  p2.textContent = `${decimalAddress}`;

  const p3 = document.createElement("p");
  p3.textContent = 0;
  p3.classList.add(`${k}${decimalAddress}`);
  // console.log(k + decimalAddress);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);

  container.appendChild(div);
}

const container1 = document.getElementById("scroll_mem");
const container2 = document.getElementById("scroll_io");
for (let i = 0; i < 4096; i++) {
  const hexAddress = i.toString(16).toUpperCase().padStart(4, "0");
  appendAddressElement(container1, hexAddress, "me");
}
for (let i = 0; i < 256; i++) {
  const hexAddress = i.toString(16).toUpperCase().padStart(2, "0");
  appendAddressElement(container2, hexAddress, "io");
}

const close_model_button = document.querySelector(".close_model");
close_model_button.addEventListener("click", () => {
  const model = document.getElementById("model");
  model.classList.add("hide");
});

function loadHelp() {
  const model = document.getElementById("model");
  model.classList.remove("hide");
}
function loadHelp() {
  const model = document.getElementById("model");
  model.classList.remove("hide");
}
function Github() {
  window.open("https://github.com/rmrajesofficial/8085_Simulation", "_blank");
}

function resetAll() {
  window.location.reload();
}
