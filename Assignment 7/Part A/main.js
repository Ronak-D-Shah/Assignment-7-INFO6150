$(document).ready(function () {
  const $email = $("#email");
  const $username = $("#username");
  const $password = $("#password");
  const $confirmPassword = $("#confirm-password");
  const $loginButton = $("#login-button");
  const $emailError = $("#email-error");
  const $usernameError = $("#username-error");
  const $passwordError = $("#password-error");
  const $confirmPasswordError = $("#confirm-password-error");

  $loginButton.prop("disabled", true);

  $email.on("input", function () {
    const emailValue = $email.val();
    const isNortheasternEmail = emailValue.endsWith("@northeastern.edu");

    if (emailValue === "") {
      $emailError.text("Email cannot be empty");
    } else if (!isNortheasternEmail) {
      $emailError.text("Email must be a northeastern.edu email address");
    } else {
      $emailError.text("");
    }
    validateLoginButton();
  });

  $username.on("input", function () {
    const usernameValue = $username.val();
    const isValid = /^[a-zA-Z0-9]+$/.test(usernameValue);

    if (usernameValue === "") {
      $usernameError.text("Username cannot be empty");
    } else if (!isValid) {
      $usernameError.text("Username can only contain alphanumeric characters");
    } else {
      $usernameError.text("");
    }
    validateLoginButton();
  });

  $password.on("input", validatePassword);
  $confirmPassword.on("input", validatePassword);

  function validatePassword() {
    const passwordValue = $password.val();
    const confirmPasswordValue = $confirmPassword.val();

    if (passwordValue === "") {
      $passwordError.text("Password cannot be empty");
    } else if (passwordValue.length < 8) {
      $passwordError.text("Password must be at least 8 characters long");
    } else if (
      confirmPasswordValue !== "" &&
      passwordValue !== confirmPasswordValue
    ) {
      $passwordError.text("Passwords do not match");
    } else {
      $passwordError.text("");
    }
    validateLoginButton();
  }

  function validateLoginButton() {
    const emailValue = $email.val();
    const usernameValue = $username.val();
    const passwordValue = $password.val();
    const confirmPasswordValue = $confirmPassword.val();

    $loginButton.prop(
      "disabled",
      emailValue === "" ||
        usernameValue === "" ||
        passwordValue === "" ||
        confirmPasswordValue === "" ||
        $emailError.text() !== "" ||
        $usernameError.text() !== "" ||
        $passwordError.text() !== "" ||
        $confirmPasswordError.text() !== ""
    );
  }

  $loginButton.click(function (e) {
    e.preventDefault();
    const usernameValue = $username.val();

    localStorage.setItem("username", usernameValue);

    window.location.href = "index.html";
  });
});
