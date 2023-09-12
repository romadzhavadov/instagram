import { object, string } from 'yup';

export const validationSchema = object({
  imageUrl: string().required('Is required'),
  caption: string(),
  location: string(),
});
