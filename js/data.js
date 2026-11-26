// All recipes of the website.
// Each recipe is an object; the pages read this array and build the HTML.
// Ingredient amounts are for the number of "servings" given.
//
// Ingredient fields:
//   amount  number for the given servings
//   unit    "g", "ml", "kg", "l", "tsp", "tbsp" or "" (for countable items)
//   name    singular name (or the only name, e.g. "flour")
//   plural  (optional) plural name for countable items, e.g. "eggs"
//
// image: photo shown on the cards and on the recipe page
//        (put the file into images/recipes/ – see README.md)

const recipes = [
  {
    id: "shakshuka",
    title: "Shakshuka",
    category: "Breakfast",
    image: "images/recipes/shakshuka.jpg",
    time: 30,
    difficulty: "Easy",
    servings: 2,
    description: "Eggs gently cooked in a spicy tomato and pepper sauce.",
    ingredients: [
      { amount: 4, unit: "", name: "egg", plural: "eggs" },
      { amount: 400, unit: "g", name: "chopped tomatoes (tin)" },
      { amount: 1, unit: "", name: "red pepper", plural: "red peppers" },
      { amount: 1, unit: "", name: "onion", plural: "onions" },
      { amount: 2, unit: "", name: "garlic clove", plural: "garlic cloves" },
      { amount: 1, unit: "tsp", name: "cumin" },
      { amount: 1, unit: "tsp", name: "paprika" },
      { amount: 2, unit: "tbsp", name: "olive oil" }
    ],
    steps: [
      "Dice the onion and the pepper, chop the garlic.",
      "Heat the olive oil in a pan and fry the onion and pepper for 5 minutes.",
      "Add garlic, cumin and paprika and fry for 1 more minute.",
      "Pour in the tomatoes, add salt and let it simmer for 10 minutes.",
      "Make small holes in the sauce and crack one egg into each.",
      "Cover the pan and cook for 6–8 minutes until the egg whites are set."
    ]
  },
  {
    id: "pancakes",
    title: "Fluffy Pancakes",
    category: "Breakfast",
    image: "images/recipes/pancakes.jpg",
    time: 25,
    difficulty: "Easy",
    servings: 4,
    description: "Thick and soft pancakes for a slow weekend breakfast.",
    ingredients: [
      { amount: 200, unit: "g", name: "flour" },
      { amount: 2, unit: "tsp", name: "baking powder" },
      { amount: 2, unit: "tbsp", name: "sugar" },
      { amount: 2, unit: "", name: "egg", plural: "eggs" },
      { amount: 250, unit: "ml", name: "milk" },
      { amount: 30, unit: "g", name: "melted butter" }
    ],
    steps: [
      "Mix flour, baking powder, sugar and a pinch of salt in a bowl.",
      "Whisk eggs, milk and melted butter in a second bowl.",
      "Pour the wet mixture into the dry one and stir only until combined.",
      "Heat a non-stick pan on medium heat.",
      "Add one small ladle of batter per pancake and cook until bubbles appear.",
      "Flip and cook for one more minute. Serve with fruit or honey."
    ]
  },
  {
    id: "couscous",
    title: "Vegetable Couscous",
    category: "Main dish",
    image: "images/recipes/couscous.jpg",
    time: 50,
    difficulty: "Medium",
    servings: 4,
    description: "Fluffy couscous with a fragrant vegetable and chickpea stew.",
    ingredients: [
      { amount: 300, unit: "g", name: "couscous" },
      { amount: 2, unit: "", name: "carrot", plural: "carrots" },
      { amount: 2, unit: "", name: "courgette", plural: "courgettes" },
      { amount: 1, unit: "", name: "onion", plural: "onions" },
      { amount: 400, unit: "g", name: "chickpeas (tin)" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
      { amount: 2, unit: "tbsp", name: "tomato paste" },
      { amount: 1, unit: "tsp", name: "ras el hanout" },
      { amount: 750, unit: "ml", name: "vegetable stock" }
    ],
    steps: [
      "Cut all vegetables into large pieces.",
      "Heat the olive oil in a pot and fry the onion, then add tomato paste and ras el hanout.",
      "Add carrots and stock and cook for 15 minutes.",
      "Add courgettes and chickpeas and cook for 10 more minutes.",
      "Pour boiling water over the couscous (same volume), cover for 5 minutes.",
      "Fluff the couscous with a fork and serve with the vegetable stew."
    ]
  },
  {
    id: "tomato-pasta",
    title: "Creamy Tomato Pasta",
    category: "Main dish",
    image: "images/recipes/tomato-pasta.jpg",
    time: 20,
    difficulty: "Easy",
    servings: 2,
    description: "A quick weekday pasta with a creamy tomato sauce.",
    ingredients: [
      { amount: 200, unit: "g", name: "pasta" },
      { amount: 200, unit: "g", name: "cherry tomatoes" },
      { amount: 1, unit: "tbsp", name: "olive oil" },
      { amount: 100, unit: "ml", name: "cream" },
      { amount: 2, unit: "", name: "garlic clove", plural: "garlic cloves" },
      { amount: 30, unit: "g", name: "parmesan" },
      { amount: 1, unit: "", name: "handful of fresh basil", plural: "handfuls of fresh basil" }
    ],
    steps: [
      "Cook the pasta in salted water.",
      "Halve the tomatoes and fry them with the garlic in the olive oil for 5 minutes.",
      "Add the cream and let it cook for 2 minutes.",
      "Mix the drained pasta with the sauce.",
      "Serve with parmesan and fresh basil."
    ]
  },
  {
    id: "lentil-soup",
    title: "Red Lentil Soup",
    category: "Soup",
    image: "images/recipes/lentil-soup.jpg",
    time: 35,
    difficulty: "Easy",
    servings: 4,
    description: "A warming, budget-friendly soup with lemon and cumin.",
    ingredients: [
      { amount: 250, unit: "g", name: "red lentils" },
      { amount: 1, unit: "", name: "onion", plural: "onions" },
      { amount: 1, unit: "", name: "carrot", plural: "carrots" },
      { amount: 1, unit: "tbsp", name: "olive oil" },
      { amount: 1, unit: "tsp", name: "cumin" },
      { amount: 1, unit: "l", name: "vegetable stock" },
      { amount: 1, unit: "", name: "lemon", plural: "lemons" }
    ],
    steps: [
      "Dice the onion and carrot and fry them in the olive oil in a pot for 5 minutes.",
      "Add the cumin and the rinsed lentils.",
      "Pour in the stock and cook for 20 minutes.",
      "Blend the soup until smooth.",
      "Season with salt and lemon juice."
    ]
  },
  {
    id: "mug-cake",
    title: "Chocolate Mug Cake",
    category: "Dessert",
    image: "images/recipes/mug-cake.jpg",
    time: 5,
    difficulty: "Easy",
    servings: 1,
    description: "A warm chocolate cake made in a mug in the microwave.",
    ingredients: [
      { amount: 4, unit: "tbsp", name: "flour" },
      { amount: 3, unit: "tbsp", name: "sugar" },
      { amount: 2, unit: "tbsp", name: "cocoa powder" },
      { amount: 3, unit: "tbsp", name: "milk" },
      { amount: 2, unit: "tbsp", name: "oil" },
      { amount: 1, unit: "", name: "egg", plural: "eggs" }
    ],
    steps: [
      "Mix flour, sugar and cocoa in a large mug.",
      "Add milk, oil and egg and stir until smooth.",
      "Microwave for about 90 seconds at 800 W (one mug at a time).",
      "Let it cool for one minute and enjoy."
    ]
  },
  {
    id: "fruit-salad",
    title: "Mint Fruit Salad",
    category: "Dessert",
    image: "images/recipes/fruit-salad.jpg",
    time: 15,
    difficulty: "Easy",
    servings: 4,
    description: "Fresh seasonal fruit with honey, lime and mint.",
    ingredients: [
      { amount: 250, unit: "g", name: "strawberries" },
      { amount: 2, unit: "", name: "kiwi", plural: "kiwis" },
      { amount: 1, unit: "", name: "mango", plural: "mangoes" },
      { amount: 1, unit: "", name: "lime", plural: "limes" },
      { amount: 1, unit: "tbsp", name: "honey" },
      { amount: 5, unit: "", name: "fresh mint leaf", plural: "fresh mint leaves" }
    ],
    steps: [
      "Wash and cut all fruit into bite-sized pieces.",
      "Mix lime juice and honey.",
      "Pour the dressing over the fruit and stir gently.",
      "Add chopped mint and chill for 10 minutes."
    ]
  },
  {
    id: "tomato-soup",
    title: "Roasted Tomato Soup",
    category: "Soup",
    image: "images/recipes/tomato-soup.jpg",
    time: 45,
    difficulty: "Medium",
    servings: 4,
    description: "Oven-roasted tomatoes blended into a rich, smooth soup.",
    ingredients: [
      { amount: 1, unit: "kg", name: "tomatoes" },
      { amount: 1, unit: "", name: "onion", plural: "onions" },
      { amount: 3, unit: "", name: "garlic clove", plural: "garlic cloves" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
      { amount: 500, unit: "ml", name: "vegetable stock" }
    ],
    steps: [
      "Heat the oven to 200 °C.",
      "Halve the tomatoes, quarter the onion and put both on a tray with the garlic.",
      "Drizzle with olive oil and roast for 30 minutes.",
      "Put everything in a pot with the stock and blend until smooth.",
      "Season with salt and pepper."
    ]
  }
];

// CSS class for the coloured card background of each category.
// It is also what you see if a photo is missing.
const categoryClasses = {
  "Breakfast": "bg-breakfast",
  "Main dish": "bg-main",
  "Soup": "bg-soup",
  "Dessert": "bg-dessert"
};
