import React from "react";
import peer from "../../assets/peer/peer.png";

function Peerphoto({data}) {
  // console.log(data,"data");
  return (
    <div className="flex flex-col">
      <div className="lg:mt-14">
        <h1
          className="text-2xl  lg:text-5xl text-white text-center lg:mb-16"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          <p className="text-xl lg:text-4xl"> {data?.title}</p>
        </h1>{" "}
      </div>
      <div className=" lg:mt-24 lg:h-[400px] mt-8  flex items-center justify-center">
        <img src={data?.image} />
      </div>
    </div>
  );
}

export default Peerphoto;
