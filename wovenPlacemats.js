"use strict";

// declaring variables:

let windowWidth;
let screenDisplay;
let begOfPage;
let userInputTitle;


let allYCbuttons = [];
let YCselectionButtons = [];
let allYCcheckboxes
let firedCheckboxID;
let checkboxClassList;
// let YCparentDiv;
// let YCultimateParent;

let getUserSelectionBtn;
let userSelectionArray = [];
let displayValuesBtn;
let setUpRowsDiv;
let DE = '';
let pairNumber = 1;
let numberOfDE = 28;
let numberofDEperSection = 4
let numberOfSections =  numberOfDE / numberofDEperSection;
let sectionNumber = 1;
let sectionClass = `section${sectionNumber}`;
let pairClass = `pair${pairNumber}`;
let betweenMarkersDiv = document.createElement('div');

let outputDiv;
let getSetUpRowsBtn;
let algorithmBtn;
let middleSections1Array = [];
let middleSections1 = '';
let middleSections2Array = [];
let middleSections2 = '';
let SetUpRow1 = '';
let SetUpRow2 = ''
let beg1 = ' <strong> Set up row 1 (with MC): </strong> P2, ktbl1, p1, <strong> pm, </strong> '; //  change beeggining of pattern for however the set up row starts
let end1 = ' p1, ktbl1, p2. Cut yarn.  Slide work. ';
let beg2 = ' <strong> Set up row 2 (with CC): </strong> K2, sl1, k1, <strong> pm, </strong> ';
let end2 = ' k1, sl1, k2. Cut yarn.  Slide work.';
let placeMarker = ' <strong> pm, </strong> ';
let slipMarker = ' <strong> sm, </strong> ';
let DEstitchCountRow1 = 0;
let DEstitchCountRow2 = 0;
let originalStitchCount = 85 //number of sts to begin with, I think it's 85. 4 + 11*7 + 4.
let kfb = ' kfb';
let p2 = ' p2'
let cero_into_two = ' 0-into-2';
let ktbl1 = ' ktbl1';
let m1L = ' m1L';
let sl1 = ' sl1';
let purlStitchCount = 1// might have to initialize it at another value depending on pattern. Check this!
let purl = '';
let p1 = ' p1';
let k1 = ' k1';
let k2 = ' k2';
let lastDE;
let lastP2;
let saveEndOfSection;
let divToCreateSpace;
let neededhight;
let optimalHeight;
let setUpRow1Div;
let setUpRow2Div
let savedPurlStitchCount = 0;
let writtenStitchCount1;
let setUpRow1paragraph;
let firstStitch;
let secondStitch;
let thirdStitch;
let fourthStitch;
let newMiddleSections1;
let c = 0
let setUpRow1Array = []
let ExtraPurlStsInvolved;
let beforePurlSts = false;
let afterPurlSts;
let write = '';
let write2 = '';
let allSections1ArrayWritten = [];
let allSections2ArrayWritten = [];
let keepPurling = false;
let writtenSection1All = '';
let writtenSection2All = '';

let setUpRow2Array = [];
let Row2DE = ''
let sl2 = ' sl2'
let setUpRow1and2array = []
let totalStCountRow1;
let totalStCountRow2;
let writtenStitchCount2;
let Row1DE;  
let Row1DEinstructions;
let colorCode;
let combination = '';

// SVG:
let NumberCablePairs;
let NumVerticalRepeats;
let NumberOfCables;
let svgHeight;
let svgWidth
let PairNumber;
let cablesArray = [];
let RightMoving; // boolean variable;
let NextX;
let NextY;


// choosing colors:
let MCpickerBtn;
let CCpickerBtn;
let allMClines;
let allCClines;
let pickedMC;
let pickedCC;
let createChartBtn;
//

window.onload = init();

function init() {
    console.log('page loaded, the DOM is ready');
    getDOMelements ();
}

function getDOMelements () {
    console.log('function getDOMelements executed');
    begOfPage = document.querySelector('#begOfPage')
    outputDiv = document.querySelector('#outputDiv')
    getUserSelectionBtn = document.querySelector('#readUserSelectionBtn')
    displayValuesBtn = document.querySelector('#displayValues');
    windowWidth = document.querySelector('#window-width');
    algorithmBtn = document.querySelector('#algorithm');
    setUpRowsDiv = document.querySelector('#setUpRows');
    createInputSection(); 
    createYCselectionButtons()
    addEventListeners ();
    YCselectionButtons = document.querySelectorAll('.selected');
    divToCreateSpace = document.querySelector('.space');
    displayValuesBtn.disabled = true;
    displayValuesBtn.classList.add('disabledBtn');
    userInputDiv = document.querySelector('#userInputDiv');
    svgChartDiv = document.querySelector('#svgChartDiv');

    // choosing colors:

    createChartBtn = document.querySelector('#createChartBtn');
    createChartBtn.disabled = true;
    createChartBtn.classList.add('disabledBtn')

}

function displayWindowWidth () {
    if (window.innerWidth > 1028) {
        screenDisplay = "BIG screen";
    } else if (window.innerWidth > 976) {
        screenDisplay = 'Desktop';
    } else if (window.innerWidth > 776) {
    // } else if (window.innerWidth > 746) {
        screenDisplay = 'BIG Tablet'
    }  else if (window.innerWidth > 500) {
    screenDisplay = 'small Tablet'
    }  else {
        screenDisplay = 'Smartphone'
    }
    windowWidth.innerHTML = ("Window width: " + window.innerWidth + 'px -> ' + screenDisplay);

}

