// JavaScript main file for the popup to work, getting information - like local storage, cookies,
// third party domains - about the current tab and displaying it. 
// 
// Author: Rafael Malcervelli

// =================================================
// Declaring global variables
// =================================================
let n_of_cookies = 0;
let n_of_local_storage = 0;
let n_of_third_party_domains = 0;
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
// Cookies - 2 points
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
        n_of_cookies = n_cookies;
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
                let textOfLi = document.createTextNode("Cookie: " + cookie.name);
                itemOfUl.appendChild(textOfLi);
                cookiesList.appendChild(itemOfUl);
            }
        } else {
            let cookiesText = document.createTextNode("There are no cookies in this page.");
            cookiesTextHtml.appendChild(cookiesText);
        }
    });
}
// =================================================

// // =================================================
// // Third Party Domains - 2 points
// // =================================================
// const showThirdPartyDomains = async (tabs) =>{
//     // Get present tab
//     let presentTab = tabs.pop();

//     // Setting up html elements to receive text about the number of third party domainss
//     let tpDomainsTextHtml = document.getElementById("thirdPartyDomainsText");
//     const result = await browser.tabs.sendMessage(presentTab.id, {
//         method: "getThirdPartthirdPartyDomainsyDomains",
//     });
//     let n_tp_domains = result.data[1][1];

//     if (n_tp_domains > 0) {
//         let tpDomainsText = document.createTextNode("There are " + n_tp_domains + " third party domains in this page.");
//         tpDomainsTextHtml.appendChild(tpDomainsText);
//     }
// }
// =================================================

// =================================================
// Create rating for the current tab - 3 points
// =================================================
// function getRating(storageData, cookiesData, thirdPartyDomains){

// }
// =================================================

// =================================================
// Executing all functions
// =================================================
getPresentTab().then(showCookies).then(() => {
    browser.tabs.executeScript({
        file: "getLocalStorage.js"
    }).then((storageData) => {
        showLocalStorage(storageData[0]);
    }).then(() => {
        getRating(n_of_local_storage, n_of_cookies, n_of_third_party_domains);
    });
});

// TODO: - DIFERENCIAR COOKIES DE TERCEIROS E COOKIES DO SITE
//       - CRIAR RATING E MOSTRAR NO POPUP
// =================================================