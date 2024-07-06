import React, { useState } from "react";
import axios from "axios";
import { Heading, Link, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"

function EmailVerify() {


  return (
    <VStack py={8} px={20}>
        <Heading color='green' pb={4}>
            Email has veified
        </Heading>
        <Link as={RouterLink} to='/signin'>
        Go to Sign In
        </Link>
    </VStack>
  );
}

export default EmailVerify;
