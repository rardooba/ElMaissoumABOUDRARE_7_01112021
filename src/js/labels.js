import datas from "./datas";
import state from "./state";
import { completeSearch } from "./search";
import { createGenericElt, normalizeText } from "./utils";

/**
 * Dom Variables
 */
const labelsElt = document.getElementById("labels");

/**
 * * Création d'un Elt Label
 * @param   {string}   type  ing, app or ust
 * @param   {string}   name  the label's name
 * @return  {node}
 */
const createLabel = (type, name) => {
  // <button class="label ing" type="button">lait de coco<span class="far fa-times-circle"></span></button>
  const elt = createGenericElt("button", `label ${type}`);
  elt.setAttribute("type", "button");
  const iconElt = createGenericElt("span", "far fa-times-circle");
  iconElt.addEventListener("click", removeFilter(type, name));
  elt.textContent = name;
  elt.appendChild(iconElt);

  return elt;
};

/**
 * usine pour créer la div qui va contenir un label <div> + injection de chaque label dans la balise <#labels>
 * @param   {array}   labelsList  the list of labels to create
 * @param   {string}  type  ing, app or ust
 * @return  {node}
 */
const createLabels = (labelsList, type) => {
  const elt = document.createElement("div");
  labelsList.forEach((label) => {
    const labelElt = createLabel(type, label);
    elt.appendChild(labelElt);
  });
  return elt;
};

/**
 * Ajout de tous les labels dans <div class="labels" id="labels">
 * @return  {void}
 */
const createAllLabels = () => {
  labelsElt.innerHTML = "";
  labelsElt.appendChild(createLabels(state.ingLabels, "ing"));
  labelsElt.appendChild(createLabels(state.appLabels, "app"));
  labelsElt.appendChild(createLabels(state.ustLabels, "ust"));
};

/**
 * Supprimer un label
 * @param   {string}  type  ing, app or ust
 * @param   {string}  name  the label's name
 * @return  {node}
 */
const removeFilter = (type, name) => {
  return function (evt) {
    evt.preventDefault();
    const formattedName = normalizeText(name);
    

    if (type === "ing")
      state.ingLabels = state.ingLabels.filter((elt) => formattedName !== elt);
    if (type === "app")
      state.appLabels = state.appLabels.filter((elt) => formattedName !== elt);
    if (type === "ust")
      state.ustLabels = state.ustLabels.filter((elt) => formattedName !== elt);
    createAllLabels();
    // étapes de la recherche de correspondance
    completeSearch(datas);
  };
};

export { createAllLabels };
