document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");
  const aInput = document.getElementById("a");
  const bInput = document.getElementById("b");
  const cInput = document.getElementById("c");
  const dInput = document.getElementById("d");
  const inputs = [aInput, bInput, cInput, dInput]; // Array of input elements

  function clearError(input) {
    input.classList.remove("error");
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      errorSpan.remove();
    }
  }

  function showError(input, message) {
    clearError(input); // Clear any previous error

    input.classList.add("error");
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.textContent = message;
    input.parentNode.insertBefore(errorSpan, input.nextSibling); // Insert after input
  }
  function validateInput(input, isForDivision = false) {
    clearError(input);
    if (input.value.length === 0) {
      return;
    }
    if (input.value === "x" || input.value === "X") {
      return;
    }
    if (isNaN(parseFloat(input.value))) {
      showError(input, "Invalid number");
      return false;
    }
    if (isForDivision && parseFloat(input.value) === 0) {
      showError(input, "Cannot be zero");
      return false;
    }
    return true;
  }

  function calculate() {
    let isCalculated = false;
    let hasError = false;
    let calculatedInput = null;
    clearError(aInput);
    clearError(bInput);
    clearError(cInput);
    clearError(dInput);
    const a = aInput.value;
    const b = bInput.value;
    const c = cInput.value;
    const d = dInput.value;

    if (a === "x" || a === "X") {
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(dInput, true)
      ) {
        aInput.value = ((b * c) / d).toFixed(1);
        isCalculated = true;
        calculatedInput = aInput;
      } else {
        hasError = true;
      }
    } else if (b === "x" || b === "X") {
      if (
        validateInput(aInput) &&
        validateInput(dInput) &&
        validateInput(cInput, true)
      ) {
        bInput.value = ((a * d) / c).toFixed(1);
        isCalculated = true;
        calculatedInput = bInput;
      } else {
        hasError = true;
      }
    } else if (c === "x" || c === "X") {
      if (
        validateInput(aInput) &&
        validateInput(dInput) &&
        validateInput(bInput, true)
      ) {
        cInput.value = ((a * d) / b).toFixed(1);
        isCalculated = true;
        calculatedInput = cInput;
      } else {
        hasError = true;
      }
    } else if (d === "x" || d === "X") {
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(aInput, true)
      ) {
        dInput.value = ((b * c) / a).toFixed(1);
        isCalculated = true;
        calculatedInput = dInput;
      } else {
        hasError = true;
      }
    } else {
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(aInput, true) &&
        validateInput(dInput)
      ) {
        hasError = false;
      } else {
        hasError = true;
      }
    }

    if (isCalculated) {
      inputs.forEach((input) => {
        if (
          input.value.length > 0 &&
          input.value !== "x" &&
          input.value !== "X" &&
          !input.value.includes(".")
        ) {
          input.value = parseFloat(input.value).toFixed(1);
        }
        input.classList.remove("calculated");
      });
      calculatedInput.classList.add("calculated");
    }
    if (hasError) {
      return;
    }
  }

  calculateButton.addEventListener("click", calculate);

  // Listen for 'Enter' key press on all input elements
  inputs.forEach((input) => {
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        calculate();
      }
    });

    input.addEventListener("input", function () {
      clearError(input);
    });
  });

  resetButton.addEventListener("click", function () {
    aInput.value = "";
    bInput.value = "";
    cInput.value = "";
    dInput.value = "";
    // clear all errors
    inputs.forEach((input) => {
      clearError(input);
      input.classList.remove("calculated");
    });
  });

  const themeToggleButton = document.getElementById("theme-toggle-button");
  const body = document.body;
  const themeIconContainer = themeToggleButton.querySelector(
    ".theme-icon-container"
  );
  const storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  function setThemeIcon(theme) {
    if (theme === "dark") {
      themeIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" data-replit-metadata="client/src/components/ui/theme-toggle.tsx:18:10" data-component-name="Sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
    } else {
      themeIconContainer.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" data-replit-metadata="client/src/components/ui/theme-toggle.tsx:19:10" data-component-name="Moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
    }
  }

  if (storedTheme) {
    body.classList.add(storedTheme);
    setThemeIcon(storedTheme);
  }

  themeToggleButton.addEventListener("click", function () {
    body.classList.toggle("dark");
    let theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    setThemeIcon(theme);
  });

  // Cat icon hover and click functionality
  const catIcon = document.getElementById("cat-icon");
  if (catIcon) {
    const sleepingSrc = "./icons/cat-sleeping.svg";
    const helloSrc = "./icons/cat-hello.svg";
    let isAnimating = false;

    // For desktop devices (hover)
    catIcon.addEventListener("mouseenter", function () {
      if (!isAnimating) {
        this.src = helloSrc;
      }
    });

    catIcon.addEventListener("mouseleave", function () {
      if (!isAnimating) {
        this.src = sleepingSrc;
      }
    });

    // For both desktop and mobile (click/tap)
    catIcon.addEventListener("click", function () {
      // Set animating flag to prevent hover effects during timeout
      isAnimating = true;

      // Make sure the hello cat is shown (in case not already shown by hover)
      this.src = helloSrc;

      // Switch back after delay and restore hover capability
      setTimeout(() => {
        this.src = sleepingSrc;
        isAnimating = false;
      }, 2000);
    });
  }
});
