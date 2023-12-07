import axios from "axios"

export default function displayData() {
  async function getPlayer(req, res) {
    const response = await axios.get("https://geo-explorer-rvdp.onrender.com//api/names");

    var responseData = response.data

    res.render("leaderBoard", responseData)
  }
  
  async function getQuestions(req, res) {
    const country = req.params.country

    const response = await axios.get(`https://geo-explorer-rvdp.onrender.com//api/questions/${country}`);

    var questionData = response.data

    res.render("quiz", { questionData, country })
  }

  async function getMoreInfo(req, res) {

    const country = req.query.country
    // console.log(country);

    const response = await axios.get(
      `https://geo-explorer-rvdp.onrender.com/api/moreInfo?country=${country}`
    );



    var moreInfoData = response.data

    res.render("moreInfo", { moreInfoData, country });
  }


  return {
    getPlayer,
    getQuestions,
    getMoreInfo,
  };
}
