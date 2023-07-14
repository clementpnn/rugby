import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/buttons/button'
import React from 'react'

describe( 'Button component', () => {
  const onClickMock = jest.fn()
  test( 'renders with default properties', () => {
    render(
      // eslint-disable-next-line react/no-children-prop
      React.createElement( Button, {
        variant: 'primary',
        size:'md',
        type:'button',
        onClick: onClickMock,
        children:'Custom Button'
      } )
    )
    const buttonElement = screen.getByRole( 'button' )
    expect( buttonElement ).toBeInTheDocument()
    expect( buttonElement ).toHaveTextContent( 'Custom Button' )
    expect( buttonElement ).toHaveClass( 'primary md' )
    expect( buttonElement ).toBeEnabled()
    fireEvent.click( buttonElement )
    expect( onClickMock ).toHaveBeenCalledTimes( 1 )
  } )
} )