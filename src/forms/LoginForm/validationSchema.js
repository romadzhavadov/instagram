import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().trim().min(3).required('User name is required'),
  password: Yup.string().trim().min(6).max(10).required('Password is required'),
});

export default validationSchema;
