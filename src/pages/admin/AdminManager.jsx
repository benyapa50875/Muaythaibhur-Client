import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import AdminList from '../../components/admin/AdminList';
import CreateAdminModal from '../../components/admin/AdminCreate';
import axios from 'axios';

const AdminManager = () => {
  return (
    <Box p={6}>
      <Flex direction="column" gap={6}>

        <AdminList />
      </Flex>
    </Box>
  );
};

export default AdminManager;
