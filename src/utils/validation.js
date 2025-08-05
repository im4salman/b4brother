// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return '';
};

export const validateName = (name) => {
  if (!name || name.trim().length === 0) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (name.trim().length > 50) return 'Name must be less than 50 characters';
  return '';
};

export const validateMessage = (message) => {
  if (!message || message.trim().length === 0) return 'Message is required';
  if (message.trim().length < 10) return 'Message must be at least 10 characters';
  if (message.trim().length > 1000) return 'Message must be less than 1000 characters';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return '';
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate entire form
export const validateContactForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const serviceError = validateRequired(formData.service, 'Service');
  if (serviceError) errors.service = serviceError;
  
  const messageError = validateMessage(formData.message);
  if (messageError) errors.message = messageError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateModalForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const queryError = validateRequired(formData.query, 'Query');
  if (queryError) errors.query = queryError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
