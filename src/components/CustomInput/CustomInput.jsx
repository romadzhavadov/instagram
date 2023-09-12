import { useField } from 'formik';
import PropTypes from 'prop-types';

export function CustomInput({ label, type, name, id, ...props }) {
  const [field, meta] = useField(name);

  return (
    <>
      <label htmlFor={id} className="text-sm mb-1 block">
        {label}
      </label>
      <input
        type={type}
        {...field}
        {...props}
        className="p-3 rounded border border-gray-300 w-full focus:outline-none focus:border-blue-500 text-gray-400"
      />
      {meta.touched && meta.error ? <p className="text-xs text-red-500">{meta.error}</p> : null}
    </>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
};
CustomInput.default = {
  label: '',
  type: 'text',
  name: '',
};

export default CustomInput;
