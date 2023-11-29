# OpenAI ChatGPT-4 Integration using Nodejs and expressjs

This project demonstrates how to integrate OpenAI's GPT-3.5 and GPT-4 model with an Express server to create and manage conversations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)
- OpenAI API Key

## Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the Repository:

   ```bash
   git clone https://github.com/RaheesAhmed/openai-chatgpt-api.git
   cd openai-chatgpt-api

   ```

2. Install Dependencies:
   Make sure you have installed all necessary dependencies by using this command in your terminal or command prompt:

```
npm install

```

## Setting Up OpenAI API Key:

Obtain an API key from OpenAI.
You will use this key with the /setKey endpoint to initialize the OpenAI client.

## Usage

Start the Server:

```
npm start

```

## Set OpenAI API Key:

Make a POST request to /setKey with the API key in the body:
json

```
{
  "apiKey": "YOUR_OPENAI_API_KEY"
}

```

## Start a Conversation:

Make a POST request to _/conversation_ with the required details:
json

```
{
  "instructions": "Respond to user queries",
  "messageContent": "Your initial message to GPT-3.5",
  "additionalInstructions": "Any additional instructions for GPT-3.5"
}

```

## You will get the full response object

```
{
    "assistantId": "asst_NqoaapcuDNwi78vmPqrPJKPA",
    "threadId": "thread_S4KVGKDuy9SGWQw6vAH0oNGK",
    "runId": "run_QEd7aQbkOtX6lnJi8Dxi4fRP",
    "messages": [
        {
            "id": "msg_slz6FrUMSEcUclVST3kile8r",
            "object": "thread.message",
            "created_at": 1701289332,
            "thread_id": "thread_S4KVGKDuy9SGWQw6vAH0oNGK",
            "role": "assistant",
            "content": [
                {
                    "type": "text",
                    "text": {
                        "value": "Hello! I can help you with a wide range of tasks, including but not limited to data analysis, programming, research, writing, and more. Feel free to let me know what you need assistance with, and I'll do my best to help you!",
                        "annotations": []
                    }
                }
            ],
            "file_ids": [],
            "assistant_id": "asst_NqoaapcuDNwi78vmPqrPJKPA",
            "run_id": "run_QEd7aQbkOtX6lnJi8Dxi4fRP",
            "metadata": {}
        },
        {
            "id": "msg_GukIF9gdmX0teTLRPqNxWF7V",
            "object": "thread.message",
            "created_at": 1701289331,
            "thread_id": "thread_S4KVGKDuy9SGWQw6vAH0oNGK",
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": {
                        "value": "Hello, how can you help me today?",
                        "annotations": []
                    }
                }
            ],
            "file_ids": [],
            "assistant_id": null,
            "run_id": null,
            "metadata": {}
        }
    ]
}

```

## Get Response by RunId:

Make a GET request to _/getResponse/:runId_ to retrieve the response from the conversation.

## index.js file details:

this files contains the code for each end point seperatly so you can get more control over openai new features.

## Built With

Nodejs
Express - The web framework used
OpenAI - OpenAI API for AI-powered conversations

## Developer by

Rahees Ahmed

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Thank you _OpenAI_ team for providing the best GPT-4 API.
