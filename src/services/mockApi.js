const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const existingUsernames = new Set(['admin', 'user', 'test']);
const existingPhones = new Set(['+380501234567', '+380671234567', '+380931234567']);

export const checkUsernameAvailability = async (username) => {
  await delay(500);
  return existingUsernames.has(username.toLowerCase()) ? "Це ім'я користувача вже зайняте" : null;
};

export const checkPhoneAvailability = async (phone) => {
  await delay(500);
  return existingPhones.has(phone) ? "Цей номер вже зареєстрований" : null;
};

export const mockRegisterUser = async (userData) => {
  await delay(1000);
  
  // ТУТ ЗМІНЕНО НА 100% ПОМИЛКУ
  if (Math.random() > 0.8) {
    throw {
      response: {
        data: {
          errors: {
            username: "Помилка серверу при перевірці імені",
            general: "Виникла технічна проблема. Спробуйте пізніше."
          }
        }
      }
    };
  }
  
  return { success: true, user: userData };
};
