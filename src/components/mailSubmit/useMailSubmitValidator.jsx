import { validate } from "react-email-validator";

const useMailSubmitValidator = (inputs, setInputs) => {
  const requiredMessage = "Field is required";
  const valueTooLongMessage = (max) => `Value must not be longer than ${max} characters`;
  const valueTooLongGenericMessage = "Content is too long";
  const invalidMailMessage = "Email address is invalid";
  const invalidMailsMessage = "One or more email addresses are invalid";

  const validateForm = () => {
    const errors = {};

    Object.entries(inputs).forEach(([name, value]) => {
      validateField(name, value, true, errors);
    });

    return Object.values(errors).every((x) => x === null);
  };

  const validateField = (name, value, isSubmit = false, errors = {}) => {
    if (name == "fromMail") {
      if (isEmpty(value)) {
        errors.fromMail = requiredMessage;
      } else if (value.length > 50) {
        errors.fromMail = valueTooLongMessage(50);
      } else if (!validate(value) && isSubmit) {
        errors.fromMail = invalidMailMessage;
      } else {
        errors.fromMail = null;
      }
    } else if (name == "toMail") {
      if (isEmpty(value)) {
        errors.toMail = requiredMessage;
      } else if (value.length > 50) {
        errors.toMail = valueTooLongMessage(50);
      } else if (!validate(value) && isSubmit) {
        errors.toMail = invalidMailMessage;
      } else {
        errors.toMail = null;
      }
    } else if (name == "subject") {
      if (isEmpty(value)) {
        errors.subject = requiredMessage;
      } else if (value.length > 100) {
        errors.subject = valueTooLongMessage(100);
      } else {
        errors.subject = null;
      }
    } else if (name == "mailContent") {
      if (value.length > 1000) {
        errors.mailContent = valueTooLongGenericMessage;
      } else {
        errors.mailContent = null;
      }
    } else if (name == "importance") {
      if (!value) {
        errors.importance = requiredMessage;
      } else {
        errors.importance = null;
      }
    } else if (name == "ccMailList") {
      if (value && value.length > 0) {
        let ccMailListErrorTriggered = false;
        value.forEach((elementValue, index) => {
          if (elementValue.length > 50) {
            errors.ccMailList ??= {};
            errors.ccMailList.msg = valueTooLongMessage(50);
            errors.ccMailList.elements ??= [];
            errors.ccMailList.elements.push(index);
            ccMailListErrorTriggered = true;
          } else if (!validate(elementValue)) {
            errors.ccMailList ??= {};
            errors.ccMailList.msg = invalidMailsMessage;
            errors.ccMailList.elements ??= [];
            errors.ccMailList.elements.push(index);
            ccMailListErrorTriggered = true;
          }
        });

        if (!ccMailListErrorTriggered) {
          errors.ccMailList = null;
        }
      } else {
        errors.ccMailList = null;
      }
    }

    setInputs((prevState) => ({ ...prevState, errors }));

    return Object.keys(errors).length === 0;
  };

  const isEmpty = (value) => {
    return value === null || value === "" || /^\s*$/.test(value);
  };

  return {
    validateForm,
    validateField,
  };
};

export default useMailSubmitValidator;
