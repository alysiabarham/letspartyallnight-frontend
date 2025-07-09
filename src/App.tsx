// src/App.tsx
import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import RoomPage from './RoomPage'; // <--- KEEP this import. This is your separate RoomPage.tsx

// Define your LandingPageContent component directly here
const LandingPageContent = () => {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const BACKEND_URL = 'https://letspartyallnight-backend.vercel.app/'; // Your local backend URL

  const handleCreateRoom = async () => {
    try {
      const playerId = `player_${Math.random().toString(36).substring(2, 7)}`;
      
      const response = await axios.post(`${BACKEND_URL}/create-room`, { hostId: playerId });
      const { roomCode, room } = response.data;
      
      toast({
        title: "Room created!",
        description: `Your room code is: ${roomCode}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate(`/room/${roomCode}`);

    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Error creating room.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCodeInput) {
      toast({
        title: "Please enter a room code.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const playerId = `player_${Math.random().toString(36).substring(2, 7)}`;
      
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

      navigate(`/room/${room.code}`);

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
    <VStack spacing={8} p={8} minH="100vh" justifyContent="center" bg="gray.50">
      <Heading as="h1" size="2xl" color="brand.500">
        Let's Party All Night!
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Host or join a game with friends.
      </Text>

      <Button
        colorScheme="brand"
        size="lg"
        onClick={handleCreateRoom}
        w="200px"
      >
        CREATE NEW ROOM
      </Button>

      <Text fontSize="lg" color="gray.600">
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
      {/* RoomPage is now imported from its own file, so we just use the component name directly */}
      <Route path="/room/:roomCode" element={<RoomPage />} />
    </Routes>
  );
}

export default App;