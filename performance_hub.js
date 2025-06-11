 const display = document.getElementById('display');
const grid = document.querySelector('.button-grid');
const history = document.getElementById('history');
const calculatorBox = document.getElementById('calculator');

let expression = "";
let memory = 0;

// Buttons to be rendered
const buttons = [
  'AC', '⌫', '%', 'x²',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'M+', 'MR', 'MC', 'MS'
];

// Render buttons
buttons.forEach(label => {
  const btn = document.createElement('button');
  btn.innerText = label;
  btn.className = 'btn btn-outline-light';
  btn.onclick = (e) => handleButton(label, e); // Pass event for ripple
  grid.appendChild(btn);
});

// Main logic for handling button actions
function handleButton(label, event) {
  createRipple(event);

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
  } else if (label === 'MS') {
    // Memory Store: evaluate whole expression and store in memory
    let current;
    try {
      current = eval(expression);
    } catch {
      current = parseFloat(display.value) || 0;
    }
    memory = current;
  } else if (label === 'M+') {
    // Memory Add: evaluate expression and add to memory
    let current;
    try {
      current = eval(expression);
    } catch {
      current = parseFloat(display.value) || 0;
    }
    memory += current;
  } else if (label === 'MR') {
    // Memory Recall: append memory value to expression and display
    expression += memory.toString();
    display.value = expression;
  } else if (label === 'MC') {
    // Memory Clear: reset memory to 0
    memory = 0;
  } else {
    // Append button label to expression and update display
    expression += label;
    display.value = expression;
  }
}

// Ripple animation function
function createRipple(event) {
  const rect = calculatorBox.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Set custom CSS properties for ripple location
  calculatorBox.style.setProperty('--ripple-left', `${x}px`);
  calculatorBox.style.setProperty('--ripple-top', `${y}px`);

  // Trigger animation by toggling class
  calculatorBox.classList.add('ripple-active');

  // Remove class after animation ends
  setTimeout(() => {
    calculatorBox.classList.remove('ripple-active');
  }, 700); // match duration in CSS
}

