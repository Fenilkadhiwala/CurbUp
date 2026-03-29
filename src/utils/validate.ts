export const validateEmail = (value: string) => {
  if (!value) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Enter a valid email address";
  return "";
};

export const validatePassword = (value: string) => {
  if (!value) return "Password is required";
  const rules = [
    { met: value.length >= 6, message: "At least 6 characters" },
    { met: /[A-Z]/.test(value), message: "One uppercase letter" },
    { met: /[0-9]/.test(value), message: "One number" },
    {
      met: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      message: "One special character",
    },
  ];
  const failed = rules.filter((r) => !r.met);
  if (failed.length === 0) return "";
  return "Password must have: " + failed.map((r) => r.message).join(" · ");
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};

export const validateFullName = (value: string) => {
  if (!value.trim()) return "First name is required";
  return "";
};

export const validatePhoneNumber = (value: string) => {
  if (!value) return "Phone number is required";
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 10) return "Phone number must be 10 digits";
  return "";
};
