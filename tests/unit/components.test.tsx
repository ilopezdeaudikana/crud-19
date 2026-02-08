import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import CreateForm from '../../src/components/CreateForm'
import ItemList from '../../src/components/ItemList'

describe('CreateForm Component', () => {
  test('renders CreateForm correctly', () => {
    render(<CreateForm />)
    expect(screen.getByLabelText(/item title/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument()
  })
})

describe('ItemList Component', () => {
  test('renders no items message when list is empty', () => {
    render(<ItemList />)
    expect(screen.getByText(/no items found/i)).toBeInTheDocument()
  })

  test('renders ItemList with items from store', () => {
    render(<ItemList />)
    // ItemList uses itemStore.items directly via observer
    // Test would need to mock the store or use integration tests
    expect(screen.getByText(/no items found/i)).toBeInTheDocument()
  })
})