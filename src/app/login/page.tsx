import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/";
  return (
    <div className="max-w-sm mx-auto mt-16 rise">
      <p className="eyebrow mb-3">Private</p>
      <h1 className="serif text-4xl text-paper mb-2">Compliance Monitor</h1>
      <p className="text-sm text-paper-3 mb-8">Enter the team password to view call reviews.</p>
      <LoginForm next={next} />
    </div>
  );
}
