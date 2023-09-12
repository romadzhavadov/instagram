import PropTypes from 'prop-types';

const MoreSvg = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      fill="currentColor"
      width={width}
      height={height}
      role="img"
      viewBox="0 0 24 24"
    >
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="3"
        x2="21"
        y1="4"
        y2="4"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="3"
        x2="21"
        y1="12"
        y2="12"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="3"
        x2="21"
        y1="20"
        y2="20"
      ></line>
    </svg>
  );
};

MoreSvg.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MoreSvg.defaultProps = {
  width: '16',
  height: '16',
};

export default MoreSvg;
