// JavaScript main file for the popup to work, getting information - like local storage, cookies,
// third party domains - about the current tab and displaying it. 
// 
// Author: Rafael Malcervelli

// =================================================
// Declaring global variables
// =================================================
let n_of_local_storage = 0;
let n_of_first_cookies = 0;
let n_of_third_cookies = 0;
let n_cookies = 0;
// =================================================

// =================================================
// Get current tab function
// =================================================
function getPresentTab() {
    return browser.tabs.query({
        currentWindow: true, 
        active: true 
    });
}
// =================================================

// =================================================
// Local Storage - 3 points
// =================================================
function showLocalStorage(storageData) {
    // Show localStorage lenght in the popup
    // Setting up html element to receive text
    let storageTextLength = document.getElementById("localStorageText");
    let storageList = document.getElementById("localStorageList");
    let n_storage = storageData.length;
    n_of_local_storage = n_storage;

    // Writing into the html
    if (n_storage > 0) {
        let lengthText = document.createTextNode("There are " + n_storage + " items in Local Storage.");
        storageTextLength.appendChild(lengthText);

        storageTextLength.addEventListener('click', function handleClick() {
            // Reference : https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
            if (storageList.style.display === "none") {
                storageList.style.display = "block";
            } else {
                storageList.style.display = "none";
            }
        })

        for (let item of storageData) {
            let itemOfUl = document.createElement("li");
            let textOfLi = document.createTextNode("Item: " + item);
            itemOfUl.appendChild(textOfLi);
            storageList.appendChild(itemOfUl);
        }
 
    } else {
        let lengthText = document.createTextNode("There are no items in Local Storage.");
        storageTextLength.appendChild(lengthText);
    }
}
// =================================================

// =================================================
// Cookies - 2 points + 3 points (first/third party & session/navigation)
// =================================================
function showCookies(tabs){
    // Get present tab
    let presentTab = tabs.pop();

    // Getting all cookies from the current tab
    var gettingAllCookies = browser.cookies.getAll({url: presentTab.url});

    // Setting up html elements to receive text about the number of cookies
    let cookiesTextHtml = document.getElementById("cookiesText");
    let cookiesList = document.getElementById("cookiesList");

    // Getting all cookies from the current tab and displaying it
    gettingAllCookies.then((cookies) => {
        let n_cookies = cookies.length;
        n_cookies = n_cookies;

        if (n_cookies > 0) {
            let cookiesText = document.createTextNode("There are " + n_cookies + " cookies injected in this page.");
            cookiesTextHtml.appendChild(cookiesText);
            
            cookiesTextHtml.addEventListener('click', function handleClick() {
                // Reference : https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
                if (cookiesList.style.display === "none") {
                    cookiesList.style.display = "block";
                } else {
                    cookiesList.style.display = "none";
                }
            })

            for (let cookie of cookies) {
                let itemOfUl = document.createElement("li");
                let typeOfCookie = "";

                // Knowing if cookie is of type 'session' or 'navigation'
                if (cookie.session){
                    typeOfCookie = "session";
                } else {
                    typeOfCookie = "navigation";
                }

                // Knowing if cookie is of type 'first party' or 'third party'
                let domain = presentTab.url.split('/')[2];

                if ((cookie.domain == domain) || (cookie.domain == "." + domain) || (cookie.domain == "www." + domain) || (cookie.domain == "www" + domain) || ("www." + cookie.domain == domain) || ("www" + cookie.domain == domain)) {
                    let textOfLi = document.createTextNode("First Party / " + typeOfCookie + " Cookie: " + cookie.name);
                    itemOfUl.appendChild(textOfLi);
                    cookiesList.appendChild(itemOfUl);
                    n_of_first_cookies++;
                } else {
                    let textOfLi = document.createTextNode("Third Party / " + typeOfCookie + " Cookie: " + cookie.name);
                    itemOfUl.appendChild(textOfLi);
                    cookiesList.appendChild(itemOfUl);
                    n_of_third_cookies++;
                }
            }
        } else {
            let cookiesText = document.createTextNode("There are no cookies in this page.");
            cookiesTextHtml.appendChild(cookiesText);
        }
    });
}
// =================================================

// =================================================
// Create rating for the current tab - 3 points
// =================================================
function getRating(n_storage, first_cookies, third_cookies){
    // Setting up html elements to receive text about the rating
    let rating = document.getElementById("rating");
    let cookieScore = n_cookies;

    var score = (first_cookies/(first_cookies + third_cookies) * 0.2+ third_cookies/(first_cookies + third_cookies) * 0.4 + cookieScore * 0.3 + n_storage * 0.1)*100;

    // Writing into the html
    // Reference to round float numbers in JS: https://stackoverflow.com/questions/9453421/how-to-round-float-numbers-in-javascript
    let ratingText = document.createTextNode("Privacy Score: " + score.toFixed(1));
    rating.appendChild(ratingText);
    if (score < 150) {
        rating.style.color = "green";
    } else if (score < 300) {
        rating.style.color = "yellow";
    } else {
        rating.style.color = "red";
    }
}
// =================================================

// =================================================
// Executing all functions - Sum of 11 points in total
// =================================================
getPresentTab().then(showCookies).then(() => {
    browser.tabs.executeScript({
        file: "getLocalStorage.js"
    }).then((storageData) => {
        showLocalStorage(storageData[0]);
    }).then(() => {
        getRating(n_of_local_storage, n_of_first_cookies, n_of_third_cookies);
    });
});
// =================================================