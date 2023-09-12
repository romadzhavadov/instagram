import PropTypes from 'prop-types';

const Smile = ({ width, height }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        color="currentColor"
        fill="currentColor"
        width={width}
        height={height}
        role="img"
        viewBox="0 0 24 24"
      >
        <path
          d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167
    1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0
    1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513
    11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"
        ></path>
      </svg>
    </>
  );
};

Smile.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Smile.defaultProps = {
  width: '16',
  height: '16',
};

export default Smile;
