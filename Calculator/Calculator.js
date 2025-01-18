var a = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'];

document.addEventListener('DOMContentLoaded', function() {
    let table = document.querySelector('table');
    let row = document.createElement('tr');

    a.forEach(function(value, i) {
        if (i === 12) {
            let button = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'reset';
            input.value = 'C';
            input.onclick = clearDisplay;
            button.appendChild(input);
            row.appendChild(button);
        } else if (i === 14) {
            let button = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'button';
            input.value = '=';
            input.onclick = calculateResult;
            button.appendChild(input);
            row.appendChild(button);
        } else {
            let button = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'button';
            input.value = value;
            input.onclick = function() {
                appendToDisplay(value);
            };
            button.appendChild(input);
            row.appendChild(button);
        }

        if ((i + 1) % 4 === 0 && i !== a.length - 1) {
            table.appendChild(row);
            row = document.createElement('tr');
        }
    });

    table.appendChild(row);
});

function appendToDisplay(value) {
    document.cal.get.value += value;
}

function clearDisplay() {
    document.cal.get.value = '';
}

function calculateResult() {
    let expression = document.cal.get.value;
    try {
        let result = eval(expression);
        document.cal.get.value = result;
        storeHistory(expression + ' = ' + result);
    } catch (e) {
        document.cal.get.value = 'Error';
    }
}
function storeHistory(calculation) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.unshift(calculation);

    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem('history', JSON.stringify(history));

    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    let historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';

    let ul = document.createElement('ul');
    history.forEach(function(item) {
        let li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    historyContainer.appendChild(ul);
}

window.onload = function() {
    displayHistory();
};
