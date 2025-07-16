// src/RoomPage.tsx
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const toast = useToast();
  const playerName = location.state?.playerName || 'Guest';

  const [players, setPlayers] = useState<string[]>([]);
  const [entries, setEntries] = useState<string[]>([]);
  const [entryText, setEntryText] = useState('');
  const [doneSubmitting, setDoneSubmitting] = useState(false);
  const [category, setCategory] = useState('Things That Are Overrated'); // Can be randomized later
  const [judge, setJudge] = useState('');
  const [round, setRound] = useState(1);

  // Assign judge per round
  useEffect(() => {
    if (players.length > 0) {
      const index = (round - 1) % players.length;
      setJudge(players[index]);
    }
  }, [players, round]);

  useEffect(() => {
    socket.emit('joinGameRoom', roomCode);

    socket.on('playerJoined', ({ playerId }) => {
      setPlayers((prev) => (!prev.includes(playerId) ? [...prev, playerId] : prev));
    });

    socket.on('newEntry', ({ entry }) => {
      setEntries((prev) => [...prev, entry]);
    });

    socket.on('startRankingPhase', ({ judgeName }) => {
      if (playerName === judgeName) {
        navigate(`/judge/${roomCode}`);
      } else {
        navigate(`/guess/${roomCode}`);
      }
    });

    return () => {
      socket.off('playerJoined');
      socket.off('newEntry');
      socket.off('startRankingPhase');
    };
  }, [roomCode, playerName, navigate]);

  const handleEntrySubmit = () => {
    const trimmed = entryText.trim();
    if (!trimmed) {
      toast({ title: 'Entry cannot be empty.', status: 'warning', duration: 3000, isClosable: true });
      return;
    }

    socket.emit('submitEntry', {
      roomCode,
      playerName,
      entry: trimmed
    });

    setEntryText('');
    toast({ title: 'Entry submitted!', description: `"${trimmed}" added.`, status: 'success', duration: 3000, isClosable: true });
  };

  const handleDoneSubmitting = () => {
    setDoneSubmitting(true);
    toast({ title: 'Marked as done submitting.', status: 'info', duration: 3000, isClosable: true });
  };

  const handleAdvanceToRankingPhase = () => {
    if (entries.length < 5) {
      toast({ title: 'Not enough entries yet.', description: 'At least 5 needed.', status: 'warning', duration: 4000, isClosable: true });
      return;
    }

    socket.emit('startRankingPhase', { roomCode, judgeName: judge });
  };

  const isJudge = playerName === judge;

  return (
    <VStack spacing={6} p={6} minH="100vh" bg="#0F3460" color="white">
      <Heading size="lg" color="#FF00FF">Room: {roomCode}</Heading>
      <Heading size="md" color="#00FFFF">Game: Rank the Topic</Heading>
      <Text fontSize="xl">Welcome, {playerName}!</Text>
      <Text fontSize="md" fontStyle="italic">Current Category: {category}</Text>
      <Text fontSize="md">Judge this round: <strong>{judge}</strong></Text>

      {!isJudge && !doneSubmitting && (
        <>
          <Input
            placeholder="Enter an item"
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

          <Button
            onClick={handleDoneSubmitting}
            colorScheme="yellow"
          >
            I'm Done Submitting
          </Button>
        </>
      )}

      {isJudge && (
        <Button
          colorScheme="pink"
          onClick={handleAdvanceToRankingPhase}
        >
          Advance to Ranking Phase
        </Button>
      )}

      <Box w="100%" maxW="400px" mt={6}>
        <Heading size="md" mb={2}>Submitted Entries:</Heading>
        <List spacing={2}>
          {entries.map((entry, idx) => (
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
