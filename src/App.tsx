// src/App.tsx
import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import RoomPage from './RoomPage'; // Import the RoomPage component

// Define your LandingPageContent component
const LandingPageContent = () => {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  // This is the direct Vercel URL for your backend project
  const BACKEND_URL = 'https://letspartyallnight-backend.vercel.app'; 

  const handleCreateRoom = async () => {
    if (!playerNameInput.trim()) {
      toast({
        title: "Please enter your name.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
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
    if (!roomCodeInput.trim() || !playerNameInput.trim()) {
      toast({
        title: "Please enter your name and a room code.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
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
    <VStack spacing={8} p={8} minH="100vh" justifyContent="center" bg="#1A1A2E"> 
      <Heading as="h1" size="2xl" color="brand.500"> {/* Main title remains magenta */}
        Let's Party All Night!
      </Heading>
      <Text fontSize="lg" color="white">
        Host or join a game with friends.
      </Text>

      <Input
        placeholder="Enter Your Name"
        size="lg"
        value={playerNameInput}
        onChange={(e) => setPlayerNameInput(e.target.value)}
        w="300px"
        textAlign="center"
      />

      <Button
        colorScheme="brand"
        variant="neon"      /* CREATE NEW ROOM button uses default neon (magenta) */
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
        colorScheme="brand" 
        variant="pureGreenNeon"      /* JOIN ROOM button uses pure green neon */
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
