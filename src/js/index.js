import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as base from'./views/base';
import * as search from'./models/search';
import * as recipe from'./models/recipe';
import * as list from'./models/list';

let state = {};

/* -------------------------------------------------------------------------- */
/*                              SEARCH CONTROLLER                             */
/* -------------------------------------------------------------------------- */

function handlePaginationButtons(recipes){
    // dynamic content select karise kare? using event deligation
    base.elements.resultsPages.addEventListener('click',e=>{
        // multiple elements pe event kaise dale? using closest method
        const btn=e.target.closest('.btn-inline');
        // if its on dom
        if(btn){
            searchView.clearPreviousResults();
            const goToPage=parseInt(btn.dataset.goto);
            searchView.addItemsToResults(recipes,goToPage);
        }
    });
}

async function handleSearchDatas(input){
    // remove previous datas

    searchView.showLoader(base.elements.results);

    state.search=new search.Search(input);
    const recipes=await state.search.getData();
    // remove loader 
    searchView.clearLoader();

    if(!recipes){
        // if invalid query as per API
        return;
    }
    console.log(recipes);

    // add items in dom
    irchView.addItemsToResults(recipes);
    handlePaginationButtons(recipes);
}

function handleSearch(e){
    // prevent get method!
    e.preventDefault();
    const input=searchView.getInput();

    if(input){
        // remove current input
        base.elements.searchInput.value=''
        searchView.clearPreviousResults();
        // fetch data and process
        handleSearchDatas(input);
    }
}


/* -------------------------------------------------------------------------- */
/*                              RECIPE CONTROLLER                             */
/* -------------------------------------------------------------------------- */

async function handleRecipe(e){

    // add reciepes on dom
    const hash=location.hash.replace('#','');
    if(hash){
        // clear previous
        recipeView.clearRecipe();
        if(await state.search){
            searchView.highlightSelected(hash);
        }
        state.recipe=new recipe.Recipe(hash);
        await state.recipe.getRecipe();
        recipeView.renderRecipe(state.recipe);
    }
}

function handleServingButtons(e){
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        state.list=new list.List();
        state.recipe.ingredients.forEach(el=>{
            const item=state.list.addItem(el);
            listView.addItem(item);
        });
    }

}


/* -------------------------------------------------------------------------- */
/*                               List Controller                              */
/* -------------------------------------------------------------------------- */
function handleListView(e){
    // Delte List Item
    const id=e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.closest('.shopping__delete svg')){
        listView.deleteItem(id);
        state.list.deleteItem(id);
    }
    else if(e.target.matches(".shopping__count-value")){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id,val);
    }
}


/* -------------------------------------------------------------------------- */
function main(){
    // add event listner
    base.elements.search.addEventListener('submit',handleSearch);
    window.addEventListener('hashchange',handleRecipe);
    window.addEventListener('load',handleRecipe);
    // serving buttons
    base.elements.recipeView.addEventListener('click',handleServingButtons);

    // list view
    base.elements.shopping.addEventListener('click',handleListView);


    testing();
}

main();


/* --------------------------------- Testing -------------------------------- */
function testing(){
    // base.elements.searchInput.value='pizza';
    // base.elements.searchBtn.click();
    window.state=state;
}