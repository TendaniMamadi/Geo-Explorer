export default function GeoExplorerServices(db) {
    async function getUserNames() {
        const selectQuery = `SELECT * FROM players`;
        const result = await db.any(selectQuery);
        
        return result;
    }

    async function getCountryId(country) {
       try {
         const selectQuery = `SELECT id FROM countries WHERE countryname = $1`;
         const result = await db.oneOrNone(selectQuery, [country]);

           if (!result?.id) return null; // throw new Error(`Cannot find country with name: ${country}`)
        
         return result.id;
       } catch (error) {
           console.log(error)
        return null
       }
    }

    async function getQuestionsForCountry(countryId) {
        try {
             const selectQuery = `SELECT * FROM questions WHERE country_id = $1`
        const result = await db.many(selectQuery, [countryId])

        if (!result) return null;
        return result;
        } catch (error) {
             console.log(error);
             return null;
        }
       
    }

    async function getCountryFacts(country) {
        const selectQuery = `SELECT moreinfo FROM countries WHERE countryname = $1`
        const result = await db.any(selectQuery, [country]);
      
        return result[0].moreinfo
    }
    return {
      getUserNames,
      getCountryId,
      getQuestionsForCountry,
      getCountryFacts,
    };
}