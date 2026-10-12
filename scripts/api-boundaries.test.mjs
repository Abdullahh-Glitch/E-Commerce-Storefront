import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'

const axiosUrl = import.meta.resolve('axios')

async function loadClient(app) {
  const source = await fs.readFile(new URL(`../${app ? app + '/' : ''}src/api/axios.js`, import.meta.url), 'utf8')
  const moduleSource = source
    .replace("import axios from 'axios'", `import axios from '${axiosUrl}'`)
    .replace(/import env from '[^']+'/, "const env = { apiBaseUrl: 'https://api.example.test', isDev: false, storeSlug: 'client-one' }")
  const { default: api } = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString('base64')}`)
  return api
}

function response(config, data = {}) {
  return { config, data, status: 200, statusText: 'OK', headers: {} }
}

function unauthorized(config) {
  const error = new Error('Unauthorized')
  error.config = config
  error.response = { status: 401 }
  return error
}

test('storefront sends public tenant context and never refreshes authentication', async () => {
  const api = await loadClient('')
  let calls = 0
  api.defaults.adapter = async (config) => {
    calls += 1
    assert.equal(config.headers['X-Store-Slug'], 'client-one')
    assert.equal(config.withCredentials, false)
    throw unauthorized(config)
  }
  await assert.rejects(api.get('/products'), /Unauthorized/)
  assert.equal(calls, 1)
})

for (const [app, prefix] of [['owner-portal', '/auth'], ['super-admin', '/auth/super-admin']]) {
  test(`${app}: concurrent requests share one refresh without a tenant header`, async () => {
    const api = await loadClient(app)
    let refreshes = 0
    api.defaults.adapter = async (config) => {
      assert.equal(config.headers['X-Store-Slug'], undefined)
      assert.equal(config.withCredentials, true)
      if (config.url === `${prefix}/refresh`) {
        refreshes += 1
        await new Promise((resolve) => setTimeout(resolve, 10))
        return response(config)
      }
      if (!config._retry) throw unauthorized(config)
      return response(config, { success: true })
    }
    const results = await Promise.all([api.get('/orders'), api.get(`${prefix}/me`)])
    assert.equal(refreshes, 1)
    assert.ok(results.every((result) => result.data.success))
  })

  test(`${app}: rejected login never triggers refresh`, async () => {
    const api = await loadClient(app)
    const calls = []
    api.defaults.adapter = async (config) => {
      calls.push(config.url)
      throw unauthorized(config)
    }
    await assert.rejects(api.post(`${prefix}/login`, {}), /Unauthorized/)
    assert.deepEqual(calls, [`${prefix}/login`])
  })

  test(`${app}: failed refresh signals expiration without a retry loop`, async () => {
    const api = await loadClient(app)
    const calls = []
    const events = []
    globalThis.window = { dispatchEvent: (event) => events.push(event.type) }
    api.defaults.adapter = async (config) => {
      calls.push(config.url)
      throw unauthorized(config)
    }
    try {
      await assert.rejects(api.get('/orders'), /Unauthorized/)
      assert.deepEqual(calls, ['/orders', `${prefix}/refresh`])
      assert.deepEqual(events, ['session-expired'])
    } finally {
      delete globalThis.window
    }
  })
}
