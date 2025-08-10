import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";

export const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        Swal.fire({
          title: "Log Out Successfully",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/availableCars"}>Available Cars</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/addCar"}>Add Car</NavLink>
          </li>
          <li>
            <NavLink to={"/myCars"}>My Cars</NavLink>
          </li>
          <li>
            <NavLink to={"/myBookings"}>My Bookings</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="flex items-center ml-[-20px]" to={"/"}>
            <img className="w-20" src={logo} alt="" />
            <p className="text-2xl font-bold hidden lg:inline">Car Rental</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            style={{ fontSize: "15px" }}
            className="menu menu-horizontal px-1"
          >
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex">
              <Link
                to={"/myProfile"}
                className="tooltip tooltip-left w-10 mr-5"
                data-tip={user.displayName || "User"}
              >
                <img
                  className="rounded-full"
                  alt="profile"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </Link>

              <button
                onClick={handleSignOut}
                className="btn text-white bg-orange-500 hover:bg-orange-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={"/signIn"}
              className="btn text-white bg-orange-500 hover:bg-orange-600"
            >
              Log-in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
