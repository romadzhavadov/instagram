import { Formik, Form } from 'formik';
import { CustomInput } from '../../components';
import validationSchema from './validationSchema';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { client } from '../../services/client';
import { AUTH_LS_KEY, Endpoint } from '../../constants';
import { saveStateToLocalStorage } from '../../utils';
import useAuth from '../../hooks/useAuth';
import { useRef, useState } from 'react';
import OutlinedAlerts from '../../components/Alert/OutlinedAlerts';

function RegistrationForm() {
  const initialValues = {
    fullName: '',
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
    const fullName = values.fullName.split(' ');

    const userData = {
      username: values.username,
      password: values.password,
      firstName: fullName[0],
      lastName: fullName[1],
    };

    try {
      if (!userData.lastName) {
        const err = 'Please enter your full name with both first name and last name.';
        errValue.current = err;
        throw new Error(err);
      }

      const response = await client.sendPost(Endpoint.REGISTER, userData);

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
      setShowAlert(true);
      console.error(err);
    } finally {
      actions.resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(form) => {
        return (
          <Form className="box-border flex flex-col items-center w-full max-w-xs mx-auto mt-10 border-2 rounded border-slate-200 p-8">
            <i
              data-visualcompletion="css-img"
              aria-label="Instagram"
              className="bg-no-repeat mb-4"
              role="img"
              style={{
                backgroundImage:
                  'url("https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png")',
                backgroundPosition: '0px -52px',
                backgroundSize: 'auto',
                width: '175px',
                height: '51px',
                display: 'inline-block',
              }}
            ></i>
            <p className="mb-4 font-medium text-xm text-center text-stone-500">
              Sign up to see photos and videos from your friends.
            </p>

            <div className="mb-6 w-full">
              <CustomInput name="fullName" id="regFullName" placeholder="Full Name" />
              <CustomInput name="username" id="regUsername" placeholder="Username" />
              <CustomInput
                name="password"
                id="regPassword"
                placeholder="Password"
                type="password"
              />
            </div>

            <button
              type="submit"
              disabled={!form.isValid}
              className="border-none bg-blue-500 mb-6 text-white rounded-lg py-2 px-4 w-full transition duration-250 hover:bg-blue-700 focus:bg-blue-700"
            >
              Sign up
            </button>
            {showAlert && <OutlinedAlerts error={errValue.current} />}

            <p className="text-sm text-gray-700">
              Have an account?
              <NavLink to="/login" className="text-blue-600 ml-1 hover:underline">
                Sign in
              </NavLink>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegistrationForm;
