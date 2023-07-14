import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Select, { SelectOption } from '@/components/inputs/select'

describe( 'Select component', () => {
  const options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' }
  ]

  const onChangeMock = jest.fn()
  render(
    React.createElement( Select, {
      id: 'test',
      label: 'test',
      name: 'test',
      value: 'test',
      onChange : onChangeMock,
      options: options
    } )
  )
  const selectElement = screen.getByRole( 'select' ) as HTMLSelectElement
  expect( selectElement ).toBeInTheDocument()
  expect( selectElement ).toHaveValue( 'test' )
  expect( selectElement ).not.toBeDisabled()
  expect( selectElement.disabled ).toBe( false )
  fireEvent.change( selectElement, { target: { value: 'option3' } } )
  expect( onChangeMock ).toHaveBeenCalledTimes( 1 )
  expect( onChangeMock ).toHaveBeenCalledWith( expect.any( Object ) )
  expect( onChangeMock.mock.calls[0][0].target.value ).toBe( 'option3' )
} )
