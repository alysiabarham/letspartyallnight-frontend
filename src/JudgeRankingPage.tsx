// src/JudgeRankingPage.tsx
import { useState } from 'react';
import {
  VStack,
  Heading,
  Button,
  Box,
  Text,
  useToast
} from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://letspartyallnight-backend.onrender.com', {
  withCredentials: true
});

const mockEntries = [
  'Social Media Influencers',
  'Pumpkin Spice Everything',
  'Streaming Service Subscriptions',
  'Online Personality Tests',
  'Luxury Water Brands'
];

function JudgeRankingPage() {
  const { roomCode } = useParams();
  const toast = useToast();

  const [items, setItems] = useState(mockEntries);
  const [submitted, setSubmitted] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
  };

  const handleSubmitRanking = () => {
    socket.emit('submitRanking', {
      roomCode,
      ranking: items
    });

    setSubmitted(true);
    toast({
      title: 'Ranking submitted!',
      description: 'Your order has been sent to the server.',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
  };

  return (
    <VStack spacing={6} p={8} bg="#0F3460" minH="100vh" color="white">
      <Heading size="lg" color="#FF00FF">Judge Mode: Rank the Entries</Heading>
      <Text fontSize="lg" fontStyle="italic">
        Drag the items below to arrange your secret ranking.
      </Text>

      <Box w="100%" maxW="400px">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="entries">
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

      {!submitted && (
        <Button
          colorScheme="green"
          onClick={handleSubmitRanking}
        >
          Submit Ranking
        </Button>
      )}
      {submitted && (
        <Text fontSize="md" color="green.300">Ranking submitted. Waiting for guesses...</Text>
      )}
    </VStack>
  );
}

export default JudgeRankingPage;
