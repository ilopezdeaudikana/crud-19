import type { Item } from '../items/types/items'

const API_URL = `${__API_URL__}/items`

console.log(import.meta.env)
export const ItemsService = {
  async fetchItems(): Promise<Item[]> {
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
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return (await response.json()) as Item
  },

  async createItem(item: Omit<Item, 'id'>): Promise<Item> {
    
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
 
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
  }
}
