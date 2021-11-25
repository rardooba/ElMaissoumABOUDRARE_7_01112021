import datas from "./datas";
import { initializeState } from "./datalogic";
import { initializeFilters } from "./filters";
import { initializeRecipes } from "./recipes";
import { manageSearchInput } from "./search";

import "../style/main.scss";

/**
 * Initialize the app
 */
initializeState(datas);
initializeFilters();
initializeRecipes(datas);

/**
 * Add listener on search bar
 */
const searchBarElt = document.getElementById("search-bar");
searchBarElt.addEventListener("input", manageSearchInput);
