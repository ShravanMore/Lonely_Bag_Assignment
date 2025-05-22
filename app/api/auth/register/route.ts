import { users } from "../users";

export async function POST(request: Request) {
  const body = await request.json();
  if (users.find((u) => u.email === body.email)) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }
  users.push({ name: body.name, email: body.email, password: body.password });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 