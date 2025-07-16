// src/GuesserRankingPage.tsx
import { useState } from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://letspartyallnight-backend.vercel.app', {
  withCredentials: true
});

// Placeholder entry list for testing
const roundEntries = [
  'Luxury Water Brands',
  'Online Personality Tests',
  'Streaming Service Subscriptions',
  'Pumpkin Spice Everything',
  'Social Media Influencers'
];

function GuesserRankingPage() {
  const { roomCode } = useParams();
  const toast = useToast();

  const [items, setItems] = useState(roundEntries);
  const [submitted, setSubmitted] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
  };

  const handleSubmitGuess = () => {
    socket.emit('submitGuess', {
      roomCode,
      guess: items
    });

    setSubmitted(true);
    toast({
      title: 'Guess submitted!',
      description: 'Your ranking guess was sent.',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  return (
    <VStack spacing={6} p={8} bg="#1A1A2E" minH="100vh" color="white">
      <Heading size="lg" color="#00FFFF">Rank the Topic</Heading>
      <Text fontSize="md" fontStyle="italic" color="gray.300">
        Drag the items to match how you think the Judge ranked them.
      </Text>

      <Box w="100%" maxW="400px">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="guesses">
            {(provided) => (
              <VStack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
              >
                {items.map((entry, idx) => (
                  <Draggable key={entry} draggableId={entry} index={idx}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        p={3}
                        bg="#16213E"
                        borderRadius="md"
                        w="100%"
                      >
                        #{idx + 1}: {entry}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      {!submitted ? (
        <Button
          colorScheme="teal"
          onClick={handleSubmitGuess}
        >
          Submit My Guess
        </Button>
      ) : (
        <Text color="green.300">Guess submitted! Waiting for results...</Text>
      )}
    </VStack>
  );
}

export default GuesserRankingPage;
