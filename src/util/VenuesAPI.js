var withQuery = require('with-query');

const api = "https://api.foursquare.com/v2/venues";
const requestParams = {
    client_id: "JAFRUUL2OWIGLJBA2PM0AWCWZKCJHOOSGMCJH5VPROF5TK3L",
    client_secret: "JEGU0AJ43HZ5BZ3I1QLQDMHXCAJS3XGAUQPH2DCVEZZVJMCX",
    v: 20180323,
    ll: "18.47265,-69.886543"
}

/**
 * //Returns a list of venues near the current location, optionally matching a search term.
 * @param query 
 * @returns Promise that resolve to an array of near venues 
 */
export const search = (query) => {
    requestParams.query = query;
    requestParams.near = query;
    return fetch(withQuery(`${api}/search`, requestParams))
        .then(response => response.json())
        .then(data => {
                if(data.meta.code == 429){
                return Promise.reject(new Error(data.meta.errorDetail));
            }
            return data.response.venues
        });

}

/**
 * Gets the full details about a venue including location, tips, and categories.
 * @param  venueId - the venue id to search for
 * @returns Promise that resolve to a venue with full details 
 */
export const get = (venueId) => {
    return fetch(withQuery(`${api}/${venueId}`, requestParams))
        .then(response => response.json())
        .then(data => {
            if(data.meta.code == 429){
                return Promise.reject(new Error(data.meta.errorDetail));
            }
            return data.response.venue;
        }
        );
}