import * as searchView from './views/searchView';
import * as base from'./views/base';
import * as search from'./models/search';

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
    
}

function handleSearch(e){
    // prevent get method!
    e.preventDefault();
    const input=searchView.getInput();
    
    if(input){
        // remove current input
        base.elements.searchInput.value=''
        // fetch data and process
        handleSearchDatas(input);
    }
}

function main(){
    // add event listner
    base.elements.search.addEventListener('submit',handleSearch);
    
}

main();