import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import Alert from "../components/Alert";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: true,
};

function Register() {
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const [values, setValues] = useState(initialState);

  // global state and useNavigate

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    console.log(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    if (!email || !password) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    console.log(currentUser);

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type={"text"}
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type={"email"}
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type={"password"}
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>

        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
