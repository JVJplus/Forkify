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

export function addItemsToResults(data) {
    data.forEach((item) => {
        addSingleItemToResult(item);
    });
}
