// frontend/src/LandingPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  useTheme // <--- This is the correct import for useTheme in Chakra UI v2 normally
} from '@chakra-ui/react';

const LandingPage: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>('');
  const theme = useTheme(); // Access our custom theme colors

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      alert(`Attempting to join room: ${roomCode.trim()}`);
    } else {
      alert('Please enter a room code.');
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bg="background"
      p={4}
      textAlign="center"
      overflow="hidden"
    >
      <VStack spacing={8} maxW="90%" mx="auto">
        <Heading
          as="h1"
          fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
          fontFamily="heading"
          fontWeight="bold"
          color={theme.colors.neon.pink}
          style={{
            textShadow: `
              0 0 10px ${theme.colors.neon.pink},
              0 0 20px ${theme.colors.neon.pink},
              0 0 30px ${theme.colors.neon.pink},
              0 0 40px ${theme.colors.neon.purple},
              0 0 70px ${theme.colors.neon.purple},
              0 0 80px ${theme.colors.neon.purple},
              0 0 100px ${theme.colors.neon.purple},
              0 0 150px ${theme.colors.neon.purple}
            `,
            animation: `neon-glow 1.5s ease-in-out infinite alternate`,
          }}
        >
          Let's Party All Night!
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          color={theme.colors.neon.blue}
          textShadow={`0 0 8px ${theme.colors.neon.blue}`}
          fontFamily="body"
        >
          Your global hub for hilarious party games!
        </Text>

        <Input
          placeholder="Enter Room Code (e.g., ABC123)"
          size="lg"
          width={{ base: '80%', sm: '60%', md: '400px' }}
          bg="rgba(0,0,0,0.4)"
          color={theme.colors.neon.yellow}
          _placeholder={{ color: theme.colors.neon.yellow + '80' }}
          borderColor={theme.colors.neon.blue}
          borderWidth="2px"
          borderRadius="lg"
          textAlign="center"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          maxLength={6}
          textShadow={`0 0 5px ${theme.colors.neon.yellow}`}
          _focus={{
            borderColor: theme.colors.neon.green,
            boxShadow: `0 0 10px ${theme.colors.neon.green}`
          }}
        />

        <Button
          size="lg"
          bg={theme.colors.neon.purple}
          color="white"
          fontSize="xl"
          fontWeight="bold"
          py={7}
          px={10}
          borderRadius="full"
          boxShadow={`
            0 0 15px ${theme.colors.neon.purple},
            0 0 30px ${theme.colors.neon.purple},
            0 0 45px ${theme.colors.neon.purple}
          `}
          _hover={{
            bg: theme.colors.neon.pink,
            boxShadow: `
              0 0 20px ${theme.colors.neon.pink},
              0 0 40px ${theme.colors.neon.pink},
              0 0 60px ${theme.colors.neon.pink}
            `,
            transform: 'scale(1.05)'
          }}
          _active={{
            transform: 'scale(0.98)'
          }}
          onClick={handleJoinRoom}
        >
          JOIN ROOM
        </Button>

        <Button
          variant="outline"
          size="lg"
          fontSize="lg"
          color={theme.colors.neon.green}
          borderColor={theme.colors.neon.green}
          borderWidth="2px"
          borderRadius="full"
          _hover={{
            bg: theme.colors.neon.green + '20',
            boxShadow: `0 0 10px ${theme.colors.neon.green}`
          }}
          onClick={() => alert('Create New Room functionality coming soon!')}
        >
          CREATE NEW ROOM
        </Button>
      </VStack>
    </Box>
  );
};

export default LandingPage;