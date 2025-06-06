import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import registerLottie from "../../assets/lotties/register.json";
import { AuthContext } from "../../contexts/AuthContext";
import { SocialLogin } from "../Shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { createUser, userProfileUpdate } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMsg(
        "Password must include at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        setErrorMsg("");
        console.log(result);
        Swal.fire({
          title: "User Registration Successfully",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(from);
        return userProfileUpdate({
          displayName: name,
          photoURL: photo,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrorMsg("The Email Already Used");
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
            className="lg:w-50 w-25"
            // style={{ width: "200px" }}
            animationData={registerLottie}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl text-orange-500 font-bold">
              Register now!
            </h1>
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                required
              />
              <label className="label">Photo URL</label>
              <input
                type="link"
                name="photo"
                className="input"
                placeholder="Photo URL"
                required
              />
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
                Register
              </button>
              {errorMsg && (
                <p className="text-red-600 text-[15px] mt-2">{errorMsg}</p>
              )}
            </form>
            <SocialLogin navigate={navigate} from={from} />
            <p className="text-lg">
              Already have an account?{" "}
              <Link className="text-blue-700 link" to={"/signIn"}>
                LogIn here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
