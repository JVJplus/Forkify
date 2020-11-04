import * as base from "./base";

export const getInput = () => base.elements.searchInput.value;

export function showLoader(parent) {
    const spinner = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", spinner);
}

export function clearLoader() {
    const spinner = document.querySelector(".loader");
    // if its present in dom!
    if (spinner) {
        spinner.parentElement.removeChild(spinner);
    }
}

function fixInOneLine(str, maxChar = 17) {
    if (str.length <= 17) return str;

    return (
        str
            .split(" ")
            .reduce((acc, curr) => {
                if (acc.length + curr.length <= 17) {
                    acc += curr + " ";
                }
                return acc;
            }, "")
            .trim() + "..."
    );
}

// type=='prev' or 'next'
function createButton(type, page) {
    return (
    `
    <button class="btn-inline results__btn--${type}" data-goto=${
        type === "prev" ? page - 1 : page + 1
    }>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
                type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
    `);
}

function renderButtons(totalItems, pageNumber, itemsToShow) {
    let buttons;
    const totalPages = Math.ceil(totalItems / itemsToShow);

    if (pageNumber == 1 && totalPages > 1)
        buttons = createButton("next", pageNumber);
    else if (pageNumber == totalPages && totalPages != 1) {
        buttons = createButton("prev", pageNumber);
    } else if(pageNumber<totalPages) {
        buttons = `
            ${createButton("prev", pageNumber)}
            ${createButton("next", pageNumber)}
        `;
    }

    base.elements.resultsPages.insertAdjacentHTML("afterbegin", buttons);
}

function addSingleItemToResult(item) {
    const child = `
            <li>
                <a class="results__link" href="#${item.recipe_id}">
                    <figure class="results__fig">
                        <img src="${item.image_url}" alt=${item.title}>
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${fixInOneLine(
                            item.title
                        )}</h4>
                        <p class="results__author">${item.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    base.elements.resultsList.insertAdjacentHTML("beforeend", child);
}

export function addItemsToResults(data, pageNumber = 1, itemsToShow = 10) {
    const startingIndex = itemsToShow * (pageNumber - 1);
    const endingIndex = itemsToShow * pageNumber;

    data.slice(startingIndex, endingIndex).forEach(addSingleItemToResult);

    // render pagination buttons
    renderButtons(data.length, pageNumber, itemsToShow);
}

export function clearPreviousResults(){
    base.elements.resultsList.innerHTML='';
    base.elements.resultsPages.innerHTML='';
}