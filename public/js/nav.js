"use strict";
/**
 * Script for navbar and hamburgermenu
 * @author Karoline Lindroos
 * @date 2024-03-07
 */

let path = window.location.pathname;
let mobileWidthPixels = 767;
nav(path);

function nav(path) {
    let ul = document.createElement('ul');

    let li1 = document.createElement('li');
    li1.classList.add('logo');
    let logo = document.createElement('a');
    let logoImg = document.createElement('img');
    logoImg.setAttribute('id', 'jma-logo')
    logoImg.setAttribute('src', '../images/logo_optic_gold.svg');
    logoImg.setAttribute('alt', 'jma-logo');
    logo.setAttribute('href', './');
    logo.setAttribute('aria-label', "jma-logo");
    logo.appendChild(logoImg);

    let li2 = document.createElement('li');
    let home = document.createElement('a');
    let homeText = document.createTextNode('Galleri');
    home.setAttribute('href', './');

    let li3 = document.createElement('li');
    let about = document.createElement('a');
    let aboutText = document.createTextNode('Om');
    about.setAttribute('href', '/about');

    let li4 = document.createElement('li');
    li4.setAttribute('id', "nav-press");
    let press = document.createElement('a');
    let pressText = document.createTextNode('Press');
    press.setAttribute('href', '/press');

    let hamburger = document.createElement('i');
    hamburger.classList.add('fa-solid');
    hamburger.classList.add('fa-bars');
    hamburger.setAttribute('id', "fa-bars");
    hamburger.setAttribute('role', "button");
    hamburger.setAttribute('aria-label', 'Navigation Bar');
    hamburger.setAttribute('tabindex', "0");

    let li5 = document.createElement('li');
    let instagram = document.createElement('i');
    let instaLink = document.createElement('a');
    instaLink.classList.add('nav-instagram');
    instaLink.setAttribute('href', 'https://www.instagram.com/jeanettemarieadolfsson/');
    instaLink.setAttribute('aria-label', 'Instagram');
    instagram.classList.add('fa-brands');
    instagram.classList.add('fa-instagram');
    li5.setAttribute('id', 'nav-instagram');
    let jma = document.createElement('p');
    jma.innerHTML = "Jeanette Marie Adolfsson";

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('fa-bars');
        hamburger.classList.toggle('fa-xmark');
    })

    hamburger.addEventListener('keypress', function(event) {
        // Only trigger when Enter is pressed
        if (event.key === "Enter" || event.keyCode === 13) {
            hamburger.classList.toggle('fa-xmark');
            hamburger.classList.toggle('fa-bars');
        }
    })

    home.appendChild(homeText);
    about.appendChild(aboutText);
    press.appendChild(pressText);
    instaLink.append(instagram);

    li1.appendChild(logo);
    li2.appendChild(home);
    li3.appendChild(about);
    li4.appendChild(press);
    li5.append(instaLink, jma);

    ul.append(li1, li2, li3, li4, li5);
    document.getElementById('nav').append(hamburger, ul);

    // Change classname depending on path
    if (path == "/") {
        home.classList.add("active");
    } else if (path == "/about") {
        about.classList.add("active");
    } else if (path == "/press") {
        press.classList.add("active");
    }
}

/**
 * Function to show or hide hamburger menu
 */
function handleHamburgerMenu() {
    let hamburgerClassList = document.getElementById('fa-bars').classList;
    let hamburgerMenu = document.getElementById('fa-bars');
    // Remove the focus-css-rule on this element directly when clicked.
    hamburgerMenu.style.outline = "none";

    if (hamburgerClassList.contains('fa-xmark')) {
        document.getElementById('nav').style.width = '100%';
        // Disable scroll in body when hambergermenu is open
        document.body.style.overflow = "hidden";

        // Trigger back the event focus to the element.
        hamburgerMenu.addEventListener('blur', function() {
            hamburgerMenu.style.outline = "1px solid";
        })
    } else if (hamburgerClassList.contains('fa-bars')) {
        document.getElementById('nav').style.width = '0%';

        let galleryPopupClassList = document.getElementsByClassName('art-popup');
        let popUpArtIsActive = false;
        // Check if art pop up is active
        for (let i = 0; i < galleryPopupClassList.length; i++) {
            if (galleryPopupClassList[i].classList.contains('show')) {
                popUpArtIsActive = true;
                break;
            } else {
                popUpArtIsActive = false;
            }
        }

        // Enable scroll again in body when hambergermenu is closed and art pop up is NOT active
        if (!popUpArtIsActive) {
            document.body.style.overflow = "auto";
        }

        // Trigger back the event focus to the element.
        hamburgerMenu.addEventListener('blur', function() {
            hamburgerMenu.style.outline = "1px solid";
        })
    }
}

// When hambuergermenu is clicked.
document.getElementById('fa-bars').addEventListener('click', handleHamburgerMenu);

// When hambuergermenu is triggered using keypress.
document.getElementById('fa-bars').addEventListener('keypress', function(event) {
    // Only trigger when Enter is pressed
    if (event.key === "Enter" || event.keyCode === 13) {
        handleHamburgerMenu();
    }
});