import { createGenericElt, createLinkElt } from "./utils";
/**
 * * DOM Variables
 */
const mainContentElt = document.getElementById("recipes");

/**
 * Création d'une recette
 * @param   {object}  recipe
 * @return  {node}    the created element
 */
 const createRecipeElement = (recipe) => {
  const elt = createGenericElt("article", "recipe");
  elt.id = recipe.id;
  const aElt = createLinkElt("index.html", recipe.name);
  aElt.textContent = "";
  const imgElt = createGenericElt("div", "recipe-img");
  const dataElt = createGenericElt("div", "recipe-data");
  const headerElt = createGenericElt("header");
  const h2Elt = createGenericElt("h2");
  const timeElt = createGenericElt("div", "recipe-time");
  const categoryLeftElt = createGenericElt("div", "recipe-category");
  const categoryRightElt = createGenericElt("div", "recipe-category");

  const ulElt = createGenericElt("ul");
  recipe.ingredients.forEach((ingredient) => {
    const liElt = createIngredient(ingredient);
    ulElt.appendChild(liElt);
  });

  h2Elt.textContent = recipe.name;
  timeElt.innerHTML = `<span class="far fa-clock"></span> ${recipe.time} min`;
  categoryRightElt.textContent = recipe.description;

  headerElt.appendChild(h2Elt);
  headerElt.appendChild(timeElt);
  categoryLeftElt.appendChild(ulElt);
  dataElt.appendChild(headerElt);
  dataElt.appendChild(categoryLeftElt);
  dataElt.appendChild(categoryRightElt);
  aElt.appendChild(imgElt);
  aElt.appendChild(dataElt);
  elt.appendChild(aElt);
  elt.style.display = "block";

  return elt;
};

/**
 * Create single ingredient
 * @param   {object}  ingredient
 * @return  {node}    the created element
 */
const createIngredient = (ingredient) => {
  const liElt = document.createElement("li");
  liElt.innerHTML = `<strong>${ingredient.ingredient}`;
  liElt.innerHTML += ingredient.quantity
    ? ` : </strong><span>${ingredient.quantity}`
    : `</strong>`;
  liElt.innerHTML += ingredient.unit ? ` ${ingredient.unit}</span>` : `</span>`;

  return liElt;
};

/**
 * Construire + afficher l'Elt dans le DOM (init)
 * @returns {void}
 */
const initializeRecipes = (data) => {
  mainContentElt.innerHTML = "";
  data.recipes.forEach((recipe) => {
    const recipeElt = createRecipeElement(recipe);
    recipeElt.style.display = "block";
    mainContentElt.appendChild(recipeElt);
  });
};

/**
 * Afficher les recettes dans le DOM
 * @returns {void}
 */
const displayAllRecipes = (data) => {
  data.recipes.forEach((recipe) => {
    const recipeToDisplay = document.getElementById(recipe.id);
    recipeToDisplay.style.display = "block";
  });
};

/**
 * ! V2 algo for loop
 * supprime les recettes inutiles du DOM
 * @returns {void}
 */
 const removeRecipeById = (recipeId) => {
  if (document.getElementById(recipeId))
    document.getElementById(recipeId).remove();
};

export {
  displayAllRecipes,
  createRecipeElement,
  removeRecipeById,
  initializeRecipes,
};
