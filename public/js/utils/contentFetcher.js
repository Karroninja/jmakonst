"use strict";

export function getContent(pageName) {
    // Get page data from local storage (may or may not exist).
    let localStorageContent = localStorage.getItem(pageName);
    // Check if the local storage page data exists or not.
    let localPageDataExists = localStorageContent != null;

    if (localPageDataExists) {
        //console.log("Page content that already existed in local storage was returned.");
        return Promise.resolve(JSON.parse(localStorageContent));
    } else {
        // Page data did not exist in local storage -> Fetch from server.
        return fetch(`/api/${pageName}`, {
             method: 'GET'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then((data) => {
            // Save data in local storage.
            localStorage.setItem(pageName, JSON.stringify(data));
            //console.log("Page content has just been fetched from the server and saved in local storage");
            return data;
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
    }
}