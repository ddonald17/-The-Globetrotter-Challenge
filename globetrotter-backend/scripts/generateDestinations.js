const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Starter list of famous destinations
const starterDestinations = [
  'Paris, France',
  'Rome, Italy',
  'Kyoto, Japan',
  'New York City, USA',
  'Machu Picchu, Peru',
  'Sydney, Australia',
  'Cairo, Egypt',
  'Barcelona, Spain',
  'Rio de Janeiro, Brazil',
  'Amsterdam, Netherlands'
];

// Function to generate destination data using OpenAI
async function generateDestinationData(destinationName) {
  try {
    const prompt = `
    Create a detailed entry for a travel guessing game about "${destinationName}".
    Format the response as a JSON object with the following structure:
    {
      "city": "${destinationName}",
      "country": "country where ${destinationName} is located"
      "clues": [5 cryptic clues that hint at this destination without directly naming it],
      "funFacts": [5 interesting and lesser-known fun facts about this destination],
      "trivia": [5 pieces of trivia about this destination that people might not know]
    }
    Make the clues creative and challenging, but solvable with some thought.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 800
    });

    // Extract and parse the generated JSON
    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse generated destination data');
    }
    
    const destinationData = JSON.parse(jsonMatch[0]);
    return destinationData;
  } catch (error) {
    console.error(`Error generating data for ${destinationName}:`, error);
    return null;
  }
}

// Function to generate more destination names
async function generateMoreDestinations(count) {
  try {
    const prompt = `
    Generate ${count} famous travel destinations from around the world.
    Include a mix of cities, landmarks, natural wonders, and historical sites.
    Provide them in a comma-separated list format.
    Ensure they are diverse geographically and culturally.
    Each destination should be in the format: "Name, Country".
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    return content.split(',').map(dest => dest.trim()).filter(dest => dest.length > 0);
  } catch (error) {
    console.error('Error generating destination names:', error);
    return [];
  }
}

// Main function to generate the full dataset
async function generateDataset() {
  try {
    // First, generate more destinations to reach 100+
    console.log('Generating additional destination names...');
    const moreDestinations = await generateMoreDestinations(95);
    const allDestinations = [...starterDestinations, ...moreDestinations];
    
    console.log(`Generated a total of ${allDestinations.length} destinations`);
    
    // Generate data for each destination
    const dataset = [];
    let completed = 0;
    
    for (const destination of allDestinations) {
      console.log(`Generating data for ${destination} (${completed + 1}/${allDestinations.length})...`);
      const data = await generateDestinationData(destination);
      
      if (data) {
        dataset.push(data);
        completed++;
        
        // Save progress every 10 destinations
        if (completed % 10 === 0) {
          const outputPath = path.join(__dirname, '../data/destinations.json');
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));
          console.log(`Progress saved: ${completed}/${allDestinations.length} destinations`);
        }
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Save final dataset
    const outputPath = path.join(__dirname, '../data/destinations.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));
    
    console.log(`Dataset generation complete! Generated data for ${dataset.length} destinations.`);
    return dataset;
  } catch (error) {
    console.error('Error generating dataset:', error);
  }
}

// Run the generator
generateDataset();