export default function sampleData() {
  function intro(req, res) {
    var briefIntro = {
      title: "Globe Genius Africa - Kenya",
      flagImageUrl:
        "https://cdn.britannica.com/15/15-050-B075588A/Flag-Kenya.jpg?w=400&h=235&c=crop",
      countryName: "Kenya",
      countrySummary:
        "Kenya, officially the Republic of Kenya, is a country in Eastern Africa. It is known for its diverse landscapes, wildlife, and cultures. The capital and largest city is Nairobi.",
    };

    var questions = [
      {
        id: "q1",
        text: "What is the capital of Kenya?",
        options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
        correctAnswer: "Nairobi",
      },
      {
        id: "q2",
        text: "Where is Kenya located in Africa",
        options: ["North", "West", "East", "South"],
        correctAnswer: "East",
      },
    ];

    var challengeDescription = {
      challenge:
        "Nairobi National Park is threatened by urban encroachment and habitat loss. Can you propose a conservation plan that balances urban development and wildlife protection?",
    };

    var leaders = [
      {
        name: "John",
        text: "32 global-coins",
      },
      {
        name: "Hugo",
        text: "16 global-coins",
      },
    ];

    res.render("homepage", {
      briefIntro,
      questions,
      challengeDescription,
      leaders,
    });
  }

  return {
    intro,
  };
}