function createInputSection () {
    console.log('createInputSection function executed');
    userInputTitle = document.createElement('h2');
    userInputTitle.innerHTML = 'User Input:';
    begOfPage.appendChild(userInputTitle);
    let code = 0;
    let pairNumber = 1;
    for (let i = 0; i < numberOfSections; i++) {
        let wholeSection = document.createElement('div');
        userInputDiv.appendChild(wholeSection);
        let sectionSection = document.createElement('div');
        sectionSection.classList.add ('sectionTitle');

        sectionSection.innerHTML = `<div> <h3> Section ${i+1} </h3> </div>`;
        wholeSection.appendChild(sectionSection);
        betweenMarkersDiv = document.createElement('div');
        betweenMarkersDiv.innerHTML = '';
        betweenMarkersDiv.classList.add('section', 'betweenMarkers')

        colorCode = `colorCoding${code}`
        code ++
        if (code == numberofDEperSection) {
            code = 0
        }
        sectionSection.classList.add(`${colorCode}`)

        wholeSection.appendChild(betweenMarkersDiv);
        for (let k = 0; k < numberofDEperSection; k++) {
        //    console.log(pairNumber)
            pairClass = `pair${pairNumber}`;
            // console.log(pairClass);
            sectionClass = `section${sectionNumber}`;
            let fieldset = document.createElement('fieldset');
            fieldset.innerHTML = (`
                <div class="pairNumber"><h4> Pair ${pairNumber} </h4></div>
                <div class="leftANDright">
                <div class="pairRight"> <div class="pairTitle"> <h5> Right </h5>  </div><div class="switchBtnDiv">  <p class="YCselection ${sectionClass} ${pairClass} right MC"> MC </p> <label class="switch">   <input type="checkbox" class="YCcheckbox ${sectionClass} ${pairClass} right" id="checkbox${pairNumber}right" value='noneSelected'> <span class="slider round"> </span></label> <p class="YCselection ${sectionClass} ${pairClass} right CC"> CC </p></div></div>
                <div class="pairLeft">  <div class="pairTitle"> <h5> Left   </h5> </div> <div class="switchBtnDiv"> <p class="YCselection ${sectionClass} ${pairClass} left MC"> MC </p>  <label class="switch">   <input type="checkbox" class="YCcheckbox ${sectionClass} ${pairClass} left" id="checkbox${pairNumber}left"> <span class="slider round"> </span></label> <p class="YCselection ${sectionClass} ${pairClass} left CC"> CC </p>  </div></div>
                </div> `)
            betweenMarkersDiv.appendChild(fieldset);
                pairNumber++
        }
        sectionNumber++
    }
}

function createYCselectionButtons () {
    allYCcheckboxes = document.querySelectorAll('.YCcheckbox');
}

function addEventListeners () {
    console.log('function addEventListeners executed');
    for (let i = 0; i < allYCcheckboxes.length; i++) {
        allYCcheckboxes[i].addEventListener('change', function(event) {changeColorSelection(allYCcheckboxes[i])})
    }
    window.addEventListener('resize', displayWindowWidth);
    getUserSelectionBtn.addEventListener('click', createUserSelectionArray);
    displayValuesBtn.addEventListener('click', displaySelectedValues);
}

function changeColorSelection (checkedYC) {
    // console.log('changeColorSelection function executed for: ');
    firedCheckboxID = event.target.id;
    checkedYC = document.querySelector('#'+firedCheckboxID);
    // console.log(checkedYC);
    if (checkedYC.checked) {
        checkedYC.value = 'CCselected';
        checkedYC.classList.add('CCselected')
        checkedYC.classList.remove('MCselected')
    } else {
        checkedYC.value = 'MCselected';
        checkedYC.classList.add('MCselected')
        checkedYC.classList.remove('CCselected')
    }
    // console.log(checkedYC.value);
}

function createUserSelectionArray () {
    console.log('createUserSelectionArray function executed')
    // create an array of selected buttons as objects with properties:
    for (let i = 0; i < allYCcheckboxes.length; i++) {
        checkboxClassList = allYCcheckboxes[i].classList;
        let thisObject = {};
        thisObject['section'] = allYCcheckboxes[i].classList[1];
        thisObject['pairNumber'] = allYCcheckboxes[i].classList[2];
        thisObject['direction'] = allYCcheckboxes[i].classList[3];
        if (checkboxClassList.contains('CCselected')) {
             thisObject['yarnColor'] = 'CC';
        } else if (checkboxClassList.contains('MCselected')) {
            thisObject['yarnColor'] = 'MC';
        } else {
            thisObject['yarnColor'] = 'MC';
        }
        thisObject['numberID'] = i;
        userSelectionArray.push(thisObject);
            }
    console.log('userSelectionArray: ')
    console.log(userSelectionArray);
    getUserSelectionBtn.disabled = true;
    getUserSelectionBtn.classList.add('disabledBtn');
    createSetUpRow1Array(userSelectionArray);
    displayValuesBtn.disabled = false;
    displayValuesBtn.classList.remove('disabledBtn');
    createChartBtn.disabled = false;
    createChartBtn.classList.remove('disabledBtn')
    createChartBtn.addEventListener('click', SVGcondition);

    return userSelectionArray;
}

