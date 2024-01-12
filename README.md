## Setup

The source code is divided in two main folders: backend and frontend.  

To run the application locally, you first must have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Python](https://www.python.org/downloads/) installed. 

### Frontend

To run the frontend, execute the following commands:

    cd src/frontend
    npm i --legacy-peer-deps
    npm start

### Backend

To run the backend, execute the following commands:

    pip install -r src/backend/requirements.txt
    cd src/backend
    python server.py

You should also create a .env file on the backend comprising the OpenAI's and Azure's API Key to generate descriptions and get assessments. To do so, simply add the following lines to the beggining of your .env file:

    OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    AZURE_KEY=YOUR_AZURE_API_KEY
    AZURE_REGION=YOUR_AZURE_REGION
    AZURE_LANG=YOUR_AZURE_LANG
