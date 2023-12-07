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
    
    return {
      getPlayerNames,
      getQuestions,
      getMoreInfo
    };
}