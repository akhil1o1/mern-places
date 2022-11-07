import { useCallback, useState } from "react";

// custom hook to send http request
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback( async (
    url,
    method = "GET",
    headers = {},
    body = null
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method,
        headers,
        body,
      });
      const responseData = await response.json();
      console.log(responseData);
      
      if (!response.ok) {
        throw new Error(responseData.message); //error message will come from backend.
      }
      setIsLoading(false);
      return responseData;
    } catch (error) {
      console.log(error);
      setError(error.message || "Soemthing went wrong, please try again.");
      setIsLoading(false);
      throw error;
    }
  }, []);

  function clearError() {
    setError(null);
  }

  return { isLoading, error, sendRequest, clearError };
}

