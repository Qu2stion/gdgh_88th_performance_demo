"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/withBasePath";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("세션 확인 중...");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseBrowser.auth.getSession();

      // ★ 토큰 해시 제거 (가장 중요)
      if (window.location.pathname.endsWith("/auth/callback")) {
        window.history.replaceState(null, "", withBasePath("/auth/callback"));
      }


      if (error) {
        setMsg(`세션 오류: ${error.message}`);
        return;
      }
      if (!data.session) {
        setMsg("세션이 없습니다. 로그인부터 다시 시도하세요.");
        return;
      }

      setMsg("세션 확보 완료. 테스트 페이지로 이동합니다.");
      router.replace(withBasePath("/me"));
    })();
  }, [router]);

  return (
    <main style={{ padding: 24 }}>
      <h1>OAuth Callback</h1>
      <p>{msg}</p>
    </main>
  );
}
