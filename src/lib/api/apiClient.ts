import axios from 'axios';
import { 
  AuthResponse,
  LogoutResponse,
  TokenValidationResponse,
  CompressResponse,
  MergeResponse,
  SplitResponse,
  SplitStatusResponse,
  FileOperationResponse,
  ExtractTextResponse,
  OcrResponse,
  UserProfileResponse,
  UserBalanceResponse,
  DepositResponse,
  ApiKeyListResponse,
  ApiKeyCreationResponse,
  PricingInfo,
  OperationPrice,
  PriceCalculatorResponse,
  UsageStatistics,
  HealthCheckResponse
} from '@/types/api';

// Base API configuration
const BASE_URL = 'https://api.mega-pdf.com';

// Create axios instance
const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  const apiKey = localStorage.getItem('apiKey');
  
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (apiKey && !config.headers['X-API-Key']) {
    config.headers['X-API-Key'] = apiKey;
  }
  
  return config;
});

// Response interceptor to handle 401 errors globally
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      // Clear all auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('apiKey');
      localStorage.removeItem('user');
      
      // Only redirect if we're on protected pages (dashboard, profile, etc.)
      const currentPath = window.location.pathname;
      const protectedPaths = ['/dashboard', '/profile', '/tools', '/settings', '/api-keys'];
      const isProtectedPath = protectedPaths.some(path => currentPath.startsWith(path));
      
      // Don't redirect from public pages (home, login, register, pricing, etc.)
      if (isProtectedPath && !currentPath.includes('/login') && !currentPath.includes('/register')) {
        // Import toast here to avoid circular dependencies
        import('sonner').then(({ toast }) => {
          toast.error('Session expired. Please log in again.');
        });
        
        // Small delay to allow toast to show before redirect
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
    
    return Promise.reject(error);
  }
);

