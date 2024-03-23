"use strict";

/**
 * Script for general js on the website
 * @author Karoline Lindroos
 * @date 2024-03-07
 */

/**
 * Scroll back to top function
 */
function topFunc() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/**
 * Function to handle arrow up button, to trigger topFunc if user press enter on keyboard.
 */
function handleKeyPress(event) {
    // Control if user pressed Enter on the keyboard.
    if (event.key === "Enter" || event.keyCode === 13) {
      // Trigger topFunc when Enter is pressed
      topFunc();
    }
  }

// On scroll, show arrow up
window.onscroll = (function() {
    // If user has scrolled more than 50px show arrow up.
    if (document.documentElement.scrollTop > 50) {
        // If path is the homepage, show arrow up.
        if (path == "/") {
            document.getElementById('fa-arrow-up').classList.add('show');
            document.getElementById('fa-arrow-up').classList.remove('hide');
        } else {
            // Only show arrow up on mobile screen.
            if (window.innerWidth <= mobileWidthPixels) {
                document.getElementById('fa-arrow-up').classList.add('show');
                document.getElementById('fa-arrow-up').classList.remove('hide');
            }
        }
    } else {
        // If path is the homepage, hide arrow up.
        if (path == "/") {
            document.getElementById('fa-arrow-up').classList.add('hide');
            document.getElementById('fa-arrow-up').classList.remove('show');
        } else {
            // Only hide arrow up on mobile screen.
            if (window.innerWidth <= mobileWidthPixels) {
                document.getElementById('fa-arrow-up').classList.add('hide');
                document.getElementById('fa-arrow-up').classList.remove('show');
            }
        }
    }
})

/**
 * Settings on window resize
 */
window.addEventListener('resize', function() {
    // Set specific css rules on homepage for main element and navbar
    if (path == "/") {
        let mainElement = document.querySelector('main');
        mainElement.style.maxWidth = "unset";
        let navLeft = document.getElementById('nav');
        navLeft.style.borderRight = "unset";
        let navRight = document.getElementById('right-side-nav');
        navRight.style.borderLeft = "unset";
    }
    // Set specific rules to hamburger menu
    let hamburgerClassList = document.getElementById('fa-bars').classList;
    let logoImg = document.getElementById('jma-logo');
    if (window.innerWidth <= mobileWidthPixels) {
        logoImg.setAttribute('src', '../images/logo_secondary_black.svg');
        document.getElementById('fa-bars').style.display = 'block';
        if (hamburgerClassList.contains('fa-bars')) {
            document.getElementById('nav').style.width = '0%';
        } else if (hamburgerClassList.contains('fa-xmark')) {
            document.getElementById('nav').style.width = '100%';
        }
    } else {
        logoImg.setAttribute('src', '../images/logo_optic_gold.svg');
        document.getElementById('fa-bars').style.display = 'none';
        document.getElementById('nav').style.width = 'var(--nav-footer-width)';
        // Enable scroll again in body when hambergermenu is closed
        document.body.style.overflow = "auto";
    }
});

/**
 * Settings on window load
 */
window.addEventListener('load', function() {
    // Set specific css rules on homepage for main element and navbar
    if (path == "/") {
        let mainElement = document.querySelector('main');
        mainElement.style.maxWidth = "unset";
        let navLeft = document.getElementById('nav');
        navLeft.style.borderRight = "unset";
        let navRight = document.getElementById('right-side-nav');
        navRight.style.borderLeft = "unset";
    }
    let logoImg = document.getElementById('jma-logo');
    let mobileWidthPixels = 767;
    if (window.innerWidth <= mobileWidthPixels) {
        document.getElementById('fa-bars').style.display = 'block';
        logoImg.setAttribute('src', '../images/logo_secondary_black.svg');
    } else {
        document.getElementById('fa-bars').style.display = 'none';
        logoImg.setAttribute('src', '../images/logo_optic_gold.svg');
    }
});