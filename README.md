# 🚀 Customer Churn Intelligence System

An AI-powered full-stack web application that predicts customer churn and provides actionable business insights such as risk segmentation, customer lifetime value (CLV), and retention strategies.

---

## 📌 Problem Statement

Customer churn is a major challenge for telecom and subscription-based businesses. Predicting which customers are likely to leave allows companies to take proactive retention actions.

This project builds a machine learning system that:
- Predicts churn probability
- Identifies high-risk customers
- Provides business-driven retention strategies

---

## 🎯 Features

### 🔍 Core ML Features
- Churn Prediction (Yes / No)
- Churn Probability Score
- Model Comparison (Logistic Regression, Random Forest, Gradient Boosting)
- Feature Importance Analysis

### 💡 Business Intelligence (WOW Features)
- 🔴 Risk Categorization (Low / Medium / High)
- ⚠️ Early Warning System
- 👥 Customer Segmentation
- 💰 Customer Lifetime Value (CLV)
- 🎯 Retention Strategy Suggestions

### 🌐 Web Application
- Interactive Dashboard UI
- Real-time Predictions
- Data Visualization (Charts)
- Model Insights Page

---

## 🧠 Tech Stack

### 🔹 Machine Learning
- Python
- Scikit-learn
- Pandas, NumPy

### 🔹 Backend
- FastAPI

### 🔹 Frontend
- HTML, CSS, JavaScript
- Chart.js

### 🔹 Deployment
- Backend: Render
- Frontend: Vercel

---

## ⚙️ ML Workflow

1. Data Preprocessing
   - Handling missing values
   - Encoding categorical features
   - Feature scaling

2. Feature Engineering
   - AvgCharges
   - HighValue Customer
   - LongTerm Customer
   - Tenure Groups

3. Model Training
   - Logistic Regression
   - Random Forest
   - Gradient Boosting

4. Evaluation Metrics
   - Accuracy
   - Precision
   - Recall
   - F1 Score
   - ROC-AUC

5. Model Selection
   - Best model selected based on ROC-AUC

---

## 📊 Outputs

The system provides:

```json
{
  "churn": "Yes/No",
  "probability": 0.82,
  "risk": "High Risk",
  "alert": "Early warning message",
  "clv": 6500,
  "clv_category": "High Value Customer",
  "segment": "High Value - At Risk",
  "retention_strategy": "Offer discount"
}
🖥️ Project Structure
project/
│
├── backend/
│   └── app.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── insights.html
│
├── model/
│   ├── model.pkl
│   └── columns.pkl
│
├── notebook/
│   └── training.ipynb
│
├── dataset/
│   └── Telco Customer Churn Dataset
│
└── README.md
🚀 How to Run Locally
🔹 Backend
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

Open: http://127.0.0.1:8000/docs

🔹 Frontend

Simply open:

frontend/index.html
🌍 Deployment
🔹 Backend (Render)

Hosted using FastAPI

REST API endpoint available

🔹 Frontend (Vercel)

Deployed static web app

Connected to backend API

📈 Model Insights

Random Forest / Gradient Boosting performed best

Key factors influencing churn:

Contract Type

Tenure

Monthly Charges

🧠 Key Learnings

Importance of feature engineering in improving model performance

Handling imbalanced datasets

Building explainable ML systems

Integrating ML models into full-stack applications
