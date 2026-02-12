# Brent Oil Dashboard

## Overview

The **Brent Oil Dashboard** is an interactive web application to visualize historical Brent oil prices, detect change points, and explore how different events affect price fluctuations. The dashboard allows stakeholders to analyze oil price trends, event correlations, and key indicators such as volatility and price spikes.

**Key Features:**

- Display historical Brent oil prices.
- Highlight **change points** (red dots) and **events** (green dots) on the chart.
- Filter data by **start and/or end date**.
- Responsive design for desktop, tablet, and mobile.
- Drill-down capability for detailed insights.

---

## Folder Structure

dashboard/
├── backend/
│ ├── app.py # Flask backend serving API endpoints
│ ├── BrentOilPrices.csv # Historical price data
│ ├── change_points copy.csv # Change point data
│ └── events.csv # Event correlation data
├── frontend/
│ ├── src/
│ │ ├── App.js # Main React component
│ │ └── index.js
│ ├── package.json
│ └── public/
└── README.md

---

## Backend Setup (Flask)

1. **Create & activate environment:**

```bash
conda create -n oil-change-point python=3.10
conda activate oil-change-point
pip install flask flask-cors pandas
cd backend
python app.py
Frontend Setup (React)

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:

npm start


The dashboard runs on: http://localhost:3000
How to Use

Open the dashboard in your browser.

Set Start Date and/or End Date to filter historical data.

Observe red dots for detected change points and green dots for events.

Hover over points to explore data values (future enhancement: tooltip with event names).

Explore different periods to analyze how events influenced Brent oil prices.

Technologies Used

Backend: Python, Flask, Pandas, Flask-CORS

Frontend: React, Recharts

Visualization: Interactive line chart with scatter points for events and change points

Notes

The dashboard is designed for development use. For production, a proper WSGI server should be used for Flask, and React should be built using npm run build.

Ensure Flask server is running before starting the React frontend; otherwise, data fetching will fail.

Future Improvements

Add tooltips for change points and events showing descriptions.

Add volatility indicators or average price changes around events.

Enable downloadable reports or charts for stakeholders.

Improve mobile responsiveness with enhanced layout and navigation.