// tests for the tags filtering function called matcher
const { matchImageWithPrediction } = require('./matcher');

// test for sedan car type
test('returns correct car details for sedan', () => {
  const prediction = {
    predictions: [
      { tagName: 'sedan', probability: 0.8 },
      { tagName: 'suv', probability: 0.2 },
    ],
  };
  const result = matchImageWithPrediction(prediction);
  expect(result.carType).toBe('sedan');
  expect(result.imageUrl).toBe('cars/2014-toyota-sai-23625781_17426966.jpg');
  
});

// test for suv car type
test('returns correct car details for suv', () => {
  const prediction = {
    predictions: [
      { tagName: 'suv', probability: 0.8 },
      { tagName: 'sedan', probability: 0.2 },
    ],
  };
  const result = matchImageWithPrediction(prediction);
  expect(result.carType).toBe('suv');
  expect(result.imageUrl).toBe('cars/2019-nissan-qashqai-23924142_17584165.jpg');
  
});

// test for hatchback car type
test('returns correct car details for hatchback', () => {
  const prediction = {
    predictions: [
      { tagName: 'hatchback', probability: 0.8 },
      { tagName: 'sedan', probability: 0.2 },
    ],
  };
  const result = matchImageWithPrediction(prediction);
  expect(result.carType).toBe('hatchback');
  expect(result.imageUrl).toBe('cars/2018-mazda-demio-23633232_17363625_gallery.jpg');
});

// test for convertible car type
test('returns correct car details for convertible', () => {
  const prediction = {
    predictions: [
      { tagName: 'convertible', probability: 0.8 },
      { tagName: 'sedan', probability: 0.2 },
    ],
  };
  const result = matchImageWithPrediction(prediction);
  expect(result.carType).toBe('convertible');
  expect(result.imageUrl).toBe('cars/2006-bmw-z4-24477841_17977993.jpg');
});

// test for no match found/negative tag
test('returns error when prediction returns negative tag', () => {
  const prediction = {
    predictions: [
      { tagName: 'negative', probability: 0.8 },
      { tagName: 'sedan', probability: 0.2 },
    ],
  };
  const result = matchImageWithPrediction(prediction);
  expect(result.error).toBe('No match found');
});