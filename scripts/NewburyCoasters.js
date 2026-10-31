"use strict";

// declaring variables:

let viewportWidth;
let viewportHeight;
let begOfPage;
let userInputTitle;
let divToCreateSpace;
let optimalHeight;
let allSwitches;
let allLabels;
let allFieldsets;

// SVG:
let SVGinDiv;
let SVGDiv;
let WovenMotifSVG;
let svgHeight = 0;
let svgWidth = 0;
let viewBox;
let numberOfColors = "2";
let svgOldWidth = 0;
let svgOldHeight = 0;

let motifPicker;
let pickedMotif;

// choosing colors:
let MC1pickerBtn;
let CC1pickerBtn;
let letterColorPickerBtn;

let restarWidth;
let sumarWidth;
let svgNewWidth;
let svgNewHeight;
let MC1hexDisplay;
let CC1hexDisplay;
let letterColorHexDisplay;


// Diamond Duet Collection:
let drawcross;
let motifDiamondDuetMitts_A;
let motifDiamondDuetMitts_B;
let selectedMotif;
let drawcross_innerHTML;
let motifDiamondDuetMitts_B_innerHTML;
let selectedMotif_innerHTML = drawcross_innerHTML;

/* let motifDiamondDuet_CowlHat_topBox_innerHTML;
let motifDiamondDuet_CowlHat_leftBox_innerHTML;
let motifDiamondDuet_CowlHat_rightBox_innerHTML;
let motifDiamondDuet_CowlHat_bottomBoxA_innerHTML;
let motifDiamondDuet_CowlHat_bottomBoxB_innerHTML;

let motifDiamondDuetMitts_A_topBox_innerHTML;
let motifDiamondDuetMitts_A_leftBox_innerHTML;
let motifDiamondDuetMitts_A_rightBox_innerHTML;
let motifDiamondDuetMitts_A_bottomBoxA_innerHTML;
let motifDiamondDuetMitts_A_bottomBoxB_innerHTML;

let motifDiamondDuetMitts_B_topBox_innerHTML;
let motifDiamondDuetMitts_B_leftBox_innerHTML;
let motifDiamondDuetMitts_B_rightBox_innerHTML;
let motifDiamondDuetMitts_B_bottomBoxA_innerHTML;
let motifDiamondDuetMitts_B_bottomBoxB_innerHTML; */
// end of Newbury Coasters Collection.

//colors
let pickedMC1 = "#000080";
let pickedCC1 = "#6f4d23";
let pickedLetterColor = "#000000"
let textColor = "#13203d"
let MC1_swatchTitle;
let CC1_swatchTitle;
let letterColor_swatchTitle;
let resetColorsDiv;
let resetColorsBtn;
let chooseNewColorsBtn;
/* let createBoxesBtn; */
let Title_chooseColors;

// accordions:
let accArray;

window.onload = init();

function init() {
  getDOMelements();
}

function getDOMelements() {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  begOfPage = document.querySelector("#begOfPage");
  divToCreateSpace = document.querySelector(".space");
  WovenMotifSVG = document.querySelector("#WovenMotifSVG");
  MC1pickerBtn = document.querySelector("#colorPickerMC1");
  CC1pickerBtn = document.querySelector("#colorPickerCC1");
  letterColorPickerBtn = document.querySelector("#colorPickerText")
  resetColorsDiv = document.querySelector("#resetColorsDiv");
  resetColorsBtn = document.querySelector("#resetColorsBtn");
  chooseNewColorsBtn = document.querySelector("#chooseNewColorsBtn");
  MC1_swatchTitle = document.querySelector("#MC1_swatchTitle");
  CC1_swatchTitle = document.querySelector("#CC1_swatchTitle");
  CC1_swatchTitle = document.querySelector("#letterColor_swatchTitle");
  MC1hexDisplay = document.querySelector("#MC1hexCode");
  CC1hexDisplay = document.querySelector("#CC1hexCode");
  letterColorHexDisplay = document.querySelector("#letterColorHexCode");
  accArray = document.getElementsByClassName("accordion");

  motifPicker = document.querySelector("#motifPickerDropDown");
  SVGinDiv = document.querySelector("#SVGinDiv");
  SVGDiv = document.querySelector("#WovenMotifSVG");
  Title_chooseColors = document.querySelector("#Title_chooseColors");
  addEventListeners();
  chooseMotifColors();
  giveColorValueToSwatches();
  accordions();
  defaultSVG();
}

function disableBtn(button) {
  button.disabled = true;
  button.classList.add("disabledBtn");
  button.classList.remove("hidden");
}

function hideBtn(button) {
  button.disabled = true;
  button.classList.add("disabledBtn");
  button.classList.add("hidden");
}

function enableBtn(button) {
  button.disabled = false;
  button.classList.remove("disabledBtn");
  button.classList.remove("hidden");
}

function addEventListeners() {
  MC1pickerBtn.addEventListener("change", changeMC1);
  CC1pickerBtn.addEventListener("change", changeCC1);
  letterColorPickerBtn.addEventListener("change", changeletterColor);
  resetColorsBtn.addEventListener("click", resetColours);
  motifPicker.addEventListener("change", createSVGwithBoxes);
}

function defaultSVG() {
  console.log("function defaultSVG executed");
  cleanSVGandBoxes();
}

function cleanSVGandBoxes() {
  console.log("function cleanSVGandBoxes executed");
  pickSVG();
}

function resetColours() {
  pickedMC1 = "#000080"; //
  pickedCC1 = "#6f4d23"; //
  pickedLetterColor = "#000000"
  localStorage.MC1 = pickedMC1;
  localStorage.CC1 = pickedCC1;
  localStorage.letterColor = pickedLetterColor;
  giveColorValueToSwatches();
  updatePickedColors(pickedMC1, pickedCC1, pickedLetterColor);
}

function giveColorValueToSwatches() {
  if (localStorage_MC1 !== null) {
    pickedMC1 = localStorage.MC1;
    MC1pickerBtn.value = pickedMC1;
  } else {
    MC1pickerBtn.value = pickedMC1;
  }

  if (localStorage_CC1 !== null) {
    pickedCC1 = localStorage.CC1;
    CC1pickerBtn.value = pickedCC1;
  } else {
    CC1pickerBtn.value = pickedCC1;
  }

  if (localStorage_letterColor !== null) {
    pickedLetterColor = localStorage.letterColor;
    letterColorPickerBtn.value = pickedLetterColor;
  } else {
    letterColorPickerBtn.value = pickedLetterColor;
  }
}

