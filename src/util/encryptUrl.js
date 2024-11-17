import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Secret key (it should be stored securely in an environment variable)

// Function to encrypt an ID
export const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
  return encodeURIComponent(encrypted); // encode to ensure URL safety
};

// Function to decrypt an ID
export const decryptId = (encryptedId) => {
  const decoded = decodeURIComponent(encryptedId); // decode first
  const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8); // Convert to UTF-8 string
};
