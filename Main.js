const calcFieldMap = {
    walec: {
        inputs: ['r', 'h'],
        formula: (input) => {
            return Math.PI * Math.pow(input.r, 2) * input.h
        }
    },
    kula: {
        inputs: ['r'],
        formula: (input) => {
            return 4 / 3 * Math.PI * Math.pow(input.r, 3);
        }
    },
    stozek: {
        inputs: ['r', 'h'],
        formula: (input) => {
            return 1 / 3 * Math.PI * Math.pow(input.r, 2) * input.h
        }
    },
    prostopadloscian: {
        inputs: ['a', 'b', 'c'],
        formula: (input) => {
            return input.a * input.b * input.c
        }
    }
};

var activeFigure = {
    name: '',
    input: {},
    field: 0
};

function figureSelectionHandler(event) {
    activeFigure.name = event.target.getAttribute('data-figure');
    document.querySelector("#selected-figure").innerHTML = activeFigure.name;
    document.querySelector(".calculator").style.display = "block";
    document.querySelectorAll(".figure-type").forEach((item) => {
        item.hidden = true
    });
    document.querySelector("." + activeFigure.name).hidden = false;
}

function calculateHandler(event) {
    event.preventDefault();
    const formulaFn = calcFieldMap[activeFigure.name].formula;
    const inputs = calcFieldMap[activeFigure.name].inputs;

    const data = {};
    inputs.forEach(param => {
        data[param] = parseInt(document.querySelector("." + activeFigure.name + " .input-" + param).value)
    });

    activeFigure.input = data;
    activeFigure.field = formulaFn(data);
    const dataKeys = Object.keys(data);
    const listItems = dataKeys.map(key => `<li>${key} = ${data[key]}</li>`);
    document.querySelector("#selected-figure-input").innerHTML = `Wprowadzone wymiary:<ul>${listItems.join(" ")}</ul>`;
    document.querySelector("#selected-figure-field").innerText = activeFigure.field;
    inputs.forEach((param) => {
        document.querySelector("." + activeFigure.name + " .input-" + param).value = '';
    });
}

document.querySelector(".submit").addEventListener("click", calculateHandler);

const images = document.querySelectorAll('.menu>li>img');
images.forEach(image => image.addEventListener("click", figureSelectionHandler));
