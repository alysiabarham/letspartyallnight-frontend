// src/RoomPage.tsx
import { Box, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { useEffect, useState } from 'react'; // Import useEffect and useState
import axios from 'axios'; // Import axios

const RoomPage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const location = useLocation(); // Hook to access state passed during navigation
  const initialPlayerName = (location.state as { playerName?: string })?.playerName || 'You'; // Get player name

  const [players, setPlayers] = useState([{ id: 'loading', name: initialPlayerName }]); // State to hold players
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // IMPORTANT: Replace with your actual deployed backend URL
  const BACKEND_URL = 'https://letspartyallnight-backend.vercel.app'; 

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
        setPlayers([]); // Clear players on error
      } finally {
        setLoading(false);
      }
    };

    if (roomCode) {
      fetchRoomDetails();
    }
  }, [roomCode]); // Re-fetch if roomCode changes

  return (
    <VStack spacing={8} p={8} minH="100vh" justifyContent="center" bg="black"> {/* Changed background to black */}
      <Heading as="h1" size="xl" color="brand.500">
        Welcome to Room: {roomCode}
      </Heading>
      <Text fontSize="lg" color="white"> {/* Changed text color to white */}
        This is your game lobby. Players will appear here.
      </Text>

      <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.900" borderColor="brand.500" w="300px" textAlign="left" boxShadow="0 0 10px #FF00FF"> {/* Darker box with neon border */}
        <Text fontWeight="bold" mb={2} color="brand.500">Players:</Text>
        {loading ? (
          <Spinner size="md" color="brand.500" />
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
      {/* More game UI will go here */}
    </VStack>
  );
};

export default RoomPage;
