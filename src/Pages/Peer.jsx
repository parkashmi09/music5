import React from 'react'
import Connect from '../Components/peer/Connect'
import TeamTrust from '../Components/Subscription/TeamTrust'
import Peerphoto from '../Components/peer/Peerphoto'
import Seamlessly from '../Components/peer/Seamlessly'
import Frequently from '../Components/video/Frequently'
import Advertise from '../Components/blog/Advertise'
import { providedServices } from '../services/providedServices'
import { useState, useEffect } from 'react'

function Peer() {
  const {getPeerToPeer} = providedServices;

  const [loading, setLoading] = useState(true);
  const [peerData, setPeerData] = useState(null)

  const fetchPeerToPeer = async () => {
    try {
      const response = await getPeerToPeer();
      // Transform the array into an object with position as keys
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});

      setPeerData(organizedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching PeerToPeer data:", error);
    }
  };

  useEffect(() => {
    fetchPeerToPeer();
  }, []);

  console.log(peerData,"peerData");
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFD700]"></div>
          <p className="mt-4 text-white font-['Orbitron'] text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
        <Connect data={peerData?.top}/>
        <TeamTrust/>
        <Peerphoto data={peerData?.topBottom}/>
        <Seamlessly data={peerData?.middle}/>
        <Frequently/>
        <Advertise/>
    </div>
  )
}

export default Peer