function displaySelectedValues () {
    console.log('displaySelectedValues function executed');
    userInputTitle.classList.add('hidden');
    userInputDiv.classList.add('hidden');
    outputDiv.classList.remove('hidden');
    let inputSelectionTitle = document.createElement('div');
    inputSelectionTitle.innerHTML = `<h2> User selection: </h2>`;
    inputSelectionTitle.classList.add('inputSelectionTitleDiv');
    outputDiv.appendChild(inputSelectionTitle);
    let pNumber = 0;
    let stNumber = 0
    let stDirection //
    let code = 0;
    for (let i = 0; i < numberOfSections; i++) {

        let sectionDiv = document.createElement('div');
        sectionDiv.classList.add('selectionOutputSection');

        colorCode = `colorCoding${code}`
        code ++
        if (code == numberofDEperSection) {
            code = 0
        }
        sectionDiv.classList.add(`${colorCode}`)

        outputDiv.appendChild(sectionDiv);

        let sNumber = i + 1;
        let sectionTitle = document.createElement('h3');
        sectionTitle.innerHTML = (`Section ${sNumber}`);
        sectionDiv.appendChild(sectionTitle);
        let eachSectionDiv = document.createElement('div');
        eachSectionDiv.classList.add('eachSectionDiv');
        sectionDiv.appendChild(eachSectionDiv);
        for (let j = 0; j < numberofDEperSection; j++) {
            pNumber++
            let eachPairDiv = document.createElement('div');
            eachPairDiv.classList.add('eachPairDiv');
            eachSectionDiv.appendChild(eachPairDiv);
            let pairNumberOutputTitle = document.createElement('h4');
            pairNumberOutputTitle.innerHTML = (`   Pair ${pNumber}`);
            eachPairDiv.appendChild(pairNumberOutputTitle);
            let leftText = 'Left';
            let rightText = 'Right';
            let counter = 'pair' + pNumber
            let condition = userSelectionArray[stNumber].pairNumber;
            while (condition == counter) {
                let pairStitchesDiv = document.createElement('div');
                pairStitchesDiv.classList.add('pairStitchesDiv');
                eachPairDiv.appendChild(pairStitchesDiv);
                if (userSelectionArray[stNumber].direction = 'right') {
                    let stitchSection = document.createElement('div');
                    stitchSection.classList.add('stitchSection');
                    pairStitchesDiv.appendChild(stitchSection);
                    let cableDirectionANDColor = document.createElement('p')
                    stDirection = rightText;
                    cableDirectionANDColor.innerHTML = 
                    `<strong>${stDirection}</strong> design stitch is <strong>${userSelectionArray[stNumber].yarnColor}</strong>` ;
                    stitchSection.appendChild(cableDirectionANDColor);
                    stNumber++
                }
                if (userSelectionArray[stNumber].direction = 'left') {
                let stitchSection = document.createElement('div');
                stitchSection.classList.add('stitchSection');
                pairStitchesDiv.appendChild(stitchSection);

                let cableDirectionANDColor = document.createElement('p')
                stDirection = leftText
                cableDirectionANDColor.innerHTML = 
                `<strong>${stDirection}</strong> design stitch is <strong>${userSelectionArray[stNumber].yarnColor}</strong>` ;
                stitchSection.appendChild(cableDirectionANDColor);
                stNumber++
                counter++
                }                                  
            }      
        }
    }
}

function createSetUpRow1Array (userSelectionArray) {
    for (let i = 0; i < numberOfSections; i++) {
        for (let j = 0; j < numberofDEperSection; j++) {
            let thisObject = {};
                thisObject['numberID'] = c;
                thisObject['section'] = userSelectionArray[c].section;
                thisObject['pairNumber'] = userSelectionArray[c].pairNumber
            if (j == 0) { //1st pair
                firstPairOfSection_SetUpRow1 (c, thisObject)
            }else if (j < numberofDEperSection - 1) { //2nd and 3rd pair
                middlePairsOfSection_SetUpRow1(c, thisObject);
            } else if (j == numberofDEperSection - 1) { // 4th pair
                lastPairOfSection_SetUpRow1(c, thisObject);
            }
            c = c+2
        } //j loop
    } //i loop
    console.log('setUpRow1Array:');
    console.log(setUpRow1Array);
    wovenPlacematSetUpRow1(setUpRow1Array);
}

function firstPairOfSection_SetUpRow1 (c,thisObject) {
    purlStitchCount = 1;
    if (userSelectionArray[c].yarnColor == 'MC' && userSelectionArray[c+1].yarnColor == 'MC') {
        DE = `${p1}, ${kfb} `;
        DEstitchCountRow1++
        purlStitchCount = 2;
        keepPurling = false;
    } else if (userSelectionArray[c].yarnColor == 'MC' && userSelectionArray[c+1].yarnColor == 'CC') {
        DE = `${p1}, ${ktbl1} `
        purlStitchCount = 2;
        keepPurling = false;
    } else if (userSelectionArray[c].yarnColor == 'CC' && userSelectionArray[c+1].yarnColor == 'CC') {
        purl = 'purl';
        DE = purl
        purlStitchCount = purlStitchCount + 3 // = 4
        keepPurling = true;
    } else if (userSelectionArray[c].yarnColor == 'CC' && userSelectionArray[c+1].yarnColor == 'MC') {
        DE = `${p1}, ${ktbl1} `;
        // DEstitchCountRow1++
        purlStitchCount = 2;
        keepPurling = false;
    }
    thisObject['DE'] = DE;
    thisObject['purlStitchCount'] = purlStitchCount;
    thisObject['keepPurling'] = keepPurling;
    setUpRow1Array.push(thisObject);
    return purlStitchCount;

}

