// src/RoomPage.tsx
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters

const RoomPage = () => {
  const { roomCode } = useParams<{ roomCode: string }>(); // Get roomCode from URL

  return (
    <VStack spacing={8} p={8} minH="100vh" justifyContent="center" bg="gray.100">
      <Heading as="h1" size="xl" color="brand.500">
        Welcome to Room: {roomCode}
      </Heading>
      <Text fontSize="lg" color="gray.700">
        This is your game lobby. Players will appear here.
      </Text>
      {/* Future: Display player list, chat, start game button, etc. */}
      <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" w="300px" textAlign="left">
        <Text fontWeight="bold" mb={2}>Players:</Text>
        <Text>You (Host/Player)</Text>
        {/* Future: Dynamically list other players */}
      </Box>
    </VStack>
  );
};

export default RoomPage;