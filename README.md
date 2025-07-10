# MegaPDF API Complete Documentation

## Base URL

```
http://localhost:8080
```

## Authentication

Most API endpoints require authentication via:

- **API Key**: `X-API-Key` header
- **Bearer Token**: `Authorization: Bearer <token>` header
- **Session Cookie**: `authToken` cookie

---

## 🔐 Authentication Routes

### 1. User Registration

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": false
  }
}
```

### 2. User Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user",
    "isEmailVerified": true
  }
}
```

### 3. User Logout

```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 4. Password Reset Request

```bash
curl -X POST http://localhost:8080/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

### 5. Password Reset Confirm

```bash
curl -X POST http://localhost:8080/api/auth/reset-password/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset-token",
    "newPassword": "newpassword123"
  }'
```

### 6. Google OAuth Authentication

```bash
curl -X GET http://localhost:8080/api/auth/google
```

### 7. Email Verification

```bash
curl -X GET "http://localhost:8080/api/auth/verify-email?token=verification-token"
```

### 8. Resend Verification Email

```bash
curl -X POST http://localhost:8080/api/auth/verify-email \
  -H "Authorization: Bearer <token>"
```

### 9. Validate Token

```bash
curl -X GET http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "valid": true,
  "userId": "user-uuid",
  "role": "user"
}
```

---

## 📄 PDF Processing Routes

### 1. PDF Compress

```bash
curl -X POST http://localhost:8080/api/pdf/compress \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "quality=medium"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `quality`: `high`, `medium`, `low`

**Response:**

```json
{
  "success": true,
  "message": "PDF compressed successfully",
  "fileUrl": "/api/file?folder=compressions&filename=uuid-compressed.pdf",
  "filename": "uuid-compressed.pdf",
  "originalName": "document.pdf",
  "fileSize": 1234567,
  "compressionRatio": 0.65,
  "billing": {
    "operationCost": 0.005,
    "currentBalance": 9.995,
    "freeOperationsRemaining": 499,
    "usedFreeOperation": true
  }
}
```

### 2. PDF Convert

```bash
curl -X POST http://localhost:8080/api/pdf/convert \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.docx" \
  -F "targetFormat=pdf"
```

**Parameters:**

- `file`: Input file (various formats supported)
- `targetFormat`: Output format (pdf, docx, txt, etc.)

### 3. PDF Merge

```bash
curl -X POST http://localhost:8080/api/pdf/merge \
  -H "X-API-Key: your-api-key" \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "files=@document3.pdf"
```

**Response:**

```json
{
  "success": true,
  "message": "PDFs merged successfully",
  "fileUrl": "/api/file?folder=merges&filename=uuid-merged.pdf",
  "filename": "uuid-merged.pdf",
  "fileSize": 2345678,
  "mergedFiles": 3,
  "billing": {
    "operationCost": 0.005,
    "currentBalance": 9.99,
    "freeOperationsRemaining": 498,
    "usedFreeOperation": true
  }
}
```

### 4. PDF Split

```bash
curl -X POST http://localhost:8080/api/pdf/split \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "splitMethod=range" \
  -F "pageRanges=1-3,4,5-7"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `splitMethod`: `range`, `extract`, `every`
- `pageRanges`: Page ranges (e.g., "1-3,4,5-7")
- `everyNPages`: Split every N pages (integer)

**Response:**

```json
{
  "success": true,
  "message": "PDF split successfully",
  "results": [
    {
      "filename": "uuid-split-1.pdf",
      "fileUrl": "/api/file?folder=splits&filename=uuid-split-1.pdf",
      "pageRange": "1-3",
      "fileSize": 123456
    },
    {
      "filename": "uuid-split-2.pdf",
      "fileUrl": "/api/file?folder=splits&filename=uuid-split-2.pdf",
      "pageRange": "4",
      "fileSize": 78901
    }
  ],
  "billing": {
    "operationCost": 0.005,
    "currentBalance": 9.985,
    "freeOperationsRemaining": 497,
    "usedFreeOperation": true
  }
}
```

### 5. PDF Split Status

```bash
curl -X GET "http://localhost:8080/api/pdf/split/status?id=operation-uuid" \
  -H "X-API-Key: your-api-key"
```

**Response:**

```json
{
  "id": "operation-uuid",
  "status": "completed",
  "progress": 100,
  "total": 3,
  "completed": 3,
  "results": [
    {
      "filename": "uuid-split-1.pdf",
      "fileUrl": "/api/file?folder=splits&filename=uuid-split-1.pdf"
    }
  ]
}
```

