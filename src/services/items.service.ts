import type { Item } from '../items/types/items'

const API_URL = 'http://localhost:3001/items'
const USE_MOCK = false

let mockItems: Item[] = [
  { id: 1, title: 'Learn React', description: 'Master React fundamentals' },
  { id: 2, title: 'Build CRUD App', description: 'Create a complete CRUD application' },
]

let nextId = 3

export const ItemsService = {
  async fetchItems(): Promise<Item[]> {
    if (USE_MOCK) {
      return new Promise(resolve => setTimeout(() => resolve([...mockItems]), 300))
    }
    
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
      return (await response.json()) as Item[]
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  },
  
  async fetchItem(id: number): Promise<Item> {
    if (USE_MOCK) {
      const item = mockItems.find(i => i.id === id)
      if (!item) {
        throw new Error('Item not found')
      }
      return new Promise(resolve => setTimeout(() => resolve({ ...item }), 300))
    }

    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return (await response.json()) as Item
  },

  async createItem(item: Omit<Item, 'id'>): Promise<Item> {
    if (USE_MOCK) {
      const newItem: Item = { ...item, id: nextId++ }
      mockItems.push(newItem)
      return new Promise(resolve => setTimeout(() => resolve(newItem), 300))
    }
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return (await response.json()) as Item
  },

  async updateItem(id: number, item: Omit<Item, 'id'>): Promise<Item> {
    if (USE_MOCK) {
      const updated: Item = { ...item, id }
      mockItems = mockItems.map(i => i.id === id ? updated : i)
      return new Promise(resolve => setTimeout(() => resolve(updated), 300))
    }
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return (await response.json()) as Item
  },

  async deleteItem(id: number): Promise<void> {
    if (USE_MOCK) {
      mockItems = mockItems.filter(item => item.id !== id)
      return new Promise(resolve => setTimeout(() => resolve(), 300))
    }
    
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
  }
}
