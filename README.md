# VigiLar

Sistema de monitoramento por vídeo com múltiplos canais e recursos de tela cheia, PiP (Picture-in-Picture) e streaming via RTSP.

## 🚀 Funcionalidades principais

- 🎥 Streaming de vídeo via RTSP convertido para MPEG-1
- 🖥️ Visualização ao vivo com suporte a PiP (Picture-in-Picture)
- 🧭 Interface moderna com Svelte 5
- 🔐 Autenticação por stub local (login fictício)
- 🧪 Testes automatizados com Vitest e Playwright
- 📡 API REST para controle de stream e status dos canais
- 🧵 Wrapper Fullscreen reutilizável

## 🗂️ Estrutura de arquivos

```bash
.
├── README.md
├── e2e/
│   └── demo.test.ts
├── src/
│   ├── app.d.ts
│   ├── demo.spec.ts
│   ├── hooks.server.ts
│   ├── lib/
│   │   ├── components/
│   │   │   ├── VideoStream.svelte
│   │   │   └── ui/
│   │   │       ├── Alert.svelte
│   │   │       ├── Button.svelte
│   │   │       ├── Container.svelte
│   │   │       ├── FullscreenWrapper.svelte
│   │   │       ├── Header.svelte
│   │   │       ├── Input.svelte
│   │   │       └── Player.svelte
│   │   ├── index.ts
│   │   └── server/streams/server.ts
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.server.ts
│   │   ├── +page.svelte
│   │   ├── api/
│   │   │   ├── start-stream/+server.ts
│   │   │   └── streams/status/+server.ts
│   │   ├── login/
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   ├── page.svelte.test.ts
│   │   └── playground/
│   │       ├── +page.svelte
│   │       ├── alert/+page.svelte
│   │       ├── button/+page.svelte
│   │       ├── container/+page.svelte
│   │       ├── input/+page.svelte
│   │       └── stream/+page.svelte
├── tsconfig.json
├── uno.config.ts
├── vite.config.ts
├── vitest-setup-client.ts
└── package.json
```

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` com:

```env
RTSP_USER=your_rtsp_username
RTSP_PASS=your_rtsp_password
RTSP_HOST=your_rtsp_host_or_ip

STUB_USER=stub_login_user
STUB_PASSWORD=stub_login_password
```

> ⚠️ **Nunca compartilhe seu `.env`**. Este arquivo deve ser listado no `.gitignore`.

## 📦 Scripts úteis

```bash
pnpm dev        # Inicia o modo de desenvolvimento
pnpm build      # Build para produção (somente frontend)
pnpm preview    # Pré-visualização do build
pnpm test       # Testes unitários (Vitest)
pnpm e2e        # Testes end-to-end (Playwright)
```

## ☁️ Deploy e Túnel

- Para testes locais remotos, use Cloudflare Tunnel (`cloudflared tunnel`) e libere o domínio no `vite.config.ts`
- A Vercel pode ser usada para hospedagem apenas do frontend. O backend deve estar ativo em outro host ou túnel

---

© 2025 VigiLar. Todos os direitos reservados.
