import PropTypes from 'prop-types';

const SearchSvg = ({ width, height }) => {
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
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </svg>
  );
};

SearchSvg.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SearchSvg.defaultProps = {
  width: '16',
  height: '16',
};

export default SearchSvg;
