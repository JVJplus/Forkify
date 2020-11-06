import * as base from "./base";

export function addItem(item){
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${(item.count.toString()).substr(0,3)}" step="${item.count}" class="shopping__count-value" min="0">
                <p>${item.unit?item.unit:"pcs"}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    base.elements.shopping.insertAdjacentHTML('beforeend', markup);
}

export function deleteItem(id){
    const ele=document.querySelector(`[data-itemid='${id}']`);
    ele.parentElement.removeChild(ele);
}