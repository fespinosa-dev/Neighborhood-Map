var withQuery = require('with-query');

const api = "https://api.foursquare.com/v2/venues";
const requestParams = {
    client_id: "RLKIGIYD0SEJW5BK3ZTTGGJX3CR5PXPRHTTD1TGUSVSRIF3V",
    client_secret: "1RJIBSE31553RCNYEV13DM4PN5IGBAQSS2SKJ1C22TJ2N3ZG",
    v: 20180323,
    ll: "18.47265,-69.886543"
}

/**
 * //Returns a list of venues near the current location, optionally matching a search term.
 * @param query 
 * @returns array of near venues 
 */
export const search = (query) => {
    requestParams.query = query;
    return fetch(withQuery(`${api}/search`, requestParams))
        .then((response) => response.json())
        .then((data) => {
            return data.response.venues;
        });

}

/**
 * Gets the full details about a venue including location, tips, and categories.
 * @param  venueId - the venue id to search for
 * @returns Promise that resolves to a json response 
 */
export const get = (venueId) => {
    return fetch(withQuery(`${api}/${venueId}`, requestParams))
        .then((response) => response.json());
}