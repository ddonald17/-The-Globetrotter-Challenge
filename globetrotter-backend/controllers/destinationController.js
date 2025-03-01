const Destination = require("../models/Destination");

exports.getRandomDestination = async (req, res) => {
  try {
    // Count total destinations
    const count = await Destination.countDocuments();
    
    // Generate a random index
    const random = Math.floor(Math.random() * count);
    
    // Get the random destination
    const destination = await Destination.findOne().skip(random);
    
    if (!destination) {
      return res.status(404).json({ message: "No destinations found" });
    }

    // Get 3 more random destinations for multiple choice options
    const otherDestinations = await Destination.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } },
      { $project: { _id: 1, city: 1 } }
    ]);

    // Create the basic response with clues
    const response = destination.getCluesOnly();

    const correctAnswer = { id: destination._id, city: destination.city };
    const otherAnswers = otherDestinations.map(d => ({ id: d._id, city: d.city }));

    // Shuffle answers
    const allAnswers = [correctAnswer, ...otherAnswers].sort(() => 0.5 - Math.random());

    response.possibleAnswers = allAnswers;

    res.json(response);
  } catch (error) {
    console.error("Error fetching random destination:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.revealDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Get reveal info
    const revealInfo = destination.getRevealInfo();

    const response = {
      id: revealInfo.id,
      city: revealInfo.city,
      country: revealInfo.country,
      funFacts: revealInfo.funFacts,
      trivia: revealInfo.trivia,
      image: revealInfo.image
    };

    res.json(response);
  } catch (error) {
    console.error("Error revealing destination:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkGuess = async (req, res) => {
  try {
    const { destinationId, guessId } = req.body;

    if (!destinationId || !guessId) {
      return res.status(400).json({ message: "Both destinationId and guessId are required" });
    }

    // Check if answer is correct
    const isCorrect = destinationId === guessId;

    // Get destination details
    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Get reveal info
    const revealInfo = destination.getRevealInfo();

    // Select a random fun fact
    const randomFunFactIndex = Math.floor(Math.random() * revealInfo.funFacts.length);

    const response = {
      correct: isCorrect,
      destination: {
        id: revealInfo.id,
        city: revealInfo.city,
        funFact: revealInfo.funFacts[randomFunFactIndex],
        image: revealInfo.image
      }
    };

    res.json(response);
  } catch (error) {
    console.error("Error checking guess:", error);
    res.status(500).json({ message: "Server error" });
  }
};