### 6. PDF Protect (Add Password)

```bash
curl -X POST http://localhost:8080/api/pdf/protect \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "password=mypassword123"
```

**Response:**

```json
{
  "success": true,
  "message": "PDF protected successfully",
  "fileUrl": "/api/file?folder=protected&filename=uuid-protected.pdf",
  "filename": "uuid-protected.pdf",
  "originalName": "document.pdf",
  "fileSize": 1234567,
  "billing": {
    "operationCost": 0.005,
    "currentBalance": 9.98,
    "freeOperationsRemaining": 496,
    "usedFreeOperation": true
  }
}
```

### 7. PDF Unlock (Remove Password)

```bash
curl -X POST http://localhost:8080/api/pdf/unlock \
  -H "X-API-Key: your-api-key" \
  -F "file=@protected.pdf" \
  -F "password=mypassword123"
```

**Response:**

```json
{
  "success": true,
  "message": "PDF unlocked successfully",
  "fileUrl": "/api/file?folder=unlocked&filename=uuid-unlocked.pdf",
  "filename": "uuid-unlocked.pdf",
  "originalName": "protected.pdf",
  "fileSize": 1234567,
  "billing": {
    "operationCost": 0.005,
    "currentBalance": 9.975,
    "freeOperationsRemaining": 495,
    "usedFreeOperation": true
  }
}
```

### 8. PDF Rotate

```bash
curl -X POST http://localhost:8080/api/pdf/rotate \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "rotation=90" \
  -F "pages=1-3"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `rotation`: Rotation angle (90, 180, 270)
- `pages`: Page range (e.g., "1-3" or "all")

### 9. PDF Watermark

```bash
curl -X POST http://localhost:8080/api/pdf/watermark \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "watermarkType=text" \
  -F "content=CONFIDENTIAL" \
  -F "position=center" \
  -F "opacity=50" \
  -F "rotation=45"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `watermarkType`: `text` or `image`
- `content`: Text content or base64 image
- `watermarkImage`: Image file (if type is image)
- `position`: `center`, `top-left`, `top-right`, `bottom-left`, `bottom-right`
- `opacity`: Transparency (10-100)
- `rotation`: Rotation angle (0-360)
- `scale`: Scale percentage (10-200)
- `textColor`: Color for text watermark
- `pages`: Page selection (`all`, `first`, `last`, `odd`, `even`, `custom`)
- `customPages`: Custom page ranges if pages=custom

### 10. PDF Add Page Numbers

```bash
curl -X POST http://localhost:8080/api/pdf/pagenumber \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "position=bottom-center" \
  -F "startNumber=1"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `position`: Page number position
- `startNumber`: Starting number

### 11. PDF Remove Pages

```bash
curl -X POST http://localhost:8080/api/pdf/remove \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "pages=2,4-6"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `pages`: Pages to remove (e.g., "2,4-6")

### 12. PDF Sign

```bash
curl -X POST http://localhost:8080/api/pdf/sign \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf" \
  -F "signature=@signature.png" \
  -F "x=100" \
  -F "y=200" \
  -F "page=1"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `signature`: Signature image file
- `x`: X position
- `y`: Y position
- `page`: Page number

### 13. PDF Extract Text

```bash
curl -X POST http://localhost:8080/api/pdf/extract-text \
  -H "X-API-Key: your-api-key" \
  -F "file=@document.pdf"
```

**Response:**

```json
{
  "success": true,
  "sessionId": "session-uuid",
  "extractedText": "Document text content...",
  "pageCount": 5,
  "editUrl": "/api/pdf/edit-session?sessionId=session-uuid"
}
```

### 14. PDF Save Edited Text

```bash
curl -X POST http://localhost:8080/api/pdf/save-edited-text \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-uuid",
    "editedText": "Modified document text..."
  }'
```

### 15. PDF Edit Session

```bash
curl -X GET "http://localhost:8080/api/pdf/edit-session?sessionId=session-uuid" \
  -H "X-API-Key: your-api-key"
```

### 16. PDF Generate Invoice

```bash
curl -X POST http://localhost:8080/api/pdf/generate-invoice \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "template-uuid",
    "data": {
      "customerName": "John Doe",
      "amount": 1000.00,
      "items": [
        {
          "description": "Service A",
          "quantity": 2,
          "price": 500.00
        }
      ]
    }
  }'
