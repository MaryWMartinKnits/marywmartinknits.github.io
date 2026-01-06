"use strict";

// declaring variables:
let viewportWidth;
let begOfPage;
let userInputTitle;
let divToCreateSpace;
let optimalHeight;

let allSwitches;

let allLabels;
let allFieldsets;


// SVG:
let SVGinDiv;
let WovenMotifSVG;
        let svgHeight = 0;
        let svgWidth = 0; 
        let viewBox;
let numberOfColors = "4";

let motifPicker;
let pickedMotif;

// Diamond Quartet Collection:
let motifDiamondQuartetMitts_SandL
let motifDiamondQuartetMitts_SandL_innerHTML;
let motifDiamondQuartetMitts_M
let motifDiamondQuartetMitts_M_innerHTML;
let selectedMotif = 'motifDiamondQuartetMitts_SandL';
let selectedMotif_innerHTML = motifDiamondQuartetMitts_SandL_innerHTML;
// end of Diamond Quartet Collection.

// choosing colors:
let MC1pickerBtn;
let svgDivTotalWidth;
let svgDivTotalWidth90;
let restarWidth;
let sumarWidth;
let svgNewWidth;
let svgNewHeight;
let MC1hexDisplay;
let MC2hexDisplay;
let CC1hexDisplay;
let CC2hexDisplay;

let topBox;
let bottomBox;
let leftBox;
let rightBox;
let leftBoxWidth;
let rightBoxWidth;
let leftBoxHeight;
let rightBoxHeight;
let bottomBoxWidth;
let topBoxWidth;

//colors
let MC2pickerBtn;
let CC1pickerBtn;
let CC2pickerBtn;
let allMClines;
let allCClines;
let pickedMC1 = '#9370db'; // mediumpurple
let pickedMC2 = '#c71585'; // mediumvioletred
let pickedCC1 = '#ffa500'; // orange
let pickedCC2 = '#8b4513'; // saddlebrown
let pickedBackground = '#ffffff';
let MC1_swatchTitle;
let CC1_swatchTitle;
let MC2_swatch;
let CC2_swatch; 

let resetColorsBtn;

let note1;
let note2;

let pickerID; //for createColorPicker function

// accordions:

let accArray;

window.onload = init();

function init() {
    console.log('page loaded, the DOM is ready');
    getDOMelements ();
}

function getDOMelements () {
    //console.log('function getDOMelements executed');
    begOfPage = document.querySelector('#begOfPage')
    //windowWidth = document.querySelector('#window-width');
    //console.log(`windowWidth: ${windowWidth}`);
    divToCreateSpace = document.querySelector('.space');
    WovenMotifSVG = document.querySelector('#WovenMotifSVG');
    MC1pickerBtn = document.querySelector('#colorPickerMC1');
    MC2pickerBtn = document.querySelector('#colorPickerMC2');
    CC1pickerBtn = document.querySelector('#colorPickerCC1');
    CC2pickerBtn = document.querySelector('#colorPickerCC2');
    resetColorsBtn = document.querySelector('#resetColorsBtn');
    MC1_swatchTitle = document.querySelector('#MC1_swatchTitle');
    CC1_swatchTitle = document.querySelector('#CC1_swatchTitle');
    MC2_swatch = document.querySelector('#MC2_swatch');
    CC2_swatch = document.querySelector('#CC2_swatch');
    MC1hexDisplay = document.querySelector('#MC1hexCode');
    MC2hexDisplay = document.querySelector('#MC2hexCode');
    CC1hexDisplay = document.querySelector('#CC1hexCode');
    CC2hexDisplay = document.querySelector('#CC2hexCode');
    note1 = document.querySelector('#note1');
    note2 = document.querySelector('#note2');
    accArray = document.getElementsByClassName('accordion');
    console.log(accArray); 
    motifPicker = document.querySelector('#motifPickerDropDown');
    SVGinDiv = document.querySelector("#SVGinDiv");
    topBox = document.querySelector("#topBox");
    bottomBox = document.querySelector("#bottomBox");
    leftBox = document.querySelector("#leftBox");
    rightBox = document.querySelector("#rightBox");
    addEventListeners ();
    chooseMotifColors ();
    giveColorValueToSwatches();
    accordions (); 
    createColorPicker (colorPickerMC1);
    createColorPicker (colorPickerMC2);
    createColorPicker (colorPickerCC1);
    createColorPicker (colorPickerCC2);
}

function hideBtn (button) {
    button.disabled = true;
    button.classList.add('disabledBtn');
    button.classList.add('hidden');
}

function enableBtn (button) {
    button.disabled = false;
    button.classList.remove('disabledBtn');
    button.classList.remove('hidden');
}

function addEventListeners () {
    //console.log('function addEventListeners executed');
    MC1pickerBtn.addEventListener('change', changeMC1);
    MC2pickerBtn.addEventListener('change', changeMC2);
    CC1pickerBtn.addEventListener('change', changeCC1);
    CC2pickerBtn.addEventListener('change', changeCC2);
    motifPicker.addEventListener('change', pickSVG)
    resetColorsBtn.addEventListener('click', resetColours);
    //giveColorValueToSwatches ();
}

function resetColours () {
    console.log('function resetColours executed');
    pickedMC1 = '#9370db'; // mediumpurple
    pickedMC2 = '#c71585'; // mediumvioletred
    pickedCC1 = '#ffa500'; // orange
    pickedCC2 = '#8b4513'; // saddlebrown

    localStorage.MC1 = pickedMC1;
    localStorage.MC2 = pickedMC2;
    localStorage.CC1 = pickedCC1;
    localStorage.CC2 = pickedCC2;
    giveColorValueToSwatches();

    updatePickedColors (pickedMC1, pickedMC2, pickedCC1, pickedCC2, pickedBackground);
}

function resizeScreen () {
    for (let i = 0; i < accArray.length; i++) {
        let panel = accArray[i].nextElementSibling;
        if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
            panel.style.maxHeight = `0px`;
            if (panel.id == 'socials') {
                panel.style.padding = '0px'; 
            }
        } else {
            panel.style.maxHeight = `${panel.scrollHeight}px`; 
            if (panel.class == 'intro') {
                panel.style.maxHeight = `${panel.scrollHeight + 300}px`; 
            }
            if (panel.id == 'socials') {
                panel.style.padding = '16px';
                panel.style.maxHeight = `${panel.scrollHeight + 16}px`; 
                document.getElementById('socials').focus();
            }
        }
    }
    
}

// accordions:

function accordions () {
    for (let i = 0; i < accArray.length; i++) {
        accArray[i].addEventListener('click', toggleAccordions);
    }
}

