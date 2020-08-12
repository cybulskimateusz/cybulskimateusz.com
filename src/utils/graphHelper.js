import env from 'environment'

export default async (query) => {
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  }

  const response = await fetch(env.graph, opts)
  return response.json()
}
