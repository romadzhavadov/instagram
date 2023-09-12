import PropTypes from 'prop-types';
import { useState } from 'react';

const HomeSvg = ({ width, height }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      fill="currentColor"
      width={width}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      onClick={handleToggle}
    >
      {!isToggled ? (
        <path
          d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      ) : (
        <path
          d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002
    1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
        ></path>
      )}
    </svg>
  );
};

HomeSvg.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

HomeSvg.defaultProps = {
  width: '16',
  height: '16',
};

export default HomeSvg;
