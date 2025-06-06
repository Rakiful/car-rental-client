import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import loginLottie from "../../assets/lotties/login.json";
import Lottie from "lottie-react";
import { SocialLogin } from "../Shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMsg(
        "Password must include at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    signInUser(email, password)
      .then((result) => {
        setErrorMsg("");
        console.log(result);
        Swal.fire({
          title: "User Logged in Successfully",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-credential") {
          setErrorMsg("Invalid email or password.");
        } else {
          setErrorMsg(error.message);
        }
      });
  };
  return (
    <div className="hero bg-base-200 py-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            className="lg:w-100 w-50 m-[-45px]"
            // style={{ width: "200px" }}
            animationData={loginLottie}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl text-orange-500 font-bold">LogIn now!</h1>
            <form onSubmit={handleSignIn} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs absolute top-2 right-6"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button className="btn text-white bg-orange-500 hover:bg-orange-600 mt-4">
                Sign In
              </button>
              {errorMsg && (
                <p className="text-red-600 text-[15px] mt-2">{errorMsg}</p>
              )}
            </form>
            <SocialLogin navigate={navigate} from={from} />
            <p className="text-lg">
              don't have an account?{" "}
              <Link className="text-blue-700 link" to={"/signUp"}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