function middlePairsOfSection_SetUpRow1 (c, thisObject) {
    if (userSelectionArray[c].yarnColor == 'MC' && userSelectionArray[c+1].yarnColor == 'MC') {
        // console.log(`right MC & left MC`)
        purlStitchCount = 0;
        DE = kfb;
        DEstitchCountRow1++
        purlStitchCount = purlStitchCount + 2;
        keepPurling = false;
    } else if (userSelectionArray[c].yarnColor == 'MC' && userSelectionArray[c+1].yarnColor == 'CC') {
        // console.log(`right MC & left CC`)
        purlStitchCount = 0
        DE = ktbl1;
        purlStitchCount = purlStitchCount + 2
        keepPurling = false;
    } else if (userSelectionArray[c].yarnColor == 'CC' && userSelectionArray[c+1].yarnColor == 'CC') {
        // console.log(`right CC & left CC`);
        purlStitchCount = purlStitchCount + 3
        purl = 'purl'
        DE =  purl // p2, p1,
        keepPurling = true;
    } else if (userSelectionArray[c].yarnColor == 'CC' && userSelectionArray[c+1].yarnColor == 'MC') {
        // console.log(`right CC & left MC`);
        purlStitchCount = 0
        DE = ktbl1;
        purlStitchCount = purlStitchCount + 2
        keepPurling = false;
    }
    thisObject['DE'] = DE;
    thisObject['purlStitchCount'] = purlStitchCount;
    thisObject['keepPurling'] = keepPurling;
    setUpRow1Array.push(thisObject);
    return purlStitchCount;
}

function lastPairOfSection_SetUpRow1 (c, thisObject) {
    keepPurling = false;
    if (userSelectionArray[c].yarnColor == 'MC' && userSelectionArray[c+1].yarnColor == 'MC') {
        // console.log(`right MC & left MC`)
        purlStitchCount = 0;
        DE = `${cero_into_two}`
        DEstitchCountRow1++
        purlStitchCount++
        combination = 'right MC & left MC'

    } else if (userSelectionArray[c].yarnColor == 'MC' && userSelectionArray[c+1].yarnColor == 'CC') {
        // console.log(`right MC & left CC`)
        purlStitchCount = 0
        DE = m1L;
        purlStitchCount++
        combination = 'right MC & left CC'

    } else if (userSelectionArray[c].yarnColor == 'CC' && userSelectionArray[c+1].yarnColor == 'CC') {
        // console.log(`right CC & left CC`);
        purlStitchCount++
        DE = ''
        keepPurling = true;
        combination = 'right CC & left CC'
    } else if (userSelectionArray[c].yarnColor == 'CC' && userSelectionArray[c+1].yarnColor == 'MC') {
        // console.log(`right CC & left MC`);
        purlStitchCount = 0
        DE = m1L;
        purlStitchCount++
        combination = 'right CC & left MC'
 
    }
    thisObject['DE'] = DE;
    thisObject['purlStitchCount'] = purlStitchCount;
    thisObject['keepPurling'] = keepPurling;
    thisObject['combination'] = combination;
    combination = ''
    purlStitchCount = 1; //every new ection will starts with p1
    setUpRow1Array.push(thisObject);
    return purlStitchCount;

}

function wovenPlacematSetUpRow1 (setUpRow1Array) {
    console.log(`wovenPlacematSetUpRow1 function executed.`)
    FIRSTsection_SetUpRow1(setUpRow1Array);
    MiddleSections_SetUpRow1(setUpRow1Array);
    LASTsection_SetUpRow1(setUpRow1Array);
    writeSetUpRow1(allSections1ArrayWritten);
    createSpace();
} // end of function

function FIRSTsection_SetUpRow1 (setUpRow1Array) {
    console.log('writeFIRSTsection_SetUpRow1 function executed');
    beforePurlSts = false;
    for (let i = 0; i < numberofDEperSection; i++) {
        // console.log(`i: ${i}.  Section: ${setUpRow1Array[i].section}`)
            // let thisObject = {};
            ExtraPurlStsInvolved = setUpRow1Array[i].keepPurling;
            if (setUpRow1Array[i].section == setUpRow1Array[i+1].section) {
                afterPurlSts = setUpRow1Array[i+1].keepPurling;
            } else {
                afterPurlSts = false // Exception: the last st of the section cannot have extra purling sts after.
            }
            if (i == 0) {
                determineStitchPatternForFIRSTpair(i, setUpRow1Array)
            } else if (setUpRow1Array[i].section == setUpRow1Array[i+1].section) {
                determineStitchPatternForMIDDLEpairs (i, setUpRow1Array)
            } else if (setUpRow1Array[i].section !== setUpRow1Array[i+1].section) { 
                determineStitchPatternForLASTpair(i, setUpRow1Array);
            }
    } // i loop
    console.log('middleSections1Array: ');
    console.log(middleSections1Array);
}

function MiddleSections_SetUpRow1 (setUpRow1Array) {
    console.log('writeMiddleSections_SetUpRow1 function executed');
    for (let i = 4; i < setUpRow1Array.length - 4; i++) {
        // console.log(`i: ${i}.  Section: ${setUpRow1Array[i].section}`)
        ExtraPurlStsInvolved = setUpRow1Array[i].keepPurling;

        if (setUpRow1Array[i].section == setUpRow1Array[i+1].section) { // Exception: the last st of the section cannot have extra purling sts after.
            afterPurlSts = setUpRow1Array[i+1].keepPurling;
        } else {
            afterPurlSts = false // Exception: the last st of the section cannot have extra purling sts after.
        }
        if (setUpRow1Array[i].section !== setUpRow1Array[i-1].section) { //firts pair of the section
            determineStitchPatternForFIRSTpair(i, setUpRow1Array)
        } else if (setUpRow1Array[i].section == setUpRow1Array[i+1].section) { // 2nd and 3rd pair of the section
            determineStitchPatternForMIDDLEpairs(i, setUpRow1Array);
        } else if (setUpRow1Array[i].section !== setUpRow1Array[i+1].section) { // fourth pair of the section
            determineStitchPatternForLASTpair(i, setUpRow1Array);
        }
    } // i loop
}

