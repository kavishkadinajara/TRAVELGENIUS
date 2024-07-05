"use client";
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Recommendation() {
  const [numTravelers, setNumTravelers] = useState('');
  const [budget, setBudget] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [preferredClimate, setPreferredClimate] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Number_of_Travelers: numTravelers,
          Budget: budget,
          Area_of_Interest: areaOfInterest,
          Preferred_Climate: preferredClimate,
          Transportation_Mode: transportMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setRecommendation(result.recommendation);

      // Fetch details from Google for the recommended place
      const googleResponse = await fetchGoogleDetails(result.recommendation);
      setDetails(googleResponse);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoogleDetails = async (place) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/google-places`, {
        params: { input: place }
      });

      if (response.data.status === "REQUEST_DENIED") {
        throw new Error(response.data.error_message);
      }

      return {
        google: response.data,
      };
    } catch (error) {
      console.error('Error fetching Google details:', error);
      setApiError(error.message);
      return null;
    }
  };

  return (
    <section className="py-12">
      <div className='flex justify-center text-lg px-10 md:text-xl lg:text-2xl mb-8'>
        <h1 className="font-bold text-gray-500 text-center">Select your options to find the best places...</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-8 px-20 rounded-xl shadow-md max-w-4xl mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div>
            <label htmlFor="numTravelers" className="block text-sm font-medium text-gray-700">Number of Travelers:</label>
            <input
              type="number"
              id="numTravelers"
              value={numTravelers}
              onChange={(e) => setNumTravelers(e.target.value)}
              required
              className='mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full'
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget:</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className='mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full'
            />
          </div>
          <div>
            <label htmlFor="areaOfInterest" className="block text-sm font-medium text-gray-700">Area of Interest:</label>
            <select
              id="areaOfInterest"
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
              required
              className='mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full'
            >
              <option className='bg-black' value="Mountains">Mountains</option>
              <option className='bg-black' value="Beach">Beach</option>
              <option className='bg-black' value="Forest">Forest</option>
              <option className='bg-black' value="Lakeside">Lakeside</option>
              <option className='bg-black' value="Desert">Desert</option>
              <option className='bg-black' value="Historical Site">Historical Site</option>
              <option className='bg-black' value="City">City</option>
              <option className='bg-black' value="National Park">National Park</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferredClimate" className="block text-sm font-medium text-gray-700">Preferred Climate:</label>
            <select
              id="preferredClimate"
              value={preferredClimate}
              onChange={(e) => setPreferredClimate(e.target.value)}
              required
              className='mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full'
            >
              <option className='bg-black' value="Cool">Cool</option>
              <option className='bg-black' value="Sunny">Sunny</option>
              <option className='bg-black' value="Moderate">Moderate</option>
              <option className='bg-black' value="Warm">Warm</option>
              <option className='bg-black' value="Hot">Hot</option>
              <option className='bg-black' value="Cold">Cold</option>
              <option className='bg-black' value="Tropical">Tropical</option>
              <option className='bg-black' value="Wet">Wet</option>
            </select>
          </div>
          <div>
            <label htmlFor="transportMode" className="block text-sm font-medium text-gray-700">Transport Mode:</label>
            <select
              id="transportMode"
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              required
              className='mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full'
            >
              <option className='bg-black' value="Car">Car</option>
              <option className='bg-black' value="Van">Van</option>
              <option className='bg-black' value="Rosa Bus">Rosa Bus</option>
              <option className='bg-black' value="Bikes">Bikes</option>
              <option className='bg-black' value="Public Transport">Public Transport</option>
            </select>
          </div>
        </div>

        <div className='flex justify-center mt-8'>
          <button type="submit" className='px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition'>
            Get Recommendations
          </button>
        </div>
      </form>

      {loading && <div className="flex justify-center mt-4 text-white">Loading...</div>}

      {apiError && <div className="flex justify-center mt-4 text-red-500">{apiError}</div>}

      {recommendation && (
        <div className="mt-8 p-8 rounded-xl shadow-md  text-white max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Recommended Place: {recommendation}</h2>
          {details && details.google.candidates && details.google.candidates.length > 0 ? (
            <div>
              <p className='text-center mb-4'>Here are some details about <span className="text-blue-300 font-bold">{recommendation}</span>:</p>
              <p className="mb-4"><strong>Name:</strong> {details.google.candidates[0].name}</p>
              <p className="mb-4"><strong>Address:</strong> {details.google.candidates[0].formatted_address}</p>
              {details.google.candidates[0].photos && details.google.candidates[0].photos.length > 0 && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details.google.candidates[0].photos[0].photo_reference}&key=${googleApiKey}`}
                  alt={details.google.candidates[0].name}
                  className="rounded-lg shadow-md w-full h-auto"
                />
              )}
            </div>
          ) : (
            <div className='text-center'>No details available for the recommended place.</div>
          )}
        </div>
      )}
    </section>
  );
}
