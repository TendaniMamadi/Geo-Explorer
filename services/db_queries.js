export default function GeoExplorerServices(db) {

    async function getCountryId(country) {
        const selectQuery = `SELECT id FROM countries WHERE countryname = $1`;

        const result = await db.oneOrNone(selectQuery, [country])

        return result.id;
    }

    async function getQuestionsForCountry(countryId) {
        const selectQuery = `SELECT question FROM questions WHERE id = $1`

        const result = await db.oneOrNone(selectQuery, [countryId])

        return result.question;
    }
    return {
        getCountryId,
        getQuestionsForCountry
    }
}