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

function clickListener(event) {
    activeFigure.name = event.target.getAttribute('data-figure');
    document.querySelector("#selected-figure").innerHTML = activeFigure.name;
    document.querySelector(".calculator").style.display = "block";
    document.querySelector("div." + activeFigure.name).style.display = "block";
}

document.querySelector("#calc").addEventListener("click", () => {
    const formulaFn = calcFieldMap[activeFigure.name].formula;
    const inputs = calcFieldMap[activeFigure.name].inputs;

    // TODO instead of hardcoded inputs (as below), read inputs from figure object
    const input = {
        r: parseInt(document.querySelector("#input-r").value),
        h: parseInt(document.querySelector("#input-h").value),
        a: parseInt(document.querySelector("#input-a").value)
    };

    activeFigure.input = input;
    activeFigure.field = formulaFn(input);
    document.querySelector("#selected-figure-input").innerHTML = `Wprowadzone wymiary:<ul> <li>r = ${activeFigure.input.r}</li> <li>h = ${activeFigure.input.h}</li> <li>a = ${activeFigure.input.a}</li></ul>`;
    document.querySelector("#selected-figure-field").innerText = activeFigure.field;
    document.querySelector("#input-r").value = '';
    document.querySelector("#input-h").value = '';
    document.querySelector("#input-a").value = '';
});

var buttons = document.querySelectorAll('.menu button');
buttons.forEach(function (button) {
    button.addEventListener("click", clickListener)
})
