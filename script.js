// import { tokenizeAndCompile } from "./core/compile.js";
// import { opcodeFetch } from "./core/alu.js";
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "8085", // Set to the assembly language mode you've created
  theme: "dracula", // Choose your preferred theme
  lineNumbers: true, // Show line numbers
  autofocus: true, // Automatically focus on the editor when the page loads
  indentUnit: 4, // Indent using 4 spaces
  matchBrackets: true, // Highlight matching brackets
  autoCloseBrackets: true, // Automatically close brackets
});
document.getElementById("compile").addEventListener("click", function () {
  let index = 100;
  const assemblyCode = editor.getValue().split("\n");
  const outputDiv = document.querySelector(".Output");
  outputDiv.innerHTML = "";
  for (let i = 0; i < assemblyCode.length; i++) {
    const line = assemblyCode[i];
    const result = tokenizeAndCompile(line, index);
    const machineCode = result.machineCode;
    if (result.success) {
      index += machineCode;
      outputDiv.innerHTML += `<p>Line ${
        i + 1
      }: "Instructions are stored from memory address 0x0064"</p>`;
    } else outputDiv.innerHTML += `<p>Line ${i + 1}: ${machineCode}</p>`;
  }
});
document.getElementById("run").addEventListener("click", function () {
  const assemblyCode = editor.getValue().split("\n");
  // const outputDiv = document.querySelector(".Output");
  // outputDiv.innerHTML = "";
  for (let i = 0; i < assemblyCode.length; i++) {
    const line = assemblyCode[i];
    const result = opcodeFetch(line);
    // const machineCode = result.machineCode;
    // if (result.success) {
    //   console.log(index);
    //   index += machineCode;
    //   outputDiv.innerHTML += `<p>Line ${
    //     i + 1
    //   }: "Instructions are stored from memory address 0x0064"</p>`;
    // } else outputDiv.innerHTML += `<p>Line ${i + 1}: ${machineCode}</p>`;
  }
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
  appendAddressElement(container2, hexAddress, "io");
}
