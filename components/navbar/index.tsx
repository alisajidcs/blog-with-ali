import { useColorMode } from '@chakra-ui/react'

import { NavContainer } from './NavContainer'
import { NavRight } from './NavRight'
import { NavTitle } from './NavTitle'

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <NavContainer>
        <NavTitle />
        <NavRight colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </NavContainer>
    </>
  )
}
