
const calcFieldMap = {
    walec: (input) => {
        return Math.PI * Math.pow(input.r, 2) * input.h
    },
    kula: (input) => {
        return 4 / 3 * Math.PI * Math.pow(input.r, 3);
    },
    stozek: (input) => {
        return 1 / 3 * Math.PI * Math.pow(input.r, 2) * input.h
    },
    prostopadloscian: (input) => {
        return input.r * input.h * input.a
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
}

document.querySelector("#calc").addEventListener("click", () => {
    const input = {
        r: parseInt(document.querySelector("#input-r").value),
        h: parseInt(document.querySelector("#input-h").value),
        a: parseInt(document.querySelector("#input-a").value)
    };
    const fieldFn = calcFieldMap[activeFigure.name];
    activeFigure.input = input;
    activeFigure.field = fieldFn(input);
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