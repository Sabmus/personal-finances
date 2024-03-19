// Can be 'nodejs', but Vercel recommends using 'edge'
export const runtime = 'nodejs';

// Prevents this route's response from being cached
export const dynamic = 'force-dynamic';

// Use ioredis to subscribe
import Redis from 'ioredis';

// Define the key to listen and publish messages to
const setKey = 'notifications';

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error('api/stream/route.js: UPSTASH_REDIS_URL not found in .env.local');
}

// Create a redis subscriber
const redisSubscriber = new Redis(process.env.UPSTASH_REDIS_URL || '');

export async function GET() {
  const encoder = new TextEncoder();
  // Create a stream
  const customReadable = new ReadableStream({
    start(controller) {
      redisSubscriber.subscribe(setKey, err => {
        if (err) console.log(err);
      });

      redisSubscriber.on('message', (channel, message) => {
        if (channel === setKey) controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      });

      redisSubscriber.on('end', () => {
        controller.close();
      });
    },
  });

  // Return the stream and try to keep the connection alive
  return new Response(customReadable, {
    // Set headers for Server-Sent Events (SSE) / stream from the server
    headers: {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  });
}
