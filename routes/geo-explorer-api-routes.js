export default function GeoExplorerAPIRoutes(geoExplorerServices) {
    
    async function getPlayerNames(req, res) {
        let listOfPlayers = await geoExplorerServices.getUserNames();

        res.json({
          listOfPlayers,
        });
    }

    async function getQuestions(req, res) {
        const country = req.params.country;

        const countryId = await geoExplorerServices.getCountryId(country);
        console.log(countryId)

        const questions = await geoExplorerServices.getQuestionsForCountry(countryId);

        res.json({
            questions
        })
    }

    async function getMoreInfo(req, res) {
        const countryName = req.query.country;

        const moreInfo = await geoExplorerServices.getCountryFacts(countryName);


        res.json({
            moreInfo
        })
        
    }

    async function register(req, res) {
        const username = req.body.username;
    
        
        await geoExplorerServices.registerUser(username);
    
        res.redirect("/visualModel")
    
      }

      async function submitAnswers(req, res) {
        const country = req.params.country;
        const username = req.query.user;
        const answers = req.body;
        const q1 = `What is the major mineral of ${country}?`;
        const q2 = `What is a major social issue faced by ${country}?`
        const q3 = `What is the capital of Nigeria? ${country}`
        const q4 = `What is the tourist destination of ${country}?`
        
        for (let question in answers){
            const answer = await geoExplorerServices.checkAnswer(question)
            if (answer === answers[question]) {
                await geoExplorerServices.addPoints(username)
            } 
        }

        res.redirect("/leaderBoard")
      }

    
    return {
      getPlayerNames,
      getQuestions,
      getMoreInfo,
      register,
      submitAnswers
    };
}