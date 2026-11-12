import { useState, useCallback } from 'react';

export const useForm = ({ initialValues, validationRules, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const validator = validationRules[name];
    if (!validator) return null;
    return validator(value, values);
  }, [validationRules, values]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const validateStep = (fieldsToValidate) => {
    const newErrors = {};
    let isValid = true;
    fieldsToValidate.forEach(name => {
      const error = validateField(name, values[name] || '');
      if (error) { newErrors[name] = error; isValid = false; }
    });
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = useCallback(async (event) => {
    if (event) event.preventDefault();
    
    const newErrors = {};
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name] || '');
      if (error) newErrors[name] = error;
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        if (error.response?.data?.errors) setErrors(error.response.data.errors);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validationRules, validateField, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset, validateStep, setValues };
};
