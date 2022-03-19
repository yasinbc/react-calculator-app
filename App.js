import "./App.css";
import React from "react";

const Calculator = () => {
  const [finished, setFinished] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [display, setDisplay] = React.useState("0");
  const [zero, setZero] = React.useState(false);

  const clear = () => {
    setInput("");
    setDisplay("0");
    setZero(false);
  };

  const reverseSign = () => {
    const reversed = Number(display) * -1;
    setDisplay(reversed);
  };

  const addToDisplay = (val) => {
    if (finished) {
      setFinished(false);
      setInput("");
      setDisplay(val);
      return;
    } else if (display.length >= 15) {
      return;
    } else if (val === "0" && display === "0") {
      return;
    }

    let newValue;
    const isDecimal = display.toString().indexOf(".") > 0;

    if ((val === "." && !isDecimal) || (val === "0" && isDecimal)) {
      newValue = display + val;
    } else {
      newValue = display + val;
      newValue = Number(newValue).toString();
    }

    if (isNaN(newValue)) {
      return;
    }
    setDisplay(newValue);
  };

  const addToInput = (operator) => {
    if (finished) {
      const val = `${display} ${operator}`;
      setFinished(false);
      setInput(val);
      setDisplay("0");
      return;
    }

    let inputValue;
    const inputLastValue = input[input.length - 1];

    if (/(\+|-|\*|\/)/.test(inputLastValue) && !zero && display === "0") {
      inputValue = input.slice(0, input.length - 1) + operator;
    } else {
      let displayVal = Number(display).toString();

      if (Number(displayVal) < 0) displayVal = `(${displayVal})`;

      if (!input) {
        inputValue = `${displayVal} ${operator}`;
      } else {
        inputValue = `${input} ${displayVal} ${operator}`;
      }
    }

    if (zero) {
      setZero(false);
    }
    setDisplay("0");
    setInput(inputValue);
  };

  const showResult = () => {
    if (!input || finished) {
      return;
    }

    let inputValues;
    if (zero) {
      inputValues = `${input} 0`;
    } else if (!zero && display === "0") {
      inputValues = input.slice(0, -2);
    } else {
      inputValues = `${input} ${display}`;
    }

    const inputsArray = inputValues.replace(/[()]/g, "").split(" ");

    // Main calculate function
    // Takes an array
    // First calculates multiply and divide then calculates addition and subtraction
    const calculate = (arr) => {
      // First do calculate on multiply or divide
      for (let i = 0; arr.includes("*") || arr.includes("/"); ) {
        if (arr[i] === "*" || arr[i] === "/") {
          let val1 = Number(arr[i - 1]);
          let val2 = Number(arr[i + 1]);
          let total = 0;
          if (arr[i] === "*") {
            total = Number((val1 * val2).toFixed(9));
          } else if (arr[i] === "/") {
            total = Number((val1 / val2).toFixed(9));
          }
          arr = arr
            .slice(0, i - 1)
            .concat(total)
            .concat(arr.slice(i + 2));
        } else {
          i++;
        }
      }
      // Then do calculate on add or subtract
      for (let i = 0; arr.includes("+") || arr.includes("-"); ) {
        if (arr[i] === "+" || arr[i] === "-") {
          let val1 = Number(arr[i - 1]);
          let val2 = Number(arr[i + 1]);
          let total = 0;
          if (arr[i] === "+") {
            total = val1 + val2;
          } else if (arr[i] === "-") {
            total = val1 - val2;
          }
          arr = arr
            .slice(0, i - 1)
            .concat(total)
            .concat(arr.slice(i + 2));
        } else {
          i++;
        }
      }
      return arr[0];
    };

    const result = calculate(inputsArray);
    const newInputValue = `${inputValues} = ${result}`;
    setFinished(true);
    setInput(newInputValue);
    setDisplay(result);
  };

  let result = (
    <div className="calculator">
      <div id="inputs">{input}</div>
      <div id="display">{display}</div>
      <div className="operators">
        <button id="add" onClick={addToInput.bind(this, "+")}>
          +
        </button>
        <button id="subtract" onClick={addToInput.bind(this, "-")}>
          -
        </button>
        <button id="multiply" onClick={addToInput.bind(this, "*")}>
          *
        </button>
        <button id="divide" onClick={addToInput.bind(this, "/")}>
          /
        </button>
      </div>
      <div className="numbers">
        <button id="seven" onClick={addToDisplay.bind(this, "7")}>
          7
        </button>
        <button id="eight" onClick={addToDisplay.bind(this, "8")}>
          8
        </button>
        <button id="nine" onClick={addToDisplay.bind(this, "9")}>
          9
        </button>
        <button id="four" onClick={addToDisplay.bind(this, "4")}>
          4
        </button>
        <button id="five" onClick={addToDisplay.bind(this, "5")}>
          5
        </button>
        <button id="six" onClick={addToDisplay.bind(this, "6")}>
          6
        </button>
        <button id="one" onClick={addToDisplay.bind(this, "1")}>
          1
        </button>
        <button id="two" onClick={addToDisplay.bind(this, "2")}>
          2
        </button>
        <button id="three" onClick={addToDisplay.bind(this, "3")}>
          3
        </button>
        <button id="zero" onClick={addToDisplay.bind(this, "0")}>
          0
        </button>
        <button id="decimal" onClick={addToDisplay.bind(this, ".")}>
          .
        </button>
      </div>
      <div className="controllers">
        <button id="clear" onClick={clear}>
          AC
        </button>
        <button id="sign" onClick={reverseSign}>
          ±
        </button>
        <button id="equals" onClick={showResult}>
          =
        </button>
      </div>
    </div>
  );

  return result;
};

const App = () => {
  return (
    <div className="App main-container">
      <Calculator />
      {/* <div id="container">
        <div id="display">
          <h3>123456789</h3>
        </div>
        <div id="buttons">
          <button id="clear">AC</button>
          <button id="divide">/</button>
          <button id="multiply">x</button>
          <button id="subtract">-</button>
          <button id="add">+</button>
          <button id="equals">=</button>
          <button id="seven">7</button>
          <button id="eight">8</button>
          <button id="nine">9</button>
          <button id="four">4</button>
          <button id="five">5</button>
          <button id="six">6</button>
          <button id="one">1</button>
          <button id="two">2</button>
          <button id="three">3</button>
          <button id="zero">0</button>
          <button id="decimal">.</button>
        </div>
      </div> */}
    </div>
  );
};

export default App;
