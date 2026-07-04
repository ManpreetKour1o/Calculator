const display = document.getElementById("display");
const history = document.getElementById("history");
const themeBtn = document.getElementById("themeBtn");

let expression = "";

// Add value to display
function append(value) {
    expression += value;
    display.value = expression;
}

// Clear everything
function clearDisplay() {
    expression = "";
    display.value = "";
    history.innerHTML = "";
}

// Delete last character
function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression;
}

// Calculate answer
function calculate() {

    if (expression === "") return;

    try {

        let exp = expression.replace(/%/g, "/100");

        let answer = eval(exp);

        history.innerHTML = expression + " =";

        display.value = answer;

        expression = answer.toString();

    } catch {

        display.value = "Error";

        expression = "";

        setTimeout(() => {
            display.value = "";
            history.innerHTML = "";
        }, 1500);

    }

}

// Keyboard Support
document.addEventListener("keydown", function (e) {

    if ((e.key >= "0" && e.key <= "9") ||
        ["+", "-", "*", "/", ".", "%"].includes(e.key)) {

        append(e.key);

    }

    else if (e.key === "Enter") {

        e.preventDefault();

        calculate();

    }

    else if (e.key === "Backspace") {

        deleteLast();

    }

    else if (e.key === "Escape") {

        clearDisplay();

    }

});

// Dark / Light Theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});