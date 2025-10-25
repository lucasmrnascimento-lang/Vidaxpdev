// Cloudflare Pages middleware
export async function onRequest(context: any) {
  return context.next()
}
