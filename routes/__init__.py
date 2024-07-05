from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

router = APIRouter()

class PredictionInput(BaseModel):
    numTravelers: int
    budget: int
    areaOfInterest: str
    preferredClimate: str
    transportMode: str

model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'travel_decision_tree_model.pkl')
model = joblib.load(model_path)

@router.post("/recommend")
async def predict(data: PredictionInput):
    try:
        input_data = np.array([[data.numTravelers, data.budget, data.areaOfInterest, data.preferredClimate, data.transportMode]])
        prediction = model.predict(input_data)
        return {"prediction": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
