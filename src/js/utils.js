/**
 * usine de création d'Elt < Tag + Class /> dans le DOM
 * @param   {string}  eltTag     tag's name
 * @param   {string}  eltClass   tag's class
 * @return  {node}
 */
const createGenericElt = (eltTag, eltClass = null) => {
  const elt = document.createElement(eltTag);
  if (eltClass) elt.className = eltClass;
  return elt;
};

/**
 * usine de création d'Elt de lien <a + Class + title>+Txt</a>
 * @param   {string}  eltHref     link to go
 * @param   {string}  eltContent  content to display
 * @param   {string}  eltClass    tag's class
 * @return  {node}
 */
const createLinkElt = (eltHref, eltContent, eltClass = null) => {
  const elt = createGenericElt("a", eltClass);
  elt.setAttribute("href", eltHref);
  elt.setAttribute("title", eltContent);
  elt.textContent = eltContent;
  return elt;
};

/**
 * version normalisée du text
 * @param   {string}  text  text => normalize
 * @return  {string}
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    //encodeage UTF8 + séparation des caractères spéciaux
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export { createGenericElt, createLinkElt, normalizeText };
