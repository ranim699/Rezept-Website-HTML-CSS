// ==========================================================
// Recipe Corner – main script
// Every page loads this file. Each function first checks
// whether its HTML element exists on the current page.
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  showFeaturedRecipes();
  setupRecipeList();
  showRecipeDetail();
  setupContactForm();
  showCurrentYear();
  hideBrokenImages(document);
});

// ---------- Navigation (mobile menu button) ----------

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  function setOpen(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));

  // Escape closes the menu and gives the focus back to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// ---------- Photos: if a photo file is missing, the coloured box stays ----------

function hideBrokenImages(root) {
  root.querySelectorAll("img[data-photo]").forEach((img) => {
    const hide = () => img.classList.add("is-broken");
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide(); // already failed
  });
}

// ---------- Ingredient amounts: nice numbers, units and plural ----------

const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

// Round to the nearest quarter and write it like a cookbook: ¼, ½, 1½, 2 ...
function formatQuarters(value) {
  const rounded = Math.max(0.25, Math.round(value * 4) / 4);
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  const text = (whole > 0 ? String(whole) : "") + (fraction > 0 ? FRACTIONS[fraction] : "");
  return { text, value: rounded };
}

// g/ml: switch to kg/l from 1000 and round to useful steps
function formatMetric(value, unit) {
  let amount = value;
  let shownUnit = unit;
  if (unit === "kg") { amount *= 1000; shownUnit = "g"; }
  if (unit === "l") { amount *= 1000; shownUnit = "ml"; }

  if (amount >= 1000) {
    const big = Math.round((amount / 1000) * 100) / 100; // e.g. 1.25
    return `${big} ${shownUnit === "g" ? "kg" : "l"}`;
  }
  let rounded;
  if (amount < 10) rounded = Math.round(amount * 10) / 10;
  else if (amount < 50) rounded = Math.round(amount);
  else rounded = Math.round(amount / 5) * 5;
  return `${rounded} ${shownUnit}`;
}

// Returns the text of one ingredient line for a given factor
function formatIngredient(ing, factor) {
  const amount = ing.amount * factor;

  if (["g", "ml", "kg", "l"].includes(ing.unit)) {
    return `${formatMetric(amount, ing.unit)} ${ing.name}`;
  }

  const quarters = formatQuarters(amount);
  if (ing.unit === "") {
    // Countable item: "1 egg", "½ onion", "2 eggs"
    const name = quarters.value > 1 && ing.plural ? ing.plural : ing.name;
    return `${quarters.text} ${name}`;
  }
  // Spoons and other units: "¼ tsp cumin", "1½ tbsp honey"
  return `${quarters.text} ${ing.unit} ${ing.name}`;
}

// ---------- Building a recipe card ----------

// Small clock icon (inline SVG, takes the text colour)
const CLOCK_ICON = `<svg class="icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

function photoHtml(recipe, alt) {
  return `<img data-photo src="${recipe.image}" alt="${alt}" width="800" height="533" loading="lazy">`;
}

function createRecipeCard(recipe) {
  const link = `recipe.html?id=${recipe.id}`;
  const article = document.createElement("article");
  article.className = "card";
  article.innerHTML = `
    <a class="card-image ${categoryClasses[recipe.category]}" href="${link}" tabindex="-1" aria-hidden="true" data-label="${recipe.category}">
      ${photoHtml(recipe, "")}
    </a>
    <div class="card-body">
      <span class="tag">${recipe.category}</span>
      <h3><a class="card-title-link" href="${link}">${recipe.title}</a></h3>
      <p>${recipe.description}</p>
      <div class="card-meta">
        <span>${CLOCK_ICON}${recipe.time} min</span>
        <span>${recipe.difficulty}</span>
      </div>
      <a class="btn" href="${link}">View recipe</a>
    </div>
  `;
  return article;
}

// ---------- Home page: three featured recipes ----------

function showFeaturedRecipes() {
  const container = document.getElementById("featured-recipes");
  if (!container) return;

  const featuredIds = ["shakshuka", "couscous", "mug-cake"];
  featuredIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean) // ignore ids that do not exist (typo-safe)
    .forEach((recipe) => container.appendChild(createRecipeCard(recipe)));
}

// ---------- Recipes page: search and category filter ----------

function setupRecipeList() {
  const container = document.getElementById("recipe-list");
  if (!container) return;

  const searchInput = document.getElementById("search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const emptyMessage = document.getElementById("empty-message");
  const resultCount = document.getElementById("result-count");
  let activeCategory = "All";

  function render() {
    const searchText = searchInput.value.trim().toLowerCase();

    const filtered = recipes.filter((recipe) => {
      const matchesCategory = activeCategory === "All" || recipe.category === activeCategory;
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchText) ||
        recipe.ingredients.some(
          (ing) =>
            ing.name.toLowerCase().includes(searchText) ||
            (ing.plural && ing.plural.toLowerCase().includes(searchText))
        );
      return matchesCategory && matchesSearch;
    });

    container.innerHTML = "";
    filtered.forEach((recipe) => container.appendChild(createRecipeCard(recipe)));
    hideBrokenImages(container);

    emptyMessage.hidden = filtered.length > 0;
    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "recipe" : "recipes"} found`;
  }

  searchInput.addEventListener("input", render);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      activeCategory = button.dataset.category;
      render();
    });
  });

  render();
}

