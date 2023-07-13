export const mockApiDrinkIngredients = () => Promise.resolve({
  json: () => Promise.resolve({
    drinks: [
      {
        strDrink: 'Yoghurt Cooler',
        strDrinkThumb:
              'https://www.thecocktaildb.com/images/media/drink/trttrv1441254466.jpg',
        idDrink: '12728',
      },
    ],
  }),
});
