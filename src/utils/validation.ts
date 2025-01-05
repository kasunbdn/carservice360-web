export const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }
  return phone;
};

export const validateAmount = (_: any, value: number) => {
  if (!value) {
    return Promise.reject("Amount is required");
  }
  if (value <= 0) {
    return Promise.reject("Amount must be greater than 0");
  }
  if (value > 100000) {
    return Promise.reject("Amount cannot exceed $100,000");
  }
  return Promise.resolve();
};
