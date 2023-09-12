import { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import { CustomInput } from '../../components';
import validationSchema from './validationSchema';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { client } from '../../services/client';
import { AUTH_LS_KEY, Endpoint } from '../../constants';
import { saveStateToLocalStorage } from '../../utils';
import useAuth from '../../hooks/useAuth';
import OutlinedAlerts from '../../components/Alert/OutlinedAlerts';

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showAlert, setShowAlert] = useState(false);
  const errValue = useRef(null);

  const onSubmit = async (values, actions) => {
    try {
      const response = await client.sendPost(Endpoint.LOGIN, values);
      if (response.status === 'error') {
        errValue.current = response.details;
        throw new Error(response.details);
      }
      const token = response.token;

      saveStateToLocalStorage(AUTH_LS_KEY, { token, user: values.username });
      client.setToken(token);
      setAuth({ token, user: values.username });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } finally {
      actions.resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isValid }) => (
        <Form
          className="flex flex-col items-center w-full max-w-xs mx-auto my-10 border-2 rounded border-slate-200 p-8"
          autoComplete="off"
        >
          <i
            style={{
              backgroundImage:
                'url("https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png")',
              backgroundPosition: '0px -51px',
            }}
            className="bg-no-repeat bg-auto w-[175px] h-[51px] inline-block mb-8"
          ></i>
          <div className="mb-6 w-full">
            <CustomInput name="username" id="username" placeholder="Username" />
            <CustomInput name="password" id="password" type="password" placeholder="Password" />
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-blue-500 mb-6 text-white rounded-lg py-2 px-4 w-full"
          >
            Sign in
          </button>
          {showAlert && <OutlinedAlerts error={errValue.current} />}
          <p className="text-sm text-gray-700">
            Don&apos;t have an account?
            <NavLink to="/register" className="text-blue-600 ml-1 hover:underline">
              Sign up
            </NavLink>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
