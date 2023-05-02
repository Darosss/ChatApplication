import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

interface IErrorResponseData {
  message: string;
  fields: string[];
}

function useAcciosHook(axiosParams: AxiosRequestConfig, refreshAfterRespond = false) {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<IErrorResponseData>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  function fetchData(params: AxiosRequestConfig) {
    axios(params)
      .then((res) => {
        setResponse(res);

        // if refreshAfterRespond refresh site
        if (refreshAfterRespond) {
          // add small delay
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      })
      .catch((error) => {
        setError(error.response?.data || { message: "Something went wrong" });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function sendData<T = unknown>(dataToSend?: T) {
    let params = axiosParams;
    if (dataToSend) {
      params = { ...params, data: dataToSend };
    }

    fetchData(params);
  }

  useEffect(() => {
    if (axiosParams.method === "GET" || axiosParams.method === "get") {
      fetchData(axiosParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, loading, sendData };
}

export default useAcciosHook;
