import { useState, useContext } from 'react';
import { client } from '../../services/client';
import { CONTENT_MODAL_NAME, Endpoint } from '../../constants';
import useTheme from '../../hooks/useTheme';
import TextareaContext from '../../context/TextareaProvider';
import CommentsContainer from '../../components/CommentsContainer/CommentsContainer';
import { openModal, setContentBody } from '../../redux/slices/modalSlice';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';

const CommentsForm = ({
  postId,
  setComments,
  shouldOpenModal,
  authorUsername,
  setCommentsAmount,
}) => {
  const [comment, setComment] = useState('');

  const { textAreaRef } = useContext(TextareaContext);

  const dispatch = useDispatch();
  const { theme } = useTheme();

  const onSubmit = async () => {
    if (!comment.length) return;

    const body = { postId: postId, text: comment };

    try {
      const response = await client.sendPost(Endpoint.COMMENT, body);
      const data = response.data;
      setComments((draft) => {
        draft.push(data);
      });
    } catch (err) {
      console.error('Error from CommentsForm add comment request: ', err);
    }
    setComment('');
    if (shouldOpenModal) {
      dispatch(openModal(CONTENT_MODAL_NAME));
      dispatch(setContentBody(<CommentsContainer postId={postId} userName={authorUsername} />));
    }
    if (setCommentsAmount) setCommentsAmount((prev) => prev + 1);
  };

  const initialValues = {
    text: '',
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      <Form className="flex items-start w-full">
        <textarea
          ref={textAreaRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`resize-none rounded focus:outline-none w-full h-12 ${
            theme === 'darkTheme' ? 'border-white' : 'border-black'
          } border-solid border-1 bg-${theme}`}
          name="text"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className={`${
            theme === 'darkTheme' ? 'border-white text-white' : 'border-black text-black'
          }`}
        >
          POST
        </button>
      </Form>
    </Formik>
  );
};

export default CommentsForm;
