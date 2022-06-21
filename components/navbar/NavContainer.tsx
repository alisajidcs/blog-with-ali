import { ReactNode } from 'react'

import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

export const NavContainer = ({ children }: { children: ReactNode }) => (
  <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
      {children}
    </Flex>
  </Box>
)
