    // src/App.tsx
    import { useState } from 'react';
    import { Box, Button, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
    import { useNavigate, Routes, Route } from 'react-router-dom';
    import axios from 'axios';

    import RoomPage from './RoomPage';

    const LandingPageContent = () => {
      const [roomCodeInput, setRoomCodeInput] = useState('');
      const [playerNameInput, setPlayerNameInput] = useState('');
      const toast = useToast();
      const navigate = useNavigate();

      // This is the direct Vercel URL for your backend project
      const BACKEND_URL = 'https://letspartyallnight-backend-secure.vercel.app'; 

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

        // Frontend validation: Ensure player name is alphanumeric
        if (!/^[a-zA-Z0-9]+$/.test(playerNameInput.trim())) {
          toast({
            title: "Invalid Name",
            description: "Player name must be alphanumeric (letters and numbers only).",
            status: "error",
            duration: 5000,
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

        // Frontend validation: Ensure player name is alphanumeric
        if (!/^[a-zA-Z0-9]+$/.test(playerNameInput.trim())) {
          toast({
            title: "Invalid Name",
            description: "Player name must be alphanumeric (letters and numbers only).",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        // Frontend validation: Ensure room code is alphanumeric
        if (!/^[a-zA-Z0-9]+$/.test(roomCodeInput.trim())) {
          toast({
            title: "Invalid Room Code",
            description: "Room code must be alphanumeric (letters and numbers only).",
            status: "error",
            duration: 5000,
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
          <Heading 
            as="h1" 
            size="2xl" 
            color="#FF00FF"
            textShadow="0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF, 0 0 30px #FF00FF, 0 0 35px #FF00FF"
          >
            Let's Party All Night!
          </Heading>
          <Text fontSize="lg" color="white">
            Host or join a game with friends.
          </Text>

          <Input
            placeholder="Enter Your Name (Alphanumeric Only)"
            size="lg"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
            w="300px"
            textAlign="center"
            color="#FFFF00"
            borderColor="#FFFF00"
            _focus={{
              borderColor: "#FFFF00",
              boxShadow: "0 0 5px #FFFF00"
            }}
            _placeholder={{
              color: "#FFFF00",
              opacity: 0.7
            }}
            // HTML5 pattern for client-side validation (alphanumeric only)
            pattern="^[a-zA-Z0-9]*$" 
            title="Name must contain only letters and numbers"
          />

          <Button
            bg="transparent"
            color="#FF00FF"
            border="2px solid #FF00FF"
            boxShadow="0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF"
            _hover={{
              bg: "rgba(255, 0, 255, 0.1)",
              boxShadow: "0 0 8px #FF00FF, 0 0 15px #FF00FF, 0 0 25px #FF00FF"
            }}
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
            placeholder="Enter Room Code (Alphanumeric Only)"
            size="lg"
            value={roomCodeInput}
            onChange={(e) => setRoomCodeInput(e.target.value)}
            w="300px"
            textAlign="center"
            color="#FFFF00"
            borderColor="#FFFF00"
            _focus={{
              borderColor: "#FFFF00",
              boxShadow: "0 0 5px #FFFF00"
            }}
            _placeholder={{
              color: "#FFFF00",
              opacity: 0.7
            }}
            // HTML5 pattern for client-side validation (alphanumeric only)
            pattern="^[a-zA-Z0-9]*$"
            title="Room code must contain only letters and numbers"
          />
          <Button
            bg="transparent"
            color="#00FF00"
            border="2px solid #00FF00"
            boxShadow="0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00"
            _hover={{
              bg: "rgba(0, 255, 0, 0.1)",
              boxShadow: "0 0 8px #00FF00, 0 0 15px #00FF00, 0 0 25px #00FF00"
            }}
            size="lg"
            onClick={handleJoinRoom}
            w="200px"
          >
            JOIN ROOM
          </Button>
        </VStack>
      );
    };


    function App() {
      return (
        <Routes>
          <Route path="/" element={<LandingPageContent />} />
          <Route path="/room/:roomCode" element={<RoomPage />} />
        </Routes>
      );
    }

    export default App;
    