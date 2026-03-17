from fastapi import FastAPI
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + columns
model = pickle.load(open("../model/model.pkl", "rb"))
columns = pickle.load(open("../model/columns.pkl", "rb"))

# -------------------------------
# Helper Functions (WOW FEATURES)
# -------------------------------

def get_risk(prob):
    if prob > 0.7:
        return "High Risk"
    elif prob > 0.4:
        return "Medium Risk"
    else:
        return "Low Risk"

def get_alert(prob):
    if prob > 0.6:
        return "⚠️ High chance of churn! Immediate action required."
    return "No immediate risk"

def calculate_clv(data):
    return data['MonthlyCharges'] * data['tenure']

def get_clv_category(clv):
    if clv > 5000:
        return "High Value Customer"
    elif clv > 2000:
        return "Medium Value Customer"
    else:
        return "Low Value Customer"

def get_segment(data, risk):
    if risk == "High Risk" and data['HighValue'] == 1:
        return "High Value - At Risk"
    elif risk == "High Risk":
        return "Regular - At Risk"
    elif risk == "Medium Risk":
        return "Medium Engagement"
    else:
        return "Safe Customer"

def get_strategy(risk, clv_category):
    if risk == "High Risk" and clv_category == "High Value Customer":
        return "Offer premium discount + personal call"
    elif risk == "High Risk":
        return "Provide discount or special offer"
    elif risk == "Medium Risk":
        return "Send engagement email or offer upgrade"
    else:
        return "No action needed"

# -------------------------------
# API Endpoint
# -------------------------------

@app.post("/predict")
def predict(data: dict):

    # Convert input to DataFrame
    input_df = pd.DataFrame([data])

    # Ensure same columns as training
    input_df = input_df.reindex(columns=columns, fill_value=0)

    # Model prediction
    prediction = model.predict(input_df)[0]
    prob = model.predict_proba(input_df)[0][1]

    churn = "Yes" if prediction == 1 else "No"

    # WOW Features
    risk = get_risk(prob)
    alert = get_alert(prob)

    # Use original input for business logic
    original_data = data

    clv = calculate_clv(original_data)
    clv_category = get_clv_category(clv)

    segment = get_segment(original_data, risk)
    strategy = get_strategy(risk, clv_category)

    # Final response
    return {
        "churn": churn,
        "probability": round(float(prob), 3),
        "risk": risk,
        "alert": alert,
        "clv": clv,
        "clv_category": clv_category,
        "segment": segment,
        "retention_strategy": strategy
    }