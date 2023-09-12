import { Formik, Form } from 'formik';
import { validationSchema } from './validationSchema';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { CONTENT_MODAL_NAME, Endpoint } from '../../constants';
import CustomInput from '../../components/CustomInput/CustomInput';
import useTheme from '../../hooks/useTheme';
import { client } from '../../services/client';
import { setPosts, setUserInfo } from '../../redux/slices/userSlice';

const PostCreationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    imageUrl: '',
    caption: '',
    location: '',
  };

  const onSubmit = async (values, actions) => {
    actions.resetForm();
    dispatch(closeModal(CONTENT_MODAL_NAME));
    try {
      const response = await client.sendPost(Endpoint.POST, values);
      const data = response.data;
      dispatch(setPosts(data));
      dispatch(setUserInfo());
    } catch (err) {
      console.error(err);
    }
  };

  const { theme } = useTheme();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isValid }) => (
        <Form
          className="flex flex-col px-16 py-8 w-608 items-center justify-center"
          autoComplete="off"
        >
          <div className="w-full mb-4 text-xl">
            <CustomInput name="imageUrl" placeholder="Image url" id="postImageUrl" />
            <CustomInput name="caption" placeholder="Caption" id="postCaption" />
            <CustomInput name="location" placeholder="Location" id="postLocation" />
          </div>
          <button
            disabled={!isValid}
            type="submit"
            className={`py-2 px-4 rounded border-2 text-xl ${
              theme === 'darkTheme' ? 'border-white' : 'border-black'
            }`}
          >
            Create post
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PostCreationForm;
