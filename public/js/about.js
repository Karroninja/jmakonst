"use strict";

/**
 * Script for about page
 * @author Karoline Lindroos
 * @date 2024-03-07
 */

import { getContent } from "./utils/contentFetcher.js";
//localStorage.clear();

// Get page data for index.html, either from localstorage or from database.
let pageData = await getContent("about");

// Once page data is obtained, fill html page with content.
createAboutElements(pageData);

/**
 * Function to create html elements of about info
 * @param {object} about - object of about info
 */
function createAboutElements(about) {
    let divImg = document.createElement('div');
    divImg.classList.add('wrapImg');
    let img = document.createElement('img');
    img.setAttribute('src', `./images/${about[0].img}`);
    img.setAttribute('alt', about[0].name);
    divImg.append(img);

    let divAbout = document.createElement('div');
    divAbout.classList.add('wrapInfo');
    let abouth1 = document.createElement('h1');
    abouth1.innerHTML = about[0].title;
    let aboutInfo_1 = document.createElement('p');
    let aboutInfo_2 = document.createElement('p');
    let aboutInfo_3 = document.createElement('p');
    let aboutInfo_4 = document.createElement('p');
    let aboutInfo_5= document.createElement('p');
    aboutInfo_1.innerHTML = about[0].description_1;
    aboutInfo_2.innerHTML = about[0].description_2;
    aboutInfo_3.innerHTML = about[0].description_3;
    aboutInfo_4.innerHTML = about[0].description_4;
    aboutInfo_5.innerHTML = about[0].description_5;
    divAbout.append(abouth1, aboutInfo_1, aboutInfo_2, aboutInfo_3, aboutInfo_4, aboutInfo_5);

    document.getElementById('about').append(divImg, divAbout);

    let reversed = about[1].utbildningar.reverse();
    reversed.forEach((element, i) => {
        let div = document.createElement('div');

        let year = document.createElement('h1');
        year.innerHTML = element.year;
        let course = document.createElement('h2');
        course.innerHTML = element.name;
        let school = document.createElement('p');
        school.innerHTML = element.school;

        div.append(year, course, school);
        document.getElementById('wrapCourses').append(div);
    });
}

window.addEventListener('scroll', scrollFunc);

/**
 * Function to create the smooth loading of courses content when scrolling down.
 */
function scrollFunc() {
    let courseWrapDiv = document.querySelectorAll('.wrapCourses');

    // Get the value of grid-template-columns and rows of the wrapping div of courses.
    let nCols = window.getComputedStyle(courseWrapDiv[0]).gridTemplateColumns.split(' ').length;
    let nRows = window.getComputedStyle(courseWrapDiv[0]).gridTemplateRows.split(' ').length;

    let coursesDiv = document.querySelectorAll('.wrapCourses div');
    for (let row = 0; row < nRows; row++) {

        // Y-position of top of boxes in the current row.
        let offsetToSingleDiv = coursesDiv[nCols * row].getBoundingClientRect();
        // Distance from bottom of the view to the div of interest.
        let d = offsetToSingleDiv.top - window.innerHeight;
        if ( d > 0 ) {
            continue;
        }

        for (let col = 0; col < nCols; col++) {
            // Create a 1D linear index from 2D row/col indices.
            let i = col + nCols * row;

            // Prevent the setTimeout function to run on an element that has already transitioned.
            if ( coursesDiv[i].style.opacity == 1 ) {
                continue;
            }

            // Make sure each box in the grid transition one at a time.
            setTimeout(function() {
                coursesDiv[i].style.transform = "translateY(0)";
                coursesDiv[i].style.opacity = 1;
            }, 500 * col);

            // Remove the scroll event listener once the last box in the grid has transitioned.
            if (i == (coursesDiv.length - 1)) {
                window.removeEventListener('scroll', scrollFunc);
            }
        }
    }
}