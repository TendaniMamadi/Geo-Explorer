export default function GeoExplorerAPIRoutes(geoExplorerServices){
    async function getQuestions(req, res) {
        const country = req.params.country;

        const countryId = await geoExplorerServices.getCountryId(country);

        const questions = await geoExplorerServices.getQuestionsForCountry(countryId);

        res.json({
            questions
        })
    }
    
    return {
        getQuestions
    }
}