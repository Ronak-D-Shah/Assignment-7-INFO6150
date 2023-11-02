$(document).ready(function () {
  const storedUsername = localStorage.getItem("username");

  $("#logged-username").text(storedUsername);

  const $loggedUsername = $("#logged-username");
  const $number1 = $("#number1");
  const $number2 = $("#number2");
  const $number1Error = $("#number1-error");
  const $number2Error = $("#number2-error");
  const $result = $("#result");

  $result.text("-");
  $number1Error.text("");
  $number2Error.text("");

  $number1.on("input", function () {
    validateNumberInput($number1, $number1Error);
  });

  $number2.on("input", function () {
    validateNumberInput($number2, $number2Error);
  });

  function validateNumberInput(inputField, errorField) {
    const value = inputField.val();
    if (!value) {
      errorField.text("Field cannot be empty");
    } else if (!$.isNumeric(value)) {
      errorField.text("Only numbers are allowed");
    } else {
      errorField.text("");
    }
  }

  const calculate = (operation) => {
    const num1 = parseFloat($number1.val());
    const num2 = parseFloat($number2.val());

    if (!isNaN(num1) && !isNaN(num2)) {
      $result.text(doCalculation(num1, num2, operation).toFixed(2));
    } else {
      $result.text("Invalid input");
    }
  };

  function doCalculation(num1, num2, operation) {
    switch (operation) {
      case "add":
        return num1 + num2;
      case "subtract":
        return num1 - num2;
      case "multiply":
        return num1 * num2;
      case "divide":
        if (num2 !== 0) {
          return num1 / num2;
        } else {
          return "Cannot divide by zero";
        }
      default:
        return 0;
    }
  }

  $("#add-button").click(() => calculate("add"));
  $("#subtract-button").click(() => calculate("subtract"));
  $("#multiply-button").click(() => calculate("multiply"));
  $("#divide-button").click(() => calculate("divide"));
});
