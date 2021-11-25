import datas from "./datas";
import state from "./state";
import {
  getIngredientsStringFromRecipe,
  getFullRecipesFromIds,
  getAllRecipeIds,
} from "./datalogic";
import { normalizeText } from "./utils";
import {
  getVisibleFilters,
  createFilterElt,
  clearAllFilters,
  getAllFiltersLength,
} from "./filters";
import {
  //createRecipeElement,
  //removeRecipeById,
  displayAllRecipes, 
  //initializeRecipes,
} from "./recipes";

/**
 * {ALGO} Gérer les conditions de recherche
 * @param   {object} evt browser event
 * @returns {void}
 */
const manageSearchInput = (evt) => {
  evt.preventDefault();
  // * stocker la valeur de l'input renseigné par l'user
  state.currentSearch = evt.target.value;
  completeSearch(datas);
};

/**
 * Recherche de recette via l'input
 * @returns {void}
 */
const searchByInput = (data) => {
  // recup la valeur de l'input
  const value = state.currentSearch;
  // all id's recipes
  state.displayedRecipes = [];

  if (value.length > 2) {
    data.recipes.forEach((recipe) => {
      const recipeToDisplay = document.getElementById(recipe.id);
      if (
        normalizeText(recipe.name).includes(normalizeText(value)) ||
        normalizeText(recipe.description).includes(normalizeText(value)) ||
        getIngredientsStringFromRecipe(recipe).includes(normalizeText(value))
      ) {
        recipeToDisplay.style.display = "block";
        state.displayedRecipes.push(recipe.id);
      } else {
        recipeToDisplay.style.display = "none";
      }
    });
  } else {
    data.recipes.forEach((recipe) => {
      const recipeToDisplay = document.getElementById(recipe.id);
      recipeToDisplay.style.display = "block";
    });
  }
};

// ! V2 Algo for loop
// const searchByInput = () => {
//   const mainContentElt = document.getElementById("main-content");
//   const value = state.currentSearch;
//   state.displayedRecipes = [];

//   if (value.length > 2) {
//     //inclus toutes les recettes dont les titres ne match pas avec la valeur de l'input
//     let recipesFromTitle = [];
//     let recipesFromDescription = [];

//     for (let i = 0; i < data.recipes.length; i++) {
//       if (normalizeText(data.recipes[i].name).includes(normalizeText(value))) {
//         //(Elt) > supprime/ajoute dans le DOM/ajoute dans l'array l'id 
//         removeRecipeById(data.recipes[i].id);
//         mainContentElt.appendChild(createRecipeElement(data.recipes[i]));
//         state.displayedRecipes.push(data.recipes[i].id);
//       } else {
//         recipesFromTitle.push(data.recipes[i]);
//         removeRecipeById(data.recipes[i].id);
//       }
//     }
//     for (let i = 0; i < recipesFromTitle.length; i++) {
//       if (normalizeText(recipesFromTitle[i].description).includes(normalizeText(value))) {
//         removeRecipeById(recipesFromTitle[i].id);
//         mainContentElt.appendChild(createRecipeElement(recipesFromTitle[i]));
//         state.displayedRecipes.push(recipesFromTitle[i].id);
//       } else {
//         recipesFromDescription.push(recipesFromTitle[i]);
//         removeRecipeById(recipesFromTitle[i].id);
//       }
//     }

//     for (let i = 0; i < recipesFromDescription.length; i++) {
//       if (
//         getIngredientsStringFromRecipe(recipesFromDescription[i]).includes(normalizeText(value))
//       ) {
//         removeRecipeById(recipesFromDescription[i].id);
//         mainContentElt.appendChild(createRecipeElement(recipesFromDescription[i]));
//         state.displayedRecipes.push(recipesFromDescription[i].id);
//       } else {
//         removeRecipeById(recipesFromDescription[i].id);
//       }
//     }
//   } else {
//     mainContentElt.innerHTML = "";
//   }
// };

/**
 * Recherche de recette via les filtres
 * @returns {void}
 */
