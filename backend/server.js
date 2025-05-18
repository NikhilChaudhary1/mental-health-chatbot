const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Ollama } = require('ollama');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Model configuration
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'phi3:mini';

// Initialize Ollama client
let ollamaClient;
let ollamaConfigured = false;
try {
  ollamaClient = new Ollama({
    host: OLLAMA_HOST
  });
  ollamaConfigured = true;
  console.log('✅ Ollama client initialized successfully');
  console.log(`Using model: ${MODEL_NAME}`);
} catch (error) {
  console.error('❌ Error initializing Ollama client:', error);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Mental Health Chatbot API is running',
    ollamaConfigured: ollamaConfigured,
    model: MODEL_NAME
  });
});

// Mental health chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    // Validate Ollama setup
    if (!ollamaConfigured) {
      return res.status(503).json({ 
        error: 'Ollama client is not configured properly.' 
      });
    }

    const { message, conversationHistory } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare conversation messages
    let messages = [];
    
    // Add system prompt
    messages.push({
      role: 'system',
      content: `You are a compassionate and supportive mental health assistant. 
      Your purpose is to provide empathetic support, helpful resources, and positive coping strategies. 
      You are not a replacement for professional therapy or medical advice.
      Always encourage seeking professional help for serious mental health concerns.
      Maintain a warm, understanding tone and prioritize user well-being and safety.`
    });
    
    // Add conversation history if available
    if (conversationHistory && Array.isArray(conversationHistory)) {
      messages = messages.concat(conversationHistory);
    }
    
    // Add the new user message
    messages.push({
      role: 'user',
      content: message
    });

    // Send the conversation to Ollama
    const response = await ollamaClient.chat({
      model: MODEL_NAME,
      messages: messages,
      options: {
        temperature: 0.7,
      }
    });

    res.json({ 
      reply: response.message.content,
      role: 'assistant' 
    });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Something went wrong', 
      details: error.message 
    });
  }
});

// Crisis resources endpoint
app.get('/api/resources', (req, res) => {
  const resources = [
    {
      name: 'National Suicide Prevention Lifeline',
      description: 'Free and confidential support for people in distress',
      contact: '1-800-273-8255',
      website: 'https://suicidepreventionlifeline.org/'
    },
    {
      name: 'Crisis Text Line',
      description: 'Free 24/7 text support for those in crisis',
      contact: 'Text HOME to 741741',
      website: 'https://www.crisistextline.org/'
    },
    {
      name: 'SAMHSAs National Helpline',
      description: 'Treatment referral and information service',
      contact: '1-800-662-4357',
      website: 'https://www.samhsa.gov/find-help/national-helpline'
    },
    {
      name: 'National Alliance on Mental Illness (NAMI)',
      description: 'Mental health education, resources and support',
      contact: '1-800-950-6264',
      website: 'https://www.nami.org/'
    }
  ];

  res.json(resources);
});

// Start the server
app.listen(port, () => {
  console.log(`Mental Health Chatbot server running on port ${port}`);
  console.log(`Health endpoint: http://localhost:${port}/api/health`);
});