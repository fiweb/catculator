document.addEventListener("DOMContentLoaded", function () {
  // This event listener ensures the code runs after the DOM (Document Object Model) is fully loaded.

  // --- Element Selection ---
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");
  const aInput = document.getElementById("a");
  const bInput = document.getElementById("b");
  const cInput = document.getElementById("c");
  const dInput = document.getElementById("d");
  const inputs = [aInput, bInput, cInput, dInput];

  // --- Error Handling Functions ---
  function clearError(input) {
    input.classList.remove("error");
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      errorSpan.remove();
    }
  }

  function showError(input, message) {
    clearError(input);
    input.classList.add("error");
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.textContent = message;
    input.parentNode.insertBefore(errorSpan, input.nextSibling);
  }

  // --- Input Validation Function ---
  function validateInput(input, isForDivision = false) {
    clearError(input);
    if (!input.value) return true;
    if (input.value.toLowerCase() === "x") return true;

    const inputValueDotDecimal = input.value.replace(",", ".");
    const num = parseFloat(inputValueDotDecimal);

    if (isNaN(num)) {
      showError(input, "Please enter a number");
      return false;
    }
    if (isForDivision && num === 0) {
      showError(input, "Cannot be zero");
      return false;
    }
    return true;
  }

  // --- Result Formatting Function ---
  function formatResult(number) {
    if (Number.isInteger(number)) {
      return number.toString();
    } else {
      return number.toFixed(1);
    }
  }

  // --- Main Calculation Function ---
  function calculate() {
    let isCalculated = false;
    let hasError = false;
    let calculatedInput = null;

    inputs.forEach(clearError);

    const a = aInput.value.toLowerCase().replace(",", ".");
    const b = bInput.value.toLowerCase().replace(",", ".");
    const c = cInput.value.toLowerCase().replace(",", ".");
    const d = dInput.value.toLowerCase().replace(",", ".");

    let result;

    if (a === "x") {
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(dInput, true)
      ) {
        const bValue = parseFloat(bInput.value.replace(",", "."));
        const cValue = parseFloat(cInput.value.replace(",", "."));
        const dValue = parseFloat(dInput.value.replace(",", "."));
        result = (bValue * cValue) / dValue;
        aInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = aInput;
      } else {
        hasError = true;
      }
    } else if (b === "x") {
      if (
        validateInput(aInput) &&
        validateInput(dInput) &&
        validateInput(cInput, true)
      ) {
        const aValue = parseFloat(aInput.value.replace(",", "."));
        const dValue = parseFloat(dInput.value.replace(",", "."));
        const cValue = parseFloat(cInput.value.replace(",", "."));
        result = (aValue * dValue) / cValue;
        bInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = bInput;
      } else {
        hasError = true;
      }
    } else if (c === "x") {
      if (
        validateInput(aInput) &&
        validateInput(dInput) &&
        validateInput(bInput, true)
      ) {
        const aValue = parseFloat(aInput.value.replace(",", "."));
        const dValue = parseFloat(dInput.value.replace(",", "."));
        const bValue = parseFloat(bInput.value.replace(",", "."));
        result = (aValue * dValue) / bValue;
        cInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = cInput;
      } else {
        hasError = true;
      }
    } else if (d === "x") {
      if (
        validateInput(bInput) &&
        validateInput(cInput) &&
        validateInput(aInput, true)
      ) {
        const bValue = parseFloat(bInput.value.replace(",", "."));
        const cValue = parseFloat(cInput.value.replace(",", "."));
        const aValue = parseFloat(aInput.value.replace(",", "."));
        result = (bValue * cValue) / aValue;
        dInput.value = formatResult(result);
        isCalculated = true;
        calculatedInput = dInput;
      } else {
        hasError = true;
      }
    } else {
      if (
        !(
          validateInput(aInput, true) &&
          validateInput(bInput) &&
          validateInput(cInput) &&
          validateInput(dInput)
        )
      ) {
        hasError = true;
      }
    }

    if (isCalculated) {
      inputs.forEach((input) => {
        if (input.value && input.value.toLowerCase() !== "x") {
          const originalValue = input.value;
          const formattedNumber = formatResult(
            parseFloat(originalValue.replace(",", "."))
          );
          input.value = originalValue.includes(",")
            ? formattedNumber.replace(".", ",")
            : formattedNumber;
        }
        input.classList.remove("calculated");
      });
      calculatedInput.classList.add("calculated");
    }

    if (hasError) return;
  }

  // --- Event Listeners ---
  calculateButton.addEventListener("click", calculate);

  inputs.forEach((input) => {
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        calculate();
      }
    });
    input.addEventListener("input", clearError.bind(null, input));
  });

  resetButton.addEventListener("click", function () {
    inputs.forEach((input) => {
      input.value = "";
      clearError(input);
      input.classList.remove("calculated");
    });
  });

  // --- Theme Toggle ---
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
    themeIconContainer.innerHTML =
      theme === "dark"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" data-replit-metadata="client/src/components/ui/theme-toggle.tsx:18:10" data-component-name="Sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" data-replit-metadata="client/src/components/ui/theme-toggle.tsx:19:10" data-component-name="Moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
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

  // --- Cat Icon Interaction ---
  const catIcon = document.getElementById("cat-icon");
  if (catIcon) {
    const sleepingSrc = "./icons/cat-sleeping.svg";
    const helloSrc = "./icons/cat-hello.svg";
    let isAnimating = false;

    catIcon.addEventListener("mouseenter", function () {
      if (!isAnimating) this.src = helloSrc;
    });

    catIcon.addEventListener("mouseleave", function () {
      if (!isAnimating) this.src = sleepingSrc;
    });

    catIcon.addEventListener("click", function () {
      isAnimating = true;
      this.src = helloSrc;
      setTimeout(() => {
        this.src = sleepingSrc;
        isAnimating = false;
      }, 2000);
    });
  }
});
