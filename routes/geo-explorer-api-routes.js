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
    
    return {
      getPlayerNames,
      getQuestions,
      getMoreInfo,
      register
    };
}