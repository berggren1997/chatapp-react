export const apiClient = {
  baseUrl: "http://localhost:5247",
  headers: {
    "Content-Type": "application/json",
  },
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await fetch(`${apiClient.baseUrl}${url}`, {
        method: "GET",
        credentials: "include",
        headers: apiClient.headers,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
  post: async <T, R>(url: string, values: T): Promise<R> => {
    console.log("here");
    try {
      const response = await fetch(`${apiClient.baseUrl}${url}`, {
        method: "POST",
        credentials: "include",
        headers: apiClient.headers,
        body: JSON.stringify(values),
      });

      const data = await response.json();
      return data as R;
    } catch (error) {
      throw error;
    }
  },
};
