import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { DEFAULT_MODAL_NAME } from '../../constants';
import useTheme from '../../hooks/useTheme';

const DefaultModal = () => {
  const dispatch = useDispatch();
  const closeDefaultModal = () => {
    dispatch(closeModal(DEFAULT_MODAL_NAME));
  };
  const button = useSelector((state) => state.modal.confirmButton);
  const content = useSelector((state) => state.modal.defaultBody);
  const title = useSelector((state) => state.modal.defaultTitle);

  const { theme } = useTheme();

  return (
    <div
      className="z-50 flex justify-center items-center fixed inset-x-0 top-0 w-screen h-screen bg-black/30 opacity-1 pointer-events-all"
      onClick={closeDefaultModal}
    >
      <div
        className={`flex w-1/3 flex-col rounded-2xl text-center border-2 ${
          theme === 'darkTheme' ? 'border-white bg-darkTheme' : 'border-black bg-lightTheme'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-6">
          <h2 className="font-bold text-3xl ">{title}</h2>

          <div className="font-normal text-gray-500 text-xl mt-2">{content}</div>
        </div>

        <div className={`border-y-2 ${theme === 'darkTheme' ? 'border-white' : 'border-black'}`}>
          {button}
        </div>
        <div>
          <button className="font-bold text-xl py-6 w-full" onClick={closeDefaultModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
