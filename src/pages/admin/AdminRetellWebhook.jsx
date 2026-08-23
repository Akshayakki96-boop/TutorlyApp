import { useState } from 'react'
import { apiRequest } from '../../lib/apiClient'

const DEFAULT_PAYLOAD = {
  event: 'call.completed',
  call: {
    callId: 'sample-call-id',
    callStatus: 'completed',
    transcript: 'Parent asked about A-level maths sessions.',
    recordingUrl: 'https://example.com/recording.mp3',
    durationMs: 129000,
    callSummary: 'Qualified lead for trial class.',
    metadata: {
      source: 'admin-panel',
    },
  },
}

export default function AdminRetellWebhook() {
  const [payloadText, setPayloadText] = useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [responseText, setResponseText] = useState('')

  async function sendWebhook(e) {
    e.preventDefault()
    setError('')
    setResponseText('')
    setLoading(true)

    try {
      const payload = JSON.parse(payloadText)
      const result = await apiRequest('/api/retell/webhook', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setResponseText(typeof result === 'string' ? result : JSON.stringify(result, null, 2))
    } catch (err) {
      setError(err.message || 'Webhook submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-black text-slate-900">Retell Webhook</h1>
      <p className="mt-2 text-slate-600">Test /api/retell/webhook from the admin console.</p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <form onSubmit={sendWebhook} className="mt-6 rounded-2xl border border-slate-200 p-4">
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="retell-payload">Webhook Payload (JSON)</label>
        <textarea
          id="retell-payload"
          rows={18}
          value={payloadText}
          onChange={(e) => setPayloadText(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 font-mono text-xs"
        />

        <button type="submit" disabled={loading} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-70">
          {loading ? 'Sending...' : 'Send Webhook'}
        </button>
      </form>

      {responseText && (
        <div className="mt-6 rounded-2xl border border-slate-200">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h2 className="text-lg font-bold text-slate-900">Response</h2>
          </div>
          <pre className="max-h-80 overflow-auto bg-slate-900 p-4 text-xs text-slate-100">{responseText}</pre>
        </div>
      )}
    </section>
  )
}
