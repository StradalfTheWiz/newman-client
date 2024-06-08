import { useState } from "react";
import useMailApi from "../api/useMailApi";

const useMailDetailsGet = (props) => {
  const [result, setResult] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getMailApi } = useMailApi(setResult, setIsError, setIsLoading);

  const getDetails = (id) => {
    getMailApi(id);
  };

  return {
    getDetails,
    result,
    isError,
    isLoading,
  };
};

export default useMailDetailsGet;
