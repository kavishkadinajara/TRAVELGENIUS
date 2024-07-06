"use client";
import React, { useState } from "react";
import axios from "axios";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Recommendation = () => {
  const [origin, setOrigin] = useState("");
  const [numTravelers, setNumTravelers] = useState("");
  const [budget, setBudget] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [preferredClimate, setPreferredClimate] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [district, setDistrict] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
    'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
  
    try {
      const recommendationResponse = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Area_of_Interest: areaOfInterest,
          Origin: origin,
          Preferred_Climate: preferredClimate,
          Number_of_Travelers: parseInt(numTravelers, 10),
          Budget: parseFloat(budget),
          Preferred_Accommodation: accommodation,
          Trip_Duration: parseInt(tripDuration, 10),
          District: district,
        }),
      });
  
      if (!recommendationResponse.ok) {
        throw new Error(`HTTP error! status: ${recommendationResponse.status}`);
      }
  
      const recommendationData = await recommendationResponse.json();
      setRecommendation(recommendationData.Destination);
  
      const wikipediaResponse = await fetchWikipediaDetails(recommendationData.Destination);
      setDetails(wikipediaResponse);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const fetchWikipediaDetails = async (place) => {
    try {
      const mainLocation = place.split(',')[0].trim();
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(mainLocation)}`);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching Wikipedia details:", error);
      throw error;
    }
  };

  return (
    <section className="py-12">
      <div className="flex justify-center text-lg px-12 md:text-xl lg:text-2xl mb-8">
        <h1 className="font-bold text-gray-500 text-center">Select your options to find the best places...</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-8 px-20 rounded-xl shadow-md max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Origin */}
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
              Your Origin:
            </label>
            <select
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            >
              <option className="bg-rose-950 text-white" value="" disabled>Select Your Origin</option>
              {districts.map((district) => (
                <option className="bg-black" value={district} key={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Travelers */}
          <div>
            <label htmlFor="numTravelers" className="block text-sm font-medium text-gray-700">
              Number of Travelers:
            </label>
            <input
              type="number"
              id="numTravelers"
              value={numTravelers}
              onChange={(e) => setNumTravelers(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            />
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget:
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            />
          </div>

          {/* Trip Duration */}
          <div>
            <label htmlFor="tripDuration" className="block text-sm font-medium text-gray-700">
              Trip Duration:
            </label>
            <input
              type="number"
              id="tripDuration"
              value={tripDuration}
              onChange={(e) => setTripDuration(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            />
          </div>

          {/* District */}
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              Your Origin:
            </label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            >
              <option className="bg-yellow-900 text-white" value="" disabled>Select Your Preferred District</option>
              {districts.map((district) => (
                <option className="bg-black" value={district} key={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          
          {/* Area of Interest */}
          <div>
            <label htmlFor="areaOfInterest" className="block text-sm font-medium text-gray-700">
              Area of Interest:
            </label>
            <select
              id="areaOfInterest"
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            >
              <option className="bg-blue-950 text-white" value="" disabled>Select Area of Interest</option>
              {[
                "Mountains", "Beach", "Forest", "Lakeside", "Wildlife", "Cultural", "Historical"
              ].map((area) => (
                <option className="bg-black" value={area} key={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Type of Accommodation */}
          <div>
            <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700">
              Type of Accommodation:
            </label>
            <select
              id="accommodation"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            >
              <option className="bg-green-950 text-white" value="" disabled>Select Type of Accommodation</option>
              {[
                "5-star hotel", "4-star hotel", "3-star hotel", "2-star hotel", "villa",
                "cottage", "camping", "guest houses", "other"
              ].map((type) => (
                <option className="bg-black" value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Climate */}
          <div>
            <label htmlFor="climate" className="block text-sm font-medium text-gray-700">
              Preferred Climate:
            </label>
            <select
              id="climate"
              value={preferredClimate}
              onChange={(e) => setPreferredClimate(e.target.value)}
              required
              className="mt-2 p-2 border text-white border-gray-300 bg-transparent rounded-xl w-full"
            >
              <option className="bg-purple-950 text-white" value="" disabled>Select Preferred Climate</option>
              {[
                "Cool", "Warm", "Tropical", "Moderate"
              ].map((climate) => (
                <option className="bg-black" value={climate} key={climate}>
                  {climate}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button type="submit" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition">
            Get Recommendations
          </button>
        </div>
      </form>

      {loading && <div className="flex justify-center mt-4 text-white">Loading...</div>}

      {/* {apiError && <div className="flex justify-center mt-4 text-red-500">{apiError}</div>} */}

      {recommendation && (
        <div className="mt-8 p-8 rounded-xl shadow-md text-white max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Recommended Place: {recommendation}</h2>
          {details ? (
            <div>
              <p className="text-center mb-4">
                Here are some details about <span className="text-blue-300 font-bold">{recommendation}</span>:
              </p>
              <p className="mb-4 text-justify">{details.extract}</p>
            </div>
          ) : (
            <div className="text-center">No details available for the recommended place.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default Recommendation;
