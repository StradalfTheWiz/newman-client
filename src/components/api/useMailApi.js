import useApi from "./useApi";

const useMailApi = (setResult, setIsError, setIsLoading) => {
  const { getApiBase, getHeaders } = useApi();
  const base = "mail";

  const submitMailApi = (data) => {
    const requestOptions = {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    };

    fetch(getApiBase() + `${base}/post-mail`, requestOptions)
      .then(async (response) => {
        const responseData = await response.json();

        if (response.ok) {
          setResult(responseData);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const getMailListApi = (data) => {
    const requestOptions = {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    };

    fetch(getApiBase() + `${base}/get-list`, requestOptions)
      .then(async (response) => {
        const responseData = await response.json();

        if (response.ok) {
          setResult(responseData);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const getMailApi = (id) => {
    const requestOptions = {
      method: "GET",
      headers: getHeaders(),
    };

    fetch(getApiBase() + `${base}/${id}`, requestOptions)
      .then(async (response) => {
        const responseData = await response.json();

        if (response.ok) {
          setResult(responseData);
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return {
    submitMailApi,
    getMailListApi,
    getMailApi,
  };
};

export default useMailApi;
