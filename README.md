# Health Insurance Bot

A Telegram bot that helps users explore health insurance options by collecting relevant information through an interactive conversation flow.

## Features

- Interactive conversation flow to collect user information
- Integration with OpenAI's GPT-3.5 for natural language processing
- MongoDB storage for conversation history
- Input validation for user responses
- State management for conversation flow

## Prerequisites

- Node.js
- MongoDB instance
- Telegram Bot Token
- OpenAI API Key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- TELEGRAM_BOT_TOKEN: Your Telegram bot token
- OPENAI_API_KEY: Your OpenAI API key
- MONGODB_URI: Your MongoDB connection string

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Project Structure

```plaintext
├── main.js                 # Application entry point
├── core.js                 # Core configuration and initialization
├���─ jobs/
│   ├── botHandler.js      # Telegram bot message handling
│   ├── gptHandler.js      # OpenAI GPT integration
│   └── conversationLogger.js # Conversation logging logic
├── models/
│   ├── conversation.js    # MongoDB conversation schema
│   └── userState.js       # User state management
└── utils/
    ├── database.js        # Database connection
    └── validators.js      # Input validation
```

## Conversation Flow

1. User starts the bot with `/start` command
2. Bot collects the following information:
   - Family size (number of people to be covered)
   - Annual household income
   - Gender (for demographic purposes)
3. Each response is validated and stored in MongoDB
4. GPT-3.5 processes responses to provide personalized recommendations

## Data Models

### Conversation Schema

```javascript
{
  userId: String,
  message: String,
  response: String,
  timestamp: Date,
  metadata: {
    familySize: Number,
    householdIncome: Number,
    gender: String
  }
}
```

### User State

```javascript
{
  step: String,          // current conversation step
  familySize: Number,    // number of people to be covered
  householdIncome: Number, // annual household income
  gender: String,        // user's gender
  completed: Boolean     // conversation completion status
}
```

## Error Handling

- MongoDB connection errors are logged and rethrown
- GPT API errors fallback to predefined prompts
- Invalid user inputs trigger validation messages
- All errors are logged for debugging

## Dependencies

- `node-telegram-bot-api`: Telegram Bot API integration
- `openai`: OpenAI GPT-3.5 integration
- `mongoose`: MongoDB object modeling
- `dotenv`: Environment variable management
- `nodemon`: Development auto-reload (dev dependency)

## License

ISC

## Security Considerations

- Store sensitive environment variables securely
- API rate limiting is implemented for OpenAI calls
- User data is stored according to GDPR guidelines
- MongoDB connection uses secure authentication
- Regular security audits of dependencies
