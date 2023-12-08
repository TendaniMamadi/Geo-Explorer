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
        const selectQuery = `SELECT * FROM countries WHERE countryname = $1`
        const result = await db.any(selectQuery, [country]);
      
        return result
    }

    


  async function registerUser(username) {

     try {
       const existingUser = await db.any(
         `SELECT username FROM players WHERE username = $1`,
         [username]
       );

       if (existingUser.length === 0) {
         const insertQuery = `INSERT INTO players(username, score) VALUES ($1, 0)`;
         await db.none(insertQuery, [username]);
         
       } else {
         console.log(`User ${username} already exists in the database.`);
       }
     } catch (error) {
       console.error("Error during user registration:", error);
     }

    }

    async function checkAnswer(question) {
      const selectQuery = `SELECT answer FROM questions WHERE question = $1`;

      const result = await db.one(selectQuery, [question])

      return result.answer;
    }

  async function addPoints(username) {
      
      const updateQuery = `UPDATE players SET score = score + 2 WHERE username = $1`;

      await db.none(updateQuery, [username])
    }

    
    return {
      getUserNames,
      getCountryId,
      getQuestionsForCountry,
      getCountryFacts,
      checkAnswer,
      registerUser,
      addPoints
    };
}