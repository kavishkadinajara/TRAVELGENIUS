import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { numTravelers, budget, areaOfInterest, preferredClimate, transportMode } = req.body;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict', {
        numTravelers,
        budget,
        areaOfInterest,
        preferredClimate,
        transportMode,
      });

      res.status(200).json({ recommendation: response.data.prediction });
    } catch (error) {
      console.error('Error fetching recommendation from FastAPI:', error);
      res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
