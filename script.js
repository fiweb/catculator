document.addEventListener("DOMContentLoaded", function () {
  // This event listener ensures the code runs after the DOM (Document Object Model) is fully loaded.

  // --- Element Selection ---
  const calculateButton = document.getElementById("calculate");
  // Selects the HTML button element with the ID "calculate".
  const resetButton = document.getElementById("reset");
  // Selects the HTML button element with the ID "reset".
  const aInput = document.getElementById("a");
  // Selects the HTML input element with the ID "a".
  const bInput = document.getElementById("b");
  // Selects the HTML input element with the ID "b".
  const cInput = document.getElementById("c");
  // Selects the HTML input element with the ID "c".
  const dInput = document.getElementById("d");
  // Selects the HTML input element with the ID "d".
  const inputs = [aInput, bInput, cInput, dInput];
  // Creates an array containing the input elements for easier iteration.

  // --- Error Handling Functions ---
  function clearError(input) {
    // This function removes error styling and messages from an input element.
    input.classList.remove("error");
    // Removes the CSS class "error" from the input, which likely removes red borders or other visual indicators.
    const errorSpan = input.nextElementSibling;
    // Gets the next sibling element of the input. This is where the error message is inserted.
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      // Checks if the next sibling exists and if it has the class "error-message".
      errorSpan.remove();
      // Removes the error message element from the DOM.
    }
  }

  function showError(input, message) {
    // This function adds error styling and a message to an input element.
    clearError(input);
    // First, it clears any existing errors on the input.
    input.classList.add("error");
    // Adds the CSS class "error" to the input.
    const errorSpan = document.createElement("span");
    // Creates a new `<span>` element to hold the error message.
    errorSpan.classList.add("error-message");
    // Adds the class "error-message" to the `<span>`.
    errorSpan.textContent = message;
    // Sets the text content of the `<span>` to the given error message.
    input.parentNode.insertBefore(errorSpan, input.nextSibling);
    // Inserts the error message `<span>` into the DOM, right after the input element.
  }

  // --- Input Validation Function ---
  function validateInput(input, isForDivision = false) {
    // This function validates a single input field.
    clearError(input);
    // Clears any existing error messages on this input.
    if (!input.value) return true; // Use falsy check for empty string
    // If the input is empty, it's considered valid. Return true.
    if (input.value.toLowerCase() === "x") return true; // Use toLowerCase for case-insensitivity
    // If the input is "x" (case-insensitive), it's also considered valid. Return true.

    const num = parseFloat(input.value);
    // Attempts to convert the input value to a floating-point number.
    if (isNaN(num)) {
      // Checks if the conversion resulted in NaN (Not a Number).
      showError(input, "Please enter a number");
      // Shows an error message if the input is not a number.
      return false;
      // Indicate that validation failed.
    }
    if (isForDivision && num === 0) {
      // Checks if this input is used for division and if the number is 0.
      showError(input, "Cannot be zero");
      // Shows an error message for division by zero.
      return false;
      // Indicate that validation failed.
    }
    return true;
    // If all checks pass, the input is valid.
  }

  // --- Result Formatting Function ---
  function formatResult(number) {
    // This function formats a number for display.
    const formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
    // Creates a new NumberFormat object, which can format numbers based on locale.
    // undefined means it will use the browser's locale.
    // minimumFractionDigits: 0 means no digits after the decimal if it's an integer.
    // maximumFractionDigits: 1 means a maximum of 1 digit after the decimal.
    return formatter.format(number);
    // Formats the number and returns the formatted string.
  }

  // --- Main Calculation Function ---
  function calculate() {
    // This function handles the main calculation logic.
    let isCalculated = false;
    // Flag to indicate if a calculation has been performed.
    let hasError = false;
    // Flag to indicate if any errors have occurred during validation.
    let calculatedInput = null;
    // Variable to store the input element that was calculated (the one with 'x').

    inputs.forEach(clearError); // Clear errors more concisely
    // Clear any existing error messages on all input fields at the beginning.

    const a = aInput.value.toLowerCase(); //for case insensitive comparison
    const b = bInput.value.toLowerCase();
    const c = cInput.value.toLowerCase();
    const d = dInput.value.toLowerCase();
    // Get the input values (converted to lowercase).

    let result; // Declare result variable here
    // Variable to store the result of the calculation.

    //check where the 'x' is.
    if (a === "x") {
      // Check if 'a' is "x".
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(dInput, true)
      ) {
        // Validate inputs 'b', 'c', and 'd' (d is for division so cant be 0).
        result =
          (parseFloat(bInput.value) * parseFloat(cInput.value)) /
          parseFloat(dInput.value);
        // Calculate the result.
        aInput.value = formatResult(result);
        // Set the calculated value of "a" in the input, formatted.
        isCalculated = true;
        // Set the flag to true.
        calculatedInput = aInput;
        //Set the input
      } else {
        hasError = true;
        // Set the error flag.
      }
    } else if (b === "x") {
      // Check if 'b' is "x". (similar logic as above)
      if (
        validateInput(aInput) &&
        validateInput(dInput) &&
        validateInput(cInput, true)
      ) {
        result =
          (parseFloat(aInput.value) * parseFloat(dInput.value)) /
          parseFloat(cInput.value);
        bInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = bInput;
      } else {
        hasError = true;
      }
    } else if (c === "x") {
      // Check if 'c' is "x". (similar logic as above)
      if (
        validateInput(aInput) &&
        validateInput(dInput) &&
        validateInput(bInput, true)
      ) {
        result =
          (parseFloat(aInput.value) * parseFloat(dInput.value)) /
          parseFloat(bInput.value);
        cInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = cInput;
      } else {
        hasError = true;
      }
    } else if (d === "x") {
      // Check if 'd' is "x". (similar logic as above)
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(aInput, true)
      ) {
        result =
          (parseFloat(bInput.value) * parseFloat(cInput.value)) /
          parseFloat(aInput.value);
        dInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = dInput;
      } else {
        hasError = true;
      }
    } else {
      // All inputs are numbers, just validate them
      if (
        !(
          validateInput(aInput, true) &&
          validateInput(bInput) &&
          validateInput(cInput) &&
          validateInput(dInput)
        )
      ) {
        // Use De Morgan's Law. If any input is invalid, set the error flag.
        hasError = true;
      }
    }

    if (isCalculated) {
      // If a calculation has been performed...
      inputs.forEach((input) => {
        if (
          input.value &&
          input.value.toLowerCase() !== "x" &&
          !input.value.includes(".")
        ) {
          //For all input but 'x' and if they don't contain '.', format them.
          const number = parseFloat(input.value);
          input.value = formatResult(number);
        }
        input.classList.remove("calculated");
      });
      // Remove the "calculated" class from all inputs.
      calculatedInput.classList.add("calculated");
      // Add the "calculated" class to the calculated input (the one with "x" in the beginning).
    }

    if (hasError) return;
    // If there was an error, exit the function early.
  }

  // --- Event Listeners ---
  calculateButton.addEventListener("click", calculate);
  // Add a click event listener to the "calculate" button.

  inputs.forEach((input) => {
    // Iterate over all the input elements.
    input.addEventListener("keypress", function (event) {
      // Add a keypress event listener to each input.
      if (event.key === "Enter") {
        // If the pressed key is "Enter"...
        event.preventDefault();
        // Prevent the default action (form submission).
        calculate();
        // Trigger the calculate function.
      }
    });

    input.addEventListener("input", clearError.bind(null, input)); // Concise error clearing
    // Adds an input event listener to each input.
    // It clears error messages immediately when the user types something.
    // `bind(null, input)` is used to pass the input element as an argument to `clearError` when the event fires.
  });

  resetButton.addEventListener("click", function () {
    // Add a click event listener to the "reset" button.
    inputs.forEach((input) => {
      // For each input element:
      input.value = ""; // Clear the input value
      // Clear the input value.
      clearError(input);
      // Clear any existing error messages.
      input.classList.remove("calculated");
      //Remove calculated style
    });
  });

  // --- Theme Toggle ---
  const themeToggleButton = document.getElementById("theme-toggle-button");
  // Get the theme toggle button element.
  const body = document.body;
  // Get the body element.
  const themeIconContainer = themeToggleButton.querySelector(
    ".theme-icon-container"
  );
  // get the container of the icon

  const storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  // Check if a theme is stored in localStorage, otherwise check for system preference.

  function setThemeIcon(theme) {
    //set the theme svg icon
    themeIconContainer.innerHTML =
      theme === "dark"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" data-replit-metadata="client/src/components/ui/theme-toggle.tsx:18:10" data-component-name="Sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" data-replit-metadata="client/src/components/ui/theme-toggle.tsx:19:10" data-component-name="Moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
  }

  if (storedTheme) {
    // If a theme was found.
    body.classList.add(storedTheme);
    // Apply the theme class to the body.
    setThemeIcon(storedTheme);
    //set the svg icon
  }

  themeToggleButton.addEventListener("click", function () {
    // Add a click event listener to the theme toggle button.
    body.classList.toggle("dark");
    // Toggle the "dark" class on the body element.
    let theme = body.classList.contains("dark") ? "dark" : "light";
    // Determine the current theme.
    localStorage.setItem("theme", theme);
    // Store the theme in localStorage.
    setThemeIcon(theme);
    //change the svg icon
  });

  // --- Cat Icon Interaction ---
  const catIcon = document.getElementById("cat-icon");
  // Get the cat icon element.
  if (catIcon) {
    //if the element exist
    const sleepingSrc = "./icons/cat-sleeping.svg";
    // Define the path to the sleeping cat icon.
    const helloSrc = "./icons/cat-hello.svg";
    // Define the path to the hello cat icon.
    let isAnimating = false;
    // Flag to indicate if the cat icon is currently animating.

    catIcon.addEventListener("mouseenter", function () {
      // Add a mouseenter event listener to the cat icon.
      if (!isAnimating) this.src = helloSrc;
      // If not animating, change the icon to the hello version.
    });

    catIcon.addEventListener("mouseleave", function () {
      // Add a mouseleave event listener to the cat icon.
      if (!isAnimating) this.src = sleepingSrc;
      // If not animating, change the icon back to the sleeping version.
    });

    catIcon.addEventListener("click", function () {
      // Add a click event listener to the cat icon.
      isAnimating = true;
      // Set the animating flag.
      this.src = helloSrc;
      // Change the icon to the hello version.
      setTimeout(() => {
        // Set a timeout to change the icon back to sleeping after 2 seconds.
        this.src = sleepingSrc;
        // Change the icon back to sleeping.
        isAnimating = false;
        // Clear the animating flag.
      }, 2000);
    });
  }
});
