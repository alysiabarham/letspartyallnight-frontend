// src/GuesserRankingPage.tsx
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  VStack,
  Heading,
  Button,
  Box,
  Text,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import socket from './socket'; // ✅ shared instance

const SortableItem = ({ id, index }: { id: string; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      p={3}
      bg="#16213E"
      borderRadius="md"
      w="100%"
    >
      #{index + 1}: {id}
    </Box>
  );
};

function GuesserRankingPage() {
  const { roomCode } = useParams();
  const location = useLocation();
  const playerName = location.state?.playerName || 'Guest';

  const [entries, setEntries] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [finalRanking, setFinalRanking] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const toast = useToast();
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    socket.emit('joinGameRoom', {
        roomCode,
        playerName
    });

    socket.emit('requestEntries', { roomCode });

    socket.on('sendAllEntries', ({ entries }: { entries: string[] }) => {
      console.log('✅ Received selected entries for guessing:', entries);

      if (!entries || entries.length < 1) {
        console.log("❌ No entries received from backend. Waiting...");
        return;
      }

      setEntries(entries);
    });

    socket.on('revealResults', ({ judgeRanking, results }) => {
      console.log('📊 Scoring results received:', results);
      setFinalRanking(judgeRanking);
      setScore(results[playerName]?.score || 0);
      setResultsVisible(true);
      toast({
        title: `Results revealed! You scored ${results[playerName]?.score || 0} points!`,
        description: 'See how your guess compares to the Judge’s ranking.',
        status: 'info',
        duration: 6000,
        isClosable: true
      });
    });

    return () => {
      socket.off('sendAllEntries');
      socket.off('revealResults');
    };
  }, [roomCode, playerName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (entries.length === 0) {
        toast({
          title: "Still waiting on Judge...",
          description: "The Judge may not have submitted yet.",
          status: "warning",
          duration: 6000,
          isClosable: true
        });
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [entries]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = entries.indexOf(active.id);
      const newIndex = entries.indexOf(over.id);
      setEntries((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSubmit = () => {
    socket.emit('submitGuess', {
      roomCode,
      playerName,
      guess: entries
    });

    setSubmitted(true);
    toast({
      title: 'Guess submitted!',
      description: 'Waiting for results...',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  return (
    <VStack spacing={6} p={8} bg="#0F3460" minH="100vh" color="white">
      {!resultsVisible ? (
        <>
          <Heading size="lg" color="#FFFF00">Your Guess: Rank the Entries</Heading>
          <Text fontSize="md" fontStyle="italic">
            Drag and drop the entries how you think the Judge ranked them.
          </Text>

          {entries.length === 0 ? (
            <Box pt={10} textAlign="center">
              <Spinner size="lg" />
              <Text pt={4}>Waiting for Judge’s selected entries...</Text>
            </Box>
          ) : (
            <Box w="100%" maxW="400px">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={entries} strategy={verticalListSortingStrategy}>
                  <VStack spacing={3}>
                    {entries.map((item, index) => (
                      <SortableItem key={item} id={item} index={index} />
                    ))}
                  </VStack>
                </SortableContext>
              </DndContext>
            </Box>
          )}

          {!submitted && entries.length > 0 && (
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit Your Guess
            </Button>
          )}

          {submitted && (
            <Text fontSize="md" color="green.300">
              Ranking submitted. Waiting for results...
            </Text>
          )}
        </>
      ) : (
        <>
          <Heading size="lg" color="#FF00FF">Judge’s Final Ranking</Heading>
          <Box w="100%" maxW="400px">
            <VStack spacing={3}>
              {finalRanking.map((item, idx) => (
                <Box
                  key={item}
                  p={3}
                  bg="#1A1A2E"
                  borderRadius="md"
                  w="100%"
                >
                  #{idx + 1}: {item}
                </Box>
              ))}
            </VStack>
          </Box>
          <Text pt={4} fontSize="lg" fontWeight="bold" color="yellow.400">
            Your Score: {score} / {finalRanking.length}
          </Text>
        </>
      )}
    </VStack>
  );
}

export default GuesserRankingPage;
