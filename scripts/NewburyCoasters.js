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
let pickedMC1 = "#bec101";
let pickedCC1 = "#1a0cd4";
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
  pickedMC1 = "#bec101"; //
  pickedCC1 = "#1a0cd4"; //
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
    pickedMC1 = "#bec101";
  }

  if (localStorage.CC1) {
    pickedCC1 = localStorage.CC1;
  } else {
    pickedCC1 = "#1a0cd4";
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
  letterColorHexDisplay.innerHTML = `hex: ${pickedLetterColor}`
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
<polygon points="700,590 690,600 650,600 650,560 660,550 700,550 "  fill=${pickedCC1} stroke="none" /> /13  <line x1="700" y1="590" x2="690" y2="600" stroke="black" />  /13  <line x1="660" y1="550" x2="650" y2="560" stroke="black" /> /13 <polygon points="700,550 700,590 699,591 659,551 660,550"  fill=${pickedCC1} stroke="none" /> /13 <polygon points="700,550 700,510 699,509 659,549 660,550"  fill=${pickedMC1} stroke="none" /> /13 
 /13  /13 <polygon points="591,501 649,559 609,599 551,541"  fill=${pickedCC1} stroke="none" /> /13  <line x1="590" y1="500" x2="650" y2="560" stroke="black" /> /13  <line x1="550" y1="540" x2="610" y2="600" stroke="black" /> /13 <polygon points="649,541 591,599 551,559 609,501"  fill=${pickedMC1} stroke="none" /> /13  <line x1="550" y1="560" x2="610" y2="500" stroke="black" /> /13  <line x1="590" y1="600" x2="650" y2="540" stroke="black" />/13 <text x="555" y="505" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="550,600 550,560 551,559 591,599 590,600 "  fill=${pickedMC1} stroke="none" /> /13 <polygon points="650,600 650,560 649,559 609,599 610,600 "  fill=${pickedCC1} stroke="none" />
 /13  /13 <polygon points="491,501 549,559 509,599 451,541"  fill=${pickedMC1} stroke="none" /> /13  <line x1="490" y1="500" x2="550" y2="560" stroke="black" /> /13  <line x1="450" y1="540" x2="510" y2="600" stroke="black" /> /13 <polygon points="549,541 491,599 451,559 509,501"  fill=${pickedCC1} stroke="none" /> /13  <line x1="450" y1="560" x2="510" y2="500" stroke="black" /> /13  <line x1="490" y1="600" x2="550" y2="540" stroke="black" />/13 <text x="455" y="505" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="450,600 450,560 451,559 491,599 490,600 "  fill=${pickedCC1} stroke="none" /> /13 <polygon points="550,600 550,560 549,559 509,599 510,600 "  fill=${pickedMC1} stroke="none" />
 /13  /13 <polygon points="391,501 449,559 409,599 351,541"  fill=${pickedCC1} stroke="none" /> /13  <line x1="390" y1="500" x2="450" y2="560" stroke="black" /> /13  <line x1="350" y1="540" x2="410" y2="600" stroke="black" /> /13 <polygon points="449,541 391,599 351,559 409,501"  fill=${pickedMC1} stroke="none" /> /13  <line x1="350" y1="560" x2="410" y2="500" stroke="black" /> /13  <line x1="390" y1="600" x2="450" y2="540" stroke="black" />/13 <text x="355" y="505" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="350,600 350,560 351,559 391,599 390,600 "  fill=${pickedMC1} stroke="none" /> /13 <polygon points="450,600 450,560 449,559 409,599 410,600 "  fill=${pickedCC1} stroke="none" />
 /13  /13 <polygon points="349,541 291,599 251,559 309,501"  fill=${pickedCC1} stroke="none" /> /13  <line x1="250" y1="560" x2="310" y2="500" stroke="black" /> /13  <line x1="290" y1="600" x2="350" y2="540" stroke="black" /> /13 <polygon points="291,501 349,559 309,599 251,541"  fill=${pickedMC1} stroke="none" /> /13  <line x1="290" y1="500" x2="350" y2="560" stroke="black" /> /13  <line x1="250" y1="540" x2="310" y2="600" stroke="black" />/13 <text x="255" y="505" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13  /13 <polygon points="250,600 250,560 251,559 291,599 290,600 "  fill=${pickedCC1} stroke="none" /> /13 <polygon points="350,600 350,560 349,559 309,599 310,600 "  fill=${pickedMC1} stroke="none" />
 /13  /13 <polygon points="249,541 191,599 151,559 209,501"  fill=${pickedMC1} stroke="none" /> /13  <line x1="150" y1="560" x2="210" y2="500" stroke="black" /> /13  <line x1="190" y1="600" x2="250" y2="540" stroke="black" /> /13 <polygon points="191,501 249,559 209,599 151,541"  fill=${pickedCC1} stroke="none" /> /13  <line x1="190" y1="500" x2="250" y2="560" stroke="black" /> /13  <line x1="150" y1="540" x2="210" y2="600" stroke="black" />/13 <text x="155" y="505" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13  /13 <polygon points="150,600 150,560 151,559 191,599 190,600 "  fill=${pickedMC1} stroke="none" /> /13 <polygon points="250,600 250,560 249,559 209,599 210,600 "  fill=${pickedCC1} stroke="none" />
 /13  /13 <polygon points="149,541 91,599 51,559 109,501"  fill=${pickedCC1} stroke="none" /> /13  <line x1="50" y1="560" x2="110" y2="500" stroke="black" /> /13  <line x1="90" y1="600" x2="150" y2="540" stroke="black" /> /13 <polygon points="91,501 149,559 109,599 51,541"  fill=${pickedMC1} stroke="none" /> /13  <line x1="90" y1="500" x2="150" y2="560" stroke="black" /> /13  <line x1="50" y1="540" x2="110" y2="600" stroke="black" />/13 <text x="55" y="505" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13  /13 <polygon points="50,600 50,560 51,559 91,599 90,600 "  fill=${pickedCC1} stroke="none" /> /13 <polygon points="150,600 150,560 149,559 109,599 110,600 "  fill=${pickedMC1} stroke="none" />
<polygon points="0,590 10,600 50,600 50,560 40,550  0,550 "  fill=${pickedCC1} stroke="none" /> /13  <line x1="0" y1="590" x2="10" y2="600" stroke="black" />  /13  <line x1="40" y1="550" x2="50" y2="560" stroke="black" /> /13 <polygon points="0,550 0,510 1,509 41,549 40,550"  fill=${pickedMC1} stroke="none" /> /13 <polygon points="0,550 0,590 1,591 41,551 40,550"  fill=${pickedCC1} stroke="none" /> /13 
 /13  /13 <polygon points="699,491 641,549 601,509 659,451"  fill=${pickedMC1} stroke="none" /> /13  <line x1="600" y1="510" x2="660" y2="450" stroke="black" /> /13  <line x1="640" y1="550" x2="700" y2="490" stroke="black" /> /13 <polygon points="641,451 699,509 659,549 601,491"  fill=${pickedMC1} stroke="none" /> /13  <line x1="640" y1="450" x2="700" y2="510" stroke="black" /> /13  <line x1="600" y1="490" x2="660" y2="550" stroke="black" />/13 <text x="605" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="599,491 541,549 501,509 559,451"  fill=${pickedCC1} stroke="none" /> /13  <line x1="500" y1="510" x2="560" y2="450" stroke="black" /> /13  <line x1="540" y1="550" x2="600" y2="490" stroke="black" /> /13 <polygon points="541,451 599,509 559,549 501,491"  fill=${pickedCC1} stroke="none" /> /13  <line x1="540" y1="450" x2="600" y2="510" stroke="black" /> /13  <line x1="500" y1="490" x2="560" y2="550" stroke="black" />/13 <text x="505" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="499,491 441,549 401,509 459,451"  fill=${pickedMC1} stroke="none" /> /13  <line x1="400" y1="510" x2="460" y2="450" stroke="black" /> /13  <line x1="440" y1="550" x2="500" y2="490" stroke="black" /> /13 <polygon points="441,451 499,509 459,549 401,491"  fill=${pickedMC1} stroke="none" /> /13  <line x1="440" y1="450" x2="500" y2="510" stroke="black" /> /13  <line x1="400" y1="490" x2="460" y2="550" stroke="black" />/13 <text x="405" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="399,491 341,549 301,509 359,451"  fill=${pickedCC1} stroke="none" /> /13  <line x1="300" y1="510" x2="360" y2="450" stroke="black" /> /13  <line x1="340" y1="550" x2="400" y2="490" stroke="black" /> /13 <polygon points="341,451 399,509 359,549 301,491"  fill=${pickedCC1} stroke="none" /> /13  <line x1="340" y1="450" x2="400" y2="510" stroke="black" /> /13  <line x1="300" y1="490" x2="360" y2="550" stroke="black" />/13 <text x="305" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="241,451 299,509 259,549 201,491"  fill=${pickedMC1} stroke="none" /> /13  <line x1="240" y1="450" x2="300" y2="510" stroke="black" /> /13  <line x1="200" y1="490" x2="260" y2="550" stroke="black" /> /13 <polygon points="299,491 241,549 201,509 259,451"  fill=${pickedMC1} stroke="none" /> /13  <line x1="200" y1="510" x2="260" y2="450" stroke="black" /> /13  <line x1="240" y1="550" x2="300" y2="490" stroke="black" />/13 <text x="205" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="141,451 199,509 159,549 101,491"  fill=${pickedCC1} stroke="none" /> /13  <line x1="140" y1="450" x2="200" y2="510" stroke="black" /> /13  <line x1="100" y1="490" x2="160" y2="550" stroke="black" /> /13 <polygon points="199,491 141,549 101,509 159,451"  fill=${pickedCC1} stroke="none" /> /13  <line x1="100" y1="510" x2="160" y2="450" stroke="black" /> /13  <line x1="140" y1="550" x2="200" y2="490" stroke="black" />/13 <text x="105" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="41,451 99,509 59,549 1,491"  fill=${pickedMC1} stroke="none" /> /13  <line x1="40" y1="450" x2="100" y2="510" stroke="black" /> /13  <line x1="0" y1="490" x2="60" y2="550" stroke="black" /> /13 <polygon points="99,491 41,549 1,509 59,451"  fill=${pickedMC1} stroke="none" /> /13  <line x1="0" y1="510" x2="60" y2="450" stroke="black" /> /13  <line x1="40" y1="550" x2="100" y2="490" stroke="black" />/13 <text x="5" y="455" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 
 /13 <polygon points="700,450 700,490 699,491 659,451 660,450"  fill=${pickedMC1} stroke="none" /> /13 <polygon points="700,450 700,410 699,409 659,449 660,450"  fill=${pickedCC1} stroke="none" /> /13 
 /13  /13 <polygon points="591,401 649,459 609,499 551,441"  fill=${pickedMC1} stroke="none" /> /13  <line x1="590" y1="400" x2="650" y2="460" stroke="black" /> /13  <line x1="550" y1="440" x2="610" y2="500" stroke="black" /> /13 <polygon points="649,441 591,499 551,459 609,401"  fill=${pickedCC1} stroke="none" /> /13  <line x1="550" y1="460" x2="610" y2="400" stroke="black" /> /13  <line x1="590" y1="500" x2="650" y2="440" stroke="black" />/13 <text x="555" y="405" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="491,401 549,459 509,499 451,441"  fill=${pickedCC1} stroke="none" /> /13  <line x1="490" y1="400" x2="550" y2="460" stroke="black" /> /13  <line x1="450" y1="440" x2="510" y2="500" stroke="black" /> /13 <polygon points="549,441 491,499 451,459 509,401"  fill=${pickedMC1} stroke="none" /> /13  <line x1="450" y1="460" x2="510" y2="400" stroke="black" /> /13  <line x1="490" y1="500" x2="550" y2="440" stroke="black" />/13 <text x="455" y="405" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="391,401 449,459 409,499 351,441"  fill=${pickedMC1} stroke="none" /> /13  <line x1="390" y1="400" x2="450" y2="460" stroke="black" /> /13  <line x1="350" y1="440" x2="410" y2="500" stroke="black" /> /13 <polygon points="449,441 391,499 351,459 409,401"  fill=${pickedCC1} stroke="none" /> /13  <line x1="350" y1="460" x2="410" y2="400" stroke="black" /> /13  <line x1="390" y1="500" x2="450" y2="440" stroke="black" />/13 <text x="355" y="405" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="349,441 291,499 251,459 309,401"  fill=${pickedMC1} stroke="none" /> /13  <line x1="250" y1="460" x2="310" y2="400" stroke="black" /> /13  <line x1="290" y1="500" x2="350" y2="440" stroke="black" /> /13 <polygon points="291,401 349,459 309,499 251,441"  fill=${pickedCC1} stroke="none" /> /13  <line x1="290" y1="400" x2="350" y2="460" stroke="black" /> /13  <line x1="250" y1="440" x2="310" y2="500" stroke="black" />/13 <text x="255" y="405" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="249,441 191,499 151,459 209,401"  fill=${pickedCC1} stroke="none" /> /13  <line x1="150" y1="460" x2="210" y2="400" stroke="black" /> /13  <line x1="190" y1="500" x2="250" y2="440" stroke="black" /> /13 <polygon points="191,401 249,459 209,499 151,441"  fill=${pickedMC1} stroke="none" /> /13  <line x1="190" y1="400" x2="250" y2="460" stroke="black" /> /13  <line x1="150" y1="440" x2="210" y2="500" stroke="black" />/13 <text x="155" y="405" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="149,441 91,499 51,459 109,401"  fill=${pickedMC1} stroke="none" /> /13  <line x1="50" y1="460" x2="110" y2="400" stroke="black" /> /13  <line x1="90" y1="500" x2="150" y2="440" stroke="black" /> /13 <polygon points="91,401 149,459 109,499 51,441"  fill=${pickedCC1} stroke="none" /> /13  <line x1="90" y1="400" x2="150" y2="460" stroke="black" /> /13  <line x1="50" y1="440" x2="110" y2="500" stroke="black" />/13 <text x="55" y="405" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13 <polygon points="0,450 0,410 1,409 41,449 40,450"  fill=${pickedCC1} stroke="none" /> /13 <polygon points="0,450 0,490 1,491 41,451 40,450"  fill=${pickedMC1} stroke="none" /> /13 
 /13  /13 <polygon points="699,391 641,449 601,409 659,351"  fill=${pickedCC1} stroke="none" /> /13  <line x1="600" y1="410" x2="660" y2="350" stroke="black" /> /13  <line x1="640" y1="450" x2="700" y2="390" stroke="black" /> /13 <polygon points="641,351 699,409 659,449 601,391"  fill=${pickedCC1} stroke="none" /> /13  <line x1="640" y1="350" x2="700" y2="410" stroke="black" /> /13  <line x1="600" y1="390" x2="660" y2="450" stroke="black" />/13 <text x="605" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="599,391 541,449 501,409 559,351"  fill=${pickedMC1} stroke="none" /> /13  <line x1="500" y1="410" x2="560" y2="350" stroke="black" /> /13  <line x1="540" y1="450" x2="600" y2="390" stroke="black" /> /13 <polygon points="541,351 599,409 559,449 501,391"  fill=${pickedMC1} stroke="none" /> /13  <line x1="540" y1="350" x2="600" y2="410" stroke="black" /> /13  <line x1="500" y1="390" x2="560" y2="450" stroke="black" />/13 <text x="505" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="499,391 441,449 401,409 459,351"  fill=${pickedCC1} stroke="none" /> /13  <line x1="400" y1="410" x2="460" y2="350" stroke="black" /> /13  <line x1="440" y1="450" x2="500" y2="390" stroke="black" /> /13 <polygon points="441,351 499,409 459,449 401,391"  fill=${pickedCC1} stroke="none" /> /13  <line x1="440" y1="350" x2="500" y2="410" stroke="black" /> /13  <line x1="400" y1="390" x2="460" y2="450" stroke="black" />/13 <text x="405" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="341,351 399,409 359,449 301,391"  fill=${pickedMC1} stroke="none" /> /13  <line x1="340" y1="350" x2="400" y2="410" stroke="black" /> /13  <line x1="300" y1="390" x2="360" y2="450" stroke="black" /> /13 <polygon points="399,391 341,449 301,409 359,351"  fill=${pickedMC1} stroke="none" /> /13  <line x1="300" y1="410" x2="360" y2="350" stroke="black" /> /13  <line x1="340" y1="450" x2="400" y2="390" stroke="black" />/13 <text x="305" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="241,351 299,409 259,449 201,391"  fill=${pickedCC1} stroke="none" /> /13  <line x1="240" y1="350" x2="300" y2="410" stroke="black" /> /13  <line x1="200" y1="390" x2="260" y2="450" stroke="black" /> /13 <polygon points="299,391 241,449 201,409 259,351"  fill=${pickedCC1} stroke="none" /> /13  <line x1="200" y1="410" x2="260" y2="350" stroke="black" /> /13  <line x1="240" y1="450" x2="300" y2="390" stroke="black" />/13 <text x="205" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="141,351 199,409 159,449 101,391"  fill=${pickedMC1} stroke="none" /> /13  <line x1="140" y1="350" x2="200" y2="410" stroke="black" /> /13  <line x1="100" y1="390" x2="160" y2="450" stroke="black" /> /13 <polygon points="199,391 141,449 101,409 159,351"  fill=${pickedMC1} stroke="none" /> /13  <line x1="100" y1="410" x2="160" y2="350" stroke="black" /> /13  <line x1="140" y1="450" x2="200" y2="390" stroke="black" />/13 <text x="105" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="41,351 99,409 59,449 1,391"  fill=${pickedCC1} stroke="none" /> /13  <line x1="40" y1="350" x2="100" y2="410" stroke="black" /> /13  <line x1="0" y1="390" x2="60" y2="450" stroke="black" /> /13 <polygon points="99,391 41,449 1,409 59,351"  fill=${pickedCC1} stroke="none" /> /13  <line x1="0" y1="410" x2="60" y2="350" stroke="black" /> /13  <line x1="40" y1="450" x2="100" y2="390" stroke="black" />/13 <text x="5" y="355" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 
 /13 <polygon points="700,350 700,390 699,391 659,351 660,350"  fill=${pickedCC1} stroke="none" /> /13 <polygon points="700,350 700,310 699,309 659,349 660,350"  fill=${pickedMC1} stroke="none" /> /13 
 /13  /13 <polygon points="591,301 649,359 609,399 551,341"  fill=${pickedCC1} stroke="none" /> /13  <line x1="590" y1="300" x2="650" y2="360" stroke="black" /> /13  <line x1="550" y1="340" x2="610" y2="400" stroke="black" /> /13 <polygon points="649,341 591,399 551,359 609,301"  fill=${pickedMC1} stroke="none" /> /13  <line x1="550" y1="360" x2="610" y2="300" stroke="black" /> /13  <line x1="590" y1="400" x2="650" y2="340" stroke="black" />/13 <text x="555" y="305" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="491,301 549,359 509,399 451,341"  fill=${pickedMC1} stroke="none" /> /13  <line x1="490" y1="300" x2="550" y2="360" stroke="black" /> /13  <line x1="450" y1="340" x2="510" y2="400" stroke="black" /> /13 <polygon points="549,341 491,399 451,359 509,301"  fill=${pickedCC1} stroke="none" /> /13  <line x1="450" y1="360" x2="510" y2="300" stroke="black" /> /13  <line x1="490" y1="400" x2="550" y2="340" stroke="black" />/13 <text x="455" y="305" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="391,301 449,359 409,399 351,341"  fill=${pickedCC1} stroke="none" /> /13  <line x1="390" y1="300" x2="450" y2="360" stroke="black" /> /13  <line x1="350" y1="340" x2="410" y2="400" stroke="black" /> /13 <polygon points="449,341 391,399 351,359 409,301"  fill=${pickedMC1} stroke="none" /> /13  <line x1="350" y1="360" x2="410" y2="300" stroke="black" /> /13  <line x1="390" y1="400" x2="450" y2="340" stroke="black" />/13 <text x="355" y="305" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="349,341 291,399 251,359 309,301"  fill=${pickedCC1} stroke="none" /> /13  <line x1="250" y1="360" x2="310" y2="300" stroke="black" /> /13  <line x1="290" y1="400" x2="350" y2="340" stroke="black" /> /13 <polygon points="291,301 349,359 309,399 251,341"  fill=${pickedMC1} stroke="none" /> /13  <line x1="290" y1="300" x2="350" y2="360" stroke="black" /> /13  <line x1="250" y1="340" x2="310" y2="400" stroke="black" />/13 <text x="255" y="305" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="249,341 191,399 151,359 209,301"  fill=${pickedMC1} stroke="none" /> /13  <line x1="150" y1="360" x2="210" y2="300" stroke="black" /> /13  <line x1="190" y1="400" x2="250" y2="340" stroke="black" /> /13 <polygon points="191,301 249,359 209,399 151,341"  fill=${pickedCC1} stroke="none" /> /13  <line x1="190" y1="300" x2="250" y2="360" stroke="black" /> /13  <line x1="150" y1="340" x2="210" y2="400" stroke="black" />/13 <text x="155" y="305" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="149,341 91,399 51,359 109,301"  fill=${pickedCC1} stroke="none" /> /13  <line x1="50" y1="360" x2="110" y2="300" stroke="black" /> /13  <line x1="90" y1="400" x2="150" y2="340" stroke="black" /> /13 <polygon points="91,301 149,359 109,399 51,341"  fill=${pickedMC1} stroke="none" /> /13  <line x1="90" y1="300" x2="150" y2="360" stroke="black" /> /13  <line x1="50" y1="340" x2="110" y2="400" stroke="black" />/13 <text x="55" y="305" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13 <polygon points="0,350 0,310 1,309 41,349 40,350"  fill=${pickedMC1} stroke="none" /> /13 <polygon points="0,350 0,390 1,391 41,351 40,350"  fill=${pickedCC1} stroke="none" /> /13 
 /13  /13 <polygon points="641,251 699,309 659,349 601,291"  fill=${pickedMC1} stroke="none" /> /13  <line x1="640" y1="250" x2="700" y2="310" stroke="black" /> /13  <line x1="600" y1="290" x2="660" y2="350" stroke="black" /> /13 <polygon points="699,291 641,349 601,309 659,251"  fill=${pickedMC1} stroke="none" /> /13  <line x1="600" y1="310" x2="660" y2="250" stroke="black" /> /13  <line x1="640" y1="350" x2="700" y2="290" stroke="black" />/13 <text x="605" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="599,291 541,349 501,309 559,251"  fill=${pickedCC1} stroke="none" /> /13  <line x1="500" y1="310" x2="560" y2="250" stroke="black" /> /13  <line x1="540" y1="350" x2="600" y2="290" stroke="black" /> /13 <polygon points="541,251 599,309 559,349 501,291"  fill=${pickedCC1} stroke="none" /> /13  <line x1="540" y1="250" x2="600" y2="310" stroke="black" /> /13  <line x1="500" y1="290" x2="560" y2="350" stroke="black" />/13 <text x="505" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="499,291 441,349 401,309 459,251"  fill=${pickedMC1} stroke="none" /> /13  <line x1="400" y1="310" x2="460" y2="250" stroke="black" /> /13  <line x1="440" y1="350" x2="500" y2="290" stroke="black" /> /13 <polygon points="441,251 499,309 459,349 401,291"  fill=${pickedMC1} stroke="none" /> /13  <line x1="440" y1="250" x2="500" y2="310" stroke="black" /> /13  <line x1="400" y1="290" x2="460" y2="350" stroke="black" />/13 <text x="405" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="341,251 399,309 359,349 301,291"  fill=${pickedCC1} stroke="none" /> /13  <line x1="340" y1="250" x2="400" y2="310" stroke="black" /> /13  <line x1="300" y1="290" x2="360" y2="350" stroke="black" /> /13 <polygon points="399,291 341,349 301,309 359,251"  fill=${pickedCC1} stroke="none" /> /13  <line x1="300" y1="310" x2="360" y2="250" stroke="black" /> /13  <line x1="340" y1="350" x2="400" y2="290" stroke="black" />/13 <text x="305" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="299,291 241,349 201,309 259,251"  fill=${pickedMC1} stroke="none" /> /13  <line x1="200" y1="310" x2="260" y2="250" stroke="black" /> /13  <line x1="240" y1="350" x2="300" y2="290" stroke="black" /> /13 <polygon points="241,251 299,309 259,349 201,291"  fill=${pickedMC1} stroke="none" /> /13  <line x1="240" y1="250" x2="300" y2="310" stroke="black" /> /13  <line x1="200" y1="290" x2="260" y2="350" stroke="black" />/13 <text x="205" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="199,291 141,349 101,309 159,251"  fill=${pickedCC1} stroke="none" /> /13  <line x1="100" y1="310" x2="160" y2="250" stroke="black" /> /13  <line x1="140" y1="350" x2="200" y2="290" stroke="black" /> /13 <polygon points="141,251 199,309 159,349 101,291"  fill=${pickedCC1} stroke="none" /> /13  <line x1="140" y1="250" x2="200" y2="310" stroke="black" /> /13  <line x1="100" y1="290" x2="160" y2="350" stroke="black" />/13 <text x="105" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="99,291 41,349 1,309 59,251"  fill=${pickedMC1} stroke="none" /> /13  <line x1="0" y1="310" x2="60" y2="250" stroke="black" /> /13  <line x1="40" y1="350" x2="100" y2="290" stroke="black" /> /13 <polygon points="41,251 99,309 59,349 1,291"  fill=${pickedMC1} stroke="none" /> /13  <line x1="40" y1="250" x2="100" y2="310" stroke="black" /> /13  <line x1="0" y1="290" x2="60" y2="350" stroke="black" />/13 <text x="5" y="255" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 
 /13 <polygon points="700,250 700,290 699,291 659,251 660,250"  fill=${pickedMC1} stroke="none" /> /13 <polygon points="700,250 700,210 699,209 659,249 660,250"  fill=${pickedCC1} stroke="none" /> /13 
 /13  /13 <polygon points="649,241 591,299 551,259 609,201"  fill=${pickedCC1} stroke="none" /> /13  <line x1="550" y1="260" x2="610" y2="200" stroke="black" /> /13  <line x1="590" y1="300" x2="650" y2="240" stroke="black" /> /13 <polygon points="591,201 649,259 609,299 551,241"  fill=${pickedMC1} stroke="none" /> /13  <line x1="590" y1="200" x2="650" y2="260" stroke="black" /> /13  <line x1="550" y1="240" x2="610" y2="300" stroke="black" />/13 <text x="555" y="205" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="549,241 491,299 451,259 509,201"  fill=${pickedMC1} stroke="none" /> /13  <line x1="450" y1="260" x2="510" y2="200" stroke="black" /> /13  <line x1="490" y1="300" x2="550" y2="240" stroke="black" /> /13 <polygon points="491,201 549,259 509,299 451,241"  fill=${pickedCC1} stroke="none" /> /13  <line x1="490" y1="200" x2="550" y2="260" stroke="black" /> /13  <line x1="450" y1="240" x2="510" y2="300" stroke="black" />/13 <text x="455" y="205" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="391,201 449,259 409,299 351,241"  fill=${pickedMC1} stroke="none" /> /13  <line x1="390" y1="200" x2="450" y2="260" stroke="black" /> /13  <line x1="350" y1="240" x2="410" y2="300" stroke="black" /> /13 <polygon points="449,241 391,299 351,259 409,201"  fill=${pickedCC1} stroke="none" /> /13  <line x1="350" y1="260" x2="410" y2="200" stroke="black" /> /13  <line x1="390" y1="300" x2="450" y2="240" stroke="black" />/13 <text x="355" y="205" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="291,201 349,259 309,299 251,241"  fill=${pickedCC1} stroke="none" /> /13  <line x1="290" y1="200" x2="350" y2="260" stroke="black" /> /13  <line x1="250" y1="240" x2="310" y2="300" stroke="black" /> /13 <polygon points="349,241 291,299 251,259 309,201"  fill=${pickedMC1} stroke="none" /> /13  <line x1="250" y1="260" x2="310" y2="200" stroke="black" /> /13  <line x1="290" y1="300" x2="350" y2="240" stroke="black" />/13 <text x="255" y="205" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="191,201 249,259 209,299 151,241"  fill=${pickedMC1} stroke="none" /> /13  <line x1="190" y1="200" x2="250" y2="260" stroke="black" /> /13  <line x1="150" y1="240" x2="210" y2="300" stroke="black" /> /13 <polygon points="249,241 191,299 151,259 209,201"  fill=${pickedCC1} stroke="none" /> /13  <line x1="150" y1="260" x2="210" y2="200" stroke="black" /> /13  <line x1="190" y1="300" x2="250" y2="240" stroke="black" />/13 <text x="155" y="205" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="91,201 149,259 109,299 51,241"  fill=${pickedCC1} stroke="none" /> /13  <line x1="90" y1="200" x2="150" y2="260" stroke="black" /> /13  <line x1="50" y1="240" x2="110" y2="300" stroke="black" /> /13 <polygon points="149,241 91,299 51,259 109,201"  fill=${pickedMC1} stroke="none" /> /13  <line x1="50" y1="260" x2="110" y2="200" stroke="black" /> /13  <line x1="90" y1="300" x2="150" y2="240" stroke="black" />/13 <text x="55" y="205" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13 <polygon points="0,250 0,210 1,209 41,249 40,250"  fill=${pickedCC1} stroke="none" /> /13 <polygon points="0,250 0,290 1,291 41,251 40,250"  fill=${pickedMC1} stroke="none" /> /13 
 /13  /13 <polygon points="641,151 699,209 659,249 601,191"  fill=${pickedCC1} stroke="none" /> /13  <line x1="640" y1="150" x2="700" y2="210" stroke="black" /> /13  <line x1="600" y1="190" x2="660" y2="250" stroke="black" /> /13 <polygon points="699,191 641,249 601,209 659,151"  fill=${pickedCC1} stroke="none" /> /13  <line x1="600" y1="210" x2="660" y2="150" stroke="black" /> /13  <line x1="640" y1="250" x2="700" y2="190" stroke="black" />/13 <text x="605" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="541,151 599,209 559,249 501,191"  fill=${pickedMC1} stroke="none" /> /13  <line x1="540" y1="150" x2="600" y2="210" stroke="black" /> /13  <line x1="500" y1="190" x2="560" y2="250" stroke="black" /> /13 <polygon points="599,191 541,249 501,209 559,151"  fill=${pickedMC1} stroke="none" /> /13  <line x1="500" y1="210" x2="560" y2="150" stroke="black" /> /13  <line x1="540" y1="250" x2="600" y2="190" stroke="black" />/13 <text x="505" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="499,191 441,249 401,209 459,151"  fill=${pickedCC1} stroke="none" /> /13  <line x1="400" y1="210" x2="460" y2="150" stroke="black" /> /13  <line x1="440" y1="250" x2="500" y2="190" stroke="black" /> /13 <polygon points="441,151 499,209 459,249 401,191"  fill=${pickedCC1} stroke="none" /> /13  <line x1="440" y1="150" x2="500" y2="210" stroke="black" /> /13  <line x1="400" y1="190" x2="460" y2="250" stroke="black" />/13 <text x="405" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="399,191 341,249 301,209 359,151"  fill=${pickedMC1} stroke="none" /> /13  <line x1="300" y1="210" x2="360" y2="150" stroke="black" /> /13  <line x1="340" y1="250" x2="400" y2="190" stroke="black" /> /13 <polygon points="341,151 399,209 359,249 301,191"  fill=${pickedMC1} stroke="none" /> /13  <line x1="340" y1="150" x2="400" y2="210" stroke="black" /> /13  <line x1="300" y1="190" x2="360" y2="250" stroke="black" />/13 <text x="305" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="299,191 241,249 201,209 259,151"  fill=${pickedCC1} stroke="none" /> /13  <line x1="200" y1="210" x2="260" y2="150" stroke="black" /> /13  <line x1="240" y1="250" x2="300" y2="190" stroke="black" /> /13 <polygon points="241,151 299,209 259,249 201,191"  fill=${pickedCC1} stroke="none" /> /13  <line x1="240" y1="150" x2="300" y2="210" stroke="black" /> /13  <line x1="200" y1="190" x2="260" y2="250" stroke="black" />/13 <text x="205" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="199,191 141,249 101,209 159,151"  fill=${pickedMC1} stroke="none" /> /13  <line x1="100" y1="210" x2="160" y2="150" stroke="black" /> /13  <line x1="140" y1="250" x2="200" y2="190" stroke="black" /> /13 <polygon points="141,151 199,209 159,249 101,191"  fill=${pickedMC1} stroke="none" /> /13  <line x1="140" y1="150" x2="200" y2="210" stroke="black" /> /13  <line x1="100" y1="190" x2="160" y2="250" stroke="black" />/13 <text x="105" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="99,191 41,249 1,209 59,151"  fill=${pickedCC1} stroke="none" /> /13  <line x1="0" y1="210" x2="60" y2="150" stroke="black" /> /13  <line x1="40" y1="250" x2="100" y2="190" stroke="black" /> /13 <polygon points="41,151 99,209 59,249 1,191"  fill=${pickedCC1} stroke="none" /> /13  <line x1="40" y1="150" x2="100" y2="210" stroke="black" /> /13  <line x1="0" y1="190" x2="60" y2="250" stroke="black" />/13 <text x="5" y="155" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 
 /13 <polygon points="700,150 700,190 699,191 659,151 660,150"  fill=${pickedCC1} stroke="none" /> /13 <polygon points="700,150 700,110 699,109 659,149 660,150"  fill=${pickedMC1} stroke="none" /> /13 
 /13  /13 <polygon points="649,141 591,199 551,159 609,101"  fill=${pickedMC1} stroke="none" /> /13  <line x1="550" y1="160" x2="610" y2="100" stroke="black" /> /13  <line x1="590" y1="200" x2="650" y2="140" stroke="black" /> /13 <polygon points="591,101 649,159 609,199 551,141"  fill=${pickedCC1} stroke="none" /> /13  <line x1="590" y1="100" x2="650" y2="160" stroke="black" /> /13  <line x1="550" y1="140" x2="610" y2="200" stroke="black" />/13 <text x="555" y="105" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="549,141 491,199 451,159 509,101"  fill=${pickedCC1} stroke="none" /> /13  <line x1="450" y1="160" x2="510" y2="100" stroke="black" /> /13  <line x1="490" y1="200" x2="550" y2="140" stroke="black" /> /13 <polygon points="491,101 549,159 509,199 451,141"  fill=${pickedMC1} stroke="none" /> /13  <line x1="490" y1="100" x2="550" y2="160" stroke="black" /> /13  <line x1="450" y1="140" x2="510" y2="200" stroke="black" />/13 <text x="455" y="105" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="391,101 449,159 409,199 351,141"  fill=${pickedCC1} stroke="none" /> /13  <line x1="390" y1="100" x2="450" y2="160" stroke="black" /> /13  <line x1="350" y1="140" x2="410" y2="200" stroke="black" /> /13 <polygon points="449,141 391,199 351,159 409,101"  fill=${pickedMC1} stroke="none" /> /13  <line x1="350" y1="160" x2="410" y2="100" stroke="black" /> /13  <line x1="390" y1="200" x2="450" y2="140" stroke="black" />/13 <text x="355" y="105" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="291,101 349,159 309,199 251,141"  fill=${pickedMC1} stroke="none" /> /13  <line x1="290" y1="100" x2="350" y2="160" stroke="black" /> /13  <line x1="250" y1="140" x2="310" y2="200" stroke="black" /> /13 <polygon points="349,141 291,199 251,159 309,101"  fill=${pickedCC1} stroke="none" /> /13  <line x1="250" y1="160" x2="310" y2="100" stroke="black" /> /13  <line x1="290" y1="200" x2="350" y2="140" stroke="black" />/13 <text x="255" y="105" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="191,101 249,159 209,199 151,141"  fill=${pickedCC1} stroke="none" /> /13  <line x1="190" y1="100" x2="250" y2="160" stroke="black" /> /13  <line x1="150" y1="140" x2="210" y2="200" stroke="black" /> /13 <polygon points="249,141 191,199 151,159 209,101"  fill=${pickedMC1} stroke="none" /> /13  <line x1="150" y1="160" x2="210" y2="100" stroke="black" /> /13  <line x1="190" y1="200" x2="250" y2="140" stroke="black" />/13 <text x="155" y="105" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="91,101 149,159 109,199 51,141"  fill=${pickedMC1} stroke="none" /> /13  <line x1="90" y1="100" x2="150" y2="160" stroke="black" /> /13  <line x1="50" y1="140" x2="110" y2="200" stroke="black" /> /13 <polygon points="149,141 91,199 51,159 109,101"  fill=${pickedCC1} stroke="none" /> /13  <line x1="50" y1="160" x2="110" y2="100" stroke="black" /> /13  <line x1="90" y1="200" x2="150" y2="140" stroke="black" />/13 <text x="55" y="105" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13 <polygon points="0,150 0,110 1,109 41,149 40,150"  fill=${pickedMC1} stroke="none" /> /13 <polygon points="0,150 0,190 1,191 41,151 40,150"  fill=${pickedCC1} stroke="none" /> /13 
 /13  /13 <polygon points="641,51 699,109 659,149 601,91"  fill=${pickedMC1} stroke="none" /> /13  <line x1="640" y1="50" x2="700" y2="110" stroke="black" /> /13  <line x1="600" y1="90" x2="660" y2="150" stroke="black" /> /13 <polygon points="699,91 641,149 601,109 659,51"  fill=${pickedMC1} stroke="none" /> /13  <line x1="600" y1="110" x2="660" y2="50" stroke="black" /> /13  <line x1="640" y1="150" x2="700" y2="90" stroke="black" />/13 <text x="605" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="541,51 599,109 559,149 501,91"  fill=${pickedCC1} stroke="none" /> /13  <line x1="540" y1="50" x2="600" y2="110" stroke="black" /> /13  <line x1="500" y1="90" x2="560" y2="150" stroke="black" /> /13 <polygon points="599,91 541,149 501,109 559,51"  fill=${pickedCC1} stroke="none" /> /13  <line x1="500" y1="110" x2="560" y2="50" stroke="black" /> /13  <line x1="540" y1="150" x2="600" y2="90" stroke="black" />/13 <text x="505" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13 
 /13  /13 <polygon points="499,91 441,149 401,109 459,51"  fill=${pickedMC1} stroke="none" /> /13  <line x1="400" y1="110" x2="460" y2="50" stroke="black" /> /13  <line x1="440" y1="150" x2="500" y2="90" stroke="black" /> /13 <polygon points="441,51 499,109 459,149 401,91"  fill=${pickedMC1} stroke="none" /> /13  <line x1="440" y1="50" x2="500" y2="110" stroke="black" /> /13  <line x1="400" y1="90" x2="460" y2="150" stroke="black" />/13 <text x="405" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="399,91 341,149 301,109 359,51"  fill=${pickedCC1} stroke="none" /> /13  <line x1="300" y1="110" x2="360" y2="50" stroke="black" /> /13  <line x1="340" y1="150" x2="400" y2="90" stroke="black" /> /13 <polygon points="341,51 399,109 359,149 301,91"  fill=${pickedCC1} stroke="none" /> /13  <line x1="340" y1="50" x2="400" y2="110" stroke="black" /> /13  <line x1="300" y1="90" x2="360" y2="150" stroke="black" />/13 <text x="305" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="299,91 241,149 201,109 259,51"  fill=${pickedMC1} stroke="none" /> /13  <line x1="200" y1="110" x2="260" y2="50" stroke="black" /> /13  <line x1="240" y1="150" x2="300" y2="90" stroke="black" /> /13 <polygon points="241,51 299,109 259,149 201,91"  fill=${pickedMC1} stroke="none" /> /13  <line x1="240" y1="50" x2="300" y2="110" stroke="black" /> /13  <line x1="200" y1="90" x2="260" y2="150" stroke="black" />/13 <text x="205" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="199,91 141,149 101,109 159,51"  fill=${pickedCC1} stroke="none" /> /13  <line x1="100" y1="110" x2="160" y2="50" stroke="black" /> /13  <line x1="140" y1="150" x2="200" y2="90" stroke="black" /> /13 <polygon points="141,51 199,109 159,149 101,91"  fill=${pickedCC1} stroke="none" /> /13  <line x1="140" y1="50" x2="200" y2="110" stroke="black" /> /13  <line x1="100" y1="90" x2="160" y2="150" stroke="black" />/13 <text x="105" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 <polygon points="99,91 41,149 1,109 59,51"  fill=${pickedMC1} stroke="none" /> /13  <line x1="0" y1="110" x2="60" y2="50" stroke="black" /> /13  <line x1="40" y1="150" x2="100" y2="90" stroke="black" /> /13 <polygon points="41,51 99,109 59,149 1,91"  fill=${pickedMC1} stroke="none" /> /13  <line x1="40" y1="50" x2="100" y2="110" stroke="black" /> /13  <line x1="0" y1="90" x2="60" y2="150" stroke="black" />/13 <text x="5" y="55" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13 
 /13  /13 
<polygon points="700,10 690, 0 650,0 650, 40 660,50 700, 50  "  fill=${pickedCC1} stroke="none" /> /13  <line x1="700" y1="10" x2="690" y2="0" stroke="black" />  /13  <line x1="660" y1="50" x2="650" y2="40" stroke="black" /> /13 <polygon points="700,50 700,90 699,91 659,51 660,50"  fill=${pickedMC1} stroke="none" /> /13 <polygon points="700,50 700,10 699,9 659,49 660,50"  fill=${pickedCC1} stroke="none" /> /13 
 /13  /13 <polygon points="649,41 591,99 551,59 609,1"  fill=${pickedCC1} stroke="none" /> /13  <line x1="550" y1="60" x2="610" y2="0" stroke="black" /> /13  <line x1="590" y1="100" x2="650" y2="40" stroke="black" /> /13 <polygon points="591,1 649,59 609,99 551,41"  fill=${pickedMC1} stroke="none" /> /13  <line x1="590" y1="0" x2="650" y2="60" stroke="black" /> /13  <line x1="550" y1="40" x2="610" y2="100" stroke="black" />/13 <text x="555" y="5" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13  /13 <polygon points="550,0  550,40 551,41 591, 1  590,0 "  fill=${pickedMC1} stroke="none" /> /13 <polygon points="650,0 650,40 649,41 609,1 610,0 "  fill=${pickedCC1} stroke="none" />
 /13  /13 <polygon points="549,41 491,99 451,59 509,1"  fill=${pickedMC1} stroke="none" /> /13  <line x1="450" y1="60" x2="510" y2="0" stroke="black" /> /13  <line x1="490" y1="100" x2="550" y2="40" stroke="black" /> /13 <polygon points="491,1 549,59 509,99 451,41"  fill=${pickedCC1} stroke="none" /> /13  <line x1="490" y1="0" x2="550" y2="60" stroke="black" /> /13  <line x1="450" y1="40" x2="510" y2="100" stroke="black" />/13 <text x="455" y="5" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>/13  /13 <polygon points="450,0  450,40 451,41 491, 1  490,0 "  fill=${pickedCC1} stroke="none" /> /13 <polygon points="550,0 550,40 549,41 509,1 510,0 "  fill=${pickedMC1} stroke="none" />
 /13  /13 <polygon points="391,1 449,59 409,99 351,41"  fill=${pickedMC1} stroke="none" /> /13  <line x1="390" y1="0" x2="450" y2="60" stroke="black" /> /13  <line x1="350" y1="40" x2="410" y2="100" stroke="black" /> /13 <polygon points="449,41 391,99 351,59 409,1"  fill=${pickedCC1} stroke="none" /> /13  <line x1="350" y1="60" x2="410" y2="0" stroke="black" /> /13  <line x1="390" y1="100" x2="450" y2="40" stroke="black" />/13 <text x="355" y="5" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="350,0  350,40 351,41 391, 1  390,0 "  fill=${pickedMC1} stroke="none" /> /13 <polygon points="450,0 450,40 449,41 409,1 410,0 "  fill=${pickedCC1} stroke="none" />
 /13  /13 <polygon points="291,1 349,59 309,99 251,41"  fill=${pickedCC1} stroke="none" /> /13  <line x1="290" y1="0" x2="350" y2="60" stroke="black" /> /13  <line x1="250" y1="40" x2="310" y2="100" stroke="black" /> /13 <polygon points="349,41 291,99 251,59 309,1"  fill=${pickedMC1} stroke="none" /> /13  <line x1="250" y1="60" x2="310" y2="0" stroke="black" /> /13  <line x1="290" y1="100" x2="350" y2="40" stroke="black" />/13 <text x="255" y="5" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="250,0  250,40 251,41 291, 1  290,0 "  fill=${pickedCC1} stroke="none" /> /13 <polygon points="350,0 350,40 349,41 309,1 310,0 "  fill=${pickedMC1} stroke="none" />
 /13  /13 <polygon points="191,1 249,59 209,99 151,41"  fill=${pickedMC1} stroke="none" /> /13  <line x1="190" y1="0" x2="250" y2="60" stroke="black" /> /13  <line x1="150" y1="40" x2="210" y2="100" stroke="black" /> /13 <polygon points="249,41 191,99 151,59 209,1"  fill=${pickedCC1} stroke="none" /> /13  <line x1="150" y1="60" x2="210" y2="0" stroke="black" /> /13  <line x1="190" y1="100" x2="250" y2="40" stroke="black" />/13 <text x="155" y="5" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="150,0  150,40 151,41 191, 1  190,0 "  fill=${pickedMC1} stroke="none" /> /13 <polygon points="250,0 250,40 249,41 209,1 210,0 "  fill=${pickedCC1} stroke="none" />
 /13  /13 <polygon points="91,1 149,59 109,99 51,41"  fill=${pickedCC1} stroke="none" /> /13  <line x1="90" y1="0" x2="150" y2="60" stroke="black" /> /13  <line x1="50" y1="40" x2="110" y2="100" stroke="black" /> /13 <polygon points="149,41 91,99 51,59 109,1"  fill=${pickedMC1} stroke="none" /> /13  <line x1="50" y1="60" x2="110" y2="0" stroke="black" /> /13  <line x1="90" y1="100" x2="150" y2="40" stroke="black" />/13 <text x="55" y="5" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>/13  /13 <polygon points="50,0  50,40 51,41 91, 1  90,0 "  fill=${pickedCC1} stroke="none" /> /13 <polygon points="150,0 150,40 149,41 109,1 110,0 "  fill=${pickedMC1} stroke="none" />
<polygon points="0,10 10,0 50,0 50,40 40,50 0,50"  fill=${pickedCC1} stroke="none" /> /13  <line x1="0" y1="10" x2="10" y2="0" stroke="black" />  /13  <line x1="40" y1="50" x2="50" y2="40" stroke="black" /> /13 <polygon points="0,50 0,10 1,9 41,49 40,50"  fill=${pickedCC1} stroke="none" /> /13 <polygon points="0,50 0,90 1,91 41,51 40,50"  fill=${pickedMC1} stroke="none" /> /13 
<text x="588" y="562" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="488" y="562" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="388" y="562" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="288" y="562" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="188" y="562" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="88" y="562" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>

<text x="638" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="538" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="438" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="338" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="238" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="138" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="38" y="512" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>


<text x="588" y="462" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="488" y="462" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="388" y="462" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="288" y="462" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="188" y="462" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="88" y="462" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>

<text x="638" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="538" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="438" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="338" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="238" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="138" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="38" y="412" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>


<text x="588" y="362" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="488" y="362" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="388" y="362" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="288" y="362" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="188" y="362" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="88" y="362" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>

<text x="638" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="538" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="438" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="338" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="238" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="138" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="38" y="312" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>


<text x="588" y="262" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="488" y="262" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="388" y="262" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="288" y="262" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="188" y="262" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="88" y="262" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>

<text x="638" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="538" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="438" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="338" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="238" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="138" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="38" y="212" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>


<text x="588" y="162" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="488" y="162" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="388" y="162" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="288" y="162" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="188" y="162" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="88" y="162" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>

<text x="638" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="538" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="438" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="338" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="238" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="138" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="38" y="112" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>


<text x="588" y="62" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="488" y="62" font-family="Arial" font-size="24" fill=${pickedLetterColor}>F</text>
<text x="388" y="62" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="288" y="62" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="188" y="62" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>
<text x="88" y="62" font-family="Arial" font-size="24" fill=${pickedLetterColor}>B</text>

<text x="710" y="560" font-family="Arial" font-size="24" fill=${textColor}>Repeat 1, Row 3</text>/13 <text x="710" y="510" font-family="Arial" font-size="24" fill=${textColor}>Repeat 1, Row 5</text>/13 <text x="710" y="460" font-family="Arial" font-size="24" fill=${textColor}>Repeat 2, Row 3</text>/13 <text x="710" y="410" font-family="Arial" font-size="24" fill=${textColor}>Repeat 2, Row 5</text>/13 <text x="710" y="360" font-family="Arial" font-size="24" fill=${textColor}>Repeat 3, Row 3</text>/13 <text x="710" y="310" font-family="Arial" font-size="24" fill=${textColor}>Repeat 3, Row 5</text>/13 <text x="710" y="260" font-family="Arial" font-size="24" fill=${textColor}>Repeat 4, Row 3</text>/13 <text x="710" y="210" font-family="Arial" font-size="24" fill=${textColor}>Repeat 4, Row 5</text>/13 <text x="710" y="160" font-family="Arial" font-size="24" fill=${textColor}>Repeat 5, Row 3</text>/13 <text x="710" y="110" font-family="Arial" font-size="24" fill=${textColor}>Repeat 5, Row 5</text>/13 <text x="710" y="60" font-family="Arial" font-size="24" fill=${textColor}>Repeat 6, Row 3</text>/13 
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
