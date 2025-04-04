import React from "react";
import Group from "../../assets/video/Group.png";

function Substitle() {
  return (
    <div
      className="relative w-full"
      style={{ padding: window.innerWidth < 768 ? "1rem" : "5rem" }}
    >
      <img src={Group} className="w-full h-full object-cover" />
    </div>
  );
}

export default Substitle;
