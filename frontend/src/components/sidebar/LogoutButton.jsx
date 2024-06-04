import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
function LogoutButton() {
  return (
    <div className="mt-auto">
      <Link to={'/login'}>
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
      </Link>
    </div>
  );
}

export default LogoutButton;
