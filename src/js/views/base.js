export const elements={
    searchInput:document.querySelector('.search__field'),
    searchBtn:document.querySelector('.search__btn'),
    search:document.querySelector('.search'),
    results:document.querySelector('.results'),
    resultsList:document.querySelector('.results__list'),
    resultsPages:document.querySelector('.results__pages'),
    recipeView:document.querySelector('.recipe'),
    shopping:document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list'),
    bookmarkIcon:document.querySelector('.likes__icon use'),
    shoppingList: document.querySelector('.shopping')
};


export const utilities = {
  scrollOnClick: (scrollFrom, scrollTo) => {
      if(scrollFrom){
          scrollFrom.addEventListener('click', e =>{
           const clearTime = setTimeout(() => {
              scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start'});            
              clearTimeout(clearTime)
            }, 400);
        });
    }
  }
}