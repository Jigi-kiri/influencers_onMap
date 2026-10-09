# Influencers on Map

A full-stack web app for exploring influencers on an interactive map. The backend serves influencer data from Elasticsearch, while the frontend renders a Leaflet map with category filters and search-based lookups.

## Overview

This project visualizes influencer data geographically and lets users:

- view influencers on a map
- filter by category
- search for an influencer by name
- inspect top influencers by category
- explore metadata such as followers, subscriber counts, and platform category

## Tech Stack

- Frontend: React, Leaflet, Material UI
- Backend: FastAPI
- Search engine: Elasticsearch
- API communication: Axios

## Repository Structure

```text
influencers_onMap/
├── backend/
│   ├── fixture/
│   ├── influencers/
│   ├── main.py
│   └── shcema.py
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

- Interactive map visualization of influencer locations
- Filter panel for category-based display
- Search by influencer name
- Ranking endpoints for top influencers by followers or subscribers
- API endpoints backed by Elasticsearch indexing

## Prerequisites

Before running the project, make sure you have:

- Node.js and npm
- Python 3.10+
- Elasticsearch running locally on `http://localhost:9200`

## Local Setup

### 1) Start Elasticsearch

Make sure an Elasticsearch instance is running locally on port 9200.

### 2) Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install fastapi uvicorn elasticsearch
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The backend exposes the API on:

- `http://127.0.0.1:8000`

### 3) Frontend setup

```bash
cd frontend
npm install
npm start
```

The frontend will run by default on:

- `http://localhost:3000`

The frontend environment file already points to the backend:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

## API Endpoints

The backend exposes the following endpoints:

- `GET /influencers` - returns all indexed influencers
- `GET /influencer/{name}` - returns influencers matching a name
- `POST /upload-influencers` - indexes data from the fixture JSON file
- `GET /top3category/{category}` - returns the top 3 influencers for a given category
- `DELETE /delete-index/{index_name}` - deletes a search index

## Example workflow

1. Start Elasticsearch.
2. Start the backend API.
3. Trigger the influencer upload endpoint or ensure fixture data has been indexed.
4. Start the frontend and open the app in the browser.
5. Explore the map and apply filters.

## Notes

- The project currently expects Elasticsearch to be available at `localhost:9200`.
- The frontend communicates with the backend via the `REACT_APP_API_URL` environment variable.
- The app uses a fixture dataset under `backend/fixture` for initial indexing.

## License

This project does not currently specify a license file. Add one if you plan to distribute or publish the code publicly.
