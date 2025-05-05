# VigiLar 🛡️📹

Sistema de monitoramento por câmeras com **streaming via WebSocket**, desenvolvido com **SvelteKit** no frontend e **Node.js** com FFmpeg no backend.

## ✨ Funcionalidades

- Exibição de múltiplas câmeras simultaneamente
- Fullscreen e Picture-in-Picture (PiP)
- Autodesligamento de streams inativas
- Suporte dinâmico a múltiplos canais
- Status em tempo real de conexões e streams
- Interface leve e responsiva, otimizada para desktop e mobile

## ⚙️ Tecnologias

- [SvelteKit](https://kit.svelte.dev/)
- [UnoCSS](https://unocss.dev/)
- [jsmpeg](https://github.com/phoboslab/jsmpeg)
- [FFmpeg](https://ffmpeg.org/)
- Node.js (backend websocket)

## 🚀 Começando

1. Clone o projeto:

```bash
git clone https://github.com/pxzin/vigi-lar.git
cd vigi-lar
pnpm install
```

2. Crie o arquivo `.env`:

> ⚠️ Nunca compartilhe este arquivo ou adicione ao Git.

```env
RTSP_HOST=your.camera.ip.address
RTSP_USER=your_rtsp_username
RTSP_PASS=your_rtsp_password

STUB_USER=stub_username
STUB_PASSWORD=stub_password
```

3. Inicie o projeto:

```bash
pnpm dev
```

O frontend estará disponível em `http://localhost:5173`, e o backend de stream será gerenciado automaticamente.

## 📁 Estrutura

```
src/
├── lib/
│   ├── components/     → Componentes UI e stream
│   ├── server/streams/ → Servidor WebSocket + FFmpeg
│   └── utils/          → Utilitários e autenticação
├── routes/             → Rotas SvelteKit
└── app.html            → Template principal
```

## 🧠 Observações

- As streams são ativadas sob demanda e encerradas após 30s sem clientes conectados.
- O componente `VideoStream.svelte` cuida da desconexão automática no `unmount`.
- O WebSocket utiliza uma porta por canal (ex: 10001 para canal 1).

## 📦 Build

```bash
pnpm build
```

---

Feito com 💙 por [pxzin](https://github.com/pxzin) — segurança e praticidade na palma da mão.
