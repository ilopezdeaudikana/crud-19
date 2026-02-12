import { renderHook, screen, waitFor } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import CreateForm from '../../src/items/components/create/create-form.component'
import ItemList from '../../src/items/components/home/item-list.component'
import { useCustomHook, wrapperWithProviders } from './helper'
import nock from 'nock'

describe('CreateForm Component', () => {
  test('renders CreateForm correctly', () => {
    const wrapper = () => wrapperWithProviders({ children: <CreateForm /> })
    renderHook(() => useCustomHook(), { wrapper })
    expect(screen.getByLabelText(/item title/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument()
  })
})

describe('ItemList Component', () => {
  test('renders no items message when list is empty', async () => {
    nock(__API_URL__).get('/items').reply(200, [])
    const wrapper = () => wrapperWithProviders({ children: <ItemList /> })
    renderHook(() => useCustomHook(), { wrapper })
    await waitFor(() => expect(screen.getByText(/no items found/i)).toBeInTheDocument())
  })

  test('renders ItemList with items from store', async () => {
    const title = 'dummy name'
    const description = 'dummy description'
    nock(__API_URL__).get('/items').reply(200, [
      {
        id: 1, title, description
      }
    ])
    const wrapper = () => wrapperWithProviders({ children: <ItemList /> })
    renderHook(() => useCustomHook(), { wrapper })
    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })
})