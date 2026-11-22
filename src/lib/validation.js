export const initialValues = { name: '', email: '', password: '', confirmPassword: '' };
export function validateForm(values) {
 const errors = {};
 if (!values.name.trim()) errors.name = 'Name is required.';
 else if (values.name.trim().length < 2) errors.name = 'Name must have at least 2 characters.';
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
 if (values.password.length < 8) errors.password = 'Password must have at least 8 characters.';
 if (values.confirmPassword !== values.password || !values.confirmPassword) errors.confirmPassword = 'Passwords must match.';
 return errors;
}