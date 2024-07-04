"use client";
import { useState } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";

const RecommendationForm = ({ onRecommend }) => {
  const [numTravelers, setNumTravelers] = useState('');
  const [budget, setBudget] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [preferredClimate, setPreferredClimate] = useState('');
  const [transportMode, setTransportMode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numTravelers,
        budget,
        areaOfInterest,
        preferredClimate,
        transportMode
      })
    });
    const result = await response.json();
    onRecommend(result.recommendation);
  };

  return (
    
    <section className=' min-h-screen'>
        
        <div className='mx-16'>
            <form onSubmit={handleSubmit} >
            <BackgroundBeams />
                <div className=' md:flex gap-x-10 justify-between mx-auto'>
                    <div>
                        <label>
                            Number of Travelers:<br/>
                            <input type="number" value={numTravelers} onChange={(e) => setNumTravelers(e.target.value)} required 
                                className=''/>
                        </label>
                    </div>

                    <div>
                        <label>
                            Budget:<br/>
                            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Area of Interest:<br/>
                            <select value={areaOfInterest} onChange={(e) => setAreaOfInterest(e.target.value)} required>
                            <option value="Mountains">Mountains</option>
                            <option value="Beach">Beach</option>
                            <option value="Forest">Forest</option>
                            <option value="Lakeside">Lakeside</option>
                            <option value="Desert">Desert</option>
                            <option value="Historical Site">Historical Site</option>
                            <option value="City">City</option>
                            <option value="National Park">National Park</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Preferred Climate:<br/>
                            <select value={preferredClimate} onChange={(e) => setPreferredClimate(e.target.value)} required>
                            <option value="Cool">Cool</option>
                            <option value="Sunny">Sunny</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Warm">Warm</option>
                            <option value="Hot">Hot</option>
                            <option value="Cold">Cold</option>
                            <option value="Tropical">Tropical</option>
                            <option value="Wet">Wet</option>
                            </select>
                        </label>
                    </div>
                   <div>
                        <label>
                            Transport Mode:<br/>
                            <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)} required>
                            <option value="Car">Car</option>
                            <option value="Van">Van</option>
                            <option value="Rosa Bus">Rosa Bus</option>
                            <option value="Bikes">Bikes</option>
                            <option value="Public Transport">Public Transport</option>
                            </select>
                            </label>
                   </div>
                </div>
            <button type="submit">Get Recommendation</button>
            </form>
        </div>
    </section>
  );
};

export default RecommendationForm;
