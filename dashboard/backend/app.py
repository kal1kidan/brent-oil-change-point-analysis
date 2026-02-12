# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # allow requests from React frontend

# Load CSV files
historical_df = pd.read_csv("BrentOilPrices.csv")
change_points_df = pd.read_csv("change_points copy.csv")
event_correlations_df = pd.read_csv("events.csv")

# API endpoints
@app.route("/api/historical", methods=["GET"])
def get_historical():
    return jsonify(historical_df.to_dict(orient="records"))

@app.route("/api/change_points", methods=["GET"])
def get_change_points():
    return jsonify(change_points_df.to_dict(orient="records"))

@app.route("/api/event_correlations", methods=["GET"])
def get_event_correlations():
    return jsonify(event_correlations_df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)