function LASTsection_SetUpRow1 (setUpRow1Array) {
    console.log('writeLASTsection_SetUpRow1 function executed');
    for (let i = setUpRow1Array.length - 4; i < setUpRow1Array.length; i++) {
        ExtraPurlStsInvolved = setUpRow1Array[i].keepPurling;

        if (setUpRow1Array[i].section !== setUpRow1Array[i-1].section) {
            // console.log(`i: ${i} -> if: FIRST pair`);
            beforePurlSts = false; //
            afterPurlSts = setUpRow1Array[i+1].keepPurling; //
            determineStitchPatternForFIRSTpair(i, setUpRow1Array)
        } else if (setUpRow1Array[i].section == setUpRow1Array[i-1].section && setUpRow1Array[i].section !== setUpRow1Array[i-(numberofDEperSection-1)].section) {
            // console.log(`i: ${i} -> else if: middle pairs`);
            beforePurlSts = setUpRow1Array[i-1].keepPurling; //
            afterPurlSts = setUpRow1Array[i+1].keepPurling; //
            determineStitchPatternForMIDDLEpairs(i, setUpRow1Array);
        } else if (setUpRow1Array[i].section == setUpRow1Array[i-(numberofDEperSection-1)].section) {
            beforePurlSts = setUpRow1Array[i-1].keepPurling; //
            afterPurlSts = false; //last pair of the section, there are no afterPurl sts.
            // console.log(`i: ${i} -> if: LAST PAIR`);
            determineStitchPatternForLASTpair(i, setUpRow1Array)
        }
    } // i loop
}

function determineStitchPatternForFIRSTpair (i, setUpRow1Array) {
    // console.log('determineStitchPatternForFIRSTpair funtion executed')
    beforePurlSts = false; // false, there's not a previous purl st count for the first pair.
    if (!beforePurlSts) {
        if (ExtraPurlStsInvolved) { // true -> what to do if this is a purl DE stitch.
            if (afterPurlSts) {
                write = write;
            }else if (!afterPurlSts) {
                write = `${write} p${setUpRow1Array[i].purlStitchCount}, `; 
            }

        } else if (!ExtraPurlStsInvolved) { // false -> this is not a purl DE stitch.
            if (afterPurlSts) {
                write = `${write} ${setUpRow1Array[i].DE}, `;
            }else if (!afterPurlSts) {
                write = `${write} ${setUpRow1Array[i].DE}, p2, `;
            }
        }
    }
    return write;
}

function determineStitchPatternForMIDDLEpairs (i, setUpRow1Array) {
    // console.log('determineStitchPatternForMIDDLEpairs function executed')
    if (beforePurlSts ) { // true -> what to do if there's s previous purl st count.
        if (ExtraPurlStsInvolved) { // true -> what to do if this is a purl DE stitch.
            if (afterPurlSts) {
                write = write;
            } else if (!afterPurlSts) {
                write = `${write} p${setUpRow1Array[i].purlStitchCount}, `;
            }

        } else if (!ExtraPurlStsInvolved) { // false -> this is not a purl DE stitch.
            if (afterPurlSts) {
                // write = `${write} p${setUpRow1Array[i].purlStitchCount}, `;
                write = `${write} ${setUpRow1Array[i].DE}, `
            }else if (!afterPurlSts) {
                write = `${write} ${setUpRow1Array[i].DE}, p2, `; //middle pairs end on p2
            }
        }
    } else if (!beforePurlSts) { // false, there's not a previous purl st count.
        if (ExtraPurlStsInvolved) { // true -> what to do if this is a purl DE stitch.
            if (afterPurlSts) {
                write = write;
            }else if (!afterPurlSts) {
                write = `${write} p${setUpRow1Array[i].purlStitchCount}, `; 
            }

        } else if (!ExtraPurlStsInvolved) { // false -> this is not a purl DE stitch.
            if (afterPurlSts) {
                write = `${write} ${setUpRow1Array[i].DE}, `;
            }else if (!afterPurlSts) {
                write = `${write} ${setUpRow1Array[i].DE}, p2, `; //middle pairs end on p2
            }
        }
    }
    return write;
}

function determineStitchPatternForLASTpair (i, setUpRow1Array) {
    // console.log('determineStitchPatternForLASTpair function executed')
    afterPurlSts = false;
    if (beforePurlSts ) { // true -> what to do if there's s previous purl st count.
        if (ExtraPurlStsInvolved) { // true -> what to do if this is a purl DE stitch.
                write = `${write} p${setUpRow1Array[i].purlStitchCount},`;

        } else if (!ExtraPurlStsInvolved) { // false -> this is not a purl DE stitch.
                write = `${write} ${setUpRow1Array[i].DE}, p1, `; //!!!!
        }
    } else if (!beforePurlSts) { // false, there's not a previous purl st count.
        if (ExtraPurlStsInvolved) { // true -> what to do if this is a purl DE stitch.
                write = `${write} p${setUpRow1Array[i].purlStitchCount}, `; 

        } else if (!ExtraPurlStsInvolved) { // false -> this is not a purl DE stitch.
                write = `${write} ${setUpRow1Array[i].DE}, p1, `;
        }
    }
        let thisObject = {};
        let setUpRow1StSection = setUpRow1Array[i].section;
        thisObject['section'] = setUpRow1StSection;
        thisObject['writtenInstructions'] = write;
        middleSections1Array.push(thisObject);
        write = '';
        
        for (let i = 0; i < middleSections1Array.length; i++) {
            allSections1ArrayWritten[i] = `<span class="colorCoding${i}"> ${middleSections1Array[i].writtenInstructions} </span> ${placeMarker}`
        }
        return allSections1ArrayWritten;
}

