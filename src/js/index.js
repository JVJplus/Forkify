import * as searchView from './views/searchView';
import * as base from'./views/base';
import * as search from'./models/search';


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

    const Search=new search.Search(input);
    const recipes=await Search.getData();
    console.log(recipes);

    // remove loader 
    searchView.clearLoader();

    // add items in dom
    searchView.addItemsToResults(recipes);
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

function main(){
    // add event listner
    base.elements.search.addEventListener('submit',handleSearch);
    
}

main();