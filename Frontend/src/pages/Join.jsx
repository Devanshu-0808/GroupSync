import React, { useState, useEffect } from 'react';
import { Users, Lock, Eye, EyeOff } from 'lucide-react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { data, useNavigate } from 'react-router-dom';
import { check, sendRoomData } from '../services/user-service';
import { toast } from 'react-toastify';

const RoomManagement = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(''); // New state for username
  const [joinRoomPassword, setJoinRoomPassword] = useState(''); // New state for join room password
  
  const navigate = useNavigate(); // Move useNavigate here



  const handleCreateRoom = (e) => {
    e.preventDefault();
    // Handle room creation logic here
    sendRoomData({ roomName, roomPassword, username }) // Include username
    .then(({data})=>{
      if(data==="Room Created"){
        toast.success(data)
        navigate("/dashboard" , {state: {roomName: roomName, roomPassword: roomPassword, username: username}});
      }
      else
      toast.error(data)
    })
  };

  const handleJoinRoom = (roomId) => {
    // Handle room joining logic here

    check({ username , joinRoomPassword, roomName })
    .then(({data})=>{

      if(data==="Room Found"){
        toast.success(data)
        navigate("/dashboard", {state: {roomName: roomId, roomPassword: joinRoomPassword, username: username}});
      }
      else
      toast.error(data)

    })

   
  };

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigator.clipboard.writeText(code);
    return code;
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-300">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="p-4 max-w-4xl mx-auto space-y-6 relative">
        {/* Header with Toggle */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setShowCreateRoom(true)}
            className={`px-6 py-3 rounded-lg font-medium ${
              showCreateRoom 
                ? 'bg-cyan-600 text-white' 
                : 'bg-transparent text-white hover:bg-gray-600'
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setShowCreateRoom(false)}
            className={`px-6 py-3 rounded-lg font-medium ${
              !showCreateRoom 
                ? 'bg-cyan-600 text-white' 
                : 'bg-transparent text-white hover:bg-gray-600'
            }`}
          >
            Join Room
          </button>
        </div>

        {/* Create Room Form */}
        {showCreateRoom ? (
          <div className="bg-transparent p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Create New Room</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username..."
                  className="w-full p-2 border rounded-lg bg-transparent text-white"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Room Name</label>
                <input
                  type="text"
                  placeholder="Enter room name..."
                  className="w-full p-2 border rounded-lg bg-transparent text-white"
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Room Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    placeholder="Enter room password..."
                    className="w-full p-2 border rounded-lg bg-transparent text-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
              >
                Create Room
              </button>
            </form>
          </div>
        ) : (
          /* Join Room View */
          <div className="space-y-6">
            {/* Direct Join with Code */}
            <div className="bg-transparent p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-white">Join with Room Code</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username..."
                    className="w-full p-2 border rounded-lg bg-transparent text-white"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Room Name</label>
                  <input
                    type="text"
                    placeholder="Enter room code..."
                    className="w-full p-2 border rounded-lg bg-transparent text-white"
                    required
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Room Password</label>
                  <input
                    type="password"
                    placeholder="Enter room password..."
                    className="w-full p-2 border rounded-lg bg-transparent text-white"
                    value={joinRoomPassword}
                    onChange={(e) => setJoinRoomPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <button 
                    onClick={() => handleJoinRoom(roomName)}
                    className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

          
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomManagement;