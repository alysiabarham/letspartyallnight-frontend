// src/App.tsx
import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import RoomPage from './RoomPage'; // Import the RoomPage component

// Define your LandingPageContent component
const LandingPageContent = () => {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [playerNameInput, setPlayerNameInput] = useState(''); // <--- NEW STATE FOR PLAYER NAME
  const toast = useToast();
  const navigate = useNavigate();

  const BACKEND_URL = 'https://letspartyallnight-backend.vercel.app'; 

  const handleCreateRoom = async () => {
    if (!playerNameInput.trim()) { // <--- VALIDATION FOR PLAYER NAME
      toast({
        title: "Please enter your name.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Use the entered player name as hostId for now
      const hostId = playerNameInput.trim(); 
      
      const response = await axios.post(`${BACKEND_URL}/create-room`, { hostId: hostId });
      const { roomCode, room } = response.data;
      
      toast({
        title: "Room created!",
        description: `Your room code is: ${roomCode}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Pass the player name to the room page via state (for immediate display)
      navigate(`/room/${roomCode}`, { state: { playerName: playerNameInput.trim() } });

    } catch (error: any) {
      console.error("Error creating room:", error.response?.data || error.message);
      toast({
        title: "Error creating room.",
        description: error.response?.data?.error || "Please try again later. Check backend logs for details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCodeInput.trim() || !playerNameInput.trim()) { // <--- VALIDATION FOR BOTH
      toast({
        title: "Please enter your name and a room code.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Use the entered player name as playerId
      const playerId = playerNameInput.trim(); 
      
      const response = await axios.post(`${BACKEND_URL}/join-room`, {
        roomCode: roomCodeInput,
        playerId: playerId
      });
      
      const { room } = response.data;
      
      toast({
        title: "Room joined!",
        description: `You joined room: ${room.code}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Pass the player name to the room page via state
      navigate(`/room/${room.code}`, { state: { playerName: playerNameInput.trim() } });

    } catch (error: any) {
      console.error("Error joining room:", error.response?.data || error.message);
      toast({
        title: "Error joining room.",
        description: error.response?.data?.error || "Room not found or full. Please check the code.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8} p={8} minH="100vh" justifyContent="center" bg="black">
      <Heading as="h1" size="2xl" color="brand.500">
        Let's Party All Night!
      </Heading>
      <Text fontSize="lg" color="white">
        Host or join a game with friends.
      </Text>

      {/* --- NEW PLAYER NAME INPUT --- */}
      <Input
        placeholder="Enter Your Name"
        size="lg"
        value={playerNameInput}
        onChange={(e) => setPlayerNameInput(e.target.value)}
        w="300px"
        textAlign="center"
      />
      {/* --- END NEW PLAYER NAME INPUT --- */}

      <Button
        colorScheme="brand"
        variant="neon"
        size="lg"
        onClick={handleCreateRoom}
        w="200px"
      >
        CREATE NEW ROOM
      </Button>

      <Text fontSize="lg" color="white">
        OR
      </Text>

      <Input
        placeholder="Enter Room Code"
        size="lg"
        value={roomCodeInput}
        onChange={(e) => setRoomCodeInput(e.target.value)}
        w="300px"
        textAlign="center"
      />
      <Button
        colorScheme="teal"
        variant="neon"
        size="lg"
        onClick={handleJoinRoom}
        w="200px"
      >
        JOIN ROOM
      </Button>
    </VStack>
  );
};


// This is the main App component that sets up routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageContent />} />
      <Route path="/room/:roomCode" element={<RoomPage />} />
    </Routes>
  );
}

export default App;
