// src/RoomPage.tsx
import { Box, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RoomPage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const location = useLocation();
  const initialPlayerName = (location.state as { playerName?: string })?.playerName || 'You';

  const [players, setPlayers] = useState([{ id: 'loading', name: initialPlayerName }]);
  const [loading, setLoading] = useState(true); // This is line 13, ensure it's exactly as shown
  const [error, setError] = useState<string | null>(null);

  // IMPORTANT: This is your actual deployed backend URL from Vercel
  const BACKEND_URL = 'https://letspartyallnight-backend-secure.vercel.app'; 

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/room/${roomCode}`);
        setPlayers(response.data.players);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching room details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load room details.");
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    if (roomCode) {
      fetchRoomDetails();
    }
  }, [roomCode]);

  return (
    <VStack spacing={8} p={8} minH="100vh" justifyContent="center" bg="black">
      <Heading 
        as="h1" 
        size="xl" 
        color="#00BFFF"
        textShadow="0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 15px #00BFFF"
      >
        Welcome to Room: {roomCode}
      </Heading>
      <Text fontSize="lg" color="white">
        This is your game lobby. Players will appear here.
      </Text>

      <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.900" 
           borderColor="#00BFFF"
           w="300px" textAlign="left" 
           boxShadow="0 0 10px #00BFFF">
        <Text fontWeight="bold" mb={2} color="#00BFFF">Players:</Text>
        {loading ? (
          <Spinner size="md" color="#00BFFF" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : players.length > 0 ? (
          <VStack align="start" spacing={1}>
            {players.map((player) => (
              <Text key={player.id} color="white">{player.name}</Text>
            ))}
          </VStack>
        ) : (
          <Text color="white">No players in room yet.</Text>
        )}
      </Box>
    </VStack>
  );
};

export default RoomPage;
