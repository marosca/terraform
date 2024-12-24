import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const TOKEN = 'f469ed04-2ad1-40ef-98df-cd9db1fdc879'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const collection = request.nextUrl.searchParams.get('collection')

  if (secret !== TOKEN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!collection) {
    return NextResponse.json({ message: 'Missing collection param or tag' }, { status: 400 })
  }

  revalidateTag(collection)

  // TODO:
  // type SecondParameter = Parameters<typeof revalidatePath>[1]
  // const path = request.nextUrl.searchParams.get('path') || '/isr/[id]';
  // revalidatePath(path)

  const body = {
    revalidated: { collection },
    now: Date.now(),
    cache: 'no-store',
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  return NextResponse.json(body, { status: 200, headers })
}
