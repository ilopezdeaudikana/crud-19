import type { Foo } from "@/foo/types/foo"

const API_URL = `${import.meta.env.VITE_API_URL}/foo`

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
  }
}