```

### 17. PDF Invoice Templates

```bash
curl -X GET http://localhost:8080/api/pdf/invoice-templates \
  -H "X-API-Key: your-api-key"
```

### 18. PDF Create Invoice Template

```bash
curl -X POST http://localhost:8080/api/pdf/create-invoice-template \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Standard Invoice",
    "template": "template-content"
  }'
```

### 19. PDF Cleanup

```bash
curl -X GET http://localhost:8080/api/pdf/cleanup \
  -H "X-API-Key: your-api-key"
```

---

## 🔍 OCR Routes

### 1. OCR PDF

```bash
curl -X POST http://localhost:8080/api/ocr \
  -H "X-API-Key: your-api-key" \
  -F "file=@scanned-document.pdf" \
  -F "language=eng"
```

**Parameters:**

- `file`: PDF file (max 50MB)
- `language`: OCR language (eng, spa, fra, etc.)

### 2. OCR Extract Text

```bash
curl -X POST http://localhost:8080/api/ocr/extract \
  -H "X-API-Key: your-api-key" \
  -F "file=@scanned-document.pdf"
```

---

## 👤 User Management Routes

### 1. Get User Profile

```bash
curl -X GET http://localhost:8080/api/user/profile \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "id": "user-uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "balance": 10.0,
  "freeOperationsUsed": 5,
  "freeOperationsRemaining": 495,
  "createdAt": "2023-01-01T00:00:00Z"
}
```

### 2. Update User Profile

```bash
curl -X PUT http://localhost:8080/api/user/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com"
  }'
```

### 3. Change Password

```bash
curl -X PUT http://localhost:8080/api/user/password \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword123"
  }'
```

### 4. Get User Balance

```bash
curl -X GET http://localhost:8080/api/user/balance \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "balance": 10.0,
  "freeOperationsUsed": 5,
  "freeOperationsRemaining": 495,
  "freeOperationsReset": "2023-02-01T00:00:00Z"
}
```

### 5. Create Deposit

```bash
curl -X POST http://localhost:8080/api/user/deposit \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 20.00,
    "currency": "USD"
  }'
```

### 6. Verify Deposit

```bash
curl -X POST http://localhost:8080/api/user/deposit/verify \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "transactionId": "transaction-uuid"
  }'
```

---

## 🔑 API Key Management Routes

### 1. List API Keys

```bash
curl -X GET http://localhost:8080/api/keys \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "keys": [
    {
      "id": "key-uuid",
      "name": "Production Key",
      "keyPreview": "ak_****1234",
      "createdAt": "2023-01-01T00:00:00Z",
      "lastUsed": "2023-01-15T10:30:00Z",
      "isActive": true
    }
  ]
}
```

### 2. Create API Key

```bash
curl -X POST http://localhost:8080/api/keys \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New API Key"
  }'
```

**Response:**

```json
{
  "id": "key-uuid",
  "name": "New API Key",
  "key": "ak_1234567890abcdef",
  "createdAt": "2023-01-01T00:00:00Z"
}
```

### 3. Revoke API Key

```bash
curl -X DELETE http://localhost:8080/api/keys/key-uuid \
  -H "Authorization: Bearer <token>"
```

---

## 💰 Public Pricing Routes

### 1. Get Pricing Information

```bash
curl -X GET http://localhost:8080/api/pricing
```

**Response:**

```json
{
  "operationCost": 0.005,
  "freeOperationsMonthly": 500,
  "customPrices": {
    "compress": 0.003,
    "ocr": 0.01
  },
  "lastUpdated": "2023-01-01T00:00:00Z",
  "source": "database"
}
```

### 2. Get Operation Pricing

```bash
curl -X GET http://localhost:8080/api/pricing/operation/compress
```

**Response:**

```json
{
  "operation": "compress",
  "cost": 0.003,
  "currency": "USD"
}
```

### 3. Pricing Calculator

```bash
curl -X POST http://localhost:8080/api/pricing/calculator \
  -H "Content-Type: application/json" \
  -d '{
    "operations": [
      {
        "operation": "compress",
        "count": 10
      },
      {
        "operation": "merge",
        "count": 5
      }
    ]
  }'