function toggleAccordions () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
        panel.style.maxHeight = `0px`;
        if (panel.id == 'socials') {
            panel.style.padding = '0px'; 
        }
    } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`; 
        if (panel.class == 'intro') {
            panel.style.maxHeight = `${panel.scrollHeight + 2000}px`; 
        }
        if (panel.id == 'socials') {
            panel.style.padding = '16px';
            panel.style.maxHeight = `${panel.scrollHeight + 16}px`; 
            document.getElementById('socials').focus();
        }
    }
}

// picking MC and CC:
function chooseMotifColors () {
    //console.log('function chooseMotifColors executed');
    if (localStorage.MC1) {
        //console.log(`Stored MC1: ${localStorage.MC1}`);
        pickedMC1 = localStorage.MC1;
    } else {
        pickedMC1 = '#9370db'; // mediumpurple
    }
    if (localStorage.MC2) {
        //console.log(`Stored MC2: ${localStorage.MC2}`);
        pickedMC2 = localStorage.MC2;
    } else {
        pickedMC2 = '#c71585'; // mediumvioletred
    }
    if (localStorage.CC1) {
        //console.log(`Stored CC1: ${localStorage.CC1}`);
        pickedCC1 = localStorage.CC1;
    } else {
        pickedCC1 = '#ffa500'; // orange
    }
    if (localStorage.CC2) {
        //console.log(`Stored CC2: ${localStorage.CC2}`);
        pickedCC2 = localStorage.CC2;
    } else {
        pickedCC2 = '#8b4513'; // saddlebrown
    }

    //console.log(`function chooseMotifColors executed: pickedMC 1: ${pickedMC1} / pickedMC 2: ${pickedMC2} / pickedCC 1: ${pickedCC1} / pickedCC 2: ${pickedCC2}`);
    //updateHEXcodeDisplay (pickedMC1, pickedMC2, pickedCC1, pickedCC2);
    updateSVG_innerHTML ();
    pickSVG();

}

function updateHEXcodeDisplay (pickedMC1, pickedMC2, pickedCC1, pickedCC2) {
    MC1hexDisplay.innerHTML = `hex: ${pickedMC1}`;
    MC2hexDisplay.innerHTML = `hex: ${pickedMC2}`;
    CC1hexDisplay.innerHTML = `hex: ${pickedCC1}`;
    CC2hexDisplay.innerHTML = `hex: ${pickedCC2}`;
}

function changeMC1 () {
    //console.log('function changeMC1 executed');
    pickedMC1 = MC1pickerBtn.value;
    //console.log(`pickedMC1 = ${pickedMC1}`);
    updatePickedColors(pickedMC1, pickedMC2, pickedCC1, pickedCC2, pickedBackground);
    localStorage_MC1 ();

}

function changeMC2 () {
    //console.log('function changeMC2 executed');
    pickedMC2 = MC2pickerBtn.value;
    //console.log(`pickedMC2 = ${pickedMC2}`);
    updatePickedColors(pickedMC1, pickedMC2, pickedCC1, pickedCC2, pickedBackground);
    localStorage_MC2 ();
}

function changeCC1 () {
    //console.log('function changeCC1 executed');
    pickedCC1 = CC1pickerBtn.value;
    //console.log(`pickedCC1 = ${pickedCC1}`);
    updatePickedColors(pickedMC1, pickedMC2, pickedCC1, pickedCC2, pickedBackground);
    localStorage_CC1 ();
}

function changeCC2 () {
    //console.log('function changeCC2 executed');
    pickedCC2 = CC2pickerBtn.value;
    //console.log(`pickedCC2 = ${pickedCC2}`);
    updatePickedColors(pickedMC1, pickedMC2, pickedCC1, pickedCC2, pickedBackground);
    localStorage_CC2 ();
}



function updatePickedColors (pickedMC1, pickedMC2, pickedCC1, pickedCC2, pickedBackground) {
    //console.log('function updatePickedColors executed');
    MC1pickerBtn.value = pickedMC1;
    MC2pickerBtn.value = pickedMC2;
    CC1pickerBtn.value = pickedCC1;
    CC2pickerBtn.value = pickedCC2;
    //console.log(`function updatePickedColors executed = pickedMC 1: ${pickedMC1} / pickedMC 2: ${pickedMC2} / pickedCC 1: ${pickedCC1} / pickedCC 2: ${pickedCC2}`);
    //updateHEXcodeDisplay(pickedMC1, pickedMC2, pickedCC1, pickedCC2);
    updateSVG_innerHTML();
    pickSVG ();
}

function pickSVG () {
    //console.log('FUNCTION pickSVG executed');
    selectedMotif = motifPickerDropDown.value;
    determinarSVGcharacteristics (selectedMotif);
    viewBox = `0 0 ${svgWidth} ${svgHeight}`
    calculateTotalWidth (leftBoxWidth, rightBoxWidth, svgWidth);

    /* if (numberOfColors == "2") { // 2 color motifs:
        hideBtn (MC2_swatch);
        hideBtn (CC2_swatch);
        //console.log(`selected motif: ${selectedMotif} with ${numberOfColors} colors -> hide MC2 & CC2 swatches`);
       // changeMC1andCC1toMCandCC ();
    } else if (numberOfColors == "4") {  // 4 color motifs: 
        enableBtn (MC2_swatch);
        enableBtn (CC2_swatch);
        //console.log(`selected motif: ${selectedMotif} with ${numberOfColors} colors -> enable MC2 & CC2 swatches`);
       // changeMCandCCtoMC1andCC1 ();
    } */

    updateSVG_innerHTML();
    drawSVG (selectedMotif);
}

function determinarSVGcharacteristics () {
switch (selectedMotif) {
    case "motifDiamondQuartetMitts_SandL":
        leftBoxWidth = 0;
        rightBoxWidth = 0; 
        svgHeight = 600; //I'll make this one dependant on the svgWidth
        svgWidth = 1000; //I'll make the svgWidth dependant on the width of the screen
        numberOfColors = "4";
        selectedMotif_innerHTML = motifDiamondQuartetMitts_SandL_innerHTML;
        break;
    case "motifDiamondQuartetMitts_M":
        svgHeight = 600;
        svgWidth = 800;
        numberOfColors = "4";
        selectedMotif_innerHTML = motifDiamondQuartetMitts_M_innerHTML;
        break;
    default:  
        svgHeight = 600;
        svgWidth = 600;
        numberOfColors = "4";
        selectedMotif_innerHTML = motifDiamondQuartetMitts_SandL_innerHTML;
    }

}

function calculateTotalWidth (leftBoxWidth, rightBoxWidth, svgWidth) {
    viewportWidth = window.innerWidth;
    //console.log(`function calculateTotalWidth executed: leftBoxWidth = ${leftBoxWidth}, rightBoxWidth = ${rightBoxWidth}, svgWidth = ${svgWidth}, viewportWidth = ${viewportWidth}`);
    viewBox = `0 0 ${svgWidth} ${svgHeight}`
    svgDivTotalWidth = leftBoxWidth + svgWidth + rightBoxWidth;
    if (svgDivTotalWidth < viewportWidth) {
        //console.log("svgDivTotalWidth < viewportWidth")
        svgNewWidth = svgWidth;
        svgNewHeight = svgHeight;
        if (svgDivTotalWidth90 < viewportWidth) {
            //console.log("svgDivTotalWidth90 < viewportWidth")
            sumarWidth = viewportWidth - svgDivTotalWidth;
            svgNewWidth = (svgDivTotalWidth + sumarWidth) * 0.9;
            svgNewHeight = svgHeight * svgNewWidth / svgWidth;

            //console.log (`sumarWidth = (viewportWidth - vgDivTotalWidth90): (${viewportWidth} - ${svgDivTotalWidth90}) = ${sumarWidth} / svgWidth: ${svgWidth} -> svgNewWidth: ${svgNewWidth} / svgHeight: ${svgHeight} -> svgNewHeight: ${svgNewHeight}`);
        }
    } else if (svgDivTotalWidth > viewportWidth) {
        //console.log("svgDivTotalWidth > viewportWidth")
        restarWidth = svgDivTotalWidth - viewportWidth;
        svgNewWidth = svgDivTotalWidth - restarWidth;
        svgNewWidth = svgNewWidth * 0.90;
        svgNewHeight = svgHeight * svgNewWidth / svgWidth;
        //console.log (`restarWidth = (svgDivTotalWidth - viewportWidth): (${svgDivTotalWidth} - ${viewportWidth}) = ${restarWidth} / svgWidth: ${svgWidth} -> svg(new)Width: ${svgNewWidth} / svgHeight: ${svgHeight} -> svgNewHeight: ${svgNewHeight}`);
    }
        leftBoxHeight = svgNewHeight;
        rightBoxHeight = svgNewHeight; 
        bottomBoxWidth = svgNewWidth;
        topBoxWidth = svgNewWidth;
    
}

function drawSVG (selectedMotif) {
    //console.log('function drawSVG executed')
    //console.log(`svgWidth: ${svgWidth} / svgNewWidth: ${svgNewWidth}`);
    //console.log(`svgHeigth: ${svgHeight} / svgNewHeight: ${svgNewHeight}`);
    //console.log(`viewportWidth: ${viewportWidth} / viewBox: ${viewBox}`);
    updateSVG_innerHTML();
    SVGinDiv.innerHTML = 
    `<svg id= "${selectedMotif}" width="${svgNewWidth}" height="${svgNewHeight}" viewbox="${viewBox}"
    style="border:1px solid var(--color4); background-color:#ffffff"> 
    ${selectedMotif_innerHTML}
    </svg>`;
    WovenMotifSVG.appendChild(leftBox);
    WovenMotifSVG.appendChild(SVGinDiv);
    WovenMotifSVG.appendChild(rightBox);
    document.getElementById("svgChartDiv").focus();
}

function updateSVG_innerHTML () {
    motifDiamondQuartetMitts_SandL_innerHTML = 
        `<polygon points="0,0 0,600 1000,600 1000,0 " fill= "white" stroke="black" />
        <polygon points="1000,590 990,600 950,600 950,560 960,550 1000,550 "  fill="${pickedMC1}" stroke="none" /> /13  <line x1="1000" y1="590" x2="990" y2="600" stroke="black" />  /13  <line x1="960" y1="550" x2="950" y2="560" stroke="black" /> /13 <polygon points="1000,550 1000,590 999,591 959,551 960,550"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="1000,550 1000,510 999,509 959,549 960,550"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="891,501 949,559 909,599 851,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="890" y1="500" x2="950" y2="560" stroke="black" /> /13  <line x1="850" y1="540" x2="910" y2="600" stroke="black" /> /13 <polygon points="949,541 891,599 851,559 909,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="850" y1="560" x2="910" y2="500" stroke="black" /> /13  <line x1="890" y1="600" x2="950" y2="540" stroke="black" /> /13 <polygon points="850,600 850,560 851,559 891,599 890,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="950,600 950,560 949,559 909,599 910,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="849,541 791,599 751,559 809,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="750" y1="560" x2="810" y2="500" stroke="black" /> /13  <line x1="790" y1="600" x2="850" y2="540" stroke="black" /> /13 <polygon points="791,501 849,559 809,599 751,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="790" y1="500" x2="850" y2="560" stroke="black" /> /13  <line x1="750" y1="540" x2="810" y2="600" stroke="black" /> /13 <polygon points="750,600 750,560 751,559 791,599 790,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="850,600 850,560 849,559 809,599 810,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="691,501 749,559 709,599 651,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="690" y1="500" x2="750" y2="560" stroke="black" /> /13  <line x1="650" y1="540" x2="710" y2="600" stroke="black" /> /13 <polygon points="749,541 691,599 651,559 709,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="650" y1="560" x2="710" y2="500" stroke="black" /> /13  <line x1="690" y1="600" x2="750" y2="540" stroke="black" /> /13 <polygon points="650,600 650,560 651,559 691,599 690,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="750,600 750,560 749,559 709,599 710,600 "  fill="${pickedCC2}" stroke="none" />
        /13  /13 <polygon points="649,541 591,599 551,559 609,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="560" x2="610" y2="500" stroke="black" /> /13  <line x1="590" y1="600" x2="650" y2="540" stroke="black" /> /13 <polygon points="591,501 649,559 609,599 551,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="590" y1="500" x2="650" y2="560" stroke="black" /> /13  <line x1="550" y1="540" x2="610" y2="600" stroke="black" /> /13 <polygon points="550,600 550,560 551,559 591,599 590,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="650,600 650,560 649,559 609,599 610,600 "  fill="${pickedCC2}" stroke="none" />
        /13  /13 <polygon points="491,501 549,559 509,599 451,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="490" y1="500" x2="550" y2="560" stroke="black" /> /13  <line x1="450" y1="540" x2="510" y2="600" stroke="black" /> /13 <polygon points="549,541 491,599 451,559 509,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="560" x2="510" y2="500" stroke="black" /> /13  <line x1="490" y1="600" x2="550" y2="540" stroke="black" /> /13 <polygon points="450,600 450,560 451,559 491,599 490,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="550,600 550,560 549,559 509,599 510,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="449,541 391,599 351,559 409,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="560" x2="410" y2="500" stroke="black" /> /13  <line x1="390" y1="600" x2="450" y2="540" stroke="black" /> /13 <polygon points="391,501 449,559 409,599 351,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="390" y1="500" x2="450" y2="560" stroke="black" /> /13  <line x1="350" y1="540" x2="410" y2="600" stroke="black" /> /13 <polygon points="350,600 350,560 351,559 391,599 390,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="450,600 450,560 449,559 409,599 410,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="291,501 349,559 309,599 251,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="290" y1="500" x2="350" y2="560" stroke="black" /> /13  <line x1="250" y1="540" x2="310" y2="600" stroke="black" /> /13 <polygon points="349,541 291,599 251,559 309,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="560" x2="310" y2="500" stroke="black" /> /13  <line x1="290" y1="600" x2="350" y2="540" stroke="black" /> /13 <polygon points="250,600 250,560 251,559 291,599 290,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="350,600 350,560 349,559 309,599 310,600 "  fill="${pickedCC2}" stroke="none" />
        /13  /13 <polygon points="249,541 191,599 151,559 209,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="560" x2="210" y2="500" stroke="black" /> /13  <line x1="190" y1="600" x2="250" y2="540" stroke="black" /> /13 <polygon points="191,501 249,559 209,599 151,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="190" y1="500" x2="250" y2="560" stroke="black" /> /13  <line x1="150" y1="540" x2="210" y2="600" stroke="black" /> /13 <polygon points="150,600 150,560 151,559 191,599 190,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="250,600 250,560 249,559 209,599 210,600 "  fill="${pickedCC2}" stroke="none" />
        /13  /13 <polygon points="91,501 149,559 109,599 51,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="90" y1="500" x2="150" y2="560" stroke="black" /> /13  <line x1="50" y1="540" x2="110" y2="600" stroke="black" /> /13 <polygon points="149,541 91,599 51,559 109,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="560" x2="110" y2="500" stroke="black" /> /13  <line x1="90" y1="600" x2="150" y2="540" stroke="black" /> /13 <polygon points="50,600 50,560 51,559 91,599 90,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="150,600 150,560 149,559 109,599 110,600 "  fill="${pickedMC2}" stroke="none" />
        <polygon points="0,590 10,600 50,600 50,560 40,550  0,550 "  fill="${pickedMC2}" stroke="none" /> /13  <line x1="0" y1="590" x2="10" y2="600" stroke="black" />  /13  <line x1="40" y1="550" x2="50" y2="560" stroke="black" /> /13 <polygon points="0,550 0,510 1,509 41,549 40,550"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,550 0,590 1,591 41,551 40,550"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="999,491 941,549 901,509 959,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="900" y1="510" x2="960" y2="450" stroke="black" /> /13  <line x1="940" y1="550" x2="1000" y2="490" stroke="black" /> /13 <polygon points="941,451 999,509 959,549 901,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="940" y1="450" x2="1000" y2="510" stroke="black" /> /13  <line x1="900" y1="490" x2="960" y2="550" stroke="black" />
        /13  /13 <polygon points="899,491 841,549 801,509 859,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="800" y1="510" x2="860" y2="450" stroke="black" /> /13  <line x1="840" y1="550" x2="900" y2="490" stroke="black" /> /13 <polygon points="841,451 899,509 859,549 801,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="840" y1="450" x2="900" y2="510" stroke="black" /> /13  <line x1="800" y1="490" x2="860" y2="550" stroke="black" />
        /13  /13 <polygon points="799,491 741,549 701,509 759,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="700" y1="510" x2="760" y2="450" stroke="black" /> /13  <line x1="740" y1="550" x2="800" y2="490" stroke="black" /> /13 <polygon points="741,451 799,509 759,549 701,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="740" y1="450" x2="800" y2="510" stroke="black" /> /13  <line x1="700" y1="490" x2="760" y2="550" stroke="black" />
        /13  /13 <polygon points="699,491 641,549 601,509 659,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="510" x2="660" y2="450" stroke="black" /> /13  <line x1="640" y1="550" x2="700" y2="490" stroke="black" /> /13 <polygon points="641,451 699,509 659,549 601,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="640" y1="450" x2="700" y2="510" stroke="black" /> /13  <line x1="600" y1="490" x2="660" y2="550" stroke="black" />
        /13  /13 <polygon points="599,491 541,549 501,509 559,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="510" x2="560" y2="450" stroke="black" /> /13  <line x1="540" y1="550" x2="600" y2="490" stroke="black" /> /13 <polygon points="541,451 599,509 559,549 501,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="540" y1="450" x2="600" y2="510" stroke="black" /> /13  <line x1="500" y1="490" x2="560" y2="550" stroke="black" />
        /13  /13 <polygon points="499,491 441,549 401,509 459,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="510" x2="460" y2="450" stroke="black" /> /13  <line x1="440" y1="550" x2="500" y2="490" stroke="black" /> /13 <polygon points="441,451 499,509 459,549 401,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="440" y1="450" x2="500" y2="510" stroke="black" /> /13  <line x1="400" y1="490" x2="460" y2="550" stroke="black" />
        /13  /13 <polygon points="399,491 341,549 301,509 359,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="510" x2="360" y2="450" stroke="black" /> /13  <line x1="340" y1="550" x2="400" y2="490" stroke="black" /> /13 <polygon points="341,451 399,509 359,549 301,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="340" y1="450" x2="400" y2="510" stroke="black" /> /13  <line x1="300" y1="490" x2="360" y2="550" stroke="black" />
        /13  /13 <polygon points="299,491 241,549 201,509 259,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="510" x2="260" y2="450" stroke="black" /> /13  <line x1="240" y1="550" x2="300" y2="490" stroke="black" /> /13 <polygon points="241,451 299,509 259,549 201,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="240" y1="450" x2="300" y2="510" stroke="black" /> /13  <line x1="200" y1="490" x2="260" y2="550" stroke="black" />
        /13  /13 <polygon points="199,491 141,549 101,509 159,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="510" x2="160" y2="450" stroke="black" /> /13  <line x1="140" y1="550" x2="200" y2="490" stroke="black" /> /13 <polygon points="141,451 199,509 159,549 101,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="140" y1="450" x2="200" y2="510" stroke="black" /> /13  <line x1="100" y1="490" x2="160" y2="550" stroke="black" />
        /13  /13 <polygon points="99,491 41,549 1,509 59,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="510" x2="60" y2="450" stroke="black" /> /13  <line x1="40" y1="550" x2="100" y2="490" stroke="black" /> /13 <polygon points="41,451 99,509 59,549 1,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="40" y1="450" x2="100" y2="510" stroke="black" /> /13  <line x1="0" y1="490" x2="60" y2="550" stroke="black" />
        /13  /13 
        /13 <polygon points="1000,450 1000,490 999,491 959,451 960,450"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="1000,450 1000,410 999,409 959,449 960,450"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="891,401 949,459 909,499 851,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="890" y1="400" x2="950" y2="460" stroke="black" /> /13  <line x1="850" y1="440" x2="910" y2="500" stroke="black" /> /13 <polygon points="949,441 891,499 851,459 909,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="850" y1="460" x2="910" y2="400" stroke="black" /> /13  <line x1="890" y1="500" x2="950" y2="440" stroke="black" />
        /13  /13 <polygon points="849,441 791,499 751,459 809,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="750" y1="460" x2="810" y2="400" stroke="black" /> /13  <line x1="790" y1="500" x2="850" y2="440" stroke="black" /> /13 <polygon points="791,401 849,459 809,499 751,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="790" y1="400" x2="850" y2="460" stroke="black" /> /13  <line x1="750" y1="440" x2="810" y2="500" stroke="black" />
        /13  /13 <polygon points="691,401 749,459 709,499 651,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="690" y1="400" x2="750" y2="460" stroke="black" /> /13  <line x1="650" y1="440" x2="710" y2="500" stroke="black" /> /13 <polygon points="749,441 691,499 651,459 709,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="650" y1="460" x2="710" y2="400" stroke="black" /> /13  <line x1="690" y1="500" x2="750" y2="440" stroke="black" />
        /13  /13 <polygon points="649,441 591,499 551,459 609,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="460" x2="610" y2="400" stroke="black" /> /13  <line x1="590" y1="500" x2="650" y2="440" stroke="black" /> /13 <polygon points="591,401 649,459 609,499 551,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="590" y1="400" x2="650" y2="460" stroke="black" /> /13  <line x1="550" y1="440" x2="610" y2="500" stroke="black" />
        /13  /13 <polygon points="491,401 549,459 509,499 451,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="490" y1="400" x2="550" y2="460" stroke="black" /> /13  <line x1="450" y1="440" x2="510" y2="500" stroke="black" /> /13 <polygon points="549,441 491,499 451,459 509,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="460" x2="510" y2="400" stroke="black" /> /13  <line x1="490" y1="500" x2="550" y2="440" stroke="black" />
        /13  /13 <polygon points="449,441 391,499 351,459 409,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="460" x2="410" y2="400" stroke="black" /> /13  <line x1="390" y1="500" x2="450" y2="440" stroke="black" /> /13 <polygon points="391,401 449,459 409,499 351,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="390" y1="400" x2="450" y2="460" stroke="black" /> /13  <line x1="350" y1="440" x2="410" y2="500" stroke="black" />
        /13  /13 <polygon points="291,401 349,459 309,499 251,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="290" y1="400" x2="350" y2="460" stroke="black" /> /13  <line x1="250" y1="440" x2="310" y2="500" stroke="black" /> /13 <polygon points="349,441 291,499 251,459 309,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="460" x2="310" y2="400" stroke="black" /> /13  <line x1="290" y1="500" x2="350" y2="440" stroke="black" />
        /13  /13 <polygon points="249,441 191,499 151,459 209,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="460" x2="210" y2="400" stroke="black" /> /13  <line x1="190" y1="500" x2="250" y2="440" stroke="black" /> /13 <polygon points="191,401 249,459 209,499 151,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="190" y1="400" x2="250" y2="460" stroke="black" /> /13  <line x1="150" y1="440" x2="210" y2="500" stroke="black" />
        /13  /13 <polygon points="91,401 149,459 109,499 51,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="90" y1="400" x2="150" y2="460" stroke="black" /> /13  <line x1="50" y1="440" x2="110" y2="500" stroke="black" /> /13 <polygon points="149,441 91,499 51,459 109,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="460" x2="110" y2="400" stroke="black" /> /13  <line x1="90" y1="500" x2="150" y2="440" stroke="black" />
        /13 <polygon points="0,450 0,410 1,409 41,449 40,450"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,450 0,490 1,491 41,451 40,450"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="941,351 999,409 959,449 901,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="940" y1="350" x2="1000" y2="410" stroke="black" /> /13  <line x1="900" y1="390" x2="960" y2="450" stroke="black" /> /13 <polygon points="999,391 941,449 901,409 959,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="900" y1="410" x2="960" y2="350" stroke="black" /> /13  <line x1="940" y1="450" x2="1000" y2="390" stroke="black" />
        /13  /13 <polygon points="841,351 899,409 859,449 801,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="840" y1="350" x2="900" y2="410" stroke="black" /> /13  <line x1="800" y1="390" x2="860" y2="450" stroke="black" /> /13 <polygon points="899,391 841,449 801,409 859,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="800" y1="410" x2="860" y2="350" stroke="black" /> /13  <line x1="840" y1="450" x2="900" y2="390" stroke="black" />
        /13  /13 <polygon points="741,351 799,409 759,449 701,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="740" y1="350" x2="800" y2="410" stroke="black" /> /13  <line x1="700" y1="390" x2="760" y2="450" stroke="black" /> /13 <polygon points="799,391 741,449 701,409 759,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="410" x2="760" y2="350" stroke="black" /> /13  <line x1="740" y1="450" x2="800" y2="390" stroke="black" />
        /13  /13 <polygon points="641,351 699,409 659,449 601,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="640" y1="350" x2="700" y2="410" stroke="black" /> /13  <line x1="600" y1="390" x2="660" y2="450" stroke="black" /> /13 <polygon points="699,391 641,449 601,409 659,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="410" x2="660" y2="350" stroke="black" /> /13  <line x1="640" y1="450" x2="700" y2="390" stroke="black" />
        /13  /13 <polygon points="541,351 599,409 559,449 501,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="540" y1="350" x2="600" y2="410" stroke="black" /> /13  <line x1="500" y1="390" x2="560" y2="450" stroke="black" /> /13 <polygon points="599,391 541,449 501,409 559,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="410" x2="560" y2="350" stroke="black" /> /13  <line x1="540" y1="450" x2="600" y2="390" stroke="black" />
        /13  /13 <polygon points="441,351 499,409 459,449 401,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="440" y1="350" x2="500" y2="410" stroke="black" /> /13  <line x1="400" y1="390" x2="460" y2="450" stroke="black" /> /13 <polygon points="499,391 441,449 401,409 459,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="410" x2="460" y2="350" stroke="black" /> /13  <line x1="440" y1="450" x2="500" y2="390" stroke="black" />
        /13  /13 <polygon points="341,351 399,409 359,449 301,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="340" y1="350" x2="400" y2="410" stroke="black" /> /13  <line x1="300" y1="390" x2="360" y2="450" stroke="black" /> /13 <polygon points="399,391 341,449 301,409 359,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="410" x2="360" y2="350" stroke="black" /> /13  <line x1="340" y1="450" x2="400" y2="390" stroke="black" />
        /13  /13 <polygon points="241,351 299,409 259,449 201,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="240" y1="350" x2="300" y2="410" stroke="black" /> /13  <line x1="200" y1="390" x2="260" y2="450" stroke="black" /> /13 <polygon points="299,391 241,449 201,409 259,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="410" x2="260" y2="350" stroke="black" /> /13  <line x1="240" y1="450" x2="300" y2="390" stroke="black" />
        /13  /13 <polygon points="141,351 199,409 159,449 101,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="140" y1="350" x2="200" y2="410" stroke="black" /> /13  <line x1="100" y1="390" x2="160" y2="450" stroke="black" /> /13 <polygon points="199,391 141,449 101,409 159,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="410" x2="160" y2="350" stroke="black" /> /13  <line x1="140" y1="450" x2="200" y2="390" stroke="black" />
        /13  /13 <polygon points="41,351 99,409 59,449 1,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="40" y1="350" x2="100" y2="410" stroke="black" /> /13  <line x1="0" y1="390" x2="60" y2="450" stroke="black" /> /13 <polygon points="99,391 41,449 1,409 59,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="410" x2="60" y2="350" stroke="black" /> /13  <line x1="40" y1="450" x2="100" y2="390" stroke="black" />
        /13  /13 
        /13 <polygon points="1000,350 1000,390 999,391 959,351 960,350"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="1000,350 1000,310 999,309 959,349 960,350"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="891,301 949,359 909,399 851,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="890" y1="300" x2="950" y2="360" stroke="black" /> /13  <line x1="850" y1="340" x2="910" y2="400" stroke="black" /> /13 <polygon points="949,341 891,399 851,359 909,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="850" y1="360" x2="910" y2="300" stroke="black" /> /13  <line x1="890" y1="400" x2="950" y2="340" stroke="black" />
        /13  /13 <polygon points="849,341 791,399 751,359 809,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="750" y1="360" x2="810" y2="300" stroke="black" /> /13  <line x1="790" y1="400" x2="850" y2="340" stroke="black" /> /13 <polygon points="791,301 849,359 809,399 751,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="790" y1="300" x2="850" y2="360" stroke="black" /> /13  <line x1="750" y1="340" x2="810" y2="400" stroke="black" />
        /13  /13 <polygon points="691,301 749,359 709,399 651,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="690" y1="300" x2="750" y2="360" stroke="black" /> /13  <line x1="650" y1="340" x2="710" y2="400" stroke="black" /> /13 <polygon points="749,341 691,399 651,359 709,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="650" y1="360" x2="710" y2="300" stroke="black" /> /13  <line x1="690" y1="400" x2="750" y2="340" stroke="black" />
        /13  /13 <polygon points="649,341 591,399 551,359 609,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="360" x2="610" y2="300" stroke="black" /> /13  <line x1="590" y1="400" x2="650" y2="340" stroke="black" /> /13 <polygon points="591,301 649,359 609,399 551,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="590" y1="300" x2="650" y2="360" stroke="black" /> /13  <line x1="550" y1="340" x2="610" y2="400" stroke="black" />
        /13  /13 <polygon points="491,301 549,359 509,399 451,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="490" y1="300" x2="550" y2="360" stroke="black" /> /13  <line x1="450" y1="340" x2="510" y2="400" stroke="black" /> /13 <polygon points="549,341 491,399 451,359 509,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="360" x2="510" y2="300" stroke="black" /> /13  <line x1="490" y1="400" x2="550" y2="340" stroke="black" />
        /13  /13 <polygon points="449,341 391,399 351,359 409,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="360" x2="410" y2="300" stroke="black" /> /13  <line x1="390" y1="400" x2="450" y2="340" stroke="black" /> /13 <polygon points="391,301 449,359 409,399 351,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="390" y1="300" x2="450" y2="360" stroke="black" /> /13  <line x1="350" y1="340" x2="410" y2="400" stroke="black" />
        /13  /13 <polygon points="291,301 349,359 309,399 251,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="290" y1="300" x2="350" y2="360" stroke="black" /> /13  <line x1="250" y1="340" x2="310" y2="400" stroke="black" /> /13 <polygon points="349,341 291,399 251,359 309,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="360" x2="310" y2="300" stroke="black" /> /13  <line x1="290" y1="400" x2="350" y2="340" stroke="black" />
        /13  /13 <polygon points="249,341 191,399 151,359 209,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="360" x2="210" y2="300" stroke="black" /> /13  <line x1="190" y1="400" x2="250" y2="340" stroke="black" /> /13 <polygon points="191,301 249,359 209,399 151,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="190" y1="300" x2="250" y2="360" stroke="black" /> /13  <line x1="150" y1="340" x2="210" y2="400" stroke="black" />
        /13  /13 <polygon points="91,301 149,359 109,399 51,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="90" y1="300" x2="150" y2="360" stroke="black" /> /13  <line x1="50" y1="340" x2="110" y2="400" stroke="black" /> /13 <polygon points="149,341 91,399 51,359 109,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="360" x2="110" y2="300" stroke="black" /> /13  <line x1="90" y1="400" x2="150" y2="340" stroke="black" />
        /13 <polygon points="0,350 0,310 1,309 41,349 40,350"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,350 0,390 1,391 41,351 40,350"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="999,291 941,349 901,309 959,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="900" y1="310" x2="960" y2="250" stroke="black" /> /13  <line x1="940" y1="350" x2="1000" y2="290" stroke="black" /> /13 <polygon points="941,251 999,309 959,349 901,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="940" y1="250" x2="1000" y2="310" stroke="black" /> /13  <line x1="900" y1="290" x2="960" y2="350" stroke="black" />
        /13  /13 <polygon points="899,291 841,349 801,309 859,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="800" y1="310" x2="860" y2="250" stroke="black" /> /13  <line x1="840" y1="350" x2="900" y2="290" stroke="black" /> /13 <polygon points="841,251 899,309 859,349 801,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="840" y1="250" x2="900" y2="310" stroke="black" /> /13  <line x1="800" y1="290" x2="860" y2="350" stroke="black" />
        /13  /13 <polygon points="799,291 741,349 701,309 759,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="310" x2="760" y2="250" stroke="black" /> /13  <line x1="740" y1="350" x2="800" y2="290" stroke="black" /> /13 <polygon points="741,251 799,309 759,349 701,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="740" y1="250" x2="800" y2="310" stroke="black" /> /13  <line x1="700" y1="290" x2="760" y2="350" stroke="black" />
        /13  /13 <polygon points="699,291 641,349 601,309 659,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="310" x2="660" y2="250" stroke="black" /> /13  <line x1="640" y1="350" x2="700" y2="290" stroke="black" /> /13 <polygon points="641,251 699,309 659,349 601,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="640" y1="250" x2="700" y2="310" stroke="black" /> /13  <line x1="600" y1="290" x2="660" y2="350" stroke="black" />
        /13  /13 <polygon points="599,291 541,349 501,309 559,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="310" x2="560" y2="250" stroke="black" /> /13  <line x1="540" y1="350" x2="600" y2="290" stroke="black" /> /13 <polygon points="541,251 599,309 559,349 501,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="540" y1="250" x2="600" y2="310" stroke="black" /> /13  <line x1="500" y1="290" x2="560" y2="350" stroke="black" />
        /13  /13 <polygon points="499,291 441,349 401,309 459,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="310" x2="460" y2="250" stroke="black" /> /13  <line x1="440" y1="350" x2="500" y2="290" stroke="black" /> /13 <polygon points="441,251 499,309 459,349 401,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="440" y1="250" x2="500" y2="310" stroke="black" /> /13  <line x1="400" y1="290" x2="460" y2="350" stroke="black" />
        /13  /13 <polygon points="399,291 341,349 301,309 359,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="310" x2="360" y2="250" stroke="black" /> /13  <line x1="340" y1="350" x2="400" y2="290" stroke="black" /> /13 <polygon points="341,251 399,309 359,349 301,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="340" y1="250" x2="400" y2="310" stroke="black" /> /13  <line x1="300" y1="290" x2="360" y2="350" stroke="black" />
        /13  /13 <polygon points="299,291 241,349 201,309 259,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="310" x2="260" y2="250" stroke="black" /> /13  <line x1="240" y1="350" x2="300" y2="290" stroke="black" /> /13 <polygon points="241,251 299,309 259,349 201,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="240" y1="250" x2="300" y2="310" stroke="black" /> /13  <line x1="200" y1="290" x2="260" y2="350" stroke="black" />
        /13  /13 <polygon points="199,291 141,349 101,309 159,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="310" x2="160" y2="250" stroke="black" /> /13  <line x1="140" y1="350" x2="200" y2="290" stroke="black" /> /13 <polygon points="141,251 199,309 159,349 101,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="140" y1="250" x2="200" y2="310" stroke="black" /> /13  <line x1="100" y1="290" x2="160" y2="350" stroke="black" />
        /13  /13 <polygon points="99,291 41,349 1,309 59,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="310" x2="60" y2="250" stroke="black" /> /13  <line x1="40" y1="350" x2="100" y2="290" stroke="black" /> /13 <polygon points="41,251 99,309 59,349 1,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="40" y1="250" x2="100" y2="310" stroke="black" /> /13  <line x1="0" y1="290" x2="60" y2="350" stroke="black" />
        /13  /13 
        /13 <polygon points="1000,250 1000,290 999,291 959,251 960,250"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="1000,250 1000,210 999,209 959,249 960,250"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="891,201 949,259 909,299 851,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="890" y1="200" x2="950" y2="260" stroke="black" /> /13  <line x1="850" y1="240" x2="910" y2="300" stroke="black" /> /13 <polygon points="949,241 891,299 851,259 909,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="850" y1="260" x2="910" y2="200" stroke="black" /> /13  <line x1="890" y1="300" x2="950" y2="240" stroke="black" />
        /13  /13 <polygon points="849,241 791,299 751,259 809,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="750" y1="260" x2="810" y2="200" stroke="black" /> /13  <line x1="790" y1="300" x2="850" y2="240" stroke="black" /> /13 <polygon points="791,201 849,259 809,299 751,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="790" y1="200" x2="850" y2="260" stroke="black" /> /13  <line x1="750" y1="240" x2="810" y2="300" stroke="black" />
        /13  /13 <polygon points="691,201 749,259 709,299 651,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="690" y1="200" x2="750" y2="260" stroke="black" /> /13  <line x1="650" y1="240" x2="710" y2="300" stroke="black" /> /13 <polygon points="749,241 691,299 651,259 709,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="650" y1="260" x2="710" y2="200" stroke="black" /> /13  <line x1="690" y1="300" x2="750" y2="240" stroke="black" />
        /13  /13 <polygon points="649,241 591,299 551,259 609,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="260" x2="610" y2="200" stroke="black" /> /13  <line x1="590" y1="300" x2="650" y2="240" stroke="black" /> /13 <polygon points="591,201 649,259 609,299 551,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="590" y1="200" x2="650" y2="260" stroke="black" /> /13  <line x1="550" y1="240" x2="610" y2="300" stroke="black" />
        /13  /13 <polygon points="491,201 549,259 509,299 451,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="490" y1="200" x2="550" y2="260" stroke="black" /> /13  <line x1="450" y1="240" x2="510" y2="300" stroke="black" /> /13 <polygon points="549,241 491,299 451,259 509,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="260" x2="510" y2="200" stroke="black" /> /13  <line x1="490" y1="300" x2="550" y2="240" stroke="black" />
        /13  /13 <polygon points="449,241 391,299 351,259 409,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="260" x2="410" y2="200" stroke="black" /> /13  <line x1="390" y1="300" x2="450" y2="240" stroke="black" /> /13 <polygon points="391,201 449,259 409,299 351,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="390" y1="200" x2="450" y2="260" stroke="black" /> /13  <line x1="350" y1="240" x2="410" y2="300" stroke="black" />
        /13  /13 <polygon points="291,201 349,259 309,299 251,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="290" y1="200" x2="350" y2="260" stroke="black" /> /13  <line x1="250" y1="240" x2="310" y2="300" stroke="black" /> /13 <polygon points="349,241 291,299 251,259 309,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="260" x2="310" y2="200" stroke="black" /> /13  <line x1="290" y1="300" x2="350" y2="240" stroke="black" />
        /13  /13 <polygon points="249,241 191,299 151,259 209,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="260" x2="210" y2="200" stroke="black" /> /13  <line x1="190" y1="300" x2="250" y2="240" stroke="black" /> /13 <polygon points="191,201 249,259 209,299 151,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="190" y1="200" x2="250" y2="260" stroke="black" /> /13  <line x1="150" y1="240" x2="210" y2="300" stroke="black" />
        /13  /13 <polygon points="91,201 149,259 109,299 51,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="90" y1="200" x2="150" y2="260" stroke="black" /> /13  <line x1="50" y1="240" x2="110" y2="300" stroke="black" /> /13 <polygon points="149,241 91,299 51,259 109,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="260" x2="110" y2="200" stroke="black" /> /13  <line x1="90" y1="300" x2="150" y2="240" stroke="black" />
        /13 <polygon points="0,250 0,210 1,209 41,249 40,250"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,250 0,290 1,291 41,251 40,250"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="941,151 999,209 959,249 901,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="940" y1="150" x2="1000" y2="210" stroke="black" /> /13  <line x1="900" y1="190" x2="960" y2="250" stroke="black" /> /13 <polygon points="999,191 941,249 901,209 959,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="900" y1="210" x2="960" y2="150" stroke="black" /> /13  <line x1="940" y1="250" x2="1000" y2="190" stroke="black" />
        /13  /13 <polygon points="841,151 899,209 859,249 801,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="840" y1="150" x2="900" y2="210" stroke="black" /> /13  <line x1="800" y1="190" x2="860" y2="250" stroke="black" /> /13 <polygon points="899,191 841,249 801,209 859,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="800" y1="210" x2="860" y2="150" stroke="black" /> /13  <line x1="840" y1="250" x2="900" y2="190" stroke="black" />
        /13  /13 <polygon points="741,151 799,209 759,249 701,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="740" y1="150" x2="800" y2="210" stroke="black" /> /13  <line x1="700" y1="190" x2="760" y2="250" stroke="black" /> /13 <polygon points="799,191 741,249 701,209 759,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="700" y1="210" x2="760" y2="150" stroke="black" /> /13  <line x1="740" y1="250" x2="800" y2="190" stroke="black" />
        /13  /13 <polygon points="641,151 699,209 659,249 601,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="640" y1="150" x2="700" y2="210" stroke="black" /> /13  <line x1="600" y1="190" x2="660" y2="250" stroke="black" /> /13 <polygon points="699,191 641,249 601,209 659,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="210" x2="660" y2="150" stroke="black" /> /13  <line x1="640" y1="250" x2="700" y2="190" stroke="black" />
        /13  /13 <polygon points="541,151 599,209 559,249 501,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="540" y1="150" x2="600" y2="210" stroke="black" /> /13  <line x1="500" y1="190" x2="560" y2="250" stroke="black" /> /13 <polygon points="599,191 541,249 501,209 559,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="210" x2="560" y2="150" stroke="black" /> /13  <line x1="540" y1="250" x2="600" y2="190" stroke="black" />
        /13  /13 <polygon points="441,151 499,209 459,249 401,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="440" y1="150" x2="500" y2="210" stroke="black" /> /13  <line x1="400" y1="190" x2="460" y2="250" stroke="black" /> /13 <polygon points="499,191 441,249 401,209 459,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="210" x2="460" y2="150" stroke="black" /> /13  <line x1="440" y1="250" x2="500" y2="190" stroke="black" />
        /13  /13 <polygon points="341,151 399,209 359,249 301,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="340" y1="150" x2="400" y2="210" stroke="black" /> /13  <line x1="300" y1="190" x2="360" y2="250" stroke="black" /> /13 <polygon points="399,191 341,249 301,209 359,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="210" x2="360" y2="150" stroke="black" /> /13  <line x1="340" y1="250" x2="400" y2="190" stroke="black" />
        /13  /13 <polygon points="241,151 299,209 259,249 201,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="240" y1="150" x2="300" y2="210" stroke="black" /> /13  <line x1="200" y1="190" x2="260" y2="250" stroke="black" /> /13 <polygon points="299,191 241,249 201,209 259,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="210" x2="260" y2="150" stroke="black" /> /13  <line x1="240" y1="250" x2="300" y2="190" stroke="black" />
        /13  /13 <polygon points="141,151 199,209 159,249 101,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="140" y1="150" x2="200" y2="210" stroke="black" /> /13  <line x1="100" y1="190" x2="160" y2="250" stroke="black" /> /13 <polygon points="199,191 141,249 101,209 159,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="210" x2="160" y2="150" stroke="black" /> /13  <line x1="140" y1="250" x2="200" y2="190" stroke="black" />
        /13  /13 <polygon points="41,151 99,209 59,249 1,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="40" y1="150" x2="100" y2="210" stroke="black" /> /13  <line x1="0" y1="190" x2="60" y2="250" stroke="black" /> /13 <polygon points="99,191 41,249 1,209 59,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="210" x2="60" y2="150" stroke="black" /> /13  <line x1="40" y1="250" x2="100" y2="190" stroke="black" />
        /13  /13 
        /13 <polygon points="1000,150 1000,190 999,191 959,151 960,150"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="1000,150 1000,110 999,109 959,149 960,150"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="891,101 949,159 909,199 851,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="890" y1="100" x2="950" y2="160" stroke="black" /> /13  <line x1="850" y1="140" x2="910" y2="200" stroke="black" /> /13 <polygon points="949,141 891,199 851,159 909,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="850" y1="160" x2="910" y2="100" stroke="black" /> /13  <line x1="890" y1="200" x2="950" y2="140" stroke="black" />
        /13  /13 <polygon points="849,141 791,199 751,159 809,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="750" y1="160" x2="810" y2="100" stroke="black" /> /13  <line x1="790" y1="200" x2="850" y2="140" stroke="black" /> /13 <polygon points="791,101 849,159 809,199 751,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="790" y1="100" x2="850" y2="160" stroke="black" /> /13  <line x1="750" y1="140" x2="810" y2="200" stroke="black" />
        /13  /13 <polygon points="691,101 749,159 709,199 651,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="690" y1="100" x2="750" y2="160" stroke="black" /> /13  <line x1="650" y1="140" x2="710" y2="200" stroke="black" /> /13 <polygon points="749,141 691,199 651,159 709,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="650" y1="160" x2="710" y2="100" stroke="black" /> /13  <line x1="690" y1="200" x2="750" y2="140" stroke="black" />
        /13  /13 <polygon points="649,141 591,199 551,159 609,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="160" x2="610" y2="100" stroke="black" /> /13  <line x1="590" y1="200" x2="650" y2="140" stroke="black" /> /13 <polygon points="591,101 649,159 609,199 551,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="590" y1="100" x2="650" y2="160" stroke="black" /> /13  <line x1="550" y1="140" x2="610" y2="200" stroke="black" />
        /13  /13 <polygon points="491,101 549,159 509,199 451,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="490" y1="100" x2="550" y2="160" stroke="black" /> /13  <line x1="450" y1="140" x2="510" y2="200" stroke="black" /> /13 <polygon points="549,141 491,199 451,159 509,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="160" x2="510" y2="100" stroke="black" /> /13  <line x1="490" y1="200" x2="550" y2="140" stroke="black" />
        /13  /13 <polygon points="449,141 391,199 351,159 409,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="160" x2="410" y2="100" stroke="black" /> /13  <line x1="390" y1="200" x2="450" y2="140" stroke="black" /> /13 <polygon points="391,101 449,159 409,199 351,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="390" y1="100" x2="450" y2="160" stroke="black" /> /13  <line x1="350" y1="140" x2="410" y2="200" stroke="black" />
        /13  /13 <polygon points="291,101 349,159 309,199 251,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="290" y1="100" x2="350" y2="160" stroke="black" /> /13  <line x1="250" y1="140" x2="310" y2="200" stroke="black" /> /13 <polygon points="349,141 291,199 251,159 309,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="160" x2="310" y2="100" stroke="black" /> /13  <line x1="290" y1="200" x2="350" y2="140" stroke="black" />
        /13  /13 <polygon points="249,141 191,199 151,159 209,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="160" x2="210" y2="100" stroke="black" /> /13  <line x1="190" y1="200" x2="250" y2="140" stroke="black" /> /13 <polygon points="191,101 249,159 209,199 151,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="190" y1="100" x2="250" y2="160" stroke="black" /> /13  <line x1="150" y1="140" x2="210" y2="200" stroke="black" />
        /13  /13 <polygon points="91,101 149,159 109,199 51,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="90" y1="100" x2="150" y2="160" stroke="black" /> /13  <line x1="50" y1="140" x2="110" y2="200" stroke="black" /> /13 <polygon points="149,141 91,199 51,159 109,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="160" x2="110" y2="100" stroke="black" /> /13  <line x1="90" y1="200" x2="150" y2="140" stroke="black" />
        /13 <polygon points="0,150 0,110 1,109 41,149 40,150"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,150 0,190 1,191 41,151 40,150"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="999,91 941,149 901,109 959,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="900" y1="110" x2="960" y2="50" stroke="black" /> /13  <line x1="940" y1="150" x2="1000" y2="90" stroke="black" /> /13 <polygon points="941,51 999,109 959,149 901,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="940" y1="50" x2="1000" y2="110" stroke="black" /> /13  <line x1="900" y1="90" x2="960" y2="150" stroke="black" />
        /13  /13 <polygon points="899,91 841,149 801,109 859,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="800" y1="110" x2="860" y2="50" stroke="black" /> /13  <line x1="840" y1="150" x2="900" y2="90" stroke="black" /> /13 <polygon points="841,51 899,109 859,149 801,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="840" y1="50" x2="900" y2="110" stroke="black" /> /13  <line x1="800" y1="90" x2="860" y2="150" stroke="black" />
        /13  /13 <polygon points="799,91 741,149 701,109 759,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="700" y1="110" x2="760" y2="50" stroke="black" /> /13  <line x1="740" y1="150" x2="800" y2="90" stroke="black" /> /13 <polygon points="741,51 799,109 759,149 701,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="740" y1="50" x2="800" y2="110" stroke="black" /> /13  <line x1="700" y1="90" x2="760" y2="150" stroke="black" />
        /13  /13 <polygon points="699,91 641,149 601,109 659,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="110" x2="660" y2="50" stroke="black" /> /13  <line x1="640" y1="150" x2="700" y2="90" stroke="black" /> /13 <polygon points="641,51 699,109 659,149 601,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="640" y1="50" x2="700" y2="110" stroke="black" /> /13  <line x1="600" y1="90" x2="660" y2="150" stroke="black" />
        /13  /13 <polygon points="599,91 541,149 501,109 559,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="110" x2="560" y2="50" stroke="black" /> /13  <line x1="540" y1="150" x2="600" y2="90" stroke="black" /> /13 <polygon points="541,51 599,109 559,149 501,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="540" y1="50" x2="600" y2="110" stroke="black" /> /13  <line x1="500" y1="90" x2="560" y2="150" stroke="black" />
        /13  /13 <polygon points="499,91 441,149 401,109 459,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="110" x2="460" y2="50" stroke="black" /> /13  <line x1="440" y1="150" x2="500" y2="90" stroke="black" /> /13 <polygon points="441,51 499,109 459,149 401,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="440" y1="50" x2="500" y2="110" stroke="black" /> /13  <line x1="400" y1="90" x2="460" y2="150" stroke="black" />
        /13  /13 <polygon points="399,91 341,149 301,109 359,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="110" x2="360" y2="50" stroke="black" /> /13  <line x1="340" y1="150" x2="400" y2="90" stroke="black" /> /13 <polygon points="341,51 399,109 359,149 301,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="340" y1="50" x2="400" y2="110" stroke="black" /> /13  <line x1="300" y1="90" x2="360" y2="150" stroke="black" />
        /13  /13 <polygon points="299,91 241,149 201,109 259,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="110" x2="260" y2="50" stroke="black" /> /13  <line x1="240" y1="150" x2="300" y2="90" stroke="black" /> /13 <polygon points="241,51 299,109 259,149 201,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="240" y1="50" x2="300" y2="110" stroke="black" /> /13  <line x1="200" y1="90" x2="260" y2="150" stroke="black" />
        /13  /13 <polygon points="199,91 141,149 101,109 159,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="110" x2="160" y2="50" stroke="black" /> /13  <line x1="140" y1="150" x2="200" y2="90" stroke="black" /> /13 <polygon points="141,51 199,109 159,149 101,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="140" y1="50" x2="200" y2="110" stroke="black" /> /13  <line x1="100" y1="90" x2="160" y2="150" stroke="black" />
        /13  /13 <polygon points="99,91 41,149 1,109 59,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="110" x2="60" y2="50" stroke="black" /> /13  <line x1="40" y1="150" x2="100" y2="90" stroke="black" /> /13 <polygon points="41,51 99,109 59,149 1,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="40" y1="50" x2="100" y2="110" stroke="black" /> /13  <line x1="0" y1="90" x2="60" y2="150" stroke="black" />
        /13  /13 
        <polygon points="1000,10 990, 0 950,0 950, 40 960,50 1000, 50  "  fill="${pickedCC2}" stroke="none" /> /13  <line x1="1000" y1="10" x2="990" y2="0" stroke="black" />  /13  <line x1="960" y1="50" x2="950" y2="40" stroke="black" /> /13 <polygon points="1000,50 1000,90 999,91 959,51 960,50"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="1000,50 1000,10 999,9 959,49 960,50"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="891,1 949,59 909,99 851,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="890" y1="0" x2="950" y2="60" stroke="black" /> /13  <line x1="850" y1="40" x2="910" y2="100" stroke="black" /> /13 <polygon points="949,41 891,99 851,59 909,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="850" y1="60" x2="910" y2="0" stroke="black" /> /13  <line x1="890" y1="100" x2="950" y2="40" stroke="black" /> /13 <polygon points="850,0  850,40 851,41 891, 1  890,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="950,0 950,40 949,41 909,1 910,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="849,41 791,99 751,59 809,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="750" y1="60" x2="810" y2="0" stroke="black" /> /13  <line x1="790" y1="100" x2="850" y2="40" stroke="black" /> /13 <polygon points="791,1 849,59 809,99 751,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="790" y1="0" x2="850" y2="60" stroke="black" /> /13  <line x1="750" y1="40" x2="810" y2="100" stroke="black" /> /13 <polygon points="750,0  750,40 751,41 791, 1  790,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="850,0 850,40 849,41 809,1 810,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="691,1 749,59 709,99 651,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="690" y1="0" x2="750" y2="60" stroke="black" /> /13  <line x1="650" y1="40" x2="710" y2="100" stroke="black" /> /13 <polygon points="749,41 691,99 651,59 709,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="650" y1="60" x2="710" y2="0" stroke="black" /> /13  <line x1="690" y1="100" x2="750" y2="40" stroke="black" /> /13 <polygon points="650,0  650,40 651,41 691, 1  690,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="750,0 750,40 749,41 709,1 710,0 "  fill="${pickedMC1}" stroke="none" />
        /13  /13 <polygon points="649,41 591,99 551,59 609,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="60" x2="610" y2="0" stroke="black" /> /13  <line x1="590" y1="100" x2="650" y2="40" stroke="black" /> /13 <polygon points="591,1 649,59 609,99 551,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="590" y1="0" x2="650" y2="60" stroke="black" /> /13  <line x1="550" y1="40" x2="610" y2="100" stroke="black" /> /13 <polygon points="550,0  550,40 551,41 591, 1  590,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="650,0 650,40 649,41 609,1 610,0 "  fill="${pickedMC1}" stroke="none" />
        /13  /13 <polygon points="491,1 549,59 509,99 451,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="490" y1="0" x2="550" y2="60" stroke="black" /> /13  <line x1="450" y1="40" x2="510" y2="100" stroke="black" /> /13 <polygon points="549,41 491,99 451,59 509,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="60" x2="510" y2="0" stroke="black" /> /13  <line x1="490" y1="100" x2="550" y2="40" stroke="black" /> /13 <polygon points="450,0  450,40 451,41 491, 1  490,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="550,0 550,40 549,41 509,1 510,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="449,41 391,99 351,59 409,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="60" x2="410" y2="0" stroke="black" /> /13  <line x1="390" y1="100" x2="450" y2="40" stroke="black" /> /13 <polygon points="391,1 449,59 409,99 351,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="390" y1="0" x2="450" y2="60" stroke="black" /> /13  <line x1="350" y1="40" x2="410" y2="100" stroke="black" /> /13 <polygon points="350,0  350,40 351,41 391, 1  390,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="450,0 450,40 449,41 409,1 410,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="291,1 349,59 309,99 251,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="290" y1="0" x2="350" y2="60" stroke="black" /> /13  <line x1="250" y1="40" x2="310" y2="100" stroke="black" /> /13 <polygon points="349,41 291,99 251,59 309,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="60" x2="310" y2="0" stroke="black" /> /13  <line x1="290" y1="100" x2="350" y2="40" stroke="black" /> /13 <polygon points="250,0  250,40 251,41 291, 1  290,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="350,0 350,40 349,41 309,1 310,0 "  fill="${pickedMC1}" stroke="none" />
        /13  /13 <polygon points="249,41 191,99 151,59 209,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="60" x2="210" y2="0" stroke="black" /> /13  <line x1="190" y1="100" x2="250" y2="40" stroke="black" /> /13 <polygon points="191,1 249,59 209,99 151,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="190" y1="0" x2="250" y2="60" stroke="black" /> /13  <line x1="150" y1="40" x2="210" y2="100" stroke="black" /> /13 <polygon points="150,0  150,40 151,41 191, 1  190,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="250,0 250,40 249,41 209,1 210,0 "  fill="${pickedMC1}" stroke="none" />
        /13  /13 <polygon points="91,1 149,59 109,99 51,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="90" y1="0" x2="150" y2="60" stroke="black" /> /13  <line x1="50" y1="40" x2="110" y2="100" stroke="black" /> /13 <polygon points="149,41 91,99 51,59 109,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="60" x2="110" y2="0" stroke="black" /> /13  <line x1="90" y1="100" x2="150" y2="40" stroke="black" /> /13 <polygon points="50,0  50,40 51,41 91, 1  90,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="150,0 150,40 149,41 109,1 110,0 "  fill="${pickedCC1}" stroke="none" />
        <polygon points="0,10 10,0 50,0 50,40 40,50 0,50"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="10" x2="10" y2="0" stroke="black" />  /13  <line x1="40" y1="50" x2="50" y2="40" stroke="black" /> /13 <polygon points="0,50 0,10 1,9 41,49 40,50"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,50 0,90 1,91 41,51 40,50"  fill="${pickedMC2}" stroke="none" />`

    motifDiamondQuartetMitts_M_innerHTML = `<polygon points="0,0 0,600 800,600 800,0 " fill= "white" stroke="black" />
        <polygon points="800,590 790,600 750,600 750,560 760,550 800,550 "  fill="${pickedMC1}" stroke="none" /> /13  <line x1="800" y1="590" x2="790" y2="600" stroke="black" />  /13  <line x1="760" y1="550" x2="750" y2="560" stroke="black" /> /13 <polygon points="800,550 800,590 799,591 759,551 760,550"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="800,550 800,510 799,509 759,549 760,550"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="691,501 749,559 709,599 651,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="690" y1="500" x2="750" y2="560" stroke="black" /> /13  <line x1="650" y1="540" x2="710" y2="600" stroke="black" /> /13 <polygon points="749,541 691,599 651,559 709,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="650" y1="560" x2="710" y2="500" stroke="black" /> /13  <line x1="690" y1="600" x2="750" y2="540" stroke="black" /> /13 <polygon points="650,600 650,560 651,559 691,599 690,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="750,600 750,560 749,559 709,599 710,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="649,541 591,599 551,559 609,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="560" x2="610" y2="500" stroke="black" /> /13  <line x1="590" y1="600" x2="650" y2="540" stroke="black" /> /13 <polygon points="591,501 649,559 609,599 551,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="590" y1="500" x2="650" y2="560" stroke="black" /> /13  <line x1="550" y1="540" x2="610" y2="600" stroke="black" /> /13 <polygon points="550,600 550,560 551,559 591,599 590,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="650,600 650,560 649,559 609,599 610,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="491,501 549,559 509,599 451,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="490" y1="500" x2="550" y2="560" stroke="black" /> /13  <line x1="450" y1="540" x2="510" y2="600" stroke="black" /> /13 <polygon points="549,541 491,599 451,559 509,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="560" x2="510" y2="500" stroke="black" /> /13  <line x1="490" y1="600" x2="550" y2="540" stroke="black" /> /13 <polygon points="450,600 450,560 451,559 491,599 490,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="550,600 550,560 549,559 509,599 510,600 "  fill="${pickedCC2}" stroke="none" />
        /13  /13 <polygon points="449,541 391,599 351,559 409,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="560" x2="410" y2="500" stroke="black" /> /13  <line x1="390" y1="600" x2="450" y2="540" stroke="black" /> /13 <polygon points="391,501 449,559 409,599 351,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="390" y1="500" x2="450" y2="560" stroke="black" /> /13  <line x1="350" y1="540" x2="410" y2="600" stroke="black" /> /13 <polygon points="350,600 350,560 351,559 391,599 390,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="450,600 450,560 449,559 409,599 410,600 "  fill="${pickedCC2}" stroke="none" />
        /13  /13 <polygon points="291,501 349,559 309,599 251,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="290" y1="500" x2="350" y2="560" stroke="black" /> /13  <line x1="250" y1="540" x2="310" y2="600" stroke="black" /> /13 <polygon points="349,541 291,599 251,559 309,501"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="560" x2="310" y2="500" stroke="black" /> /13  <line x1="290" y1="600" x2="350" y2="540" stroke="black" /> /13 <polygon points="250,600 250,560 251,559 291,599 290,600 "  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="350,600 350,560 349,559 309,599 310,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="249,541 191,599 151,559 209,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="560" x2="210" y2="500" stroke="black" /> /13  <line x1="190" y1="600" x2="250" y2="540" stroke="black" /> /13 <polygon points="191,501 249,559 209,599 151,541"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="190" y1="500" x2="250" y2="560" stroke="black" /> /13  <line x1="150" y1="540" x2="210" y2="600" stroke="black" /> /13 <polygon points="150,600 150,560 151,559 191,599 190,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="250,600 250,560 249,559 209,599 210,600 "  fill="${pickedMC2}" stroke="none" />
        /13  /13 <polygon points="91,501 149,559 109,599 51,541"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="90" y1="500" x2="150" y2="560" stroke="black" /> /13  <line x1="50" y1="540" x2="110" y2="600" stroke="black" /> /13 <polygon points="149,541 91,599 51,559 109,501"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="560" x2="110" y2="500" stroke="black" /> /13  <line x1="90" y1="600" x2="150" y2="540" stroke="black" /> /13 <polygon points="50,600 50,560 51,559 91,599 90,600 "  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="150,600 150,560 149,559 109,599 110,600 "  fill="${pickedCC2}" stroke="none" />
        <polygon points="0,590 10,600 50,600 50,560 40,550  0,550 "  fill="${pickedCC2}" stroke="none" /> /13  <line x1="0" y1="590" x2="10" y2="600" stroke="black" />  /13  <line x1="40" y1="550" x2="50" y2="560" stroke="black" /> /13 <polygon points="0,550 0,510 1,509 41,549 40,550"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,550 0,590 1,591 41,551 40,550"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="799,491 741,549 701,509 759,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="510" x2="760" y2="450" stroke="black" /> /13  <line x1="740" y1="550" x2="800" y2="490" stroke="black" /> /13 <polygon points="741,451 799,509 759,549 701,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="740" y1="450" x2="800" y2="510" stroke="black" /> /13  <line x1="700" y1="490" x2="760" y2="550" stroke="black" />
        /13  /13 <polygon points="699,491 641,549 601,509 659,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="510" x2="660" y2="450" stroke="black" /> /13  <line x1="640" y1="550" x2="700" y2="490" stroke="black" /> /13 <polygon points="641,451 699,509 659,549 601,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="640" y1="450" x2="700" y2="510" stroke="black" /> /13  <line x1="600" y1="490" x2="660" y2="550" stroke="black" />
        /13  /13 <polygon points="599,491 541,549 501,509 559,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="510" x2="560" y2="450" stroke="black" /> /13  <line x1="540" y1="550" x2="600" y2="490" stroke="black" /> /13 <polygon points="541,451 599,509 559,549 501,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="540" y1="450" x2="600" y2="510" stroke="black" /> /13  <line x1="500" y1="490" x2="560" y2="550" stroke="black" />
        /13  /13 <polygon points="499,491 441,549 401,509 459,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="510" x2="460" y2="450" stroke="black" /> /13  <line x1="440" y1="550" x2="500" y2="490" stroke="black" /> /13 <polygon points="441,451 499,509 459,549 401,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="440" y1="450" x2="500" y2="510" stroke="black" /> /13  <line x1="400" y1="490" x2="460" y2="550" stroke="black" />
        /13  /13 <polygon points="399,491 341,549 301,509 359,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="510" x2="360" y2="450" stroke="black" /> /13  <line x1="340" y1="550" x2="400" y2="490" stroke="black" /> /13 <polygon points="341,451 399,509 359,549 301,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="340" y1="450" x2="400" y2="510" stroke="black" /> /13  <line x1="300" y1="490" x2="360" y2="550" stroke="black" />
        /13  /13 <polygon points="299,491 241,549 201,509 259,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="510" x2="260" y2="450" stroke="black" /> /13  <line x1="240" y1="550" x2="300" y2="490" stroke="black" /> /13 <polygon points="241,451 299,509 259,549 201,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="240" y1="450" x2="300" y2="510" stroke="black" /> /13  <line x1="200" y1="490" x2="260" y2="550" stroke="black" />
        /13  /13 <polygon points="199,491 141,549 101,509 159,451"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="510" x2="160" y2="450" stroke="black" /> /13  <line x1="140" y1="550" x2="200" y2="490" stroke="black" /> /13 <polygon points="141,451 199,509 159,549 101,491"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="140" y1="450" x2="200" y2="510" stroke="black" /> /13  <line x1="100" y1="490" x2="160" y2="550" stroke="black" />
        /13  /13 <polygon points="99,491 41,549 1,509 59,451"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="510" x2="60" y2="450" stroke="black" /> /13  <line x1="40" y1="550" x2="100" y2="490" stroke="black" /> /13 <polygon points="41,451 99,509 59,549 1,491"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="40" y1="450" x2="100" y2="510" stroke="black" /> /13  <line x1="0" y1="490" x2="60" y2="550" stroke="black" />
        /13  /13 
        /13 <polygon points="800,450 800,490 799,491 759,451 760,450"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="800,450 800,410 799,409 759,449 760,450"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="691,401 749,459 709,499 651,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="690" y1="400" x2="750" y2="460" stroke="black" /> /13  <line x1="650" y1="440" x2="710" y2="500" stroke="black" /> /13 <polygon points="749,441 691,499 651,459 709,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="650" y1="460" x2="710" y2="400" stroke="black" /> /13  <line x1="690" y1="500" x2="750" y2="440" stroke="black" />
        /13  /13 <polygon points="649,441 591,499 551,459 609,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="460" x2="610" y2="400" stroke="black" /> /13  <line x1="590" y1="500" x2="650" y2="440" stroke="black" /> /13 <polygon points="591,401 649,459 609,499 551,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="590" y1="400" x2="650" y2="460" stroke="black" /> /13  <line x1="550" y1="440" x2="610" y2="500" stroke="black" />
        /13  /13 <polygon points="491,401 549,459 509,499 451,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="490" y1="400" x2="550" y2="460" stroke="black" /> /13  <line x1="450" y1="440" x2="510" y2="500" stroke="black" /> /13 <polygon points="549,441 491,499 451,459 509,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="460" x2="510" y2="400" stroke="black" /> /13  <line x1="490" y1="500" x2="550" y2="440" stroke="black" />
        /13  /13 <polygon points="449,441 391,499 351,459 409,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="460" x2="410" y2="400" stroke="black" /> /13  <line x1="390" y1="500" x2="450" y2="440" stroke="black" /> /13 <polygon points="391,401 449,459 409,499 351,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="390" y1="400" x2="450" y2="460" stroke="black" /> /13  <line x1="350" y1="440" x2="410" y2="500" stroke="black" />
        /13  /13 <polygon points="291,401 349,459 309,499 251,441"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="290" y1="400" x2="350" y2="460" stroke="black" /> /13  <line x1="250" y1="440" x2="310" y2="500" stroke="black" /> /13 <polygon points="349,441 291,499 251,459 309,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="460" x2="310" y2="400" stroke="black" /> /13  <line x1="290" y1="500" x2="350" y2="440" stroke="black" />
        /13  /13 <polygon points="249,441 191,499 151,459 209,401"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="460" x2="210" y2="400" stroke="black" /> /13  <line x1="190" y1="500" x2="250" y2="440" stroke="black" /> /13 <polygon points="191,401 249,459 209,499 151,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="190" y1="400" x2="250" y2="460" stroke="black" /> /13  <line x1="150" y1="440" x2="210" y2="500" stroke="black" />
        /13  /13 <polygon points="91,401 149,459 109,499 51,441"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="90" y1="400" x2="150" y2="460" stroke="black" /> /13  <line x1="50" y1="440" x2="110" y2="500" stroke="black" /> /13 <polygon points="149,441 91,499 51,459 109,401"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="460" x2="110" y2="400" stroke="black" /> /13  <line x1="90" y1="500" x2="150" y2="440" stroke="black" />
        /13 <polygon points="0,450 0,410 1,409 41,449 40,450"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,450 0,490 1,491 41,451 40,450"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="741,351 799,409 759,449 701,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="740" y1="350" x2="800" y2="410" stroke="black" /> /13  <line x1="700" y1="390" x2="760" y2="450" stroke="black" /> /13 <polygon points="799,391 741,449 701,409 759,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="700" y1="410" x2="760" y2="350" stroke="black" /> /13  <line x1="740" y1="450" x2="800" y2="390" stroke="black" />
        /13  /13 <polygon points="641,351 699,409 659,449 601,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="640" y1="350" x2="700" y2="410" stroke="black" /> /13  <line x1="600" y1="390" x2="660" y2="450" stroke="black" /> /13 <polygon points="699,391 641,449 601,409 659,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="410" x2="660" y2="350" stroke="black" /> /13  <line x1="640" y1="450" x2="700" y2="390" stroke="black" />
        /13  /13 <polygon points="541,351 599,409 559,449 501,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="540" y1="350" x2="600" y2="410" stroke="black" /> /13  <line x1="500" y1="390" x2="560" y2="450" stroke="black" /> /13 <polygon points="599,391 541,449 501,409 559,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="410" x2="560" y2="350" stroke="black" /> /13  <line x1="540" y1="450" x2="600" y2="390" stroke="black" />
        /13  /13 <polygon points="441,351 499,409 459,449 401,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="440" y1="350" x2="500" y2="410" stroke="black" /> /13  <line x1="400" y1="390" x2="460" y2="450" stroke="black" /> /13 <polygon points="499,391 441,449 401,409 459,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="410" x2="460" y2="350" stroke="black" /> /13  <line x1="440" y1="450" x2="500" y2="390" stroke="black" />
        /13  /13 <polygon points="341,351 399,409 359,449 301,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="340" y1="350" x2="400" y2="410" stroke="black" /> /13  <line x1="300" y1="390" x2="360" y2="450" stroke="black" /> /13 <polygon points="399,391 341,449 301,409 359,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="410" x2="360" y2="350" stroke="black" /> /13  <line x1="340" y1="450" x2="400" y2="390" stroke="black" />
        /13  /13 <polygon points="241,351 299,409 259,449 201,391"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="240" y1="350" x2="300" y2="410" stroke="black" /> /13  <line x1="200" y1="390" x2="260" y2="450" stroke="black" /> /13 <polygon points="299,391 241,449 201,409 259,351"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="410" x2="260" y2="350" stroke="black" /> /13  <line x1="240" y1="450" x2="300" y2="390" stroke="black" />
        /13  /13 <polygon points="141,351 199,409 159,449 101,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="140" y1="350" x2="200" y2="410" stroke="black" /> /13  <line x1="100" y1="390" x2="160" y2="450" stroke="black" /> /13 <polygon points="199,391 141,449 101,409 159,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="410" x2="160" y2="350" stroke="black" /> /13  <line x1="140" y1="450" x2="200" y2="390" stroke="black" />
        /13  /13 <polygon points="41,351 99,409 59,449 1,391"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="40" y1="350" x2="100" y2="410" stroke="black" /> /13  <line x1="0" y1="390" x2="60" y2="450" stroke="black" /> /13 <polygon points="99,391 41,449 1,409 59,351"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="410" x2="60" y2="350" stroke="black" /> /13  <line x1="40" y1="450" x2="100" y2="390" stroke="black" />
        /13  /13 
        /13 <polygon points="800,350 800,390 799,391 759,351 760,350"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="800,350 800,310 799,309 759,349 760,350"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="691,301 749,359 709,399 651,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="690" y1="300" x2="750" y2="360" stroke="black" /> /13  <line x1="650" y1="340" x2="710" y2="400" stroke="black" /> /13 <polygon points="749,341 691,399 651,359 709,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="650" y1="360" x2="710" y2="300" stroke="black" /> /13  <line x1="690" y1="400" x2="750" y2="340" stroke="black" />
        /13  /13 <polygon points="649,341 591,399 551,359 609,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="360" x2="610" y2="300" stroke="black" /> /13  <line x1="590" y1="400" x2="650" y2="340" stroke="black" /> /13 <polygon points="591,301 649,359 609,399 551,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="590" y1="300" x2="650" y2="360" stroke="black" /> /13  <line x1="550" y1="340" x2="610" y2="400" stroke="black" />
        /13  /13 <polygon points="491,301 549,359 509,399 451,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="490" y1="300" x2="550" y2="360" stroke="black" /> /13  <line x1="450" y1="340" x2="510" y2="400" stroke="black" /> /13 <polygon points="549,341 491,399 451,359 509,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="360" x2="510" y2="300" stroke="black" /> /13  <line x1="490" y1="400" x2="550" y2="340" stroke="black" />
        /13  /13 <polygon points="449,341 391,399 351,359 409,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="360" x2="410" y2="300" stroke="black" /> /13  <line x1="390" y1="400" x2="450" y2="340" stroke="black" /> /13 <polygon points="391,301 449,359 409,399 351,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="390" y1="300" x2="450" y2="360" stroke="black" /> /13  <line x1="350" y1="340" x2="410" y2="400" stroke="black" />
        /13  /13 <polygon points="291,301 349,359 309,399 251,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="290" y1="300" x2="350" y2="360" stroke="black" /> /13  <line x1="250" y1="340" x2="310" y2="400" stroke="black" /> /13 <polygon points="349,341 291,399 251,359 309,301"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="360" x2="310" y2="300" stroke="black" /> /13  <line x1="290" y1="400" x2="350" y2="340" stroke="black" />
        /13  /13 <polygon points="249,341 191,399 151,359 209,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="360" x2="210" y2="300" stroke="black" /> /13  <line x1="190" y1="400" x2="250" y2="340" stroke="black" /> /13 <polygon points="191,301 249,359 209,399 151,341"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="190" y1="300" x2="250" y2="360" stroke="black" /> /13  <line x1="150" y1="340" x2="210" y2="400" stroke="black" />
        /13  /13 <polygon points="91,301 149,359 109,399 51,341"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="90" y1="300" x2="150" y2="360" stroke="black" /> /13  <line x1="50" y1="340" x2="110" y2="400" stroke="black" /> /13 <polygon points="149,341 91,399 51,359 109,301"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="360" x2="110" y2="300" stroke="black" /> /13  <line x1="90" y1="400" x2="150" y2="340" stroke="black" />
        /13 <polygon points="0,350 0,310 1,309 41,349 40,350"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,350 0,390 1,391 41,351 40,350"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="799,291 741,349 701,309 759,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="700" y1="310" x2="760" y2="250" stroke="black" /> /13  <line x1="740" y1="350" x2="800" y2="290" stroke="black" /> /13 <polygon points="741,251 799,309 759,349 701,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="740" y1="250" x2="800" y2="310" stroke="black" /> /13  <line x1="700" y1="290" x2="760" y2="350" stroke="black" />
        /13  /13 <polygon points="699,291 641,349 601,309 659,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="310" x2="660" y2="250" stroke="black" /> /13  <line x1="640" y1="350" x2="700" y2="290" stroke="black" /> /13 <polygon points="641,251 699,309 659,349 601,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="640" y1="250" x2="700" y2="310" stroke="black" /> /13  <line x1="600" y1="290" x2="660" y2="350" stroke="black" />
        /13  /13 <polygon points="599,291 541,349 501,309 559,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="500" y1="310" x2="560" y2="250" stroke="black" /> /13  <line x1="540" y1="350" x2="600" y2="290" stroke="black" /> /13 <polygon points="541,251 599,309 559,349 501,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="540" y1="250" x2="600" y2="310" stroke="black" /> /13  <line x1="500" y1="290" x2="560" y2="350" stroke="black" />
        /13  /13 <polygon points="499,291 441,349 401,309 459,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="310" x2="460" y2="250" stroke="black" /> /13  <line x1="440" y1="350" x2="500" y2="290" stroke="black" /> /13 <polygon points="441,251 499,309 459,349 401,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="440" y1="250" x2="500" y2="310" stroke="black" /> /13  <line x1="400" y1="290" x2="460" y2="350" stroke="black" />
        /13  /13 <polygon points="399,291 341,349 301,309 359,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="300" y1="310" x2="360" y2="250" stroke="black" /> /13  <line x1="340" y1="350" x2="400" y2="290" stroke="black" /> /13 <polygon points="341,251 399,309 359,349 301,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="340" y1="250" x2="400" y2="310" stroke="black" /> /13  <line x1="300" y1="290" x2="360" y2="350" stroke="black" />
        /13  /13 <polygon points="299,291 241,349 201,309 259,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="310" x2="260" y2="250" stroke="black" /> /13  <line x1="240" y1="350" x2="300" y2="290" stroke="black" /> /13 <polygon points="241,251 299,309 259,349 201,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="240" y1="250" x2="300" y2="310" stroke="black" /> /13  <line x1="200" y1="290" x2="260" y2="350" stroke="black" />
        /13  /13 <polygon points="199,291 141,349 101,309 159,251"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="100" y1="310" x2="160" y2="250" stroke="black" /> /13  <line x1="140" y1="350" x2="200" y2="290" stroke="black" /> /13 <polygon points="141,251 199,309 159,349 101,291"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="140" y1="250" x2="200" y2="310" stroke="black" /> /13  <line x1="100" y1="290" x2="160" y2="350" stroke="black" />
        /13  /13 <polygon points="99,291 41,349 1,309 59,251"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="310" x2="60" y2="250" stroke="black" /> /13  <line x1="40" y1="350" x2="100" y2="290" stroke="black" /> /13 <polygon points="41,251 99,309 59,349 1,291"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="40" y1="250" x2="100" y2="310" stroke="black" /> /13  <line x1="0" y1="290" x2="60" y2="350" stroke="black" />
        /13  /13 
        /13 <polygon points="800,250 800,290 799,291 759,251 760,250"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="800,250 800,210 799,209 759,249 760,250"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="691,201 749,259 709,299 651,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="690" y1="200" x2="750" y2="260" stroke="black" /> /13  <line x1="650" y1="240" x2="710" y2="300" stroke="black" /> /13 <polygon points="749,241 691,299 651,259 709,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="650" y1="260" x2="710" y2="200" stroke="black" /> /13  <line x1="690" y1="300" x2="750" y2="240" stroke="black" />
        /13  /13 <polygon points="649,241 591,299 551,259 609,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="550" y1="260" x2="610" y2="200" stroke="black" /> /13  <line x1="590" y1="300" x2="650" y2="240" stroke="black" /> /13 <polygon points="591,201 649,259 609,299 551,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="590" y1="200" x2="650" y2="260" stroke="black" /> /13  <line x1="550" y1="240" x2="610" y2="300" stroke="black" />
        /13  /13 <polygon points="491,201 549,259 509,299 451,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="490" y1="200" x2="550" y2="260" stroke="black" /> /13  <line x1="450" y1="240" x2="510" y2="300" stroke="black" /> /13 <polygon points="549,241 491,299 451,259 509,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="260" x2="510" y2="200" stroke="black" /> /13  <line x1="490" y1="300" x2="550" y2="240" stroke="black" />
        /13  /13 <polygon points="449,241 391,299 351,259 409,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="350" y1="260" x2="410" y2="200" stroke="black" /> /13  <line x1="390" y1="300" x2="450" y2="240" stroke="black" /> /13 <polygon points="391,201 449,259 409,299 351,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="390" y1="200" x2="450" y2="260" stroke="black" /> /13  <line x1="350" y1="240" x2="410" y2="300" stroke="black" />
        /13  /13 <polygon points="291,201 349,259 309,299 251,241"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="290" y1="200" x2="350" y2="260" stroke="black" /> /13  <line x1="250" y1="240" x2="310" y2="300" stroke="black" /> /13 <polygon points="349,241 291,299 251,259 309,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="260" x2="310" y2="200" stroke="black" /> /13  <line x1="290" y1="300" x2="350" y2="240" stroke="black" />
        /13  /13 <polygon points="249,241 191,299 151,259 209,201"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="150" y1="260" x2="210" y2="200" stroke="black" /> /13  <line x1="190" y1="300" x2="250" y2="240" stroke="black" /> /13 <polygon points="191,201 249,259 209,299 151,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="190" y1="200" x2="250" y2="260" stroke="black" /> /13  <line x1="150" y1="240" x2="210" y2="300" stroke="black" />
        /13  /13 <polygon points="91,201 149,259 109,299 51,241"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="90" y1="200" x2="150" y2="260" stroke="black" /> /13  <line x1="50" y1="240" x2="110" y2="300" stroke="black" /> /13 <polygon points="149,241 91,299 51,259 109,201"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="260" x2="110" y2="200" stroke="black" /> /13  <line x1="90" y1="300" x2="150" y2="240" stroke="black" />
        /13 <polygon points="0,250 0,210 1,209 41,249 40,250"  fill="${pickedCC1}" stroke="none" /> /13 <polygon points="0,250 0,290 1,291 41,251 40,250"  fill="${pickedMC2}" stroke="none" /> /13 
        /13  /13 <polygon points="741,151 799,209 759,249 701,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="740" y1="150" x2="800" y2="210" stroke="black" /> /13  <line x1="700" y1="190" x2="760" y2="250" stroke="black" /> /13 <polygon points="799,191 741,249 701,209 759,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="210" x2="760" y2="150" stroke="black" /> /13  <line x1="740" y1="250" x2="800" y2="190" stroke="black" />
        /13  /13 <polygon points="641,151 699,209 659,249 601,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="640" y1="150" x2="700" y2="210" stroke="black" /> /13  <line x1="600" y1="190" x2="660" y2="250" stroke="black" /> /13 <polygon points="699,191 641,249 601,209 659,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="600" y1="210" x2="660" y2="150" stroke="black" /> /13  <line x1="640" y1="250" x2="700" y2="190" stroke="black" />
        /13  /13 <polygon points="541,151 599,209 559,249 501,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="540" y1="150" x2="600" y2="210" stroke="black" /> /13  <line x1="500" y1="190" x2="560" y2="250" stroke="black" /> /13 <polygon points="599,191 541,249 501,209 559,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="210" x2="560" y2="150" stroke="black" /> /13  <line x1="540" y1="250" x2="600" y2="190" stroke="black" />
        /13  /13 <polygon points="441,151 499,209 459,249 401,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="440" y1="150" x2="500" y2="210" stroke="black" /> /13  <line x1="400" y1="190" x2="460" y2="250" stroke="black" /> /13 <polygon points="499,191 441,249 401,209 459,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="400" y1="210" x2="460" y2="150" stroke="black" /> /13  <line x1="440" y1="250" x2="500" y2="190" stroke="black" />
        /13  /13 <polygon points="341,151 399,209 359,249 301,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="340" y1="150" x2="400" y2="210" stroke="black" /> /13  <line x1="300" y1="190" x2="360" y2="250" stroke="black" /> /13 <polygon points="399,191 341,249 301,209 359,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="210" x2="360" y2="150" stroke="black" /> /13  <line x1="340" y1="250" x2="400" y2="190" stroke="black" />
        /13  /13 <polygon points="241,151 299,209 259,249 201,191"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="240" y1="150" x2="300" y2="210" stroke="black" /> /13  <line x1="200" y1="190" x2="260" y2="250" stroke="black" /> /13 <polygon points="299,191 241,249 201,209 259,151"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="200" y1="210" x2="260" y2="150" stroke="black" /> /13  <line x1="240" y1="250" x2="300" y2="190" stroke="black" />
        /13  /13 <polygon points="141,151 199,209 159,249 101,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="140" y1="150" x2="200" y2="210" stroke="black" /> /13  <line x1="100" y1="190" x2="160" y2="250" stroke="black" /> /13 <polygon points="199,191 141,249 101,209 159,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="210" x2="160" y2="150" stroke="black" /> /13  <line x1="140" y1="250" x2="200" y2="190" stroke="black" />
        /13  /13 <polygon points="41,151 99,209 59,249 1,191"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="40" y1="150" x2="100" y2="210" stroke="black" /> /13  <line x1="0" y1="190" x2="60" y2="250" stroke="black" /> /13 <polygon points="99,191 41,249 1,209 59,151"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="0" y1="210" x2="60" y2="150" stroke="black" /> /13  <line x1="40" y1="250" x2="100" y2="190" stroke="black" />
        /13  /13 
        /13 <polygon points="800,150 800,190 799,191 759,151 760,150"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="800,150 800,110 799,109 759,149 760,150"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="691,101 749,159 709,199 651,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="690" y1="100" x2="750" y2="160" stroke="black" /> /13  <line x1="650" y1="140" x2="710" y2="200" stroke="black" /> /13 <polygon points="749,141 691,199 651,159 709,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="650" y1="160" x2="710" y2="100" stroke="black" /> /13  <line x1="690" y1="200" x2="750" y2="140" stroke="black" />
        /13  /13 <polygon points="649,141 591,199 551,159 609,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="160" x2="610" y2="100" stroke="black" /> /13  <line x1="590" y1="200" x2="650" y2="140" stroke="black" /> /13 <polygon points="591,101 649,159 609,199 551,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="590" y1="100" x2="650" y2="160" stroke="black" /> /13  <line x1="550" y1="140" x2="610" y2="200" stroke="black" />
        /13  /13 <polygon points="491,101 549,159 509,199 451,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="490" y1="100" x2="550" y2="160" stroke="black" /> /13  <line x1="450" y1="140" x2="510" y2="200" stroke="black" /> /13 <polygon points="549,141 491,199 451,159 509,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="450" y1="160" x2="510" y2="100" stroke="black" /> /13  <line x1="490" y1="200" x2="550" y2="140" stroke="black" />
        /13  /13 <polygon points="449,141 391,199 351,159 409,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="160" x2="410" y2="100" stroke="black" /> /13  <line x1="390" y1="200" x2="450" y2="140" stroke="black" /> /13 <polygon points="391,101 449,159 409,199 351,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="390" y1="100" x2="450" y2="160" stroke="black" /> /13  <line x1="350" y1="140" x2="410" y2="200" stroke="black" />
        /13  /13 <polygon points="291,101 349,159 309,199 251,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="290" y1="100" x2="350" y2="160" stroke="black" /> /13  <line x1="250" y1="140" x2="310" y2="200" stroke="black" /> /13 <polygon points="349,141 291,199 251,159 309,101"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="250" y1="160" x2="310" y2="100" stroke="black" /> /13  <line x1="290" y1="200" x2="350" y2="140" stroke="black" />
        /13  /13 <polygon points="249,141 191,199 151,159 209,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="160" x2="210" y2="100" stroke="black" /> /13  <line x1="190" y1="200" x2="250" y2="140" stroke="black" /> /13 <polygon points="191,101 249,159 209,199 151,141"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="190" y1="100" x2="250" y2="160" stroke="black" /> /13  <line x1="150" y1="140" x2="210" y2="200" stroke="black" />
        /13  /13 <polygon points="91,101 149,159 109,199 51,141"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="90" y1="100" x2="150" y2="160" stroke="black" /> /13  <line x1="50" y1="140" x2="110" y2="200" stroke="black" /> /13 <polygon points="149,141 91,199 51,159 109,101"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="50" y1="160" x2="110" y2="100" stroke="black" /> /13  <line x1="90" y1="200" x2="150" y2="140" stroke="black" />
        /13 <polygon points="0,150 0,110 1,109 41,149 40,150"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,150 0,190 1,191 41,151 40,150"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="799,91 741,149 701,109 759,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="700" y1="110" x2="760" y2="50" stroke="black" /> /13  <line x1="740" y1="150" x2="800" y2="90" stroke="black" /> /13 <polygon points="741,51 799,109 759,149 701,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="740" y1="50" x2="800" y2="110" stroke="black" /> /13  <line x1="700" y1="90" x2="760" y2="150" stroke="black" />
        /13  /13 <polygon points="699,91 641,149 601,109 659,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="600" y1="110" x2="660" y2="50" stroke="black" /> /13  <line x1="640" y1="150" x2="700" y2="90" stroke="black" /> /13 <polygon points="641,51 699,109 659,149 601,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="640" y1="50" x2="700" y2="110" stroke="black" /> /13  <line x1="600" y1="90" x2="660" y2="150" stroke="black" />
        /13  /13 <polygon points="599,91 541,149 501,109 559,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="500" y1="110" x2="560" y2="50" stroke="black" /> /13  <line x1="540" y1="150" x2="600" y2="90" stroke="black" /> /13 <polygon points="541,51 599,109 559,149 501,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="540" y1="50" x2="600" y2="110" stroke="black" /> /13  <line x1="500" y1="90" x2="560" y2="150" stroke="black" />
        /13  /13 <polygon points="499,91 441,149 401,109 459,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="400" y1="110" x2="460" y2="50" stroke="black" /> /13  <line x1="440" y1="150" x2="500" y2="90" stroke="black" /> /13 <polygon points="441,51 499,109 459,149 401,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="440" y1="50" x2="500" y2="110" stroke="black" /> /13  <line x1="400" y1="90" x2="460" y2="150" stroke="black" />
        /13  /13 <polygon points="399,91 341,149 301,109 359,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="300" y1="110" x2="360" y2="50" stroke="black" /> /13  <line x1="340" y1="150" x2="400" y2="90" stroke="black" /> /13 <polygon points="341,51 399,109 359,149 301,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="340" y1="50" x2="400" y2="110" stroke="black" /> /13  <line x1="300" y1="90" x2="360" y2="150" stroke="black" />
        /13  /13 <polygon points="299,91 241,149 201,109 259,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="200" y1="110" x2="260" y2="50" stroke="black" /> /13  <line x1="240" y1="150" x2="300" y2="90" stroke="black" /> /13 <polygon points="241,51 299,109 259,149 201,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="240" y1="50" x2="300" y2="110" stroke="black" /> /13  <line x1="200" y1="90" x2="260" y2="150" stroke="black" />
        /13  /13 <polygon points="199,91 141,149 101,109 159,51"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="100" y1="110" x2="160" y2="50" stroke="black" /> /13  <line x1="140" y1="150" x2="200" y2="90" stroke="black" /> /13 <polygon points="141,51 199,109 159,149 101,91"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="140" y1="50" x2="200" y2="110" stroke="black" /> /13  <line x1="100" y1="90" x2="160" y2="150" stroke="black" />
        /13  /13 <polygon points="99,91 41,149 1,109 59,51"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="110" x2="60" y2="50" stroke="black" /> /13  <line x1="40" y1="150" x2="100" y2="90" stroke="black" /> /13 <polygon points="41,51 99,109 59,149 1,91"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="40" y1="50" x2="100" y2="110" stroke="black" /> /13  <line x1="0" y1="90" x2="60" y2="150" stroke="black" />
        /13  /13 
        <polygon points="800,10 790, 0 750,0 750, 40 760,50 800, 50  "  fill="${pickedCC2}" stroke="none" /> /13  <line x1="800" y1="10" x2="790" y2="0" stroke="black" />  /13  <line x1="760" y1="50" x2="750" y2="40" stroke="black" /> /13 <polygon points="800,50 800,90 799,91 759,51 760,50"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="800,50 800,10 799,9 759,49 760,50"  fill="${pickedCC2}" stroke="none" /> /13 
        /13  /13 <polygon points="691,1 749,59 709,99 651,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="690" y1="0" x2="750" y2="60" stroke="black" /> /13  <line x1="650" y1="40" x2="710" y2="100" stroke="black" /> /13 <polygon points="749,41 691,99 651,59 709,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="650" y1="60" x2="710" y2="0" stroke="black" /> /13  <line x1="690" y1="100" x2="750" y2="40" stroke="black" /> /13 <polygon points="650,0  650,40 651,41 691, 1  690,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="750,0 750,40 749,41 709,1 710,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="649,41 591,99 551,59 609,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="550" y1="60" x2="610" y2="0" stroke="black" /> /13  <line x1="590" y1="100" x2="650" y2="40" stroke="black" /> /13 <polygon points="591,1 649,59 609,99 551,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="590" y1="0" x2="650" y2="60" stroke="black" /> /13  <line x1="550" y1="40" x2="610" y2="100" stroke="black" /> /13 <polygon points="550,0  550,40 551,41 591, 1  590,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="650,0 650,40 649,41 609,1 610,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="491,1 549,59 509,99 451,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="490" y1="0" x2="550" y2="60" stroke="black" /> /13  <line x1="450" y1="40" x2="510" y2="100" stroke="black" /> /13 <polygon points="549,41 491,99 451,59 509,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="450" y1="60" x2="510" y2="0" stroke="black" /> /13  <line x1="490" y1="100" x2="550" y2="40" stroke="black" /> /13 <polygon points="450,0  450,40 451,41 491, 1  490,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="550,0 550,40 549,41 509,1 510,0 "  fill="${pickedMC1}" stroke="none" />
        /13  /13 <polygon points="449,41 391,99 351,59 409,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="350" y1="60" x2="410" y2="0" stroke="black" /> /13  <line x1="390" y1="100" x2="450" y2="40" stroke="black" /> /13 <polygon points="391,1 449,59 409,99 351,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="390" y1="0" x2="450" y2="60" stroke="black" /> /13  <line x1="350" y1="40" x2="410" y2="100" stroke="black" /> /13 <polygon points="350,0  350,40 351,41 391, 1  390,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="450,0 450,40 449,41 409,1 410,0 "  fill="${pickedMC1}" stroke="none" />
        /13  /13 <polygon points="291,1 349,59 309,99 251,41"  fill="${pickedCC2}" stroke="none" /> /13  <line x1="290" y1="0" x2="350" y2="60" stroke="black" /> /13  <line x1="250" y1="40" x2="310" y2="100" stroke="black" /> /13 <polygon points="349,41 291,99 251,59 309,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="250" y1="60" x2="310" y2="0" stroke="black" /> /13  <line x1="290" y1="100" x2="350" y2="40" stroke="black" /> /13 <polygon points="250,0  250,40 251,41 291, 1  290,0 "  fill="${pickedCC2}" stroke="none" /> /13 <polygon points="350,0 350,40 349,41 309,1 310,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="249,41 191,99 151,59 209,1"  fill="${pickedCC1}" stroke="none" /> /13  <line x1="150" y1="60" x2="210" y2="0" stroke="black" /> /13  <line x1="190" y1="100" x2="250" y2="40" stroke="black" /> /13 <polygon points="191,1 249,59 209,99 151,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="190" y1="0" x2="250" y2="60" stroke="black" /> /13  <line x1="150" y1="40" x2="210" y2="100" stroke="black" /> /13 <polygon points="150,0  150,40 151,41 191, 1  190,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="250,0 250,40 249,41 209,1 210,0 "  fill="${pickedCC1}" stroke="none" />
        /13  /13 <polygon points="91,1 149,59 109,99 51,41"  fill="${pickedMC2}" stroke="none" /> /13  <line x1="90" y1="0" x2="150" y2="60" stroke="black" /> /13  <line x1="50" y1="40" x2="110" y2="100" stroke="black" /> /13 <polygon points="149,41 91,99 51,59 109,1"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="50" y1="60" x2="110" y2="0" stroke="black" /> /13  <line x1="90" y1="100" x2="150" y2="40" stroke="black" /> /13 <polygon points="50,0  50,40 51,41 91, 1  90,0 "  fill="${pickedMC2}" stroke="none" /> /13 <polygon points="150,0 150,40 149,41 109,1 110,0 "  fill="${pickedMC1}" stroke="none" />
        <polygon points="0,10 10,0 50,0 50,40 40,50 0,50"  fill="${pickedMC1}" stroke="none" /> /13  <line x1="0" y1="10" x2="10" y2="0" stroke="black" />  /13  <line x1="40" y1="50" x2="50" y2="40" stroke="black" /> /13 <polygon points="0,50 0,10 1,9 41,49 40,50"  fill="${pickedMC1}" stroke="none" /> /13 <polygon points="0,50 0,90 1,91 41,51 40,50"  fill="${pickedCC2}" stroke="none" />`
}

