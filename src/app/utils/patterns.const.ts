export const RegexPatterns = {
  /** regex для валидации номера телефона со скобками и дефисами */
  PhoneValidation: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,11}$/,
} as const;
