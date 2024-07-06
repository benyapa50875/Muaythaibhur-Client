import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

function ContactUsForm() {
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contactform", { sender, email, msg });
      toast({
        title: "Message sent.",
        description: "Thank you for contacting us!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSender("");
      setEmail("");
      setMsg("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send the message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <FormControl id="sender" isRequired mb={4}>
        <FormLabel>Sender</FormLabel>
        <Input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="msg" isRequired mb={4}>
        <FormLabel>Message</FormLabel>
        <Textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </FormControl>
      <Button type="submit" bg='#B80000' color='white' borderRadius='42px' w='full'>
        Send Message
      </Button>
    </form>
  );
}

export default ContactUsForm;
