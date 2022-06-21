import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, Button, Stack } from '@chakra-ui/react'

import { NavAvatarMenu } from './NavAvatarMenu'

export const NavRight = ({
  colorMode,
  toggleColorMode,
}: {
  colorMode: string
  toggleColorMode: () => void
}) => (
  <Flex alignItems={'center'}>
    <Stack direction={'row'} spacing={7}>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>

      <NavAvatarMenu />
    </Stack>
  </Flex>
)
