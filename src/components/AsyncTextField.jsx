import React, { useEffect } from 'react';
import { useAsyncValidation } from '../hooks/useAsyncValidation';

export const AsyncTextField = ({ label, name, value, onChange, onBlur, error, asyncValidator, ...props }) => {
  const { validate, isValidating, validationError } = useAsyncValidation(asyncValidator);
  
  useEffect(() => {
    if (value && value.trim()) validate(value);
  }, [value, validate]);

  const combinedError = error || validationError;
  const errorId = `${name}-error`;

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <div className="input-container">
        <input
          id={name} name={name} value={value} onChange={onChange} onBlur={onBlur}
          aria-invalid={combinedError ? "true" : "false"}
          className={combinedError ? "input-error" : ""}
          {...props}
        />
        {isValidating && <span className="validation-spinner">⏳</span>}
      </div>
      {combinedError && <span id={errorId} className="error-message" role="alert">{combinedError}</span>}
    </div>
  );
};
