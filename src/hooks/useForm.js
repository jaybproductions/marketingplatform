import React, { useEffect, useState } from "react";

function useForm(initialState, validate, action) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        action();

        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [action, errors, initialState, isSubmitting]);

  function handleChange(event) {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
    isSubmitting,
  };
}

export default useForm;
