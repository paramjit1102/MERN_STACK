import React from "react";
import SearcInput from "./SearcInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
function Sidebar() {
  return (
    <div className=" border-r border-slate-500 p-4 flex flex-col">
      <SearcInput/>
      <div className="divider px-3">ccc</div>
      <Conversations/>
      <LogoutButton/>
    </div>
  );
}

export default Sidebar;
