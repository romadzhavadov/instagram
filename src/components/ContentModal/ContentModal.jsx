import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { CONTENT_MODAL_NAME } from '../../constants';
import useTheme from '../../hooks/useTheme';

const ContentModal = () => {
  const dispatch = useDispatch();

  const content = useSelector((state) => state.modal.contentBody);
  const title = useSelector((state) => state.modal.contentTitle);

  const closeContentModal = () => {
    dispatch(closeModal(CONTENT_MODAL_NAME));
  };
  const { theme } = useTheme();

  return (
    <div
      className="flex justify-center items-center fixed inset-x-0 inset-y-0 bg-black/30 opacity-1 pointer-events-all"
      onClick={closeContentModal}
    >
      <div
        className={`flex box-border items-center flex-col rounded-2xl text-center border-2 ${
          theme === 'darkTheme' ? 'border-white bg-darkTheme' : 'border-black bg-lightTheme'
        } overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            className={`py-3 border-b-2 ${
              theme === 'darkTheme' ? 'border-white' : 'border-black'
            } w-full`}
          >
            <h2 className="font-bold text-3xl">{title}</h2>
          </div>
        )}

        <div
          className={`flex flex-col justify-center items-center text-center ${
            theme === 'darkTheme' ? 'border-white' : 'border-black'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
