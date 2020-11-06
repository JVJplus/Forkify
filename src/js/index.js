import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as likesView from "./views/likesView";
import * as listView from "./views/listView";
import * as base from "./views/base";
import * as search from "./models/search";
import * as recipe from "./models/recipe";
import * as list from "./models/list";
import * as likes from "./models/likes";

let state = {};

/* -------------------------------------------------------------------------- */
/*                              SEARCH CONTROLLER                             */
/* -------------------------------------------------------------------------- */

function handlePaginationButtons(recipes) {
    // dynamic content select karise kare? using event deligation
    base.elements.resultsPages.addEventListener("click", (e) => {
        // multiple elements pe event kaise dale? using closest method
        const btn = e.target.closest(".btn-inline");
        // if its on dom
        if (btn) {
            searchView.clearPreviousResults();
            const goToPage = parseInt(btn.dataset.goto);
            searchView.addItemsToResults(recipes, goToPage);
        }
    });
}

async function handleSearchDatas(input) {
    // remove previous datas

    searchView.showLoader(base.elements.results);

    state.search = new search.Search(input);
    const recipes = await state.search.getData();
    // remove loader
    searchView.clearLoader();

    if (!recipes) {
        // if invalid query as per API
        return;
    }

    // add items in dom
    searchView.addItemsToResults(recipes);
    handlePaginationButtons(recipes);
}

function handleSearch(e) {
    // prevent get method!
    e.preventDefault();
    const input = searchView.getInput();

    if (input) {
        // remove current input
        base.elements.searchInput.value = "";
        searchView.clearPreviousResults();
        // fetch data and process
        handleSearchDatas(input);
    }
}

/* -------------------------------------------------------------------------- */
/*                              RECIPE CONTROLLER                             */
/* -------------------------------------------------------------------------- */

async function addRecipe(e) {
    // add reciepes on dom
    const hash = location.hash.replace("#", "");
    if (hash) {
        // clear previous
        recipeView.clearRecipe();
        if (await state.search) {
            searchView.highlightSelected(hash);
        }
        state.recipe = new recipe.Recipe(hash);
        await state.recipe.getRecipe();
        recipeView.renderRecipe(state.recipe,state.likes?state.likes.isLiked(hash):0);
    }
}

function handleRecipe(e) {
    if (e.target.matches(".btn-decrease, .btn-decrease *")) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings("dec");
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches(".btn-increase, .btn-increase *")) {
        // Increase button is clicked
        state.recipe.updateServings("inc");
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
        // Add To Recipe
        if(!state.list)
            state.list = new list.List();
        state.recipe.ingredients.forEach((el) => {
            const item = state.list.addItem(el);
            listView.addItem(item);
        });
    } else if(e.target.closest('.recipe__love')){
        // control likes
        handleLikes();
    }
}

/* -------------------------------------------------------------------------- */
/*                               List Controller                              */
/* -------------------------------------------------------------------------- */
function handleListView(e) {
    const id = e.target.closest(".shopping__item").dataset.itemid;
    if (e.target.closest(".shopping__delete")) {
        // Delte List Item
        listView.deleteItem(id);
        state.list.deleteItem(id);
    } else if (e.target.matches(".shopping__count-value")) {
        // Change Count Value
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
}

/* -------------------------------------------------------------------------- */
/*                              Likes Controller                              */
/* -------------------------------------------------------------------------- */

function handleLikes() {
    const id=state.recipe.id;
    if(!state.likes)
        state.likes=new likes.Likes();

    if(!state.likes.isLiked(id)){
        // Add Like 
        const ele=state.likes.addItem(id,state.recipe.img,state.recipe.title,state.recipe.author);
        likesView.toggleLikeBtn(true);
        likesView.addItem(ele);
    }
    else{
        // Remove Like
        state.likes.removeItem(id);
        likesView.toggleLikeBtn(false);
        likesView.removeItem(id);
    }

    likesView.toggleLikeMenu(state.likes.noOfLikes());
}

/* -------------------------------------------------------------------------- */
function main() {
    // on load
    window.addEventListener('load',()=>{
        state.likes=new likes.Likes();
        // restore local storage likes
        state.likes.restoreLocalStorage();

        // render likes menu
        likesView.toggleLikeMenu(state.likes.noOfLikes());

        //render likes items
        state.likes.likes.forEach(ele=>likesView.addItem(ele));
    });
    
    // add event listner
    base.elements.search.addEventListener("submit", handleSearch);
    window.addEventListener("hashchange", addRecipe);
    window.addEventListener("load", addRecipe);
    // serving buttons
    base.elements.recipeView.addEventListener("click", handleRecipe);

    // list view
    base.elements.shopping.addEventListener("click", handleListView);


    // testing();
}

/* -------------------------------------------------------------------------- */
main();

/* --------------------------------- Testing -------------------------------- */
function testing() {
    // base.elements.searchInput.value='pizza';
    // base.elements.searchBtn.click();
    // window.state = state;
}
