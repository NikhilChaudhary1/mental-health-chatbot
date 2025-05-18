# MindfulChat - AI Mental Health Support Chatbot

MindfulChat is an AI-powered mental health support chatbot designed to provide empathetic conversations, coping strategies, and mental health resources. It uses LLaMA Phi-3 to generate supportive and helpful responses.

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
- **AI Integration**: LLaMA Phi-3

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- LLaMA Phi-3 access or API key

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
   - Add your LLaMA Phi-3 API key: `LLAMA_API_KEY=your_llama_phi3_api_key_here`
   - Set port (optional): `PORT=5000`

4. Install frontend dependencies:

```
cd ../frontend
npm install
```

### Setting up LLaMA Phi-3

1. Access LLaMA Phi-3 through your preferred provider or API service
2. Obtain your API key or access credentials
3. Add the API key to your `.env` file
4. Ensure you have the necessary packages installed to interact with the LLaMA Phi-3 model

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

- Microsoft and Meta for developing the LLaMA Phi-3 model
- The mental health community for inspiration and guidance
