import { useState } from "react";
import useMailApi from "../api/useMailApi";

const useMailSearch = (props) => {
  const initialPaging = {
    newPage: 1,
  };

  const initialSorting = {
    activeColumn: "DatetimeCreated",
    ascending: false,
  };

  const initialForm = {
    search: "",
  };

  const [inputs, setInputs] = useState(initialForm);

  const [formSubmit, setFormSubmit] = useState(initialForm);
  const [pageSubmit, setPageSubmit] = useState(initialPaging);
  const [sortSubmit, setSortSubmit] = useState(initialSorting);

  const [result, setResult] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getMailListApi } = useMailApi(setResult, setIsError, setIsLoading);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const changeForm = () => {
    setFormSubmit(inputs);

    const request = {
      FormData: inputs,
      SortData: sortSubmit,
      PagingData: pageSubmit,
    };

    setIsLoading(true);
    getMailListApi(request);
  };

  const changePage = (event, value) => {
    const data = {
      newPage: value,
    };

    setPageSubmit(data);

    const request = {
      FormData: formSubmit,
      SortData: sortSubmit,
      PagingData: data,
    };

    setIsLoading(true);
    getMailListApi(request);

    window.scrollTo(0, 0);
  };

  const changeSorting = (name) => {
    const data = {
      activeColumn: name,
      ascending: !sortSubmit.ascending,
    };

    setSortSubmit(data);

    const request = {
      FormData: formSubmit,
      SortData: data,
      PagingData: pageSubmit,
    };

    setIsLoading(true);
    getMailListApi(request);
  };

  const reset = () => {
    const request = close();

    setIsLoading(true);
    getMailListApi(request);
  };

  const close = () => {
    const request = {
      FormData: initialForm,
      PagingData: initialPaging,
      SortData: sortSubmit,
    };

    setFormSubmit(initialForm);
    setPageSubmit(initialPaging);
    setSortSubmit(initialSorting);

    setInputs(initialForm);

    setResult(null);

    return request;
  };

  return {
    changePage,
    handleChange,
    setFormSubmit,
    result,
    isError,
    inputs,
    setInputs,
    isLoading,
    reset,
    changeSorting,
    changeForm,
    sortSubmit,
    pageSubmit,
    setIsError,
    close,
  };
};

export default useMailSearch;
