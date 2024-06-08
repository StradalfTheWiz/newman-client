import { useState } from "react";
import useMailApi from "../api/useMailApi";
import useMailSubmitValidator from "./useMailSubmitValidator";

const useSubmit = (props, initialForm) => {
  const [inputs, setInputs] = useState(initialForm);
  const [result, setResult] = useState(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { submitMailApi } = useMailApi(setResult, setIsError, setIsLoading);
  const { validateForm, validateField } = useMailSubmitValidator(inputs, setInputs);

  const handleChange = (event, fieldName, newValue) => {
    const name = fieldName ?? event.target.name;
    const value = newValue ?? event.target.value;

    validateField(name, value, false, inputs.errors);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitMail = () => {
    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);
      submitMailApi(inputs);
    }
  };

  const cancelForm = () => {
    setInputs(initialForm);
  };

  return {
    submitMail,
    handleChange,
    result,
    isError,
    setIsError,
    inputs,
    setInputs,
    isLoading,
    cancelForm,
    validateForm,
  };
};

export default useSubmit;