function localStorage_MC1 () {
        //console.log(`Stored MC1: ${localStorage.MC1}`);
        localStorage.MC1 = MC1pickerBtn.value;
        //console.log(`Stored (new) MC1: ${localStorage.MC1} `);  
}

function localStorage_MC2 () {
        //console.log(`Stored MC2: ${localStorage.MC2}`);
        localStorage.MC2 = MC2pickerBtn.value;
        //console.log(`Stored (new) MC2: ${localStorage.MC2} `);  
}

function localStorage_CC1 () {
        //console.log(`Stored CC1: ${localStorage.CC1}`);
        localStorage.CC1 = CC1pickerBtn.value;
        //console.log(`Stored (new) CC1: ${localStorage.CC1} `);  
}

function localStorage_CC2 () {
        //console.log(`Stored CC2: ${localStorage.CC2}`);
        localStorage.CC2 = CC2pickerBtn.value;
        //console.log(`Stored (new) CC2: ${localStorage.CC2} `);  
}

// custom color picker:


function giveColorValueToSwatches() {
    //console.log('function giveColorValueToSwatches executed');
    if (localStorage_MC1 !== null) {
        pickedMC1 = localStorage.MC1;
        MC1pickerBtn.value = pickedMC1;
    } else {
        MC1pickerBtn.value = pickedMC1;
    }
    if (localStorage_MC2 !== null) {
        pickedMC2 = localStorage.MC2;
        MC2pickerBtn.value = pickedMC2;
    } else {
        MC2pickerBtn.value = pickedMC2;
    }

    if (localStorage_CC1 !== null) {
        pickedCC1 = localStorage.CC1;
        CC1pickerBtn.value = pickedCC1;
    } else {
        CC1pickerBtn.value = pickedCC1;
    }

    if (localStorage_CC2 !== null) {
        pickedCC2 = localStorage.CC2;
        CC2pickerBtn.value = pickedCC2;
    } else {
        CC2pickerBtn.value = pickedCC2;
    }
}

