// app/login/page.tsx
"use client";

import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { withBasePath } from "@/lib/withBasePath";

export default function LoginPage() {
  const onLogin = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    const redirectTo = `${siteUrl}/auth/callback`;

    const { error } = await supabaseBrowser.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo },
    });

    if (error) alert(error.message);
    };



  return (
    <main style={{ padding: 24 }}>
      <h1>로그인</h1>
      <button onClick={onLogin}>카카오로 로그인</button>
    </main>
  );
}
