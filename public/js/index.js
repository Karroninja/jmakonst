"use strict";

/**
 * Script for index/gallery page
 * @author Karoline Lindroos
 * @date 2024-03-07
 */

import { getContent } from "./utils/contentFetcher.js";
//localStorage.clear();

// Get page data for index.html, either from localstorage or from database.
let pageData = await getContent("index");

// Once page data is obtained, fill html page with content.
createArtElements(pageData);

/**
 * Function to create html elements of each item in art array
 * @param {Array} art - array of art info
 */
function createArtElements(art) {
    art.forEach((element, i) => {
        let div = document.createElement('div');
        div.classList.add('clickImg');

        // Create the pop up div and the div with the cross and title
        let divPop = document.createElement('div');
        divPop.classList.add('art-popup');
        let divWrap = document.createElement('div');
        divWrap.classList.add('art-popup-wrap-title-cross');
        let divWrapTitle = document.createElement('div');
        let titlePop = document.createElement('p');
        titlePop.innerHTML = element.title;
        let copyRightText = document.createElement('p');
        copyRightText.innerHTML = "Bilden är under copyright.";
        let cross = document.createElement('i');
        cross.classList.add('fa-solid');
        cross.classList.add('fa-circle-xmark');

        let pictureWrap = createPictureHtmlElement(element);
        let pictureWrapPop = createPictureHtmlElement(element);

        let title = document.createElement('p');
        title.innerHTML = element.title;

        // Add a special class to the pictures which are vertical.
        if (i == 2 || i == 3 || i == 11 || i == 12) {
            div.classList.add("vertical");
            divPop.classList.add('vertical');
        }

        // Add a special class to the two vertical pictures which are set to the left.
        if (i == 2 || i == 11) {
            div.classList.add('v-special');
        }

        div.append(pictureWrap, title);
        divWrapTitle.append(titlePop, copyRightText)
        divWrap.append(divWrapTitle, cross);
        divPop.append(divWrap, pictureWrapPop);

        // Add a click event listener to the created art-div, to show
        div.addEventListener('click', function(event) {
            divPop.classList.add('show');
            divPop.classList.remove('hide');
            document.body.style.overflow = "hidden";
        });

        // Add a click event to the created cross icon, to hide
        cross.addEventListener('click', function(event) {
            divPop.classList.add('hide');
            divPop.classList.remove('show');
            document.body.style.overflow = "auto";
        })

        // Add a click event to anywhere around the pop up image to hide,
        // but disable if you click on the pop up image.
        divPop.addEventListener('click', function(event) {
            if (event.target.classList.contains('art')) {
                event.stopPropagation();
            } else {
                divPop.classList.add('hide');
                divPop.classList.remove('show');
                document.body.style.overflow = "auto";
            }
        });
        document.getElementById('gallery').append(div, divPop);
    });
}

/**
 * Function to create html element picture that wrap all the media which will change depending on screen width.
 * @param {object} imgElement - info about each element in art array
 * @returns pictureWrap - html picture element
 */
function createPictureHtmlElement(imgElement) {
    let pictureWrap = document.createElement('picture');
    // Create source element for midscreen and mobile.
    let sourceElementMobile = document.createElement('source');
    sourceElementMobile.setAttribute('media', '(min-width: 0px) and (max-width: 767px)');
    sourceElementMobile.setAttribute('srcset', `./images/767/${imgElement.img}`);
    sourceElementMobile.style.aspectRatio = 'auto 767/509';

    let sourceElementMidscreen = document.createElement('source');
    sourceElementMidscreen.setAttribute('media', '(min-width: 768px) and (max-width: 1300px)');
    sourceElementMidscreen.setAttribute('srcset', `./images/840/${imgElement.img}`);
    sourceElementMidscreen.style.aspectRatio = 'auto 840/560';

    let sourceElementDefault = document.createElement('img');
    sourceElementDefault.setAttribute('src', `./images/1300/${imgElement.img}`);
    sourceElementDefault.setAttribute('alt', imgElement.title + " - " + imgElement.collection);
    sourceElementDefault.style.aspectRatio = 'auto 1300/862';
    sourceElementDefault.classList.add('art');

    // Append the source and img elements to the picture element
    pictureWrap.append(sourceElementMobile, sourceElementMidscreen, sourceElementDefault);

    return pictureWrap;
}