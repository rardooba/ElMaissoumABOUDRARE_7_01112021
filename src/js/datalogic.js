import state from "./state";

import { normalizeText } from "./utils";

// Var type: ing/app/ust
const ingType = "ing";
const appType = "app";
const ustType = "ust";

/**
 * Recup d'une liste de tous les ingr provenant de toutes les recettes
 * * (line 72) > state.displayedIng = getAllIngredients();
 * @return  {array}    liste de tous les ingr de type object > 0: {type: 'ing', name: 'lait de coco'}... 1: {type: 'ing', name..}
 */
const getAllIngredients = (data) => {
  let ingredients = [];

  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      if (!ingredients.includes(ing.ingredient.toLowerCase()))
        ingredients.push(ing.ingredient.toLowerCase());
    });
  });

  return ingredients.map((ing) => ({
    type: ingType,
    name: ing,
  }));
};

/**
 * Recup d'une liste de tous les appareils provenant de toutes les recettes
 * @return  {array}    the list of appliances
 */
const getAllAppliances = (data) => {
  let appliances = [];
  data.recipes.forEach((recipe) => {
    if (!appliances.includes(recipe.appliance.toLowerCase()))
      appliances.push(recipe.appliance.toLowerCase());
  });
  return appliances.map((app) => ({
    type: appType,
    name: app,
  }));
};

/**
 * Recup d'une liste de tous les ustensils provenant de toutes les recettes
 * @return  {array}    the list of ustensils
 */
const getAllUstensils = (data) => {
  let ustensils = [];
  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil.toLowerCase()))
        ustensils.push(ustensil.toLowerCase());
    });
  });
  return ustensils.map((ust) => ({
    type: ustType,
    name: ust,
  }));
};

/**
 * Recup d'une liste de toutes les ids des recettes 
 * @return  {array}    the list of ids [1, 2, 3, 4, 5, ... 50]
 */
const getAllRecipeIds = (data) => {
  return data.recipes.map((elt) => elt.id);
};

/**
 * Initialisation des state avec toutes les datas
 * @returns {void}
 */
const initializeState = (data) => {
  state.displayedIng = getAllIngredients(data); // [{type: 'ing', name: 'lait de coco'}...]
  state.displayedApp = getAllAppliances(data);
  state.displayedUst = getAllUstensils(data);
  state.displayedRecipes = getAllRecipeIds(data); // list of ids [1, 2, 3, 4, 5, ... 50]
  state.ingObj = getIngredientsObject(data); // {ail: [26, 29, 30]...  searchByTag() > search.js
  state.appObj = getAppliancesObject(data);
  state.ustObj = getUstensilsObject(data);
};

/**
 * Recup tous les ingr d'une recette dans une string unique
 * * search.js (line 45) on y vérifie la correspondance avec la valeur de l'input searchByInput()
 * @param   {object} recipe
 * @returns {string}
 */
const getIngredientsStringFromRecipe = (recipe) => {
  let ingredientsString = "";
  recipe.ingredients.forEach((ing) => {
    ingredientsString += ` ${normalizeText(ing.ingredient)}`;
  });
  return ingredientsString;
  // lait de coco jus de citron creme de coco sucre glacons
};

/**
 * Recup une liste de tous les ingr de toutes les recettes avec toutes les ids en rapport
 * @param   {array}  tagList  the array of all ingredients = state.displayedIng
 * @return  {object}
 */
const createTagObject = (tagList) => {
  let tagObj = {};
  tagList.forEach((tag) => (tagObj[normalizeText(tag.name)] = []));

  return tagObj;
  // log = {ail: []}
};

/**
 * * Recup un obj avec tous les nom d'ingr + les différents id de leur recette => {ail: [26, 29, 30]...
 * utiliser pour initialiser state.ingObj
 * @return  {object}
 */
const getIngredientsObject = (data) => {
  let ingredientsObject = createTagObject(getAllIngredients(data));
  // log = ail: (3) [26, 29, 30]
  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((elt) => {
      const objKey = normalizeText(elt.ingredient);
      ingredientsObject[objKey].push(recipe.id);
    });
  });
  
  return ingredientsObject;
};

/**
 * 
 * @return  {object}
 */
const getAppliancesObject = (data) => {
  let appliancesObject = createTagObject(getAllAppliances(data));

  data.recipes.forEach((recipe) => {
    const objKey = normalizeText(recipe.appliance);
    appliancesObject[objKey].push(recipe.id);
  });

  return appliancesObject;
};

/**
 * 
 * @return  {object}
 */
const getUstensilsObject = (data) => {
  let ustensilsObject = createTagObject(getAllUstensils(data));

  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((elt) => {
      const objKey = normalizeText(elt);
      ustensilsObject[objKey].push(recipe.id);
    });
  });

  return ustensilsObject;
};


/**
 * Recup all data de la recette via l'id
 * utilisé dans displayRemainingTags() > search.js
 * log = [ 0:{…}, 1:{…}, 2:{…}, 3:{…}, ..]
 * idsArray = [1, 3, 2, 26, 30, 35]
 * @return  {array}
 */
const getFullRecipesFromIds = (idsArray, data) => {
  // recup les data en fonction des id dans l'array
  // 0: {id: 1, name: 'Limonade de Coco', servings: 1, ingredients: Array(5), time: 10, …}
  return data.recipes.filter((recipe) => idsArray.includes(recipe.id));
};

export {
  initializeState,
  getIngredientsStringFromRecipe,
  getFullRecipesFromIds,
  getAllRecipeIds,
};
