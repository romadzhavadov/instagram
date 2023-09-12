import { object, string } from 'yup';

// const validationSchema = object({
//   regFullName: string().trim().min(3).required('full name is required'),
//   regUsername: string().trim().min(3).required('username is required'),
//   regPassword: string().trim().min(6).max(10).required('password is required'),
// });

const validationSchema = object({
  fullName: string().trim().min(3).required('full name is required'),
  username: string().trim().min(3).required('username is required'),
  password: string().trim().min(6).max(10).required('password is required'),
});

export default validationSchema;