// accordions:
function accordions() {
  for (let i = 0; i < accArray.length; i++) {
    accArray[i].addEventListener("click", toggleAccordions);
  }
}

function toggleAccordions() {
  this.classList.toggle("active");
  let panel = this.nextElementSibling;
  if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
    panel.style.maxHeight = `0px`;
    if (panel.id == "socials") {
      panel.style.padding = "0px";
    }
  } else {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    if (panel.class == "intro") {
      panel.style.maxHeight = `${panel.scrollHeight + 2000}px`;
    }
    if (panel.id == "socials") {
      panel.style.padding = "16px";
      panel.style.maxHeight = `${panel.scrollHeight + 16}px`;
      document.getElementById("socials").focus();
    }
  }
}

// picking MC and CC:
function chooseMotifColors() {
  if (localStorage.MC1) {
    pickedMC1 = localStorage.MC1;
  } else {
    pickedMC1 = "#000080";
  }

  if (localStorage.CC1) {
    pickedCC1 = localStorage.CC1;
  } else {
    pickedCC1 = "#6f4d23";
  }

  if (localStorage.letterColor) {
    pickedLetterColor = localStorage.letterColor;
  } else {
    pickedLetterColor = "#000000";
  }
  updateHEXcodeDisplay(pickedMC1, pickedCC1, pickedLetterColor);
  updateSVG_innerHTML();
  pickSVG();
}

function updateHEXcodeDisplay(pickedMC1, pickedCC1, pickedLetterColor) {
  MC1hexDisplay.innerHTML = `hex: ${pickedMC1}`;
  CC1hexDisplay.innerHTML = `hex: ${pickedCC1}`;
  letterColorHexDisplay.innerHTML = `hex: #13203d`
}

function changeMC1() {
  pickedMC1 = MC1pickerBtn.value;
  updatePickedColors(pickedMC1, pickedCC1, pickedLetterColor);
  localStorage_MC1();
}

function changeCC1() {
  pickedCC1 = CC1pickerBtn.value;
  updatePickedColors(pickedMC1, pickedCC1, pickedLetterColor);
  localStorage_CC1();
}

function changeletterColor() {
  pickedLetterColor = letterColorPickerBtn.value;
  updatePickedColors(pickedMC1, pickedCC1, pickedLetterColor);
  localStorage_letterColor();
}

function updatePickedColors(pickedMC1, pickedCC1, pickedLetterColor) {
  MC1pickerBtn.value = pickedMC1;
  CC1pickerBtn.value = pickedCC1;
  letterColorPickerBtn.value = pickedLetterColor;

  updateHEXcodeDisplay(pickedMC1, pickedCC1, pickedLetterColor);
  updateSVG_innerHTML();
  cleanSVGandBoxes();
}

function pickSVG() {
  selectedMotif = motifPickerDropDown.value;
  determinarSVGcharacteristics(selectedMotif);
  viewBox = `0 0 ${svgOldWidth} ${svgOldHeight}`;
  calculateSVGWidth(svgWidth);
  updateSVG_innerHTML();
  drawSVG(selectedMotif);
}

function determinarSVGcharacteristics() {
  console.log("🚀 ~ determinarSVGcharacteristics ~ selectedMotif:", selectedMotif)
  console.log(selectedMotif)
  switch (selectedMotif) {
    /* SVG: */
    case "drawcross":
      svgHeight = 600;
      svgWidth = 900;
      selectedMotif_innerHTML = drawcross_innerHTML;
      break;
    /* case "motifDiamondDuetMitts_A":
      svgHeight = ;
      svgWidth = ;
      selectedMotif_innerHTML = drawcross_innerHTML;
      break;
    case "motifDiamondDuetMitts_B":
      svgHeight = ;
      svgWidth = ;
      selectedMotif_innerHTML = drawcross_innerHTML;
      break;
    default:
      svgHeight = ;
      svgWidth = ;
      selectedMotif_innerHTML = drawcross_innerHTML;
      break; */
  }
  svgOldWidth = svgWidth;
  svgOldHeight = svgHeight;

}

function calculateSVGWidth(svgWidth) {
  viewportWidth = window.innerWidth;
  viewBox = `0 0 ${svgOldWidth} ${svgOldHeight}`;

  svgNewWidth = svgWidth;
  svgNewHeight = svgHeight;

  if (viewportWidth > viewportHeight) {
    if (viewportHeight < svgHeight) {
       svgNewHeight = viewportHeight * 0.9
      svgNewWidth = (svgNewHeight * svgWidth / svgHeight) 
    }
  }
  if (viewportHeight > viewportWidth) {
    svgNewWidth = viewportWidth * 0.9
    svgNewHeight = (svgNewWidth * svgHeight / svgWidth)
  }

  svgWidth = svgNewWidth;
  svgHeight = svgNewHeight

}

function drawSVG(selectedMotif) {
  updateSVG_innerHTML();
  SVGinDiv.innerHTML = `<svg id= "${selectedMotif}_svg" width="${svgNewWidth}" height="${svgNewHeight}" viewbox="${viewBox}"
    style="border:1px solid var(--color4); background-color:#ffffff"> 
    ${selectedMotif_innerHTML}
    </svg>`;
  WovenMotifSVG.appendChild(SVGinDiv);
  document.getElementById("svgChartDiv").focus();
}

function createSVGwithBoxes() {
  hideBtn(resetColorsDiv);
  resetColorsDiv.remove();
  selectedMotif = motifPickerDropDown.value;
  cleanSVGandBoxes();
  drawSVGwithBoxes();
  resetColorsDiv.remove();
}

function drawSVGwithBoxes() {
  selectedMotif = motifPickerDropDown.value;
  createSVG()
  document.getElementById("svgChartDiv").focus();
}

function createSVG() {
  SVGinDiv.innerHTML = `<svg id= "${selectedMotif}_svg" width="${svgNewWidth}" height="${svgNewHeight}" viewbox="${viewBox}"
    style="border:1px solid var(--color4); background-color:#ffffff"> 
    ${selectedMotif_innerHTML}
    </svg>`;
  WovenMotifSVG.appendChild(SVGinDiv);
  SVGDiv.classList.add("grid");
}

