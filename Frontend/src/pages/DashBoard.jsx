import React, { useEffect, useState, useRef } from 'react';
import { Music, Users, MessageSquare, ThumbsUp, Link, Bell, X } from 'lucide-react'; // Import X icon
import Youtube from 'react-youtube';
import { getdata } from '../services/user-service';
import { toast } from 'react-toastify';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const GroupSyncDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [playList, setPlayList] = useState([]);
  const [currentSongURL, setCurrentSongURL] = useState('');
  const [currentSongTitle, setCurrentSongTitle] = useState(''); // New state for current song title
  const [chatMessages, setChatMessages] = useState([]); // New state for chat messages
  const [message, setMessage] = useState(''); // New state for the message input
  const [upvotedSongs, setUpvotedSongs] = useState([]); // New state for tracking upvoted songs
  const [presentUsers, setPresentUsers] = useState([]); // New state for present users
  const [newMessage, setNewMessage] = useState(false); // New state for new message notification
  const location = useLocation();
  const navigate = useNavigate();
  const { roomName, roomPassword , username } = location.state || {};  
  const [songStarted, setSongStarted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // New state for chat panel visibility

  const stompClientRef = useRef(null); // Use useRef to store the stompClient
  const playerRef = useRef(null); // Use useRef to store the YouTube player instance
 
  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient; // Store the stompClient in the ref

    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame); // Log connection success

      stompClientRef.current.subscribe(`/topic/room/${roomName}`, (message) => {
        const l = JSON.parse(message.body);
        console.log("Room message received: ", l); // Log room messages
      });
              
      stompClient.subscribe(`/topic/chat1/${roomName}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("Chat message received: ", newMessage); // Log chat messages
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        setNewMessage(true); // Set new message notification
      });
      
      stompClient.subscribe(`/topic/playlist/${roomName}`, (message) => {
        let newPlaylist = JSON.parse(message.body);
        console.log("Playlist message received: ", newPlaylist); // Log playlist messages
        setPlayList(prevplaylist => [...newPlaylist.playList]);
      
          
      });

      stompClient.subscribe(`/topic/disconnect`, (message) => {
        
      });

      stompClient.subscribe(`/topic/users/${roomName}`, (message) => {
        const users = JSON.parse(message.body);
        console.log("Users message received: ", users);
        setPresentUsers(users);
      });

      sendRoomData(); // Call sendRoomData after connection is established
    }, (error) => {
      console.error("Connection error: ", error);
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isPlaying && playerRef.current) {
        playerRef.current.playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [roomName, isPlaying]);

  function sendRoomData() {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const data = {
        roomName: roomName,
        roomPassword: roomPassword,
        username: username
      };
      stompClientRef.current.send(`/app/room/${roomName}`, {}, JSON.stringify(data));
    }
  }

  const handleAddYoutubeUrl = (event) => {
    event.preventDefault(); // Prevent page reload
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    } else {
      const data = {
        youtubeUrl: youtubeUrl
      };
   
      // Check if the song is already in the playlist
      if (playList.some(song => song.url === youtubeUrl)) {
        toast.error("Song is already in the playlist");
        return;
      }

      getdata(data)
        .then((res) => {
          if (res.data.title !== "- YouTube") {
            const newSong = { ...res.data, votes: 1 };
            const updatedPlayList = [...playList, newSong];
            setPlayList(updatedPlayList);

            // Send the updated playlist through WebSocket
            if (stompClientRef.current && stompClientRef.current.connected) {
              const playlistData = {
                playList: updatedPlayList
              };
              stompClientRef.current.send(`/app/playlist/${roomName}`, {}, JSON.stringify(playlistData));
            }
            if (playList.length === 0) {
              setCurrentSongURL(newSong.url);
              setCurrentSongTitle(newSong.title);
              setIsPlaying(false);
              setSongStarted(false);
            }
          } else {
            toast.error("URL is not valid");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setYoutubeUrl('');
  };

  const handleUpvote = (index) => {
    const songId = playList[index].url;
    if (upvotedSongs.includes(songId)) {
      toast.error("You have already upvoted this song");
      return;
    }
  
    const updatedPlayList = [...playList];
    updatedPlayList[index].votes = (updatedPlayList[index].votes || 0) + 1;
    updatedPlayList.sort((a, b) => b.votes - a.votes);
    setPlayList(updatedPlayList);
    setUpvotedSongs([...upvotedSongs, songId]); // Add the song to the upvoted list

    const playlistData = {
      playList: updatedPlayList
    };
    stompClientRef.current.send(`/app/playlist/${roomName}`, {}, JSON.stringify(playlistData));
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  //setting url in variable which must be played
  useEffect(()=>{  
    if(playList.length>0 && !songStarted){   
      setCurrentSongURL(playList[0].url);
      setCurrentSongTitle(playList[0].title); // Set the current song title
      setSongStarted(true);
    }
  },[playList])

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay:1 ,
    },
  };

  const handleSendMessage = () => {
    if (stompClientRef.current && stompClientRef.current.connected && message.trim() !== '') {
      const chatMessage = {
        user: username, // Ensure the correct property name is used
        message: message.trim()
      };
      console.log("Sending chat message: ", chatMessage); // Log message before sending
      stompClientRef.current.send(`/app/chat1/${roomName}`, {}, JSON.stringify(chatMessage));
      setMessage('');
    } else {
      console.error("Failed to send message: WebSocket not connected or message is empty");
    }
  };

  const handleSongEnd = () => {
    const updatedPlayList = playList.filter(song => song.url !== currentSongURL);
    setPlayList(updatedPlayList);

    if (updatedPlayList.length > 0) {
      setCurrentSongURL(updatedPlayList[0].url);
      setCurrentSongTitle(updatedPlayList[0].title); // Set the next song title
      setIsPlaying(true);
      setSongStarted(true);
    } else {
      setCurrentSongURL('');
      setCurrentSongTitle(''); // Clear the song title
      setIsPlaying(false);
      setSongStarted(false);
    }

    const playlistData = {
      playList: updatedPlayList
    };
    stompClientRef.current.send(`/app/playlist/${roomName}`, {}, JSON.stringify(playlistData));
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setNewMessage(false); // Reset new message notification
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-300">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="p-4 max-w-6xl mx-auto space-y-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex items-center gap-2">
            <Music className="w-7 h-7 text-cyan-600" />
            <h1 className="text-3xl font-bold text-white">GroupSync</h1>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(roomPassword)
                toast.success("Password copied to clipboard");
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg">
              <span className="hidden sm:inline">Copy Password</span>
              <span className="sm:hidden">Copy</span>
            </button>
            <button 
              onClick={() => {
                navigate('/');
                const data = { roomName: roomName , username: username };
                stompClientRef.current.send(`/app/disconnect`, {}, JSON.stringify(data));
                stompClientRef.current.disconnect();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              Leave
            </button>
            <button 
              onClick={handleChatToggle} // Toggle chat panel visibility
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 rounded-lg flex items-center gap-2 md:px-4 relative">
              <Bell size={16} />
              <span className="hidden md:inline">Chat</span>
              {newMessage && (
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Alert for invalid URL */}
        {showAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Please enter a valid YouTube URL</span>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Now Playing */}
          <div className="col-span-1 md:col-span-2 bg-transparent rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Music className="h-5 w-5 text-white" />
              <h2 className="text-xl font-semibold text-white">Now Playing</h2>
            </div>
            <div className="relative h-[200px] md:h-[400px] bg-black rounded-lg mb-4">
              {/* YouTube Player */}
              {currentSongURL && (
                <div className="w-full h-full">
                  <Youtube
                    videoId={getYoutubeId(currentSongURL)}
                    onPlay={() => setSongStarted(true)}
                    opts={opts}
                    onEnd={handleSongEnd}
                    onReady={(event) => {
                      playerRef.current = event.target;
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <div>
                <h3 className="text-xl font-semibold text-white">{currentSongTitle || 'No song playing'}</h3>
                <p className="text-gray-500">Room Name: {roomName}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {/* ...existing code... */}
              </div>
            </div>
          </div>

          {/* Queue with Add YouTube URL */}
          <div className="bg-transparent rounded-2xl p-4 shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">Up Next</h2>
            </div>
            {/* Add YouTube URL Input */}
            <div className="mb-4 space-y-2">
              <form onSubmit={handleAddYoutubeUrl}>
                <div className="flex flex-col gap-2">
                  <input 
                    type="text" 
                    placeholder="Paste YouTube URL..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="flex-1 p-2 border rounded-lg bg-transparent text-white"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Link size={16} />
                    Add
                  </button>
                </div>
              </form>
            </div>
            
            <div className="space-y-4">
              {playList.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-600 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-400">{item.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 hover:bg-gray-200 rounded"
                      onClick={() => handleUpvote(index)}
                    >
                      <ThumbsUp size={16} className="text-white" />
                    </button>
                    <span className="text-sm text-white">{item.votes || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Side Panel */}
      <div className={`fixed top-0 right-0 h-full bg-black text-white shadow-lg transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-white" />
              <h2 className="text-xl font-semibold text-white">Chat</h2>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className="p-2 rounded-lg bg-gray-900">
                <p className="font-medium font-bold text-cyan-500">{msg.user}:</p>
                <p className="text-white">{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <input 
              type="text" 
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded-lg bg-transparent text-white"
            />
            <button 
              onClick={handleSendMessage}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSyncDashboard;