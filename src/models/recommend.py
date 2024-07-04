import sys
import joblib
import pandas as pd

def main(args):
    try:
        print("Arguments received:", args)  # Print the received arguments for debugging
        num_travelers = int(args[1])
        budget = int(args[2])
        area_of_interest = args[3]
        preferred_climate = args[4]
        transport_mode = args[5]

        # Load the trained model
        model = joblib.load('/travel_decision_tree_model.pkl')

        # Create input dataframe
        input_data = {
            "Number_of_Travelers": [num_travelers],
            "Budget": [budget],
            "Area_of_Interest": [area_of_interest],
            "Preferred_Climate": [preferred_climate],
            "Transportation_Mode": [transport_mode]
        }
        input_df = pd.DataFrame(input_data)

        # Assuming model can handle raw inputs or categorical variables are preprocessed inside the model
        recommendation_encoded = model.predict(input_df)
        # Assuming the recommendation is directly interpretable
        recommendation = recommendation_encoded[0]

        print(recommendation)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main(sys.argv)