function updateSVG_innerHTML() {
  drawcross_innerHTML = ` 
    <polygon points="0,0 0,600 900,600 900,0 " fill= "white" stroke="black" />
<polygon points="700,585 685,600 650,600 650,565 665,550 700,550 "  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="585" x2="685" y2="600" stroke="black" />  /13  <line x1="665" y1="550" x2="650" y2="565" stroke="black" /> /13 <polygon points="700,550 700,585 699,586 664,551 665,550"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="700,550 700,515 699,514 664,549 665,550"  fill="${pickedCC1}" stroke="none" /> /13 
 /13  /13 <polygon points="586,501 649,564 614,599 551,536"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="585" y1="500" x2="650" y2="565" stroke="black" /> /13  <line x1="550" y1="535" x2="615" y2="600" stroke="black" /> /13 <polygon points="649,536 586,599 551,564 614,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="565" x2="615" y2="500" stroke="black" /> /13  <line x1="585" y1="600" x2="650" y2="535" stroke="black" />/13  /13 <polygon points="550,600 550,565 551,564 586,599 585,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="650,600 650,565 649,564 614,599 615,600 "  fill="${pickedMC1}" stroke="none" />
 /13  /13 <polygon points="486,501 549,564 514,599 451,536"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="485" y1="500" x2="550" y2="565" stroke="black" /> /13  <line x1="450" y1="535" x2="515" y2="600" stroke="black" /> /13 <polygon points="549,536 486,599 451,564 514,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="565" x2="515" y2="500" stroke="black" /> /13  <line x1="485" y1="600" x2="550" y2="535" stroke="black" />/13  /13 <polygon points="450,600 450,565 451,564 486,599 485,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="550,600 550,565 549,564 514,599 515,600 "  fill="${pickedCC1}" stroke="none" />
 /13  /13 <polygon points="386,501 449,564 414,599 351,536"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="385" y1="500" x2="450" y2="565" stroke="black" /> /13  <line x1="350" y1="535" x2="415" y2="600" stroke="black" /> /13 <polygon points="449,536 386,599 351,564 414,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="565" x2="415" y2="500" stroke="black" /> /13  <line x1="385" y1="600" x2="450" y2="535" stroke="black" />/13  /13 <polygon points="350,600 350,565 351,564 386,599 385,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="450,600 450,565 449,564 414,599 415,600 "  fill="${pickedMC1}" stroke="none" />
 /13  /13 <polygon points="349,536 286,599 251,564 314,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="565" x2="315" y2="500" stroke="black" /> /13  <line x1="285" y1="600" x2="350" y2="535" stroke="black" /> /13 <polygon points="286,501 349,564 314,599 251,536"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="285" y1="500" x2="350" y2="565" stroke="black" /> /13  <line x1="250" y1="535" x2="315" y2="600" stroke="black" />/13  /13 <polygon points="250,600 250,565 251,564 286,599 285,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="350,600 350,565 349,564 314,599 315,600 "  fill="${pickedCC1}" stroke="none" />
 /13  /13 <polygon points="249,536 186,599 151,564 214,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="565" x2="215" y2="500" stroke="black" /> /13  <line x1="185" y1="600" x2="250" y2="535" stroke="black" /> /13 <polygon points="186,501 249,564 214,599 151,536"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="185" y1="500" x2="250" y2="565" stroke="black" /> /13  <line x1="150" y1="535" x2="215" y2="600" stroke="black" />/13  /13 <polygon points="150,600 150,565 151,564 186,599 185,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="250,600 250,565 249,564 214,599 215,600 "  fill="${pickedMC1}" stroke="none" />
 /13  /13 <polygon points="149,536 86,599 51,564 114,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="565" x2="115" y2="500" stroke="black" /> /13  <line x1="85" y1="600" x2="150" y2="535" stroke="black" /> /13 <polygon points="86,501 149,564 114,599 51,536"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="85" y1="500" x2="150" y2="565" stroke="black" /> /13  <line x1="50" y1="535" x2="115" y2="600" stroke="black" />/13  /13 <polygon points="50,600 50,565 51,564 86,599 85,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="150,600 150,565 149,564 114,599 115,600 "  fill="${pickedCC1}" stroke="none" />
<polygon points="0,585 15,600 50,600 50,565 35,550  0,550 "  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="585" x2="15" y2="600" stroke="black" />  /13  <line x1="35" y1="550" x2="50" y2="565" stroke="black" /> /13 <polygon points="0,550 0,515 1,514 36,549 35,550"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,550 0,585 1,586 36,551 35,550"  fill="${pickedMC1}" stroke="none" /> /13 
 /13  /13 <polygon points="699,486 636,549 601,514 664,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="515" x2="665" y2="450" stroke="black" /> /13  <line x1="635" y1="550" x2="700" y2="485" stroke="black" /> /13 <polygon points="636,451 699,514 664,549 601,486"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="635" y1="450" x2="700" y2="515" stroke="black" /> /13  <line x1="600" y1="485" x2="665" y2="550" stroke="black" />/13 
 /13  /13 <polygon points="599,486 536,549 501,514 564,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="515" x2="565" y2="450" stroke="black" /> /13  <line x1="535" y1="550" x2="600" y2="485" stroke="black" /> /13 <polygon points="536,451 599,514 564,549 501,486"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="535" y1="450" x2="600" y2="515" stroke="black" /> /13  <line x1="500" y1="485" x2="565" y2="550" stroke="black" />/13 
 /13  /13 <polygon points="499,486 436,549 401,514 464,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="515" x2="465" y2="450" stroke="black" /> /13  <line x1="435" y1="550" x2="500" y2="485" stroke="black" /> /13 <polygon points="436,451 499,514 464,549 401,486"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="435" y1="450" x2="500" y2="515" stroke="black" /> /13  <line x1="400" y1="485" x2="465" y2="550" stroke="black" />/13 
 /13  /13 <polygon points="399,486 336,549 301,514 364,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="515" x2="365" y2="450" stroke="black" /> /13  <line x1="335" y1="550" x2="400" y2="485" stroke="black" /> /13 <polygon points="336,451 399,514 364,549 301,486"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="335" y1="450" x2="400" y2="515" stroke="black" /> /13  <line x1="300" y1="485" x2="365" y2="550" stroke="black" />/13 
 /13  /13 <polygon points="236,451 299,514 264,549 201,486"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="235" y1="450" x2="300" y2="515" stroke="black" /> /13  <line x1="200" y1="485" x2="265" y2="550" stroke="black" /> /13 <polygon points="299,486 236,549 201,514 264,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="515" x2="265" y2="450" stroke="black" /> /13  <line x1="235" y1="550" x2="300" y2="485" stroke="black" />/13 
 /13  /13 <polygon points="136,451 199,514 164,549 101,486"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="135" y1="450" x2="200" y2="515" stroke="black" /> /13  <line x1="100" y1="485" x2="165" y2="550" stroke="black" /> /13 <polygon points="199,486 136,549 101,514 164,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="515" x2="165" y2="450" stroke="black" /> /13  <line x1="135" y1="550" x2="200" y2="485" stroke="black" />/13 
 /13  /13 <polygon points="36,451 99,514 64,549 1,486"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="35" y1="450" x2="100" y2="515" stroke="black" /> /13  <line x1="0" y1="485" x2="65" y2="550" stroke="black" /> /13 <polygon points="99,486 36,549 1,514 64,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="515" x2="65" y2="450" stroke="black" /> /13  <line x1="35" y1="550" x2="100" y2="485" stroke="black" />/13 
 /13  /13 
 /13 <polygon points="700,450 700,485 699,486 664,451 665,450"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="700,450 700,415 699,414 664,449 665,450"  fill="${pickedMC1}" stroke="none" /> /13 
 /13  /13 <polygon points="586,401 649,464 614,499 551,436"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="585" y1="400" x2="650" y2="465" stroke="black" /> /13  <line x1="550" y1="435" x2="615" y2="500" stroke="black" /> /13 <polygon points="649,436 586,499 551,464 614,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="465" x2="615" y2="400" stroke="black" /> /13  <line x1="585" y1="500" x2="650" y2="435" stroke="black" />/13 
 /13  /13 <polygon points="486,401 549,464 514,499 451,436"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="485" y1="400" x2="550" y2="465" stroke="black" /> /13  <line x1="450" y1="435" x2="515" y2="500" stroke="black" /> /13 <polygon points="549,436 486,499 451,464 514,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="465" x2="515" y2="400" stroke="black" /> /13  <line x1="485" y1="500" x2="550" y2="435" stroke="black" />/13 
 /13  /13 <polygon points="386,401 449,464 414,499 351,436"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="385" y1="400" x2="450" y2="465" stroke="black" /> /13  <line x1="350" y1="435" x2="415" y2="500" stroke="black" /> /13 <polygon points="449,436 386,499 351,464 414,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="465" x2="415" y2="400" stroke="black" /> /13  <line x1="385" y1="500" x2="450" y2="435" stroke="black" />/13 
 /13  /13 <polygon points="349,436 286,499 251,464 314,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="465" x2="315" y2="400" stroke="black" /> /13  <line x1="285" y1="500" x2="350" y2="435" stroke="black" /> /13 <polygon points="286,401 349,464 314,499 251,436"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="285" y1="400" x2="350" y2="465" stroke="black" /> /13  <line x1="250" y1="435" x2="315" y2="500" stroke="black" />/13 
 /13  /13 <polygon points="249,436 186,499 151,464 214,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="465" x2="215" y2="400" stroke="black" /> /13  <line x1="185" y1="500" x2="250" y2="435" stroke="black" /> /13 <polygon points="186,401 249,464 214,499 151,436"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="185" y1="400" x2="250" y2="465" stroke="black" /> /13  <line x1="150" y1="435" x2="215" y2="500" stroke="black" />/13 
 /13  /13 <polygon points="149,436 86,499 51,464 114,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="465" x2="115" y2="400" stroke="black" /> /13  <line x1="85" y1="500" x2="150" y2="435" stroke="black" /> /13 <polygon points="86,401 149,464 114,499 51,436"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="85" y1="400" x2="150" y2="465" stroke="black" /> /13  <line x1="50" y1="435" x2="115" y2="500" stroke="black" />/13 
 /13 <polygon points="0,450 0,415 1,414 36,449 35,450"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,450 0,485 1,486 36,451 35,450"  fill="${pickedCC1}" stroke="none" /> /13 
 /13  /13 <polygon points="699,386 636,449 601,414 664,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="415" x2="665" y2="350" stroke="black" /> /13  <line x1="635" y1="450" x2="700" y2="385" stroke="black" /> /13 <polygon points="636,351 699,414 664,449 601,386"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="635" y1="350" x2="700" y2="415" stroke="black" /> /13  <line x1="600" y1="385" x2="665" y2="450" stroke="black" />/13 
 /13  /13 <polygon points="599,386 536,449 501,414 564,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="415" x2="565" y2="350" stroke="black" /> /13  <line x1="535" y1="450" x2="600" y2="385" stroke="black" /> /13 <polygon points="536,351 599,414 564,449 501,386"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="535" y1="350" x2="600" y2="415" stroke="black" /> /13  <line x1="500" y1="385" x2="565" y2="450" stroke="black" />/13 
 /13  /13 <polygon points="499,386 436,449 401,414 464,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="415" x2="465" y2="350" stroke="black" /> /13  <line x1="435" y1="450" x2="500" y2="385" stroke="black" /> /13 <polygon points="436,351 499,414 464,449 401,386"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="435" y1="350" x2="500" y2="415" stroke="black" /> /13  <line x1="400" y1="385" x2="465" y2="450" stroke="black" />/13 
 /13  /13 <polygon points="336,351 399,414 364,449 301,386"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="335" y1="350" x2="400" y2="415" stroke="black" /> /13  <line x1="300" y1="385" x2="365" y2="450" stroke="black" /> /13 <polygon points="399,386 336,449 301,414 364,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="415" x2="365" y2="350" stroke="black" /> /13  <line x1="335" y1="450" x2="400" y2="385" stroke="black" />/13 
 /13  /13 <polygon points="236,351 299,414 264,449 201,386"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="235" y1="350" x2="300" y2="415" stroke="black" /> /13  <line x1="200" y1="385" x2="265" y2="450" stroke="black" /> /13 <polygon points="299,386 236,449 201,414 264,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="415" x2="265" y2="350" stroke="black" /> /13  <line x1="235" y1="450" x2="300" y2="385" stroke="black" />/13 
 /13  /13 <polygon points="136,351 199,414 164,449 101,386"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="135" y1="350" x2="200" y2="415" stroke="black" /> /13  <line x1="100" y1="385" x2="165" y2="450" stroke="black" /> /13 <polygon points="199,386 136,449 101,414 164,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="415" x2="165" y2="350" stroke="black" /> /13  <line x1="135" y1="450" x2="200" y2="385" stroke="black" />/13 
 /13  /13 <polygon points="36,351 99,414 64,449 1,386"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="35" y1="350" x2="100" y2="415" stroke="black" /> /13  <line x1="0" y1="385" x2="65" y2="450" stroke="black" /> /13 <polygon points="99,386 36,449 1,414 64,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="415" x2="65" y2="350" stroke="black" /> /13  <line x1="35" y1="450" x2="100" y2="385" stroke="black" />/13 
 /13  /13 
 /13 <polygon points="700,350 700,385 699,386 664,351 665,350"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="700,350 700,315 699,314 664,349 665,350"  fill="${pickedCC1}" stroke="none" /> /13 
 /13  /13 <polygon points="586,301 649,364 614,399 551,336"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="585" y1="300" x2="650" y2="365" stroke="black" /> /13  <line x1="550" y1="335" x2="615" y2="400" stroke="black" /> /13 <polygon points="649,336 586,399 551,364 614,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="365" x2="615" y2="300" stroke="black" /> /13  <line x1="585" y1="400" x2="650" y2="335" stroke="black" />/13 
 /13  /13 <polygon points="486,301 549,364 514,399 451,336"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="485" y1="300" x2="550" y2="365" stroke="black" /> /13  <line x1="450" y1="335" x2="515" y2="400" stroke="black" /> /13 <polygon points="549,336 486,399 451,364 514,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="365" x2="515" y2="300" stroke="black" /> /13  <line x1="485" y1="400" x2="550" y2="335" stroke="black" />/13 
 /13  /13 <polygon points="386,301 449,364 414,399 351,336"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="385" y1="300" x2="450" y2="365" stroke="black" /> /13  <line x1="350" y1="335" x2="415" y2="400" stroke="black" /> /13 <polygon points="449,336 386,399 351,364 414,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="365" x2="415" y2="300" stroke="black" /> /13  <line x1="385" y1="400" x2="450" y2="335" stroke="black" />/13 
 /13  /13 <polygon points="349,336 286,399 251,364 314,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="365" x2="315" y2="300" stroke="black" /> /13  <line x1="285" y1="400" x2="350" y2="335" stroke="black" /> /13 <polygon points="286,301 349,364 314,399 251,336"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="285" y1="300" x2="350" y2="365" stroke="black" /> /13  <line x1="250" y1="335" x2="315" y2="400" stroke="black" />/13 
 /13  /13 <polygon points="249,336 186,399 151,364 214,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="365" x2="215" y2="300" stroke="black" /> /13  <line x1="185" y1="400" x2="250" y2="335" stroke="black" /> /13 <polygon points="186,301 249,364 214,399 151,336"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="185" y1="300" x2="250" y2="365" stroke="black" /> /13  <line x1="150" y1="335" x2="215" y2="400" stroke="black" />/13 
 /13  /13 <polygon points="149,336 86,399 51,364 114,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="365" x2="115" y2="300" stroke="black" /> /13  <line x1="85" y1="400" x2="150" y2="335" stroke="black" /> /13 <polygon points="86,301 149,364 114,399 51,336"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="85" y1="300" x2="150" y2="365" stroke="black" /> /13  <line x1="50" y1="335" x2="115" y2="400" stroke="black" />/13 
 /13 <polygon points="0,350 0,315 1,314 36,349 35,350"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,350 0,385 1,386 36,351 35,350"  fill="${pickedMC1}" stroke="none" /> /13 
 /13  /13 <polygon points="636,251 699,314 664,349 601,286"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="635" y1="250" x2="700" y2="315" stroke="black" /> /13  <line x1="600" y1="285" x2="665" y2="350" stroke="black" /> /13 <polygon points="699,286 636,349 601,314 664,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="315" x2="665" y2="250" stroke="black" /> /13  <line x1="635" y1="350" x2="700" y2="285" stroke="black" />/13 
 /13  /13 <polygon points="599,286 536,349 501,314 564,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="315" x2="565" y2="250" stroke="black" /> /13  <line x1="535" y1="350" x2="600" y2="285" stroke="black" /> /13 <polygon points="536,251 599,314 564,349 501,286"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="535" y1="250" x2="600" y2="315" stroke="black" /> /13  <line x1="500" y1="285" x2="565" y2="350" stroke="black" />/13 
 /13  /13 <polygon points="499,286 436,349 401,314 464,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="315" x2="465" y2="250" stroke="black" /> /13  <line x1="435" y1="350" x2="500" y2="285" stroke="black" /> /13 <polygon points="436,251 499,314 464,349 401,286"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="435" y1="250" x2="500" y2="315" stroke="black" /> /13  <line x1="400" y1="285" x2="465" y2="350" stroke="black" />/13 
 /13  /13 <polygon points="336,251 399,314 364,349 301,286"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="335" y1="250" x2="400" y2="315" stroke="black" /> /13  <line x1="300" y1="285" x2="365" y2="350" stroke="black" /> /13 <polygon points="399,286 336,349 301,314 364,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="315" x2="365" y2="250" stroke="black" /> /13  <line x1="335" y1="350" x2="400" y2="285" stroke="black" />/13 
 /13  /13 <polygon points="299,286 236,349 201,314 264,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="315" x2="265" y2="250" stroke="black" /> /13  <line x1="235" y1="350" x2="300" y2="285" stroke="black" /> /13 <polygon points="236,251 299,314 264,349 201,286"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="235" y1="250" x2="300" y2="315" stroke="black" /> /13  <line x1="200" y1="285" x2="265" y2="350" stroke="black" />/13 
 /13  /13 <polygon points="199,286 136,349 101,314 164,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="315" x2="165" y2="250" stroke="black" /> /13  <line x1="135" y1="350" x2="200" y2="285" stroke="black" /> /13 <polygon points="136,251 199,314 164,349 101,286"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="135" y1="250" x2="200" y2="315" stroke="black" /> /13  <line x1="100" y1="285" x2="165" y2="350" stroke="black" />/13 
 /13  /13 <polygon points="99,286 36,349 1,314 64,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="315" x2="65" y2="250" stroke="black" /> /13  <line x1="35" y1="350" x2="100" y2="285" stroke="black" /> /13 <polygon points="36,251 99,314 64,349 1,286"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="35" y1="250" x2="100" y2="315" stroke="black" /> /13  <line x1="0" y1="285" x2="65" y2="350" stroke="black" />/13 
 /13  /13 
 /13 <polygon points="700,250 700,285 699,286 664,251 665,250"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="700,250 700,215 699,214 664,249 665,250"  fill="${pickedMC1}" stroke="none" /> /13 
 /13  /13 <polygon points="649,236 586,299 551,264 614,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="265" x2="615" y2="200" stroke="black" /> /13  <line x1="585" y1="300" x2="650" y2="235" stroke="black" /> /13 <polygon points="586,201 649,264 614,299 551,236"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="585" y1="200" x2="650" y2="265" stroke="black" /> /13  <line x1="550" y1="235" x2="615" y2="300" stroke="black" />/13 
 /13  /13 <polygon points="549,236 486,299 451,264 514,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="265" x2="515" y2="200" stroke="black" /> /13  <line x1="485" y1="300" x2="550" y2="235" stroke="black" /> /13 <polygon points="486,201 549,264 514,299 451,236"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="485" y1="200" x2="550" y2="265" stroke="black" /> /13  <line x1="450" y1="235" x2="515" y2="300" stroke="black" />/13 
 /13  /13 <polygon points="386,201 449,264 414,299 351,236"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="385" y1="200" x2="450" y2="265" stroke="black" /> /13  <line x1="350" y1="235" x2="415" y2="300" stroke="black" /> /13 <polygon points="449,236 386,299 351,264 414,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="265" x2="415" y2="200" stroke="black" /> /13  <line x1="385" y1="300" x2="450" y2="235" stroke="black" />/13 
 /13  /13 <polygon points="286,201 349,264 314,299 251,236"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="285" y1="200" x2="350" y2="265" stroke="black" /> /13  <line x1="250" y1="235" x2="315" y2="300" stroke="black" /> /13 <polygon points="349,236 286,299 251,264 314,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="265" x2="315" y2="200" stroke="black" /> /13  <line x1="285" y1="300" x2="350" y2="235" stroke="black" />/13 
 /13  /13 <polygon points="186,201 249,264 214,299 151,236"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="185" y1="200" x2="250" y2="265" stroke="black" /> /13  <line x1="150" y1="235" x2="215" y2="300" stroke="black" /> /13 <polygon points="249,236 186,299 151,264 214,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="265" x2="215" y2="200" stroke="black" /> /13  <line x1="185" y1="300" x2="250" y2="235" stroke="black" />/13 
 /13  /13 <polygon points="86,201 149,264 114,299 51,236"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="85" y1="200" x2="150" y2="265" stroke="black" /> /13  <line x1="50" y1="235" x2="115" y2="300" stroke="black" /> /13 <polygon points="149,236 86,299 51,264 114,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="265" x2="115" y2="200" stroke="black" /> /13  <line x1="85" y1="300" x2="150" y2="235" stroke="black" />/13 
 /13 <polygon points="0,250 0,215 1,214 36,249 35,250"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,250 0,285 1,286 36,251 35,250"  fill="${pickedCC1}" stroke="none" /> /13 
 /13  /13 <polygon points="636,151 699,214 664,249 601,186"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="635" y1="150" x2="700" y2="215" stroke="black" /> /13  <line x1="600" y1="185" x2="665" y2="250" stroke="black" /> /13 <polygon points="699,186 636,249 601,214 664,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="215" x2="665" y2="150" stroke="black" /> /13  <line x1="635" y1="250" x2="700" y2="185" stroke="black" />/13 
 /13  /13 <polygon points="536,151 599,214 564,249 501,186"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="535" y1="150" x2="600" y2="215" stroke="black" /> /13  <line x1="500" y1="185" x2="565" y2="250" stroke="black" /> /13 <polygon points="599,186 536,249 501,214 564,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="215" x2="565" y2="150" stroke="black" /> /13  <line x1="535" y1="250" x2="600" y2="185" stroke="black" />/13 
 /13  /13 <polygon points="499,186 436,249 401,214 464,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="215" x2="465" y2="150" stroke="black" /> /13  <line x1="435" y1="250" x2="500" y2="185" stroke="black" /> /13 <polygon points="436,151 499,214 464,249 401,186"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="435" y1="150" x2="500" y2="215" stroke="black" /> /13  <line x1="400" y1="185" x2="465" y2="250" stroke="black" />/13 
 /13  /13 <polygon points="399,186 336,249 301,214 364,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="215" x2="365" y2="150" stroke="black" /> /13  <line x1="335" y1="250" x2="400" y2="185" stroke="black" /> /13 <polygon points="336,151 399,214 364,249 301,186"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="335" y1="150" x2="400" y2="215" stroke="black" /> /13  <line x1="300" y1="185" x2="365" y2="250" stroke="black" />/13 
 /13  /13 <polygon points="299,186 236,249 201,214 264,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="215" x2="265" y2="150" stroke="black" /> /13  <line x1="235" y1="250" x2="300" y2="185" stroke="black" /> /13 <polygon points="236,151 299,214 264,249 201,186"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="235" y1="150" x2="300" y2="215" stroke="black" /> /13  <line x1="200" y1="185" x2="265" y2="250" stroke="black" />/13 
 /13  /13 <polygon points="199,186 136,249 101,214 164,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="215" x2="165" y2="150" stroke="black" /> /13  <line x1="135" y1="250" x2="200" y2="185" stroke="black" /> /13 <polygon points="136,151 199,214 164,249 101,186"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="135" y1="150" x2="200" y2="215" stroke="black" /> /13  <line x1="100" y1="185" x2="165" y2="250" stroke="black" />/13 
 /13  /13 <polygon points="99,186 36,249 1,214 64,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="215" x2="65" y2="150" stroke="black" /> /13  <line x1="35" y1="250" x2="100" y2="185" stroke="black" /> /13 <polygon points="36,151 99,214 64,249 1,186"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="35" y1="150" x2="100" y2="215" stroke="black" /> /13  <line x1="0" y1="185" x2="65" y2="250" stroke="black" />/13 
 /13  /13 
 /13 <polygon points="700,150 700,185 699,186 664,151 665,150"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="700,150 700,115 699,114 664,149 665,150"  fill="${pickedCC1}" stroke="none" /> /13 
 /13  /13 <polygon points="649,136 586,199 551,164 614,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="165" x2="615" y2="100" stroke="black" /> /13  <line x1="585" y1="200" x2="650" y2="135" stroke="black" /> /13 <polygon points="586,101 649,164 614,199 551,136"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="585" y1="100" x2="650" y2="165" stroke="black" /> /13  <line x1="550" y1="135" x2="615" y2="200" stroke="black" />/13 
 /13  /13 <polygon points="549,136 486,199 451,164 514,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="165" x2="515" y2="100" stroke="black" /> /13  <line x1="485" y1="200" x2="550" y2="135" stroke="black" /> /13 <polygon points="486,101 549,164 514,199 451,136"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="485" y1="100" x2="550" y2="165" stroke="black" /> /13  <line x1="450" y1="135" x2="515" y2="200" stroke="black" />/13 
 /13  /13 <polygon points="386,101 449,164 414,199 351,136"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="385" y1="100" x2="450" y2="165" stroke="black" /> /13  <line x1="350" y1="135" x2="415" y2="200" stroke="black" /> /13 <polygon points="449,136 386,199 351,164 414,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="165" x2="415" y2="100" stroke="black" /> /13  <line x1="385" y1="200" x2="450" y2="135" stroke="black" />/13 
 /13  /13 <polygon points="286,101 349,164 314,199 251,136"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="285" y1="100" x2="350" y2="165" stroke="black" /> /13  <line x1="250" y1="135" x2="315" y2="200" stroke="black" /> /13 <polygon points="349,136 286,199 251,164 314,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="165" x2="315" y2="100" stroke="black" /> /13  <line x1="285" y1="200" x2="350" y2="135" stroke="black" />/13 
 /13  /13 <polygon points="186,101 249,164 214,199 151,136"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="185" y1="100" x2="250" y2="165" stroke="black" /> /13  <line x1="150" y1="135" x2="215" y2="200" stroke="black" /> /13 <polygon points="249,136 186,199 151,164 214,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="165" x2="215" y2="100" stroke="black" /> /13  <line x1="185" y1="200" x2="250" y2="135" stroke="black" />/13 
 /13  /13 <polygon points="86,101 149,164 114,199 51,136"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="85" y1="100" x2="150" y2="165" stroke="black" /> /13  <line x1="50" y1="135" x2="115" y2="200" stroke="black" /> /13 <polygon points="149,136 86,199 51,164 114,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="165" x2="115" y2="100" stroke="black" /> /13  <line x1="85" y1="200" x2="150" y2="135" stroke="black" />/13 
 /13 <polygon points="0,150 0,115 1,114 36,149 35,150"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,150 0,185 1,186 36,151 35,150"  fill="${pickedMC1}" stroke="none" /> /13 
 /13  /13 <polygon points="636,51 699,114 664,149 601,86"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="635" y1="50" x2="700" y2="115" stroke="black" /> /13  <line x1="600" y1="85" x2="665" y2="150" stroke="black" /> /13 <polygon points="699,86 636,149 601,114 664,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="115" x2="665" y2="50" stroke="black" /> /13  <line x1="635" y1="150" x2="700" y2="85" stroke="black" />/13 
 /13  /13 <polygon points="536,51 599,114 564,149 501,86"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="535" y1="50" x2="600" y2="115" stroke="black" /> /13  <line x1="500" y1="85" x2="565" y2="150" stroke="black" /> /13 <polygon points="599,86 536,149 501,114 564,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="115" x2="565" y2="50" stroke="black" /> /13  <line x1="535" y1="150" x2="600" y2="85" stroke="black" />/13 
 /13  /13 <polygon points="499,86 436,149 401,114 464,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="115" x2="465" y2="50" stroke="black" /> /13  <line x1="435" y1="150" x2="500" y2="85" stroke="black" /> /13 <polygon points="436,51 499,114 464,149 401,86"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="435" y1="50" x2="500" y2="115" stroke="black" /> /13  <line x1="400" y1="85" x2="465" y2="150" stroke="black" />/13 
 /13  /13 <polygon points="399,86 336,149 301,114 364,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="115" x2="365" y2="50" stroke="black" /> /13  <line x1="335" y1="150" x2="400" y2="85" stroke="black" /> /13 <polygon points="336,51 399,114 364,149 301,86"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="335" y1="50" x2="400" y2="115" stroke="black" /> /13  <line x1="300" y1="85" x2="365" y2="150" stroke="black" />/13 
 /13  /13 <polygon points="299,86 236,149 201,114 264,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="115" x2="265" y2="50" stroke="black" /> /13  <line x1="235" y1="150" x2="300" y2="85" stroke="black" /> /13 <polygon points="236,51 299,114 264,149 201,86"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="235" y1="50" x2="300" y2="115" stroke="black" /> /13  <line x1="200" y1="85" x2="265" y2="150" stroke="black" />/13 
 /13  /13 <polygon points="199,86 136,149 101,114 164,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="115" x2="165" y2="50" stroke="black" /> /13  <line x1="135" y1="150" x2="200" y2="85" stroke="black" /> /13 <polygon points="136,51 199,114 164,149 101,86"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="135" y1="50" x2="200" y2="115" stroke="black" /> /13  <line x1="100" y1="85" x2="165" y2="150" stroke="black" />/13 
 /13  /13 <polygon points="99,86 36,149 1,114 64,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="115" x2="65" y2="50" stroke="black" /> /13  <line x1="35" y1="150" x2="100" y2="85" stroke="black" /> /13 <polygon points="36,51 99,114 64,149 1,86"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="35" y1="50" x2="100" y2="115" stroke="black" /> /13  <line x1="0" y1="85" x2="65" y2="150" stroke="black" />/13 
 /13  /13 
<polygon points="700,15 685, 0 650,0 650, 35 665,50 700, 50  "  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="15" x2="685" y2="0" stroke="black" />  /13  <line x1="665" y1="50" x2="650" y2="35" stroke="black" /> /13 <polygon points="700,50 700,85 699,86 664,51 665,50"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="700,50 700,15 699,14 664,49 665,50"  fill="${pickedMC1}" stroke="none" /> /13 
 /13  /13 <polygon points="649,36 586,99 551,64 614,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="65" x2="615" y2="0" stroke="black" /> /13  <line x1="585" y1="100" x2="650" y2="35" stroke="black" /> /13 <polygon points="586,1 649,64 614,99 551,36"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="585" y1="0" x2="650" y2="65" stroke="black" /> /13  <line x1="550" y1="35" x2="615" y2="100" stroke="black" />/13  /13 <polygon points="550,0  550,35 551,36 586, 1  585,0 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="650,0 650,35 649,36 614,1 615,0 "  fill="${pickedMC1}" stroke="none" />
 /13  /13 <polygon points="549,36 486,99 451,64 514,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="65" x2="515" y2="0" stroke="black" /> /13  <line x1="485" y1="100" x2="550" y2="35" stroke="black" /> /13 <polygon points="486,1 549,64 514,99 451,36"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="485" y1="0" x2="550" y2="65" stroke="black" /> /13  <line x1="450" y1="35" x2="515" y2="100" stroke="black" />/13  /13 <polygon points="450,0  450,35 451,36 486, 1  485,0 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="550,0 550,35 549,36 514,1 515,0 "  fill="${pickedCC1}" stroke="none" />
 /13  /13 <polygon points="386,1 449,64 414,99 351,36"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="385" y1="0" x2="450" y2="65" stroke="black" /> /13  <line x1="350" y1="35" x2="415" y2="100" stroke="black" /> /13 <polygon points="449,36 386,99 351,64 414,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="65" x2="415" y2="0" stroke="black" /> /13  <line x1="385" y1="100" x2="450" y2="35" stroke="black" />/13  /13 <polygon points="350,0  350,35 351,36 386, 1  385,0 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="450,0 450,35 449,36 414,1 415,0 "  fill="${pickedMC1}" stroke="none" />
 /13  /13 <polygon points="286,1 349,64 314,99 251,36"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="285" y1="0" x2="350" y2="65" stroke="black" /> /13  <line x1="250" y1="35" x2="315" y2="100" stroke="black" /> /13 <polygon points="349,36 286,99 251,64 314,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="65" x2="315" y2="0" stroke="black" /> /13  <line x1="285" y1="100" x2="350" y2="35" stroke="black" />/13  /13 <polygon points="250,0  250,35 251,36 286, 1  285,0 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="350,0 350,35 349,36 314,1 315,0 "  fill="${pickedCC1}" stroke="none" />
 /13  /13 <polygon points="186,1 249,64 214,99 151,36"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="185" y1="0" x2="250" y2="65" stroke="black" /> /13  <line x1="150" y1="35" x2="215" y2="100" stroke="black" /> /13 <polygon points="249,36 186,99 151,64 214,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="65" x2="215" y2="0" stroke="black" /> /13  <line x1="185" y1="100" x2="250" y2="35" stroke="black" />/13  /13 <polygon points="150,0  150,35 151,36 186, 1  185,0 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="250,0 250,35 249,36 214,1 215,0 "  fill="${pickedMC1}" stroke="none" />
 /13  /13 <polygon points="86,1 149,64 114,99 51,36"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="85" y1="0" x2="150" y2="65" stroke="black" /> /13  <line x1="50" y1="35" x2="115" y2="100" stroke="black" /> /13 <polygon points="149,36 86,99 51,64 114,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="65" x2="115" y2="0" stroke="black" /> /13  <line x1="85" y1="100" x2="150" y2="35" stroke="black" />/13  /13 <polygon points="50,0  50,35 51,36 86, 1  85,0 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="150,0 150,35 149,36 114,1 115,0 "  fill="${pickedCC1}" stroke="none" />
<polygon points="0,15 15,0 50,0 50,35 35,50 0,50"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="15" x2="15" y2="0" stroke="black" />  /13  <line x1="35" y1="50" x2="50" y2="35" stroke="black" /> /13 <polygon points="0,50 0,15 1,14 36,49 35,50"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,50 0,85 1,86 36,51 35,50"  fill="${pickedCC1}" stroke="none" /> /13 
<text x="710" y="560" font-family="Arial" font-size="24" fill="#13203d">Repeat 1, Row 3</text>/13 <text x="710" y="510" font-family="Arial" font-size="24" fill="#13203d">Repeat 1, Row 7</text>/13 <text x="710" y="460" font-family="Arial" font-size="24" fill="#13203d">Repeat 2, Row 3</text>/13 <text x="710" y="410" font-family="Arial" font-size="24" fill="#13203d">Repeat 2, Row 7</text>/13 <text x="710" y="360" font-family="Arial" font-size="24" fill="#13203d">Repeat 3, Row 3</text>/13 <text x="710" y="310" font-family="Arial" font-size="24" fill="#13203d">Repeat 3, Row 7</text>/13 <text x="710" y="260" font-family="Arial" font-size="24" fill="#13203d">Repeat 4, Row 3</text>/13 <text x="710" y="210" font-family="Arial" font-size="24" fill="#13203d">Repeat 4, Row 7</text>/13 <text x="710" y="160" font-family="Arial" font-size="24" fill="#13203d">Repeat 5, Row 3</text>/13 <text x="710" y="110" font-family="Arial" font-size="24" fill="#13203d">Repeat 5, Row 7</text>/13 <text x="710" y="60" font-family="Arial" font-size="24" fill="#13203d">Repeat 6, Row 3</text>/13 

<text x="590" y="562" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="490" y="562" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="390" y="562" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="290" y="562" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="190" y="562" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="90" y="562" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>

<text x="640" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="540" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="440" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="340" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="240" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="140" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="40" y="512" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>


<text x="590" y="462" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="490" y="462" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="390" y="462" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="290" y="462" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="190" y="462" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="90" y="462" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>

<text x="640" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="540" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="440" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="340" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="240" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="140" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="40" y="412" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>


<text x="590" y="362" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="490" y="362" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="390" y="362" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="290" y="362" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="190" y="362" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="90" y="362" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>

<text x="640" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="540" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="440" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="340" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="240" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="140" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="40" y="312" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>


<text x="590" y="262" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="490" y="262" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="390" y="262" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="290" y="262" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="190" y="262" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="90" y="262" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>

<text x="640" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="540" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="440" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="340" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="240" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="140" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="40" y="212" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>


<text x="590" y="162" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="490" y="162" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="390" y="162" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="290" y="162" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="190" y="162" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="90" y="162" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>

<text x="640" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="540" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="440" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="340" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="240" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="140" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="40" y="112" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>


<text x="590" y="62" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="490" y="62" font-family="Arial" font-size="24" fill="${pickedLetterColor}">F</text>
<text x="390" y="62" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="290" y="62" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="190" y="62" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>
<text x="90" y="62" font-family="Arial" font-size="24" fill="${pickedLetterColor}">B</text>

</svg>


    `;
  motifDiamondDuetMitts_B_innerHTML = `
    
    `;
}

function localStorage_MC1() {
  localStorage.MC1 = MC1pickerBtn.value;
}

function localStorage_CC1() {
  localStorage.CC1 = CC1pickerBtn.value;
}

function localStorage_letterColor() {
  localStorage.letterColor = letterColorPickerBtn.value;
}
