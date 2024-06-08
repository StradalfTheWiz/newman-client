const useApi = () => {
  const getApiBase = () => {
    const env = import.meta.env.VITE_REACT_APP_ENV;

    if (env == "Development") {
      return "https://localhost:44324/api/";
    } else if (env == "Production") {
      return "https://api.newman.alvrineom.com/api/";
    }
  };

  const getHeaders = () => {
    const config = {};
    config.headers = {};
    config.headers["Content-Type"] = "application/json";

    return config.headers;
  };

  return {
    getApiBase,
    getHeaders,
  };
};

export default useApi;
