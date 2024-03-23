"use strict";

/**
 * Script for press page
 * @author Karoline Lindroos
 * @date 2024-03-07
 */

import { getContent } from "./utils/contentFetcher.js";
//localStorage.clear();

// Get page data for index.html, either from localstorage or from database.
let pageData = await getContent("press");

// Once page data is obtained, fill html page with content.
createPressElements(pageData);

/**
 * Function to create html elements of press info
 * @param {object} press - object of press info
 */
function createPressElements(press) {
    let divImg = document.createElement('div');
    divImg.classList.add('wrapImg');
    let img = document.createElement('img');
    img.setAttribute('src', `./images/${press.img_sd}`);
    img.setAttribute('alt', press.title_sd);
    divImg.append(img);

    let divAbout = document.createElement('div');
    divAbout.classList.add('wrapInfo');
    let abouth1 = document.createElement('h1');
    abouth1.innerHTML = press.title;
    let aboutInfo_1 = document.createElement('p');
    aboutInfo_1.innerHTML = press.description_1;
    let aboutInfo_2 = document.createElement('p');
    aboutInfo_2.innerHTML = press.description_2;
    divAbout.append(abouth1, aboutInfo_1, aboutInfo_2);

    let wrapPiku = document.createElement('div');
    wrapPiku.classList.add('wrapPiku');
    let pikuTitle = document.createElement('h2');
    pikuTitle.innerHTML = press.title_piku;
    let pikuP = document.createElement('p');
    pikuP.innerHTML = press.description_piku;
    let pikuimg = document.createElement('img');
    pikuimg.setAttribute('src', `./images/${press.img_piku}`);
    pikuimg.setAttribute('alt', press.title_piku);
    wrapPiku.append(pikuTitle, pikuP, pikuimg);

    document.getElementById('about').append(divImg, divAbout);
    document.getElementById('wrap-press-img').append(wrapPiku);
}