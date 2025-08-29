let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = '';

buttons.forEach(element => {
    element.addEventListener('click', (b) => {

        // Button click animation
        b.target.classList.add('button-click');
        setTimeout(() => {
            b.target.classList.remove('button-click');
        }, 100);

        let value = b.target.innerText;

        if (value === '=') {
            try {
                if (string.trim() !== "" && !/[\+\-\*\/\.]$/.test(string)) { // prevent invalid eval
                    inputBox.classList.add('new-result');
                    setTimeout(() => inputBox.classList.remove('new-result'), 500);

                    string = String(eval(string));
                    inputBox.value = string;
                }
            } catch (err) {
                inputBox.classList.add('error-animation');
                inputBox.value = "Error";
                string = "";
                setTimeout(() => inputBox.classList.remove('error-animation'), 1000);
            }
        }

        else if (value === 'AC') {
            string = '';
            inputBox.value = '';
        }

        else if (value === 'DEL') {
            if (string.length > 0) {
                string = string.substring(0, string.length - 1);
                inputBox.value = string;
            }
        }

        else if (b.target.id === 'plusMinus') {
            if (string.trim() !== "" && !isNaN(string)) { // only apply to pure numbers
                string = String(-Number(string));
                inputBox.value = string;
            }
        }

        else {
            // Replace symbols for eval
            if (value === '×') value = '*';
            if (value === '÷') value = '/';

            // Highlight if number/decimal
            if (!isNaN(Number(value)) || value === '.') {
                inputBox.classList.add('number-change');
                setTimeout(() => inputBox.classList.remove('number-change'), 300);
            }

            string += value;
            inputBox.value = string;
        }
    });
});

// Initial fade-in animation
inputBox.style.opacity = 0;
setTimeout(() => {
    inputBox.value = string;
    inputBox.style.opacity = 1;
}, 200);
