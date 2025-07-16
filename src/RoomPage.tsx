// src/RoomPage.tsx
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Box,
  List,
  ListItem,
  useToast
} from '@chakra-ui/react';
import { io } from 'socket.io-client';

const socket = io('https://letspartyallnight-backend.vercel.app', {
  withCredentials: true
});

function RoomPage() {
  const { roomCode } = useParams();
  const location = useLocation();
  const playerName = location.state?.playerName || 'Guest';
  const toast = useToast();

  const [entryText, setEntryText] = useState('');
  const [submittedEntries, setSubmittedEntries] = useState<string[]>([]);
  const [category, setCategory] = useState('Things That Are Overrated'); // Placeholder category for testing

  useEffect(() => {
    // Handle playerJoined events (optional visual feedback)
    socket.on('playerJoined', ({ message }) => {
      console.log(message);
    });

    // Listen for broadcasted entries
    socket.on('newEntry', (data) => {
      setSubmittedEntries((prev) => [...prev, data.entry]);
    });

    return () => {
      socket.off('playerJoined');
      socket.off('newEntry');
    };
  }, []);

  const handleEntrySubmit = () => {
    const trimmed = entryText.trim();
    if (!trimmed) {
      toast({
        title: 'Entry cannot be empty.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    socket.emit('submitEntry', {
      playerName,
      roomCode,
      entry: trimmed
    });

    setEntryText('');
    toast({
      title: 'Entry submitted!',
      description: `"${trimmed}" added to pool.`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <VStack spacing={6} p={6} minH="100vh" bg="#0F3460" color="white">
      <Heading size="lg" color="#FF00FF">Room: {roomCode}</Heading>
      <Text fontSize="xl">Welcome, {playerName}!</Text>
      <Text fontSize="lg" fontStyle="italic">Category: {category}</Text>

      <Input
        placeholder="Enter your ranked item"
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
        size="lg"
        w="300px"
        textAlign="center"
        borderColor="#FFFF00"
        color="#FFFF00"
        _placeholder={{ opacity: 0.7, color: "#FFFF00" }}
        _focus={{ borderColor: "#FFFF00", boxShadow: "0 0 5px #FFFF00" }}
      />

      <Button
        onClick={handleEntrySubmit}
        color="#00FF00"
        border="2px solid #00FF00"
        bg="transparent"
        _hover={{ bg: "rgba(0,255,0,0.1)", boxShadow: "0 0 15px #00FF00" }}
      >
        Submit Entry
      </Button>

      <Box w="100%" maxW="400px" mt={6}>
        <Heading size="md" mb={2}>Submitted Entries:</Heading>
        <List spacing={2}>
          {submittedEntries.map((entry, idx) => (
            <ListItem key={idx} p={2} bg="#16213E" borderRadius="md">
              {entry}
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
}

export default RoomPage;
