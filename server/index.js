import http from 'node:http'
import { URL } from 'node:url'

const PORT = 3001

let items = [
  { id: 1, title: 'Learn React', name: 'Learn React', description: 'Master React fundamentals' },
  { id: 2, title: 'Build CRUD App', name: 'Build CRUD App', description: 'Create a complete CRUD application' },
]

let nextId = 3

const sendJson = (res, status, payload) => {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(body)
}

const sendNoContent = res => {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end()
}

const parseBody = req => new Promise((resolve, reject) => {
  let data = ''
  req.on('data', chunk => {
    data += chunk
    if (data.length > 1_000_000) {
      reject(new Error('Payload too large'))
      req.destroy()
    }
  })
  req.on('end', () => {
    if (!data) {
      resolve(null)
      return
    }
    try {
      resolve(JSON.parse(data))
    } catch (error) {
      reject(error)
    }
  })
  req.on('error', reject)
})

const normalizeTitle = body => {
  const raw = typeof body?.title === 'string' ? body.title : typeof body?.name === 'string' ? body.name : ''
  return raw.trim()
}

const normalizeDescription = body => {
  if (typeof body?.description === 'string') return body.description
  if (typeof body?.details === 'string') return body.details
  return ''
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
  const { pathname } = url

  if (req.method === 'OPTIONS') {
    sendNoContent(res)
    return
  }

  if (req.method === 'GET' && pathname === '/items') {
    sendJson(res, 200, items)
    return
  }

  if (req.method === 'POST' && pathname === '/items') {
    try {
      const body = await parseBody(req)
      const title = normalizeTitle(body)
      if (!title) {
        sendJson(res, 400, { error: 'Invalid payload' })
        return
      }
      const newItem = {
        id: nextId++,
        title,
        name: title,
        description: normalizeDescription(body),
      }
      items.push(newItem)
      sendJson(res, 201, newItem)
    } catch (error) {
      sendJson(res, 400, { error: 'Invalid JSON payload' })
    }
    return
  }

  const match = pathname.match(/^\/items\/(\d+)$/)
  if (match) {
    const id = Number(match[1])
    const existing = items.find(item => item.id === id)

    if (!existing) {
      sendJson(res, 404, { error: 'Item not found' })
      return
    }

    if (req.method === 'GET') {
      sendJson(res, 200, existing)
      return
    }

    if (req.method === 'PUT') {
      try {
        const body = await parseBody(req)
        const title = normalizeTitle(body)
        if (!title) {
          sendJson(res, 400, { error: 'Invalid payload' })
          return
        }
        const updated = {
          id,
          title,
          name: title,
          description: normalizeDescription(body),
        }
        items = items.map(item => (item.id === id ? updated : item))
        sendJson(res, 200, updated)
      } catch (error) {
        sendJson(res, 400, { error: 'Invalid JSON payload' })
      }
      return
    }

    if (req.method === 'DELETE') {
      items = items.filter(item => item.id !== id)
      sendNoContent(res)
      return
    }
  }

  sendJson(res, 404, { error: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`REST API listening on http://localhost:${PORT}`)
})
