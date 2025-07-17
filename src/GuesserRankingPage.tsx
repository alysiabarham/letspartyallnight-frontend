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
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL!, {
  withCredentials: true
});

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
  const [entries, setEntries] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [finalRanking, setFinalRanking] = useState<string[]>([]);
  const toast = useToast();
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    socket.on('sendAllEntries', ({ entries }) => {
      console.log('✅ Received entries from server:', entries);
      setEntries(entries);
    });

    socket.on('revealResults', ({ judgeRanking }) => {
      setFinalRanking(judgeRanking);
      setResultsVisible(true);
      toast({
        title: 'Results revealed!',
        description: 'Compare your guess to the Judge\'s final ranking.',
        status: 'info',
        duration: 6000,
        isClosable: true
      });
    });

    return () => {
      socket.off('sendAllEntries');
      socket.off('revealResults');
    };
  }, []);

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
      guess: entries
    });
    setSubmitted(true);
    toast({
      title: 'Ranking submitted!',
      description: 'Waiting for others...',
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
            Drag to arrange how you think the Judge ranked these.
          </Text>

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
          <Heading size="lg" color="#FF00FF">Judge's Final Ranking</Heading>
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
        </>
      )}
    </VStack>
  );
}

export default GuesserRankingPage;
