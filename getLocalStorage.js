// Reference: 
//      - https://www.youtube.com/results?search_query=get+local+storage+without+knowing+keys
//      - https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

var results = [],
    keys = Object.keys(localStorage),
    i = keys.length;
while(i--){
    results.push(keys[i])
};
results;