## Setup

The source code is divided in two main folders: backend and frontend.  

To run the application locally, you first must have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Python](https://www.python.org/downloads/) installed. 

### Frontend

TBD

### Backend

To run the backend, execute the following commands:

    pip install -r src/backend/requirements.txt
    cd src/backend
    python server.py

You should also create a .env file on the backend comprising the OpenAI's API Key to generate descriptions. To do so, simply add the following line to the beggining of your .env file:

    OPENAI_API_KEY=YOUR_API_KEY
