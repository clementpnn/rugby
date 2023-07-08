import { expect, test } from 'vitest'
import useModal from '../../hooks/useModal'

test( 'useModal store', () => {
  expect( useModal.getState().isOpen ).toBe( false )

  useModal.getState().onOpen()
  expect( useModal.getState().isOpen ).toBe( true )

  useModal.getState().onClose()
  expect( useModal.getState().isOpen ).toBe( false )
} )
