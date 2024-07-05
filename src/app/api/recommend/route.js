import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') { // Use POST method
    const { Number_of_Travelers, Budget, Area_of_Interest, Preferred_Climate, Transportation_Mode } = req.body;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recommend', { // Use POST method
        Number_of_Travelers,
        Budget,
        Area_of_Interest,
        Preferred_Climate,
        Transportation_Mode,
      });

      res.status(200).json({ recommendation: response.data.recommendation });
      console.log(res);
    } catch (error) {
      console.error('Error fetching recommendation from FastAPI:', error);
      res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
