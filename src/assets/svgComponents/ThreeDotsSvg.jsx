import PropTypes from 'prop-types';

const ThreeDotsSvg = ({ width, height, fill }) => {
  return (
    <svg
      color="rgb(168, 168, 168)"
      fill={fill}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <title>Comment options</title>
      <circle cx="12" cy="12" r="1.5"></circle>
      <circle cx="6" cy="12" r="1.5"></circle>
      <circle cx="18" cy="12" r="1.5"></circle>
    </svg>
  );
};

ThreeDotsSvg.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
};

ThreeDotsSvg.defaultProps = {
  width: '24',
  height: '24',
  fill: '#a8a8a8',
};

export default ThreeDotsSvg;
