import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '@/components/inputs/input'

describe('Input component', () => {
  test('renders with default properties', () => {
    render(React.createElement(Input, { id: 'inputId' }))
    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).not.toBeDisabled()
  })

  test('renders with custom properties', () => {
    render(
      React.createElement(Input, {
        id: 'inputId',
        label: 'Input Label',
        type: 'password',
        disabled: true,
        size: 'lg',
        variant: 'code',
        placeholder: 'Enter a value',
        icon: React.createElement('div', null, 'Icon'),
        iconActive: React.createElement('div', null, 'Active Icon'),
        iconPosition: 'left',
        onClick: () => console.log('Icon clicked'),
        className: 'custom-class',
      })
    )
    const inputElement = screen.getByRole('textbox') as HTMLInputElement // Assertion de type
    const labelElement = screen.getByLabelText('Input Label')
    const iconElement = screen.getByText('Icon')

    expect(inputElement).toHaveAttribute('type', 'password')
    expect(inputElement).toBeDisabled()
    expect(labelElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
  })

  test('handles input change', () => {
    render(React.createElement(Input, { id: 'inputId' }))
    const inputElement = screen.getByRole('textbox') as HTMLInputElement // Assertion de type

    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(inputElement.value).toBe('New Value')
  })

  test('handles input insertion', () => {
    render(React.createElement(Input, { id: 'inputId' }))
    const inputElement = screen.getByRole('textbox') as HTMLInputElement // Assertion de type

    fireEvent.input(inputElement, { target: { value: 'New Value' } })

    expect(inputElement.value).toBe('New Value')
  })

  test('handles input focus', () => {
    render(React.createElement(Input, { id: 'inputId' }))
    const inputElement = screen.getByRole('textbox') // Pas besoin d'une assertion de type ici

    fireEvent.focus(inputElement)

    expect(inputElement).toHaveFocus()
  })

  test('handles input blur', () => {
    render(React.createElement(Input, { id: 'inputId' }))
    const inputElement = screen.getByRole('textbox') // Pas besoin d'une assertion de type ici

    fireEvent.blur(inputElement)

    expect(inputElement).not.toHaveFocus()
  })

  test('renders with error', () => {
    const errors: { [key: string]: { type: string, message: string } } = {
      inputId: {
        type: 'required',
        message: 'This field is required',
      },
    }
    render(React.createElement(Input, { id: 'inputId', errors: errors }))
    const errorElement = screen.getByText('This field is required')
    expect(errorElement).toBeInTheDocument()
  })
})
