import fetch from 'node-fetch';

export async function get(req, res) {
  const { place } = req.query;

  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({ details: data.extract });
  } catch (error) {
    console.error('Error fetching Wikipedia details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