```

**Response:**

```json
{
  "totalCost": 0.055,
  "breakdown": [
    {
      "operation": "compress",
      "count": 10,
      "unitCost": 0.003,
      "totalCost": 0.03
    },
    {
      "operation": "merge",
      "count": 5,
      "unitCost": 0.005,
      "totalCost": 0.025
    }
  ],
  "currency": "USD"
}
```

---

## 📊 Usage Tracking Routes

### 1. Get Usage Statistics

```bash
curl -X GET http://localhost:8080/api/track-usage \
  -H "Authorization: Bearer <token>"
```

### 2. Track Operation

```bash
curl -X POST http://localhost:8080/api/track-usage \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "compress",
    "success": true,
    "fileSize": 1234567,
    "processingTime": 2.5
  }'
```

---

## 📁 File Serving Routes

### 1. Serve Processed File

```bash
curl -X GET "http://localhost:8080/api/file?folder=compressions&filename=uuid-compressed.pdf"
```

**Parameters:**

- `folder`: Folder name (compressions, merges, splits, etc.)
- `filename`: File name

---

## 🔧 System Routes

### 1. Health Check

```bash
curl -X GET http://localhost:8080/health
```

**Response:**

```json
{
  "status": "ok",
  "config_source": "environment_variables"
}
```

### 2. Validate Token

```bash
curl -X POST http://localhost:8080/api/validate-token \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-token-here"
  }'
```

---

## 🔔 Webhook Routes

### 1. PayPal Webhook

```bash
curl -X POST http://localhost:8080/api/webhooks/paypal \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "PAYMENT.CAPTURE.COMPLETED",
    "resource": {
      "id": "payment-id",
      "amount": {
        "value": "20.00",
        "currency_code": "USD"
      }
    }
  }'
```

---

## 📝 Error Responses

### Common Error Codes:

- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Invalid or missing authentication
- `402`: Payment Required - Insufficient balance
- `403`: Forbidden - Access denied
- `404`: Not Found - Resource not found
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server error

### Error Response Format:

```json
{
  "error": "Error message",
  "details": "Detailed error description",
  "code": "ERROR_CODE"
}
```

### Payment Required Response:

```json
{
  "error": "Insufficient funds",
  "details": {
    "balance": 0.0,
    "freeOperationsRemaining": 0,
    "operationCost": 0.005
  }
}
```

---

## 🔐 Security

- All API endpoints use HTTPS in production
- Rate limiting is enforced per API key
- File uploads are scanned for malicious content
- Maximum file size: 50MB
- API keys are hashed and stored securely
- Session tokens expire after 7 days

---

## 📖 Support

For API support and documentation:
- Health Check: `/health`

## 🚀 Getting Started

1. Register a new account: `POST /api/auth/register`
2. Login to get a token: `POST /api/auth/login`
3. Create an API key: `POST /api/keys`
4. Use the API key in requests: `X-API-Key: your-key`
5. Process your first PDF: `POST /api/pdf/compress`

---

## 📚 Available PDF Operations

| Operation        | Endpoint                    | Cost   | Description                    |
| ---------------- | --------------------------- | ------ | ------------------------------ |
| Compress         | `/api/pdf/compress`         | $0.005 | Reduce PDF file size           |
| Convert          | `/api/pdf/convert`          | $0.005 | Convert files to/from PDF      |
| Merge            | `/api/pdf/merge`            | $0.005 | Combine multiple PDFs          |
| Split            | `/api/pdf/split`            | $0.005 | Split PDF into multiple files  |
| Protect          | `/api/pdf/protect`          | $0.004 | Add password protection        |
| Unlock           | `/api/pdf/unlock`           | $0.005 | Remove password protection     |
| Watermark        | `/api/pdf/watermark`        | $0.005 | Add text/image watermarks      |
| Sign             | `/api/pdf/sign`             | $0.005 | Add digital signatures         |
| Rotate           | `/api/pdf/rotate`           | $0.005 | Rotate PDF pages               |
| OCR              | `/api/ocr`                  | $0.010 | Extract text from scanned PDFs |
| Extract Text     | `/api/pdf/extract-text`     | $0.005 | Extract editable text          |
| Page Numbers     | `/api/pdf/pagenumber`       | $0.005 | Add page numbers               |
| Remove Pages     | `/api/pdf/remove`           | $0.005 | Remove specific pages          |
| Generate Invoice | `/api/pdf/generate-invoice` | $0.005 | Create PDF invoices            |

All operations support billing with free monthly limits and paid usage tracking.
