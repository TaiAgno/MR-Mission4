// matches the uploaded image with the highest probability from the prediction AI
const NO_PREDICTIONS_FOUND = "No predictions found";
const NO_MATCH_FOUND = "No match found";
const NEGATIVE = "Sorry, we do not have that in our inventory.";
const mongoose = require('mongoose');
const Car = require('./schemas/cars.js');

const uri = "taimission4-server.mongo.cosmos.azure.com";

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    async function matchImageWithPrediction(prediction) {
        if (!prediction.predictions || prediction.predictions.length === 0) {
            console.error(NO_PREDICTIONS_FOUND);
            return { error: NO_PREDICTIONS_FOUND, comment: "Sorry, no matches found." };
        }
    
        // find the prediction with the highest probability
        const highestProbabilityPrediction = prediction.predictions.reduce((prev, current) => {
            return (prev.probability > current.probability) ? prev : current;
        });
    
        // check if the tagName is within predictionDetails
        const tagName = highestProbabilityPrediction.tagName.toLowerCase();
        if (tagName === NEGATIVE) {
            return { error: NO_MATCH_FOUND, comment: "Sorry, we do not sell that." };
        } 
    
        try {
            // retrieve the car details from the database
            const results = await Car.find({tag: tagName});
            if (!results || results.length === 0) {
                return { error: NO_MATCH_FOUND, comment: "Sorry, no match found." };
            }
    
            console.log('Database results:', results);
    
            // return the information associated with the matched car type
            return results.map(result => ({
                carType: tagName,
                make: result.make,
                model: result.model,
                year: result.year,
                imageUrl: result.image,
                url: result.url,
                probability: highestProbabilityPrediction.probability,
            }));

        } catch (err) {
            console.error(err);
            return { error: err, comment: "An error occurred while retrieving data from the database. Please try again." };
        }
    }

module.exports = { matchImageWithPrediction };