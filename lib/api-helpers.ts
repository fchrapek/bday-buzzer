// lib/api-helpers.ts

type ApiResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: string;
};

export async function fetchApi<T>(url: string, method: 'GET' | 'DELETE' | 'POST' | 'PUT' = 'GET', body?: any): Promise<ApiResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body && (method === 'POST' || method === 'DELETE' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data: T = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('API request failed:', error);
    return { data: null, error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export function isErrorResponse<T>(response: ApiResponse<T>): response is { data: null; error: string } {
  return response.error !== null;
}
