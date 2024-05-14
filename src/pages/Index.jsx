import React, { useState } from 'react';
import { Box, Button, Input, Textarea, VStack, Text } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('An error occurred while fetching the response.');
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Input
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handlePromptChange}
        />
        <Button
          leftIcon={<FaPaperPlane />}
          colorScheme="teal"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Textarea
          placeholder="Response will appear here..."
          value={response}
          isReadOnly
        />
      </VStack>
    </Box>
  );
};

export default Index;