// accordions:

let accArray;

window.onload = init();

function init() {
    console.log('page loaded, the DOM is ready');
    getDOMelements ();
}

function getDOMelements () {

    
    accArray = document.getElementsByClassName('accordion');
    console.log(accArray); 
   
    accordions (); 
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