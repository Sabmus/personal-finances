export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Redis from 'ioredis';

const setKey = 'notifications';

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error('api/stream/route.js: UPSTASH_REDIS_URL not found in .env.local');
}

const redisSubscriber = new Redis(process.env.UPSTASH_REDIS_URL || '');

redisSubscriber.subscribe(setKey, err => {
  if (err) console.log('subscribe error: \n\n\n', err);
});

export async function GET() {
  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    start(controller) {
      redisSubscriber.on('message', (channel, message) => {
        controller.enqueue(encoder.encode(message));
        // controller.close();
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
