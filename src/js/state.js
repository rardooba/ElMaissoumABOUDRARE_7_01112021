let state = {
  // type object => type: ing, name: nom de l'ing 
  // * datalogic.js > (line 8) getAllIngredients()
  displayedIng: [],
  displayedApp: [],
  displayedUst: [],

  // all id's recipes
  // * datalogic.js > (line ) getAllRecipeIds()
  displayedRecipes: [],

  // ['lait de coco', ...]
  ingLabels: [],
  appLabels: [],
  ustLabels: [],
  
  // evt.target.value or input value
  currentSearch: "",

  ingObj: {},
  appObj: {},
  ustObj: {},
};

export default state;