function writeSetUpRow1 (middleSections1ArrayWritten) {
    console.log('writeSetUpRow1 function executed');
    totalStCountRow1 = originalStitchCount + DEstitchCountRow1;
    writtenStitchCount1 = `(${originalStitchCount} sts + ${DEstitchCountRow1} increased sts = ${originalStitchCount + DEstitchCountRow1} total sts).`
    // writtenStitchCount1 = `(${totalStCountRow1} sts).`

    for (let i = 0; i < middleSections1ArrayWritten.length; i++) {
        writtenSection1All = writtenSection1All + middleSections1ArrayWritten[i]
    }
    SetUpRow1  = `${beg1} ${writtenSection1All} ${end1} ${writtenStitchCount1}`
    let setUpRow1paragraph = document.createElement('p');
    setUpRow1paragraph.classList.add('setUpRow1paragraph');
    setUpRow1paragraph.innerHTML = SetUpRow1;
    setUpRow1Div = document.createElement('div');
    setUpRowsDiv.appendChild(setUpRow1Div);
    setUpRow1Div.appendChild(setUpRow1paragraph);
    window.addEventListener('resize', createSpace);
    createSetUpRow2Array(setUpRow1Array) //
}

function allPairsOfSection_SetUpRow2 (i, thisObject) {
    console.log('allPairsOfSection_SetUpRow2 function executed'); 
    Row1DEinstructions = setUpRow1Array[i].DE;
    let Row1DEobject;
    Row1DE = '';
    let Row1DEpossibleStitches = [kfb, purl, ktbl1, cero_into_two, m1L];
        for (let j = 0; j < Row1DEpossibleStitches.length; j++) {
            // do {
                Row1DEobject = Row1DEinstructions.match(Row1DEpossibleStitches[j]);
                if (Row1DEobject !== null) {
                    Row1DE = Row1DEobject[0];
                    if (Row1DE !== '') {
                        Row1DE = Row1DEobject[0];
                        console.log(`j = ${j} yes = ${Row1DEpossibleStitches[j]}`)
                        // console.log(`j = ${j} Row1DE = ${Row1DE}.  setUpRow1Array: i= ${i}.  Section: ${setUpRow1Array[i].section}. Pair: ${setUpRow1Array[i].pairNumber}`);
                        // console.log(`setUpRow2Array: i= ${i}.  Section: ${setUpRow2Array[i].section}. Pair: ${setUpRow2Array[i].pairNumber}  `)`);
                        break;
                    }
                }
            // } while (Row1DE == '')
        } // j loop
        console.log('out of little while loop. j')

        combination = '';
        if (Row1DE == kfb) { // MC & MC
            Row2DE = sl2;
            combination = 'both MC'
        } else if (Row1DE == purl) { // CC & CC
            Row2DE = kfb;
            DEstitchCountRow2++
            combination = 'both CC';
        } else if (Row1DE == cero_into_two) { // MC & MC for last pair
            Row2DE = sl2;
            // DEstitchCountRow2 = DEstitchCountRow2 + 2;
            combination = 'both MC last pair';
        } else if (Row1DE == '') {
            Row2DE = cero_into_two;
            DEstitchCountRow2 = DEstitchCountRow2 + 2;
            combination = 'both CC last pair';
        } else if (Row1DE == ktbl1 || Row1DE == m1L) { // MC & CC
            let oldStitchCount = DEstitchCountRow2;
            while (oldStitchCount == DEstitchCountRow2) {
                for (let k = 0; k < userSelectionArray.length; k++) {
                    if (userSelectionArray[k].section == thisObject.section) {
                        if (userSelectionArray[k].pairNumber == thisObject.pairNumber) {
                            if (userSelectionArray[k].direction == 'right' && userSelectionArray[k+1].direction == 'left') {
                                if (userSelectionArray[k].yarnColor == 'MC' && userSelectionArray[k+1].yarnColor == 'CC') {
                                    Row2DE = `${sl1}, ${m1L} ` // rigth MC && left CC
                                    DEstitchCountRow2++
                                    if (Row1DE == ktbl1) {
                                        combination = 'rigth MC & left CC';
                                        break;
                                    } else if (Row1DE == m1L) {
                                        combination = "rigth MC & left CC last pair"
                                        break;
                                    }
                                } else if (userSelectionArray[k].yarnColor == 'CC' && userSelectionArray[k+1].yarnColor == "MC") {
                                        Row2DE = `${m1L}, ${sl1} `  // right CC && left MC
                                        DEstitchCountRow2++
                                    if (Row1DE == ktbl1) {
                                        combination = 'right CC & left MC';
                                        break;
                                    } else if (Row1DE == m1L) {
                                        combination = 'right CC & left MC last pair';
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
            
        }
    thisObject['Row1DE'] = Row1DE; 
    thisObject['Row2DE'] = Row2DE;
    thisObject['DEstitchCountRow2'] = DEstitchCountRow2;
    // thisObject['combination'] = combination;
    setUpRow2Array.push(thisObject);
    // console.log(`${setUpRow1Array[i].section} ${setUpRow1Array[i].pairNumber}: Row1DE = ${Row1DE}. Row2DE = ${Row2DE}. Combination: ${combination}`)
    // combination = ''
    Row1DE = '';
    Row2DE = '';
    // return thisObject;
}

function createSetUpRow2Array (setUpRow1Array) {
    console.log('createSetUpRow2Array function executed');
    let c = 0;
    let colorCode = c;
    DEstitchCountRow2 = 0;
    for (let i = 0; i < setUpRow1Array.length; i++) {
        colorCode = c;
        // console.log(`${setUpRow1Array[i].section} ${setUpRow1Array[i].pairNumber}: Row1DE = ${setUpRow1Array[i].DE}`)
        let thisObject = {};
        thisObject['numberID'] = i;
        thisObject['section'] = setUpRow1Array[i].section;
        thisObject['pairNumber'] = setUpRow1Array[i].pairNumber;
        thisObject['colorCode'] = colorCode;
        allPairsOfSection_SetUpRow2(i, thisObject)
        if (i == numberofDEperSection - 1) {
            console.log('setUpRow2Array:');
            console.log(setUpRow2Array);
            c++
        }
    } // i loop
    console.log('setUpRow2Array:');
    console.log(setUpRow2Array);
    wovenPlacematSetUpRow2(setUpRow2Array);
}



function wovenPlacematSetUpRow2 (setUpRow2Array) {
    console.log(`wovenPlacematSetUpRow1 function executed.`)
    FIRSTsection_SetUpRow2(setUpRow2Array);
    middleSections_SetUpRow2(setUpRow2Array);
    LASTsection_SetUpRow2(setUpRow2Array);
    writeSetUpRow2(allSections2ArrayWritten);
    // createSpace();
} // end of function

function FIRSTsection_SetUpRow2 (setUpRow2Array) {
    for (let i = 0; i < numberofDEperSection; i++) {
            if (i == 0) {
                determineStitchPatternForFIRSTpairRow2(i, setUpRow2Array)
            } else if (setUpRow2Array[i].section == setUpRow2Array[i+1].section) {
                determineStitchPatternForMIDDLEpairsRow2 (i, setUpRow2Array)
            } else if (setUpRow2Array[i].section !== setUpRow2Array[i+1].section) { 
                determineStitchPatternForLASTpairRow2(i, setUpRow2Array);
            }
    } // i loop
}

function middleSections_SetUpRow2(setUpRow2Array) {
    for (let i = 4; i < setUpRow2Array.length - 4; i++) {
        if (setUpRow2Array[i].section !== setUpRow2Array[i-1].section) { //firts pair of the section
            determineStitchPatternForFIRSTpairRow2(i, setUpRow2Array)
        } else if (setUpRow2Array[i].section == setUpRow2Array[i+1].section) { // 2nd and 3rd pair of the section
            determineStitchPatternForMIDDLEpairsRow2(i, setUpRow2Array);
        } else if (setUpRow2Array[i].section !== setUpRow2Array[i+1].section) { // fourth pair of the section
            determineStitchPatternForLASTpairRow2(i, setUpRow2Array);
        }
    } // i loop
}

function LASTsection_SetUpRow2(setUpRow2Array) {
    for (let i = setUpRow2Array.length - 4; i < setUpRow2Array.length; i++) {
        if (setUpRow2Array[i].section !== setUpRow2Array[i-1].section) {
            determineStitchPatternForFIRSTpairRow2(i, setUpRow2Array)
        } else if (setUpRow2Array[i].section == setUpRow2Array[i-1].section && setUpRow2Array[i].section !== setUpRow2Array[i-(numberofDEperSection-1)].section) {
            determineStitchPatternForMIDDLEpairsRow2(i, setUpRow2Array);
        } else if (setUpRow2Array[i].section == setUpRow2Array[i-(numberofDEperSection-1)].section) {
            determineStitchPatternForLASTpairRow2(i, setUpRow2Array)
        }
    } // i loop
}

function determineStitchPatternForFIRSTpairRow2 (i, setUpRow2Array) {
    write2 = `${k1}, ${setUpRow2Array[i].Row2DE}, ${k2}, `
    return write2;
}

function determineStitchPatternForMIDDLEpairsRow2 (i, setUpRow2Array) {
    write2 = `${write2} ${setUpRow2Array[i].Row2DE}, ${k2}, `
    return write2;
}

function determineStitchPatternForLASTpairRow2 (i, setUpRow2Array) {
    write2 = `${write2}  ${setUpRow2Array[i].Row2DE}, ${k1},`

    let thisObject = {};
        let setUpRow2StSection = setUpRow2Array[i].section;
        thisObject['section'] = setUpRow2StSection;
        thisObject['writtenInstructions'] = write2;
        middleSections2Array.push(thisObject);

        write2 = '';

    for (let i = 0; i < middleSections2Array.length; i++) {
        allSections2ArrayWritten[i] = `<span class="colorCoding${i}"> ${middleSections2Array[i].writtenInstructions} </span> ${placeMarker}`
    }
    return allSections2ArrayWritten;
}




function writeSetUpRow2 () {
    console.log('writeSetUpRow2 function executed');
    totalStCountRow2 = totalStCountRow1 + DEstitchCountRow2;
    writtenStitchCount2 = `(${totalStCountRow2}sts). `
    writtenStitchCount2 = `(${totalStCountRow1} sts + ${DEstitchCountRow2} increased sts = ${totalStCountRow2} total sts).` // erase after checking accuracy.

    for (let i = 0; i < middleSections2Array.length; i++) {
        allSections2ArrayWritten[i] = `<span class="colorCoding${i}"> ${middleSections2Array[i].writtenInstructions} </span> ${placeMarker}`
    }

    for (let j = 0; j < allSections2ArrayWritten.length; j++) {
        writtenSection2All = writtenSection2All + allSections2ArrayWritten[j];
    }

    SetUpRow2 = `${beg2} ${writtenSection2All} ${end2} ${writtenStitchCount2}`;
    let setUpRow2paragraph = document.createElement('p');
    setUpRow2paragraph.classList.add('setUpRow2paragraph');
    setUpRow2paragraph.innerHTML = SetUpRow2;
    setUpRow2Div = document.createElement('div');
    setUpRowsDiv.appendChild(setUpRow2Div);
    setUpRow2Div.appendChild(setUpRow2paragraph);
}

function createSpace () {
    neededhight = setUpRowsDiv.offsetHeight;
    optimalHeight = neededhight + 5
    divToCreateSpace.style.height = `${optimalHeight}px`;
}

function  SVGcondition () {
    console.log('SVGcondition function executed');
    // createChartBtn.disabled = true;
    // createChartBtn.classList.add('disabledBtn');

    NumberCablePairs = numberOfDE; // = 28
    if (NumberCablePairs % 4 == 0) {
        createSVG (NumberCablePairs)
    } else {
        console.log(`the number of cable pairs should be divisible by 4. Current number of pairs = ${NumberCablePairs}`)
    }
}

function createSVG (NumberCablePairs) {
    console.log('createSVG function executed')
    let a = 100;
    NumVerticalRepeats = NumberCablePairs / 2; // = 14
    NumberOfCables = NumberCablePairs * 2; // = 56
    svgHeight = a * NumVerticalRepeats;
    svgWidth =  a * NumberCablePairs;
    let maximumNumberOfLineSegments = Math.ceil((svgHeight / svgWidth)) + 1
    console.log('maximumNumberOfLineSegments: ' + maximumNumberOfLineSegments)
    initialCoordinates ();
    startCables (); 
    SVGinnerHTML ();
}

function initialCoordinates (a) {
    PairNumber = 1
    for (let i = 0; i < NumberOfCables ; i++) { // 56
        let thisObject = {};
        thisObject['x1'] = a * PairNumber - (a / 2);
        thisObject['y1'] = svgHeight;
        thisObject['selectedColour'] = userSelectionArray[i].yarnColor;
        if (userSelectionArray[i].direction == 'right') {
            RightMoving = true;
        } else if (userSelectionArray[i].direction == 'left') {
            RightMoving = false;
        }
        thisObject['rightMoving'] = RightMoving;
        cablesArray.push(thisObject);
        if (i % 2 == 0) {
            PairNumber++
        }
    }
}

function startCables () {
    console.log('startCables function executed')
    for (let i = 0; i < NumberOfCables; i++) {
        let CurrentX = cablesArray[i].x1;
        let CurrentY = cablesArray[i].y1;
        // if cablesArray[i] is right moving => RightMoving = true; else RightMoving = false
        while (CurrentY < svgHeight) {
            if (RightMoving) { // RIGHT moving cable: will travel right until it reaches either the right edge or the top edge and will stop.
                if ((svgWidth - CurrentX) < CurrentY) { //it has hit the right edge.
                    NextX = svgWidth;
                    NextY = CurrentY + (svgWidth - CurrentX);
                    break;
                } else if (CurrentY >= svgHeight) { // condition for right moving cable stopping at the top edge??
                    NextX = CurrentX + CurrentY;
                    NextY = 0;
                    break;
                } 
                RightMoving = false;
            } else if (!RightMoving) { // LEFT moving cable:
                if (CurrentX < CurrentY) { // has hit the left edge.
                    NextX = 0;
                    NextY = CurrentY-CurrentX;
                    break;
                } else if (CurrentY >= svgHeight) { // has hit the top edge. Condition??
                    NextY = 0;
                    NextX = CurrentX-CurrentY;
                    break;
                }
                RightMoving = true;
            }
            CurrentX++;
            CurrentY++;
        }
        cablesArray[i]['NextX'] = NextX;
        cablesArray[i]['NextY'] = NextY;
        if (cablesArray[i].selectedColour = 'MC') {
            cablesArray[i]['Colour'] = 'blue';
        } else if (cablesArray[i].selectedColour = 'CC') {
            cablesArray[i]['Colour'] = 'red';
        }
        
        cablesArray[i]['line'] = '`<line x1=${CurrentX} y1=${CurrentY} x2=${NextX} y2=${NextY} style="stroke:${cablesArray[i].Colour};stroke-width:2" />`'
        CurrentX = NextX;
        CurrentY = NextY;
    }
}

function SVGinnerHTML () {
    console.log('SVGinnerHTML function executed');
    // let SVGdiv = document.createElement('div');
    // SVGdiv.classList.add('SVGdiv');
    // `<svg height="1400" width="2800" style="background-color: white;"> </svg>`
    // svgChartDiv.appendChild(SVGdiv);
    let SVG = document.createElement('svg');
    SVG.classList.add('SVGplacemat');
    let allLines = ``;
    for (let i = 0; i < cablesArray.length; i++) {
        allLines = `${allLines} ${cablesArray[i].line}`
    }
    console.log('allLines: ');
    console.log(allLines);
    SVG.innerHTML = allLines;
    svgChartDiv.appendChild(SVG);

}




// picking MC and CC


//

// function updatePickedColors (pickedMC, pickedCC) {
//     console.log('updatePickedColors function executed')  

//     for (let i = 0; i < allMClines; i++) {
//         allMClines[i].style.stroke = `${pickedMC}`
//     }
//     for (let i = 0; i < allCClines; i++) {
//         allCClines[i].style.stroke = `${pickedCC}`
//     }
//     console.log(`MC: ${pickedMC}. CC: ${pickedCC}`);
    


// }


// function giveLinesChosenColor() {
//     pickedMC = MCpickerBtn.value; 
//     pickedCC = CCpickerBtn.value;   
//     updatePickedColors(pickedMC, pickedCC);
// }





function print () {
    window.print()
}
