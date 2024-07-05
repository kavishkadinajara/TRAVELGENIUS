from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and other necessary objects
model_path = 'model/travel_decision_tree_model.pkl'  # Corrected path
scaler_path = 'model/scaler.pkl'  # Corrected path
label_encoders_path = 'model/label_encoders.pkl'  # Corrected path

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
label_encoders = joblib.load(label_encoders_path)

class PredictionInput(BaseModel):
    Number_of_Travelers: int
    Budget: int
    Area_of_Interest: str
    Preferred_Climate: str
    Transportation_Mode: str

@app.post("/api/recommend")
async def recommend(data: PredictionInput):
    try:
        input_data = {
            "Number_of_Travelers": data.Number_of_Travelers,
            "Budget": data.Budget,
            "Area_of_Interest": data.Area_of_Interest,
            "Preferred_Climate": data.Preferred_Climate,
            "Transportation_Mode": data.Transportation_Mode
        }
        input_df = pd.DataFrame([input_data])
        for column in ['Area_of_Interest', 'Preferred_Climate', 'Transportation_Mode']:
            input_df[column] = label_encoders[column].transform(input_df[column])
        input_scaled = scaler.transform(input_df)
        recommendation_encoded = model.predict(input_scaled)
        recommendation = label_encoders['Recommendation'].inverse_transform(recommendation_encoded)
        return {"recommendation": recommendation[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