const searchByTag = (data) => {
  const {
    ingLabels,
    appLabels,
    ustLabels,
    displayedRecipes,
    ingObj,
    appObj,
    ustObj,
    currentSearch,
  } = state;

  let arrayOfRecipes = displayedRecipes;
  //log = []

  if (currentSearch.length < 3 && getAllFiltersLength() > 0) {
    // getAllRecipeIds() contient un array avec toutes les id recettes
    arrayOfRecipes = getAllRecipeIds(data);
    // Affiche toutes les recettes via l'id
    displayAllRecipes(data);
    // ! v2 algo fro loop
    //initializeRecipes();
  }

  arrayOfRecipes.forEach((idRecipe) => {
    // recup le bloc recette <article></article>
    const displayedRecipe = document.getElementById(idRecipe);

    // filtrage par correspondance d'ing
    ingLabels.forEach((ing) => {
      if (!ingObj[ing].includes(idRecipe))
        displayedRecipe.style.display = "none";
    });

    appLabels.forEach((app) => {
      if (!appObj[app].includes(idRecipe))
        displayedRecipe.style.display = "none";
    });

    ustLabels.forEach((ust) => {
      if (!ustObj[ust].includes(idRecipe))
        displayedRecipe.style.display = "none";
    });
  });
};

/**
 * Afficher les filtres des recettes affichées
 * @returns {void}
 */
const displayRemainingTags = (data) => {
  let recipesToConsider = [];

  if (state.currentSearch.length < 3 && getAllFiltersLength() === 0) {
    recipesToConsider = data.recipes;
    // (50) [{id: 1, name: 'Limonade de Coco', servings: 1, ingredients: Array(5), time: 10, …}, {}]
  } else {
    const allRecipes = document.querySelectorAll("#recipes article");
    const visileRecipesIds = Array.from(allRecipes)
    .filter((elt) => elt.style.display === "block")
    .map((elt) => parseInt(elt.id));
    recipesToConsider = getFullRecipesFromIds(visileRecipesIds, datas);
    // getFullRecipesFromIds() affiche les datas en fonction de l'id > (6)[{…}, {…}, {…}, {…}, {…}, {…}]
  }

  clearAllFilters();
  recipesToConsider.forEach((recipe) => displayFiltersFromRecipes(recipe));
};

/**
 * Afficher tous les filtres inclus dans les recettes affichées
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayFiltersFromRecipes = (recipe) => {
  displayIngredientsFromRecipe(recipe);
  displayAppliancesFromRecipe(recipe);
  displayUstensilsFromRecipe(recipe);
};

/**
 * Afficher les filtres d'ingrédients inclus dans les recettes affichées
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayIngredientsFromRecipe = (recipe) => {
  const ingListElt = document.getElementById("ingredient-list");
  const visibleIngFilters = getVisibleFilters("ingredient");

  recipe.ingredients.forEach((ing) => {
    if (!visibleIngFilters.includes(ing.ingredient.toLowerCase()))
      ingListElt.appendChild(
        createFilterElt("ing", ing.ingredient.toLowerCase())
      );
  });
};

/**
 *Afficher les filtres d'appareils inclus dans les recettes affichées
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayAppliancesFromRecipe = (recipe) => {
  const appListElt = document.getElementById("appareil-list");
  const visibleAppFilters = getVisibleFilters("appareil");

  if (!visibleAppFilters.includes(recipe.appliance.toLowerCase()))
    appListElt.appendChild(
      createFilterElt("app", recipe.appliance.toLowerCase())
    );
};

/**
 * Afficher les filtres d'ustensils inclus dans les recettes affichées
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayUstensilsFromRecipe = (recipe) => {
  const ustListElt = document.getElementById("ustensil-list");
  const visibleUstFilters = getVisibleFilters("ustensil");

  recipe.ustensils.forEach((ust) => {
    if (!visibleUstFilters.includes(ust.toLowerCase()))
      ustListElt.appendChild(createFilterElt("ust", ust.toLowerCase()));
  });
};

/**
 * Message en cas de resultat null
 * @returns {void}
 */
const checkSearchResults = () => {
  const allRecipes = document.querySelectorAll("#recipes article");
  const mainContentElt = document.getElementById("result");
  const hiddenRecipes = Array.from(allRecipes).filter(
    (elt) => elt.style.display === "none"
  );

  if (hiddenRecipes.length === 50) {
    mainContentElt.textContent =
      `Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.
      `;
  } else {
    mainContentElt.textContent = "";
  }
};

/**
 * All search steps
 * @returns {void}
 */
const completeSearch = (data) => {
  searchByInput(data);
  searchByTag(data);
  displayRemainingTags(data);
  checkSearchResults;
};

export { manageSearchInput, completeSearch };
