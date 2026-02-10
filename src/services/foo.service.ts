import type { Foo } from "@/foo/types/foo"

const API_URL = `${__API_URL__}/foo`

export const FooService = {

  async getFoo(): Promise<Foo[]> {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
      return (await response.json()) as Foo[]
    } catch (error) {
      console.error('Error fetching foo:', error)
      throw error
    }
  },

  async deleteFoo(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE'})
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
    } catch (error) {
      throw new Error(`Delete request failed: ${error}`)
    }
  },

  async updateFoo(id: string, payload: Foo): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
    } catch (error) {
      throw new Error(`Delete request failed: ${error}`)
    }
  }
}