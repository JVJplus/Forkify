const axios = require("axios");

export class Search {
    constructor(input) {
        this.input = input;
    }

    async getData() {
        try {
            const url = "https://forkify-api.herokuapp.com/api/search?q=";
            const data = await axios(url + this.input);
            this.recipes=await data.data.recipes;
            // console.log( this.recipes);
            return this.recipes;
        } 
        catch (err) {
            alert(`No data available for this query.\nTry: 'cake', 'pizza' etc\n\nSee all available queries options.`)
        }
    }
}
