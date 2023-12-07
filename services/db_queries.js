export default function GeoExplorerServices(db) {
    async function getUserNames() {
        const selectQuery = `SELECT * FROM players ORDER BY score DESC`;
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
             const selectQuery = `SELECT question FROM questions WHERE country_id = $1`
        const result = await db.oneOrNone(selectQuery, [countryId])

        if (!result?.question) return null;
        return result.question;
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

    


    async function registerUser(username) {
      const insertQuery = `INSERT INTO players(username, score) VALUES ($1, 0)`;

      await db.none(insertQuery, [username])
    }


    
    return {
      getUserNames,
      getCountryId,
      getQuestionsForCountry,
      getCountryFacts,
      registerUser
    };
}