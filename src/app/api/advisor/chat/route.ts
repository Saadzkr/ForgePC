import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY
const NVIDIA_BASE = 'https://integrate.api.nvidia.com/v1'
const MODEL = 'meta/llama-3.1-70b-instruct'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!NVIDIA_API_KEY) {
      return NextResponse.json({ error: 'NVIDIA API key not configured' }, { status: 500 })
    }

    const components = await prisma.component.findMany({
      select: { name: true, category: true, brand: true, price: true, wattage: true, specs: true },
    })

    const byCategory: Record<string, { name: string; brand: string; price: number; wattage: number | null }[]> = {}
    for (const c of components) {
      if (!byCategory[c.category]) byCategory[c.category] = []
      byCategory[c.category].push({ name: c.name, brand: c.brand, price: c.price, wattage: c.wattage })
    }

    const priceRanges = Object.entries(byCategory).map(([cat, items]) => {
      const prices = items.map(i => i.price).sort((a, b) => a - b)
      return `${cat}: $${prices[0]}–$${prices[prices.length - 1]} (${items.length} items)`
    }).join('\n')

    const systemPrompt = `You are Forge AI, a PC building expert and advisor for Forge PC. You help users build their ideal computer.

Your knowledge:
- You know every component in the current inventory
- You understand PC compatibility (socket types, form factors, power requirements, RAM generations)
- You give specific, actionable recommendations with real component names and prices

Available components by category:
${priceRanges}

Rules:
1. Always recommend real components from the inventory when asked for specific parts
2. Mention approximate prices when relevant
3. Consider compatibility in every recommendation
4. Be concise but thorough — use bullet points for lists
5. If asked about something outside your knowledge, be honest
6. Keep responses under 400 words unless the user asks for details
7. Do not mention that you are an AI or that you're using an LLM — stay in character as Forge AI`

    const nvidiaMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ]

    const response = await fetch(`${NVIDIA_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: nvidiaMessages,
        temperature: 0.3,
        max_tokens: 1024,
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('NVIDIA API error:', response.status, errorBody)
      return NextResponse.json(
        { error: `NVIDIA API error: ${response.status}` },
        { status: response.status }
      )
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        let buffer = ''
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed || !trimmed.startsWith('data: ')) continue
              const data = trimmed.slice(6)
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  controller.enqueue(encoder.encode(content))
                }
              } catch {
                // skip malformed JSON chunks
              }
            }
          }
        } catch (e) {
          console.error('Stream error:', e)
        } finally {
          reader.releaseLock()
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (e) {
    console.error('Advisor API error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