/* Eyedropper */
document.getElementById("start-button").addEventListener("click", () => {
  const resultElement = document.getElementById("result");

  if (!window.EyeDropper) {
    resultElement.textContent =
      "Your browser does not support the EyeDropper API";
      console.log('Your browser does not support the EyeDropper API');
    return;
  }

  const eyeDropper = new EyeDropper();

  eyeDropper
    .open()
    .then((result) => {
      resultElement.textContent = result.sRGBHex;
      resultElement.style.backgroundColor = result.sRGBHex;
    })
    .catch((e) => {
      resultElement.textContent = e;
    });
});
/* eyedropper  */

/* jscolorpicker: */

// Turn a <button> element into a ColorPicker
/*const inputMC1 = document.querySelector('#colorPickerMC1')
const pickerMC1 = new ColorPicker(inputMC1, {
  toggleStyle: 'input',
  // headless: false,
  // container: null,
  swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  // enableAlpha: true,
  enableEyedropper: true,
  // formats: ['hex', 'rgb', 'hsv', 'hsl'],
  // color: 'red', // Color is set via value attribute
  defaultFormat: 'hex',
  submitMode: 'confirm', // 'instant' | 'confirm'
  showClearButton: true,
  dismissOnOutsideClick: false,
  dismissOnEscape: true,
  // dialogPlacement: 'bottom',
  // dialogOffset: 8
})

// Bind events
 pickerMC1
.on('open', () => { console.log('open pickerMC1') })
.on('opened', () => { console.log('opened pickerMC1') })
.on('close', () => { console.log('close pickerMC1') })
.on('closed', () => { console.log('closed pickerMC1') })
.on('pick', (color) => {
  if (!color) { 
    return console.log('Color cleared pickerMC1') 
  }
  console.log(
    'Color picked', 
	  color.toString(), 
	  color.string('hex'), 
	  color.string('rgb'), 
	  color.string('hsv'), 
	  color.string('hsl')
  )
})  */

