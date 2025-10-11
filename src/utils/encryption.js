/**
 * Simple encryption/decryption utilities for localStorage
 * Note: This is basic obfuscation, not cryptographically secure
 */

const SECRET_KEY = 'todo-app-secret-key-2024';

/**
 * Simple XOR-based encryption
 * @param {string} text - Text to encrypt
 * @returns {string} Encrypted text
 */
export const encrypt = (text) => {
  try {
    const textBytes = new TextEncoder().encode(text);
    const keyBytes = new TextEncoder().encode(SECRET_KEY);

    const encrypted = Array.from(textBytes).map((byte, i) =>
      byte ^ keyBytes[i % keyBytes.length]
    );

    return btoa(String.fromCharCode(...encrypted));
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

/**
 * Simple XOR-based decryption
 * @param {string} encrypted - Encrypted text
 * @returns {string} Decrypted text
 */
export const decrypt = (encrypted) => {
  try {
    const encryptedBytes = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const keyBytes = new TextEncoder().encode(SECRET_KEY);

    const decrypted = Array.from(encryptedBytes).map((byte, i) =>
      byte ^ keyBytes[i % keyBytes.length]
    );

    return new TextDecoder().decode(new Uint8Array(decrypted));
  } catch (error) {
    console.error('Decryption error:', error);
    return encrypted;
  }
};
