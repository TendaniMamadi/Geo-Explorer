import axios from "axios"

export default function displayData() {
  async function getPlayer(req, res) {
    const response = await axios.get("http://localhost:3030/api/names");

    var responseData = response.data

    res.render("leaderBoard", responseData)
  }
  
  async function getQuestions(req, res) {
    const country = req.params.country

    const response = await axios.get(`http://localhost:3030/api/questions/${country}`);

    var questionData = response.data
    
    var options = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"]

    res.render("quiz", { questionData, country })
  }

  async function getMoreInfo(req, res) {

    const country = req.query.country
    // console.log(country);

    const response = await axios.get(
      `http://localhost:3030/api/moreInfo?country=${country}`
    );



    var moreInfoData = response.data

    // console.log(moreInfoData)

    res.render("moreInfo", { moreInfoData, country });
  }


  return {
    getPlayer,
    getQuestions,
    getMoreInfo,
  };
}
