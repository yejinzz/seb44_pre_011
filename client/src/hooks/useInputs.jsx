import { useState, useCallback, useRef } from "react";

const useInputs = (initialValue) => {
  const [form, setForm] = useState(initialValue);
  const [validationMsg, setValidationMsg] = useState(initialValue);
  const inputRef = useRef([]);

  const handleValue = useCallback(() => {
    inputRef.current.forEach((inputRef) => {
      return setForm((prevForm) => ({
        ...prevForm,
        [inputRef.name]: inputRef.value,
      }));
    });
  }, [form]);

  const handleValidationMsg = (name, msg) => {
    setValidationMsg((prevValidationMsg) => ({
      ...prevValidationMsg,
      [name]: msg,
    }));
  };

  return {
    inputRef,
    form,
    validationMsg,
    handleValidationMsg,
    handleValue,
  };
};

export default useInputs;
