// ============================================================
// api/keep-alive.js
// Ping diario a Supabase para que el proyecto gratis no se pause
// por inactividad (se pausa a los ~7 días sin actividad).
// ============================================================

// 👇 CAMBIAR ACÁ: la misma URL de tu proyecto Supabase (Settings → API)
const SUPABASE_URL = "https://dzzcoiiusbawmzztfrfi.supabase.co";

export default async function handler(req, res) {
  try {
    // Ping liviano al endpoint de salud de Supabase — no necesita clave
    // ni toca ninguna tabla, solo genera actividad en el proyecto.
    const response = await fetch(`${SUPABASE_URL}/auth/v1/health`);
    const ok = response.ok;

    res.status(200).json({
      ok,
      checkedAt: new Date().toISOString(),
      message: ok ? "Supabase respondió OK, actividad registrada." : "Supabase no respondió como se esperaba.",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
}
