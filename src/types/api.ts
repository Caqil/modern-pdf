// Common response types
export interface ApiResponse {
  success: boolean;
}

export interface ErrorResponse {
  error: string;
  details?: string | Record<string, unknown>;
  code?: string;
}

// Auth types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified?: boolean;
  balance?: number;
  freeOperationsUsed?: number;
  freeOperationsRemaining?: number;
  createdAt?: string;
}

export interface AuthResponse extends ApiResponse {
  token: string;
  user: User;
}

export interface LogoutResponse extends ApiResponse {
  message: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  userId: string;
  role: string;
}

// PDF operation types
export interface BillingInfo {
  operationCost: number;
  currentBalance: number;
  freeOperationsRemaining: number;
  usedFreeOperation: boolean;
}

export interface FileOperationResponse extends ApiResponse {
  message: string;
  fileUrl: string;
  filename: string;
  originalName: string;
  fileSize: number;
  billing: BillingInfo;
}

export interface CompressResponse extends FileOperationResponse {
  compressionRatio: number;
}

export interface MergeResponse extends FileOperationResponse {
  mergedFiles: number;
}

export interface SplitResult {
  filename: string;
  fileUrl: string;
  pageRange: string;
  fileSize: number;
}

export interface SplitResponse extends ApiResponse {
  message: string;
  results: SplitResult[];
  billing: BillingInfo;
}

export interface SplitStatusResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  total: number;
  completed: number;
  results: { filename: string; fileUrl: string }[];
}

export interface ExtractTextResponse extends ApiResponse {
  sessionId: string;
  extractedText: string;
  pageCount: number;
  editUrl: string;
}

// OCR types
export interface OcrResponse extends FileOperationResponse {
  extractedText?: string;
}

// User management types
export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  balance: number;
  freeOperationsUsed: number;
  freeOperationsRemaining: number;
  createdAt: string;
}

export interface UserBalanceResponse {
  balance: number;
  freeOperationsUsed: number;
  freeOperationsRemaining: number;
  freeOperationsReset: string;
}

export interface DepositResponse extends ApiResponse {
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  paymentUrl?: string;
}

// API key management types
export interface ApiKey {
  id: string;
  name: string;
  keyPreview: string;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

export interface ApiKeyListResponse {
  keys: ApiKey[];
}

export interface ApiKeyCreationResponse {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

// Pricing types
export interface PricingInfo {
  operationCost: number;
  freeOperationsMonthly: number;
  customPrices: Record<string, number>;
  lastUpdated: string;
  source: string;
}

export interface OperationPrice {
  operation: string;
  cost: number;
  currency: string;
}

export interface PriceCalculation {
  operation: string;
  count: number;
  unitCost: number;
  totalCost: number;
}

export interface PriceCalculatorResponse {
  totalCost: number;
  breakdown: PriceCalculation[];
  currency: string;
}

// Usage tracking types
export interface UsageStatistics {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  operationBreakdown: Record<string, number>;
  totalFilesProcessed: number;
  totalDataProcessed: number; // in bytes
  averageProcessingTime: number; // in seconds
  period: {
    start: string;
    end: string;
  };
}

// System types
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  config_source: string;
}

// File types for forms
export interface FileWithPreview extends File {
  preview: string;
}
