import GeoExplorerServices from "../services/db_queries.js"

const query = GeoExplorerServices()

let listOfUserNames = query.getUserNames()
// console.log(listOfUserNames);

export default function startFactory() {
    async function start(username){
       return
    }
    return {
        start,
    }
}