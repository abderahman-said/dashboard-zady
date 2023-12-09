// import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Forget from "components/Auth/Forget";
// import Login from "components/Auth/Login";
// import NewPassword from "components/Auth/NewPassword";
// import Register from "components/Auth/Register";
// import ResendCode from "components/Auth/ResendCode";
import dynamic from "next/dynamic";
const Forget = dynamic(() => import("components/Auth/Forget.js"), {
  loading: () => <p>Loading ...</p>,
});
const Login = dynamic(() => import("components/Auth/Login.js"), {
  loading: () => <p>Loading ...</p>,
});
const NewPassword = dynamic(() => import("components/Auth/NewPassword.js"), {
  loading: () => <p>Loading ...</p>,
});
const Register = dynamic(() => import("components/Auth/Register.js"), {
  loading: () => <p>Loading ...</p>,
});
const ResendCode = dynamic(() => import("components/Auth/ResendCode.js"), {
  loading: () => <p>Loading ...</p>,
});
// RiLockPasswordFill
import styles from "styles/Login.module.css";
import Head from "next/head";
const Auth = () => {
  const { loginn, register, forget, sendcode, newpass } = useSelector(
    (state) => state.AuthSlice
  );
  return (
    <>
      <Head>
        
      </Head>
    <div className="login-content">
       <Container>
          <div className="login-main">
            {loginn && <Login />}
            {register && <Register />}
            {forget && <Forget />}
            {sendcode && <ResendCode />}
            {newpass && <NewPassword />}
          </div>
      </Container>
    </div>
    </>
  );
};

export default Auth;
