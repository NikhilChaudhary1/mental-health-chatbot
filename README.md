# MindfulChat - AI Mental Health Support Chatbot

MindfulChat is an AI-powered mental health support chatbot designed to provide empathetic conversations, coping strategies, and mental health resources. It uses Ollama Phi to generate supportive and helpful responses.

## Features

- 🧠 AI-powered mental health conversations
- 🤗 Empathetic and supportive responses
- 📚 Access to mental health resources
- 💬 Real-time chat interface
- 🔒 Privacy-focused design
- 😌 Mood tracking functionality
- 🧘‍♂️ Interactive breathing exercises

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **AI Integration**: Ollama Phi

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Ollama with Phi model installed

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/mental-health-chatbot.git
cd mental-health-chatbot
```

2. Install backend dependencies:

```
cd backend
npm install
```

3. Set up environment variables:

   - Create a `.env` file in the backend directory
   - Configure Ollama host (optional): `OLLAMA_HOST=http://localhost:11434`
   - Set model name: `OLLAMA_MODEL=phi`
   - Set port (optional): `PORT=5000`

4. Install frontend dependencies:

```
cd ../frontend
npm install
```

### Setting up Ollama Phi

1. Install Ollama from https://ollama.com/
2. Pull the Phi model with the following command:
   ```
   ollama pull phi
   ```
3. Verify the model is installed with:
   ```
   ollama list
   ```
4. Ensure Ollama is running before starting the application

### Running the Application

1. Start the backend server:

```
cd backend
npm run dev
```

2. In a separate terminal, start the frontend:

```
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Important Note

This chatbot is not a replacement for professional mental health services. If you or someone you know is experiencing a mental health emergency, please contact a mental health professional or a crisis hotline immediately.

## License

MIT

## Acknowledgements

- Microsoft for developing the Phi model
- Ollama for providing easy access to open-source models
- The mental health community for inspiration and guidance
