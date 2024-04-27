import { useState, useCallback, useRef } from "react";

const useInputs = (initialValue) => {
  const [form, setForm] = useState(initialValue);
  const [validationMsg, setValidationMsg] = useState(initialValue);
  // const inputRef = useRef(null);
  const inputRef = useRef([]);

  // console.log(inputRef);
  const handleValue = useCallback(() => {
    inputRef.current.forEach((inputRef) => {
      // console.log(inputRef.value);
      return setForm((prevForm) => ({
        ...prevForm,
        [inputRef.name]: inputRef.value,
      }));
    });
    // setForm({ ...form, [inputRef.current[idx].name]: inputRef.current.value });
  }, [form]);

  // const handleValidationMsg = useCallback((idx, msg) => {
  //   setValidationMsg({
  //     ...validationMsg,
  //     [inputRef.current[idx].name]: msg,
  //   });
  // }, []);
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
