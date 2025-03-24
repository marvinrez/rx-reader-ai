# RX Reader AI API Documentation

This document provides detailed information about the RX Reader AI API endpoints, request/response formats, and usage examples.

## Base URL

All API endpoints are relative to the base URL:

```
https://api.rxreader.ai/v1
```

For local development:

```
http://localhost:5000/api
```

## Authentication

The API uses token-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_api_token>
```

## API Endpoints

### Prescription Analysis

#### Analyze Prescription Image

Analyzes a prescription image and returns structured information about medications.

**Endpoint:** `POST /analyze-prescription`

**Request:**

```json
{
  "image": "base64_encoded_image_string"
}
```

**Response:**

```json
{
  "analysis": {
    "medications": [
      {
        "name": "Lisinopril",
        "dosage": "10mg",
        "frequency": "once daily",
        "warnings": ["May cause dizziness", "Avoid alcohol"],
        "isValid": true
      }
    ],
    "unreadableImage": false,
    "additionalInfo": "Take with food in the morning."
  },
  "prescriptionId": 12345
}
```

**Status Codes:**

- `200 OK`: Analysis completed successfully
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Authentication failed
- `413 Payload Too Large`: Image size exceeds limit
- `422 Unprocessable Entity`: Image couldn't be processed
- `500 Internal Server Error`: Server error

**Example:**

```bash
curl -X POST https://api.rxreader.ai/v1/analyze-prescription \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{"image": "base64_encoded_image_string"}'
```

### Chat Messages

#### Send Message

Sends a message to the AI assistant and gets a response.

**Endpoint:** `POST /messages`

**Request:**

```json
{
  "content": "What are the side effects of Lisinopril?",
  "prescriptionId": 12345
}
```

**Response:**

```json
{
  "message": {
    "id": 67890,
    "content": "Common side effects of Lisinopril include dizziness, headache, fatigue, and dry cough. Less common but more serious side effects include swelling of the face, lips, tongue, or throat, which may require immediate medical attention. It's important to consult with your healthcare provider if you experience any concerning symptoms.",
    "role": "assistant",
    "createdAt": "2025-03-24T12:34:56.789Z"
  }
}
```

**Status Codes:**

- `200 OK`: Message processed successfully
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Authentication failed
- `404 Not Found`: Prescription not found
- `500 Internal Server Error`: Server error

**Example:**

```bash
curl -X POST https://api.rxreader.ai/v1/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{"content": "What are the side effects of Lisinopril?", "prescriptionId": 12345}'
```

#### Get Message History

Retrieves message history for a specific prescription.

**Endpoint:** `GET /messages/{prescriptionId}`

**Response:**

```json
{
  "messages": [
    {
      "id": 67889,
      "content": "What are the side effects of Lisinopril?",
      "role": "user",
      "createdAt": "2025-03-24T12:33:56.789Z"
    },
    {
      "id": 67890,
      "content": "Common side effects of Lisinopril include dizziness, headache, fatigue, and dry cough. Less common but more serious side effects include swelling of the face, lips, tongue, or throat, which may require immediate medical attention. It's important to consult with your healthcare provider if you experience any concerning symptoms.",
      "role": "assistant",
      "createdAt": "2025-03-24T12:34:56.789Z"
    }
  ]
}
```

**Status Codes:**

- `200 OK`: Messages retrieved successfully
- `401 Unauthorized`: Authentication failed
- `404 Not Found`: Prescription not found
- `500 Internal Server Error`: Server error

**Example:**

```bash
curl -X GET https://api.rxreader.ai/v1/messages/12345 \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Feedback

#### Submit Feedback

Submits feedback about the accuracy of an AI response.

**Endpoint:** `POST /feedback`

**Request:**

```json
{
  "messageId": 67890,
  "isAccurate": true,
  "comments": "The information provided was very helpful."
}
```

**Response:**

```json
{
  "feedback": {
    "id": 54321,
    "messageId": 67890,
    "isAccurate": true,
    "comments": "The information provided was very helpful.",
    "createdAt": "2025-03-24T12:40:56.789Z"
  }
}
```

**Status Codes:**

- `201 Created`: Feedback submitted successfully
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Authentication failed
- `404 Not Found`: Message not found
- `500 Internal Server Error`: Server error

**Example:**

```bash
curl -X POST https://api.rxreader.ai/v1/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{"messageId": 67890, "isAccurate": true, "comments": "The information provided was very helpful."}'
```

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

Common error codes:

- `INVALID_REQUEST`: The request format is invalid
- `AUTHENTICATION_FAILED`: Authentication failed
- `RESOURCE_NOT_FOUND`: The requested resource was not found
- `IMAGE_PROCESSING_ERROR`: Unable to process the image
- `AI_SERVICE_ERROR`: Error with the AI service
- `SERVER_ERROR`: Internal server error

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- 100 requests per hour for free tier
- 1,000 requests per hour for professional tier
- 10,000 requests per hour for enterprise tier

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1616771400
```

## Webhooks

The API supports webhooks for asynchronous processing of long-running tasks.

### Register Webhook

**Endpoint:** `POST /webhooks`

**Request:**

```json
{
  "url": "https://your-server.com/webhook",
  "events": ["prescription.analyzed", "message.created"]
}
```

**Response:**

```json
{
  "webhook": {
    "id": "wh_123456",
    "url": "https://your-server.com/webhook",
    "events": ["prescription.analyzed", "message.created"],
    "createdAt": "2025-03-24T12:40:56.789Z"
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { RXReaderClient } from 'rxreader-sdk';

const client = new RXReaderClient('YOUR_API_KEY');

// Analyze prescription
async function analyzePrescription(base64Image) {
  try {
    const result = await client.analyzePrescription(base64Image);
    console.log(result.medications);
  } catch (error) {
    console.error('Error analyzing prescription:', error);
  }
}

// Send message
async function sendMessage(content, prescriptionId) {
  try {
    const response = await client.sendMessage(content, prescriptionId);
    console.log(response.message.content);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
```

### Python

```python
from rxreader import RXReaderClient

client = RXReaderClient('YOUR_API_KEY')

# Analyze prescription
def analyze_prescription(base64_image):
    try:
        result = client.analyze_prescription(base64_image)
        print(result.medications)
    except Exception as e:
        print(f"Error analyzing prescription: {e}")

# Send message
def send_message(content, prescription_id):
    try:
        response = client.send_message(content, prescription_id)
        print(response.message.content)
    except Exception as e:
        print(f"Error sending message: {e}")
```

## Best Practices

1. **Image Quality**: For optimal results, ensure prescription images are:
   - Well-lit with even lighting
   - In focus with clear text
   - Captured straight-on without significant angle
   - Include the entire prescription

2. **Error Handling**: Implement robust error handling to manage various error types.

3. **Retry Strategy**: Implement exponential backoff for retrying failed requests.

4. **Caching**: Cache API responses where appropriate to reduce API calls.

5. **Webhook Reliability**: Acknowledge webhook events promptly and implement retry logic.

## Support

For API support, please contact:

- Email: api-support@rxreader.ai
- Documentation: https://docs.rxreader.ai
- Status page: https://status.rxreader.ai