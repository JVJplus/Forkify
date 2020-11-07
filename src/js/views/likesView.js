import * as base from "./base";
import { fixInOneLine } from './searchView';

export function addItem(like){
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${fixInOneLine(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    base.elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export const removeItem = id =>{
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    el.parentElement.removeChild(el);
}


export const toggleLikeBtn = isLiked => {
    const iconString ='icon-bookmark'+ (isLiked ? '-fill' : '');
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons v2.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes => {
    // base.elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
    const hrefString ='./img/icons v2.svg#icon-bookmark'+ (numLikes>0 ? '-fill' : '');
    base.elements.bookmarkIcon.setAttribute('href',hrefString);
};