"use strict";
const fs = require('fs'); // Required for file system operations
const path = require('path'); // Used to combine path to .json files.

/**
 * Function to get the data from the database file.
 * @param {string} nameOfPageToRead name of array in database.
 * @returns the desired array from the database as object.
 */
function getData(nameOfPageToRead) {
    try {
        // Construct path to relevant .json file.
        let jsonPath = path.join(__dirname, `../db/${nameOfPageToRead}.json`);
        // Read the content of the .json file.
        let data = fs.readFileSync( jsonPath, 'utf8' );
        // Parse text and return.
        return JSON.parse( data );
    } catch (err) {
        console.error('Error reading file:', err);
        return;
    }
}

module.exports = {
    getData: getData
}