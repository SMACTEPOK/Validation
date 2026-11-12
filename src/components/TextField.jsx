import React from 'react';

export const TextField = ({ label, name, value, onChange, onBlur, error, type = "text", placeholder, ...props }) => {
  const errorId = `${name}-error`;
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className={error ? "input-error" : ""}
        {...props}
      />
      {error && <span id={errorId} className="error-message" role="alert">{error}</span>}
    </div>
  );
};