function createColorPicker (pickerID) {
    /* console.log(pickerID)
    console.log(pickerID.id) */
    // Turn a <button> element into a ColorPicker
let input = document.querySelector(`#${pickerID.id}`)
const picker = new ColorPicker(input, {
  toggleStyle: 'input',
  // headless: false,
  // container: null,
  swatches: ['#d95d5d', '#db8525', '#e8c43c', '#bed649', '#9ecbdb', '#6399a5', '#c771a1'],
  // enableAlpha: true,
  enableEyedropper: true,
  // formats: ['hex', 'rgb', 'hsv', 'hsl'],
  // color: 'red', // Color is set via value attribute
  defaultFormat: 'hex',
  submitMode: 'confirm', // 'instant' | 'confirm'
  showClearButton: true,
  dismissOnOutsideClick: false,
  dismissOnEscape: true,
  // dialogPlacement: 'bottom',
  // dialogOffset: 8
})
input.classList.add('individualColorSwatch');

// Bind events
 picker
.on('open', () => { console.log(`open ${pickerID}`) })
.on('opened', () => { console.log(`opened ${pickerID}`) })
.on('close', () => { console.log(`close ${pickerID}`) })
.on('closed', () => { console.log(`closed ${pickerID}`) })
.on('pick', (color) => {
  if (!color) { 
    return console.log(`Color cleared ${pickerID}`) 
  }
  console.log(
    'Color picked', 
	  color.toString(), 
	  color.string('hex'), 
	  color.string('rgb'), 
	  color.string('hsv'), 
	  color.string('hsl')
  )
}) 
}

/* jscolorpicker */



