export const drinksCategories = () => Promise.resolve({
  json: () => Promise.resolve({
    drinks: [
      { strCategory: 'Ordinary Drink' },
      { strCategory: 'Cocktail' },
      { strCategory: 'Shake' },
      { strCategory: 'Other / Unknown' },
      { strCategory: 'Cocoa' },
      { strCategory: 'Shot' },
      { strCategory: 'Coffee / Tea' },
      { strCategory: 'Homemade Liqueur' },
      { strCategory: 'Punch / Party Drink' },
      { strCategory: 'Beer' },
      { strCategory: 'Soft Drink' },
    ],
  }),
});
export const mealsCategories = () => Promise.resolve({
  json: () => Promise.resolve({
    meals: [
      { strCategory: 'Beef' },
      { strCategory: 'Breakfast' },
      { strCategory: 'Chicken' },
      { strCategory: 'Dessert' },
      { strCategory: 'Goat' },
      { strCategory: 'Lamb' },
      { strCategory: 'Miscellaneous' },
      { strCategory: 'Pasta' },
      { strCategory: 'Pork' },
      { strCategory: 'Seafood' },
      { strCategory: 'Side' },
      { strCategory: 'Starter' },
      { strCategory: 'Vegan' },
      { strCategory: 'Vegetarian' },
    ],
  }),
});