// ---------- Recipe page: details, servings calculator, steps ----------

function showRecipeDetail() {
  const container = document.getElementById("recipe-detail");
  if (!container) return;

  // Read the id from the address, e.g. recipe.html?id=shakshuka
  const id = new URLSearchParams(window.location.search).get("id");
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    container.innerHTML = `
      <div class="recipe-header">
        <h1>Recipe not found</h1>
        <p><a href="recipes.html">Back to all recipes</a></p>
      </div>`;
    return;
  }

  document.title = `${recipe.title} – Recipe Corner`;
  const MIN_SERVINGS = 1;
  const MAX_SERVINGS = 12;
  let servings = recipe.servings;

  container.innerHTML = `
    <div class="recipe-header">
      <div class="recipe-photo ${categoryClasses[recipe.category]}" data-label="${recipe.category}">
        ${photoHtml(recipe, recipe.title)}
      </div>
      <span class="tag">${recipe.category}</span>
      <h1>${recipe.title}</h1>
      <p>${recipe.description}</p>
      <div class="recipe-facts">
        <span>${CLOCK_ICON}${recipe.time} minutes</span>
        <span>Difficulty: ${recipe.difficulty}</span>
        <button type="button" class="print-btn" id="print-btn">Print recipe</button>
      </div>
    </div>
    <div class="recipe-layout">
      <section class="panel" aria-labelledby="ingredients-title">
        <h2 id="ingredients-title">Ingredients</h2>
        <div class="servings">
          <button type="button" id="less" aria-label="Fewer servings">−</button>
          <span><strong id="servings-count" aria-live="polite">${servings}</strong> servings</span>
          <button type="button" id="more" aria-label="More servings">+</button>
        </div>
        <ul class="ingredient-list" id="ingredient-list"></ul>
        <p class="note">Salt, pepper and water are not listed.</p>
      </section>
      <section class="panel" aria-labelledby="steps-title">
        <h2 id="steps-title">Preparation</h2>
        <ol class="step-list">
          ${recipe.steps
            .map((step, i) => `
              <li>
                <label>
                  <input type="checkbox">
                  <span><strong>Step ${i + 1}:</strong> ${step}</span>
                </label>
              </li>`)
            .join("")}
        </ol>
      </section>
    </div>
  `;

  const list = document.getElementById("ingredient-list");
  const count = document.getElementById("servings-count");
  const lessButton = document.getElementById("less");
  const moreButton = document.getElementById("more");

  function renderIngredients() {
    count.textContent = servings;
    lessButton.disabled = servings <= MIN_SERVINGS;
    moreButton.disabled = servings >= MAX_SERVINGS;

    // Scale every amount to the chosen number of servings
    const factor = servings / recipe.servings;
    list.innerHTML = recipe.ingredients
      .map((ing) => `<li>${formatIngredient(ing, factor)}</li>`)
      .join("");
  }

  lessButton.addEventListener("click", () => {
    if (servings > MIN_SERVINGS) {
      servings--;
      renderIngredients();
    }
  });

  moreButton.addEventListener("click", () => {
    if (servings < MAX_SERVINGS) {
      servings++;
      renderIngredients();
    }
  });

  document.getElementById("print-btn").addEventListener("click", () => window.print());

  renderIngredients();
}

// ---------- Contact page: form validation ----------

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMessage = document.getElementById("success-message");

  function setError(input, message) {
    const group = input.closest(".form-group");
    group.classList.toggle("has-error", message !== "");
    group.querySelector(".error-text").textContent = message;
    input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // there is no server, so we handle the form here
    successMessage.hidden = true;

    const name = form.elements["name"];
    const email = form.elements["email"];
    const message = form.elements["message"];
    let valid = true;

    if (name.value.trim().length < 2) {
      setError(name, "Please enter your name.");
      valid = false;
    } else {
      setError(name, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      valid = false;
    } else {
      setError(email, "");
    }

    if (message.value.trim().length < 10) {
      setError(message, "Your message should have at least 10 characters.");
      valid = false;
    } else {
      setError(message, "");
    }

    if (valid) {
      successMessage.hidden = false;
      successMessage.textContent = `Thank you, ${name.value.trim()}! Your message has been received.`;
      form.reset();
    } else {
      // Move the focus to the first field with a problem
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
    }
  });
}

// ---------- Footer year ----------

function showCurrentYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}
