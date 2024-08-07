import React from 'react'

import { RiHome5Fill } from 'react-icons/ri'

import { Container, MenuItem } from './styles'
import { ActiveBar } from '../styles'

const TopMenu: React.FC = () => {
  return (
    <Container>
      <MenuItem active>
        <ActiveBar /> <RiHome5Fill size={25} />
        <span>Home</span>
      </MenuItem>
    </Container>
  )
}

export default TopMenu
