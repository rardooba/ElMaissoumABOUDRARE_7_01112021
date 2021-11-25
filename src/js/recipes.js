//import datas from "./datas";
//import { createGenericElt, createLinkElt } from "./utils";

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
  let ingredientsArray = "";
  recipe.ingredients.forEach((ingredient) => {
    let liEltQ = ingredient.quantity
      ? ` : </strong><span>${ingredient.quantity}`
      : `</strong>`;
    let liEltU = ingredient.unit ? ` ${ingredient.unit}</span>` : `</span>`;

    ingredientsArray += `<li><strong>${ingredient.ingredient} ${liEltQ} ${liEltU}</li>`;
  });

  return `
  <article class="recipe" id="${recipe.id}">
    <a href="index.html" title="${recipe.name}">
      <div class="recipe-img"></div>
      <div class="recipe-data">
        <header>
          <h2>${recipe.name}</h2>
          <div class="recipe-time">
            <span class="far fa-clock"></span> ${recipe.time} min
          </div>
        </header>
        <div class="recipe-category">
          <ul>
            ${ingredientsArray}
          </ul>
        </div>

        <div class="recipe-category">
          ${recipe.description}
        </div>
      </div>
    </a>
  </article>
  
`;
};

// const createRecipeElement = (recipe) => {
//   //TODO Template litterals
//   // <article class="recipe" id="1">
//   const elt = createGenericElt("article", "recipe");
//   // recup id de la data
//   elt.id = recipe.id;

//   // <a href="index.html" title="Limonade de Coco">
//   const aElt = createLinkElt("index.html", recipe.name);
//   aElt.textContent = "";

//   // <div class="recipe-img"></div>
//   const imgElt = createGenericElt("div", "recipe-img");

//   // <div class="recipe-data">
//   const dataElt = createGenericElt("div", "recipe-data");

//   // <header>
//   const headerElt = createGenericElt("header");

//   // <h2></h2>
//   const h2Elt = createGenericElt("h2");

//   // <div class="recipe-time">
//   const timeElt = createGenericElt("div", "recipe-time");

//   // <div class="recipe-category">
//   const categoryLeftElt = createGenericElt("div", "recipe-category");
//   // <div class="recipe-category">
//   const categoryRightElt = createGenericElt("div", "recipe-category");

//   const ulElt = createGenericElt("ul");
//   recipe.ingredients.forEach((ingredient) => {
//     // createIngredient(ingredient) => <li><strong>Lait de coco</strong> : <span>400</span> ml</li>
//     const liElt = createIngredient(ingredient);
//     ulElt.appendChild(liElt);
//   });

//   // <h2>Limonade de Coco</h2>
//   h2Elt.textContent = recipe.name;

//   timeElt.innerHTML = `<span class="far fa-clock"></span> ${recipe.time} min`;
//   categoryRightElt.textContent = recipe.description;

//   // Ajouts des Elt en imbrication
//   headerElt.appendChild(h2Elt);
//   headerElt.appendChild(timeElt);
//   categoryLeftElt.appendChild(ulElt);
//   dataElt.appendChild(headerElt);
//   dataElt.appendChild(categoryLeftElt);
//   dataElt.appendChild(categoryRightElt);
//   aElt.appendChild(imgElt);
//   aElt.appendChild(dataElt);
//   elt.appendChild(aElt);

//   // * Retourne la box recette
//   return elt;
// };

/**
 * * Création d'un ingrédient
 * @param   {object}  ingredient
 * @return  {node}    the created element
 */
// const createIngredient = (ingredient) => {
//   const liElt = document.createElement("li");
//   liElt.innerHTML = `<strong>${ingredient.ingredient}`;
//   liElt.innerHTML += ingredient.quantity
//     ? ` : </strong><span>${ingredient.quantity}`
//     : `</strong>`;
//   liElt.innerHTML += ingredient.unit ? ` ${ingredient.unit}</span>` : `</span>`;

//   return liElt;
// };

/**
 * Construire + afficher l'Elt dans le DOM (init)
 * @returns {void}
 */
const initializeRecipes = (data) => {
  mainContentElt.innerHTML = "";
  data.recipes.forEach((recipe) => {
    mainContentElt.innerHTML += createRecipeElement(recipe);
    const recipeElt = document.querySelector("article");
    recipeElt.style.display = "block";
  });
};

// const initializeRecipes = () => {
//   mainContentElt.innerHTML = "";
//   data.recipes.forEach((recipe) => {
//     const recipeElt = createRecipeElement(recipe);
//     recipeElt.style.display = "block";
//     mainContentElt.appendChild(recipeElt);
//   });
// };

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
 * Check if recipe is already in the DOM and remove it
 * @returns {void}
 */
//  const removeRecipeById = (recipeId) => {
//   if (document.getElementById(recipeId))
//     document.getElementById(recipeId).remove();
// };

export {
  displayAllRecipes,
  //createRecipeElement,
  //removeRecipeById,
  initializeRecipes,
};