// Define API client with all API endpoints
export const apiClient = {
  // Auth endpoints
  auth: {
    register: async (data: { name: string; email: string; password: string }) => {
      return await apiInstance.post<AuthResponse>('/api/auth/register', data);
    },
    login: async (data: { email: string; password: string }) => {
      const response = await apiInstance.post<AuthResponse>('/api/auth/login', data);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response;
    },
    logout: async () => {
      const response = await apiInstance.post<LogoutResponse>('/api/auth/logout');
      localStorage.removeItem('authToken');
      return response;
    },
    resetPassword: async (email: string) => {
      return await apiInstance.post<{ success: boolean; message: string }>('/api/auth/reset-password', { email });
    },
    resetPasswordConfirm: async (data: { token: string; newPassword: string }) => {
      return await apiInstance.post<{ success: boolean; message: string }>('/api/auth/reset-password/confirm', data);
    },
    googleAuth: () => {
      window.location.href = `${BASE_URL}/api/auth/google`;
    },
    verifyEmail: async (token?: string) => {
      if (token) {
        return await apiInstance.get<{ success: boolean; message: string }>(`/api/auth/verify-email?token=${token}`);
      } else {
        return await apiInstance.post<{ success: boolean; message: string }>('/api/auth/verify-email');
      }
    },
    validateToken: async () => {
      return await apiInstance.get<TokenValidationResponse>('/api/auth/validate');
    }
  },
  
  // PDF processing endpoints
  pdf: {
    compress: async (file: File, quality: 'high' | 'medium' | 'low') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('quality', quality);
      
      return await apiInstance.post<CompressResponse>('/api/pdf/compress', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    convert: async (file: File, targetFormat: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFormat', targetFormat);
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/convert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    merge: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      
      return await apiInstance.post<MergeResponse>('/api/pdf/merge', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    split: async (file: File, splitMethod: 'range' | 'extract' | 'every', options: { pageRanges?: string, everyNPages?: number }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('splitMethod', splitMethod);
      
      if (splitMethod === 'range' && options.pageRanges) {
        formData.append('pageRanges', options.pageRanges);
      } else if (splitMethod === 'every' && options.everyNPages) {
        formData.append('everyNPages', options.everyNPages.toString());
      }
      
      return await apiInstance.post<SplitResponse>('/api/pdf/split', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    splitStatus: async (id: string) => {
      return await apiInstance.get<SplitStatusResponse>(`/api/pdf/split/status?id=${id}`);
    },
    
    protect: async (file: File, password: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', password);
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/protect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    unlock: async (file: File, password: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', password);
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/unlock', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    rotate: async (file: File, rotation: 90 | 180 | 270, pages: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('rotation', rotation.toString());
      formData.append('pages', pages);
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/rotate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    watermark: async (file: File, options: {
      watermarkType: 'text' | 'image';
      content?: string;
      watermarkImage?: File;
      position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      opacity?: number;
      rotation?: number;
      scale?: number;
      textColor?: string;
      pages?: 'all' | 'first' | 'last' | 'odd' | 'even' | 'custom';
      customPages?: string;
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('watermarkType', options.watermarkType);
      
      if (options.watermarkType === 'text' && options.content) {
        formData.append('content', options.content);
      } else if (options.watermarkType === 'image' && options.watermarkImage) {
        formData.append('watermarkImage', options.watermarkImage);
      }
      
      if (options.position) formData.append('position', options.position);
      if (options.opacity) formData.append('opacity', options.opacity.toString());
      if (options.rotation) formData.append('rotation', options.rotation.toString());
      if (options.scale) formData.append('scale', options.scale.toString());
      if (options.textColor) formData.append('textColor', options.textColor);
      if (options.pages) formData.append('pages', options.pages);
      if (options.customPages) formData.append('customPages', options.customPages);
      
      return await apiInstance.post('/api/pdf/watermark', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    addPageNumbers: async (file: File, position: string, startNumber: number) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('position', position);
      formData.append('startNumber', startNumber.toString());
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/pagenumber', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    removePages: async (file: File, pages: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pages', pages);
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/remove', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    sign: async (file: File, signature: File, x: number, y: number, page: number) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('x', x.toString());
      formData.append('y', y.toString());
      formData.append('page', page.toString());
      
      return await apiInstance.post<FileOperationResponse>('/api/pdf/sign', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    extractText: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return await apiInstance.post<ExtractTextResponse>('/api/pdf/extract-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    saveEditedText: async (sessionId: string, editedText: string) => {
      return await apiInstance.post<FileOperationResponse>('/api/pdf/save-edited-text', {
        sessionId,
        editedText
      });
    },
    
    editSession: async (sessionId: string) => {
      return await apiInstance.get<ExtractTextResponse>(`/api/pdf/edit-session?sessionId=${sessionId}`);
    },
    
    generateInvoice: async (templateId: string, data: Record<string, unknown>) => {
      return await apiInstance.post<FileOperationResponse>('/api/pdf/generate-invoice', {
        templateId,
        data
      });
    },
    
    invoiceTemplates: async () => {
      return await apiInstance.get<{ templates: Array<{ id: string; name: string; }> }>('/api/pdf/invoice-templates');
    },
    
    createInvoiceTemplate: async (name: string, template: string) => {
      return await apiInstance.post<{ success: boolean; id: string; name: string; }>('/api/pdf/create-invoice-template', {
        name,
        template
      });
    },
    
    cleanup: async () => {
      return await apiInstance.get<{ success: boolean; message: string; filesRemoved: number; }>('/api/pdf/cleanup');
    }
  },
  
  // OCR endpoints
  ocr: {
    processPdf: async (file: File, language: string) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);
      
      return await apiInstance.post<OcrResponse>('/api/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    
    extractText: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return await apiInstance.post<OcrResponse>('/api/ocr/extract', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  },
  
  // User management endpoints
  user: {
    getProfile: async () => {
      return await apiInstance.get<UserProfileResponse>('/api/user/profile');
    },
    
    updateProfile: async (data: { name?: string; email?: string }) => {
      return await apiInstance.put<{ success: boolean; message: string; user: UserProfileResponse }>('/api/user/profile', data);
    },
    
    changePassword: async (currentPassword: string, newPassword: string) => {
      return await apiInstance.put<{ success: boolean; message: string }>('/api/user/password', {
        currentPassword,
        newPassword
      });
    },
    
    getBalance: async () => {
      return await apiInstance.get<UserBalanceResponse>('/api/user/balance');
    },
    
    createDeposit: async (amount: number, currency: string) => {
      return await apiInstance.post<DepositResponse>('/api/user/deposit', {
        amount,
        currency
      });
    },
    
    verifyDeposit: async (transactionId: string) => {
      return await apiInstance.post<{ success: boolean; message: string; verified: boolean }>('/api/user/deposit/verify', {
        transactionId
      });
    }
  },
  
  // API key management endpoints
  apiKeys: {
    list: async () => {
      return await apiInstance.get<ApiKeyListResponse>('/api/keys');
    },
    
    create: async (name: string) => {
      const response = await apiInstance.post<ApiKeyCreationResponse>('/api/keys', { name });
      if (response.data.key) {
        localStorage.setItem('apiKey', response.data.key);
      }
      return response;
    },
    
    revoke: async (id: string) => {
      return await apiInstance.delete<{ success: boolean; message: string }>(`/api/keys/${id}`);
    }
  },
  
  // Public pricing endpoints
  pricing: {
    getInfo: async () => {
      return await apiInstance.get<PricingInfo>('/api/pricing');
    },
    
    getOperationPrice: async (operation: string) => {
      return await apiInstance.get<OperationPrice>(`/api/pricing/operation/${operation}`);
    },
    
    calculator: async (operations: Array<{ operation: string; count: number }>) => {
      return await apiInstance.post<PriceCalculatorResponse>('/api/pricing/calculator', { operations });
    }
  },
  
  // Usage tracking endpoints
  usage: {
    getStats: async () => {
      return await apiInstance.get<UsageStatistics>('/api/track-usage');
    },
    
    trackOperation: async (data: {
      operation: string;
      success: boolean;
      fileSize: number;
      processingTime: number;
    }) => {
      return await apiInstance.post<{ success: boolean; message: string }>('/api/track-usage', data);
    }
  },
  
  // File serving endpoint
  getFile: (folder: string, filename: string) => {
    return `${BASE_URL}/api/file?folder=${folder}&filename=${filename}`;
  },
  
  // System endpoints
  system: {
    healthCheck: async () => {
      return await apiInstance.get<HealthCheckResponse>('/health');
    },
    
    validateToken: async (token: string) => {
      return await apiInstance.post<TokenValidationResponse>('/api/validate-token', { token });
    }
  }
};

export default apiClient;
