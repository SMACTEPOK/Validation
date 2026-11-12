export const required = (value) => {
  return value && value.toString().trim() !== "" ? null : "Обов'язкове поле";
};

export const minLength = (min) => (value) => {
  return value && value.length < min ? `Мінімум ${min} символів` : null;
};

export const email = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value && !regex.test(value) ? "Некоректний email" : null;
};

export const minAge = (min) => (value) => {
  if (!value) return null;
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age < min ? `Вам має бути щонайменше ${min} років` : null;
};

export const matchPassword = (passwordField) => (value, allValues) => {
  return value !== allValues[passwordField] ? "Паролі не співпадають" : null;
};

export const composeValidators = (...validators) => (value, allValues) => {
  for (const validator of validators) {
    const error = validator(value, allValues);
    if (error) return error;
  }
  return null;
};
