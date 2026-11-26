# Recipe Corner – Recipe Website (HTML, CSS, JavaScript)

> A responsive recipe website with search, category filter, servings calculator and a validated contact form. No server and no frameworks needed – it runs directly in the browser.

## Origin

Based on a repository by [ranim699](https://github.com/ranim699).

## Features

- **Home page** with three featured recipes and a "Meet the chef" section with a photo of Ranim
- **Real photos** on the recipe cards and recipe pages (if a photo file is missing, a soft coloured box is shown instead of a broken image)
- **Recipe list** with live search (by name or ingredient) and category filter (Breakfast, Main dish, Soup, Dessert)
- **Recipe detail page** – the recipe is chosen through the URL (`recipe.html?id=shakshuka`)
- **Servings calculator** – ingredient amounts are recalculated when you change the number of servings (cookbook fractions like ½ and ¾, correct singular/plural, g → kg and ml → l)
- **Step checklist** – tick off each preparation step while cooking
- **Print view** – the "Print recipe" button prints only ingredients and steps
- **Contact form** with client-side validation (name, email format, message length)
- **Responsive layout** – 1 column on phones, 2 on tablets, 3 on desktops (mobile first)
- **Accessibility** – skip link, labels, visible focus, `aria` attributes, reduced-motion support

## Tech stack

| Technology | Used for |
|---|---|
| HTML5 | Semantic page structure (`header`, `nav`, `main`, `section`, `article`, `footer`) |
| CSS3 | Custom design without a framework: CSS variables, Flexbox, CSS Grid, media queries |
| JavaScript (vanilla) | DOM manipulation, events, array methods (`filter`, `map`, `find`), URL parameters, form validation |

## Project structure

```
Rezept-Website-HTML-CSS/
├── index.html      Home page
├── recipes.html    All recipes with search and filter
├── recipe.html     Recipe detail page
├── contact.html    Contact form
├── css/
│   └── style.css   Complete design
├── images/
│   ├── chef-ranim.jpg   Photo of the chef (home page)
│   ├── favicon.svg      Browser tab icon
│   └── recipes/         One photo per recipe (see "Recipe photos")
└── js/
    ├── data.js     All recipes as an array of objects
    └── main.js     Page logic (one function per feature)
```

## How to run

**Option 1:** open `index.html` in your browser (double-click).

**Option 2 (recommended, like a real web server):**

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

**For editing:** VS Code with the *Live Server* extension.

## Recipe photos

The recipe photos are **not included** in this folder. Put one photo per recipe into `images/recipes/` using exactly these file names. Until a file exists, the site shows a coloured box with the category name.

| File name | Search term (free photos) |
|---|---|
| `shakshuka.jpg` | https://unsplash.com/s/photos/shakshuka |
| `pancakes.jpg` | https://unsplash.com/s/photos/pancakes |
| `couscous.jpg` | https://unsplash.com/s/photos/couscous |
| `tomato-pasta.jpg` | https://unsplash.com/s/photos/tomato-pasta |
| `lentil-soup.jpg` | https://unsplash.com/s/photos/lentil-soup |
| `mug-cake.jpg` | https://unsplash.com/s/photos/chocolate-cake |
| `fruit-salad.jpg` | https://unsplash.com/s/photos/fruit-salad |
| `tomato-soup.jpg` | https://unsplash.com/s/photos/tomato-soup |

Tips: use landscape photos (about 1200 × 800 px, 3:2), save them as JPG and keep each file below 300 KB. Pexels (https://www.pexels.com) and Unsplash allow free use, but check the licence of every photo you download.

## How to add a recipe

Add a new object to the `recipes` array in `js/data.js`:

```js
{
  id: "my-recipe",              // used in the URL
  title: "My Recipe",
  category: "Dessert",          // Breakfast, Main dish, Soup or Dessert
  image: "images/recipes/my-recipe.jpg",  // photo, see "Recipe photos"
  time: 20,                     // minutes
  difficulty: "Easy",
  servings: 2,
  description: "Short description.",
  ingredients: [
    { amount: 100, unit: "g", name: "sugar" },                // g, ml, kg, l, tsp, tbsp
    { amount: 2, unit: "", name: "egg", plural: "eggs" }      // countable: singular + plural
  ],
  steps: ["First step.", "Second step."]
}
```

The recipe then appears automatically on the recipes page. The `id` and the photo file name should match (`my-recipe` → `my-recipe.jpg`).

## Known limitations

- There is no server, so the contact form does not send anything – it only shows a confirmation.
- Recipes are stored in `data.js` and cannot be added through the website.

## Ideas for next steps

- Favourites: mark recipes with a heart and save them in `localStorage`
- Sort by cooking time, add a "vegetarian" filter
- Connect the contact form to a service such as Formspree
- Load recipes from a database (Node.js + SQL)
