import { useState, useRef, useCallback, useEffect } from 'react';

export const useAsyncValidation = (asyncValidator, delay = 500) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const timeoutRef = useRef(null);
  const latestValueRef = useRef(null);

  const validate = useCallback((value) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    latestValueRef.current = value;
    setIsValidating(true);
    setValidationError(null);

    timeoutRef.current = setTimeout(async () => {
      try {
        const error = await asyncValidator(value);
        if (latestValueRef.current === value) setValidationError(error);
      } catch (err) {
        if (latestValueRef.current === value) setValidationError('Помилка перевірки');
      } finally {
        if (latestValueRef.current === value) setIsValidating(false);
      }
    }, delay);
  }, [asyncValidator, delay]);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return { validate, isValidating, validationError };
};
