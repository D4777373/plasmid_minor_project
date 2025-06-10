 const display = document.getElementById('display');
const grid = document.querySelector('.button-grid');
const history = document.getElementById('history');

let expression = "";
let memory = 0;

// Buttons to be rendered
const buttons = [
  'AC', '⌫', '%', 'x²',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'M+'
];

// Render buttons
buttons.forEach(label => {
  const btn = document.createElement('button');
  btn.innerText = label;
  btn.className = 'btn btn-outline-light';
  btn.onclick = () => handleButton(label);
  grid.appendChild(btn);
});

// Handle button logic
function handleButton(label) {
  if (label === 'AC') {
    expression = "";
    display.value = "";
  } else if (label === '⌫') {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (label === '=') {
    try {
      const result = eval(expression);
      history.innerHTML += `<div>${expression} = ${result}</div>`;
      display.value = result;
      expression = result.toString();
    } catch {
      display.value = "Error";
    }
  } else if (label === 'x²') {
    expression += '**2';
    display.value = expression;
  } else if (label === 'M+') {
    memory = parseFloat(display.value) || 0;
  } else {
    expression += label;
    display.value = expression;
  }
}
