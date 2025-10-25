# Deploy no Cloudflare Pages

## Configuração do Projeto

Este projeto está configurado para deploy estático no Cloudflare Pages usando Next.js com exportação estática.

## Estrutura do Build

- **Diretório de saída**: `out/`
- **Comando de build**: `npm run build`

## Configuração no Cloudflare Pages

### 1. Acesse o Painel do Cloudflare Pages

1. Faça login no [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá para **Pages** no menu lateral
3. Clique em **Create a project**

### 2. Conecte o Repositório

1. Selecione **Connect to Git**
2. Escolha seu provedor Git (GitHub, GitLab, etc.)
3. Selecione o repositório `Vidaxpdev`
4. Autorize o Cloudflare Pages

### 3. Configure o Build

Preencha os seguintes campos:

**Build settings:**

- **Framework preset**: `Next.js (Static HTML Export)` ou `None`
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (deixe em branco ou coloque `/`)

### 4. Configure as Variáveis de Ambiente

Na seção **Environment variables**, adicione:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://txvmszokzdwogjyfdyoe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dm1zem9remR3b2dqeWZkeW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODI3NTgsImV4cCI6MjA3Njk1ODc1OH0.joA7MF5hbt_pKZw82qm5R-G_ysceFLhRAneFHZY3nuc` |

⚠️ **Importante**: Estas variáveis são injetadas no build, então você pode usá-las no código.

### 5. Deploy

1. Clique em **Save and Deploy**
2. Aguarde o build completar (geralmente 2-5 minutos)
3. Seu site estará disponível em uma URL do tipo: `https://vidaxp.pages.dev`

## Comandos Úteis

```bash
# Build local
npm run build

# Testar build localmente
npx serve out

# Desenvolvimento
npm run dev
```

## Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ Página inicial carrega
2. ✅ Navegação entre páginas funciona
3. ✅ Conexão com Supabase funciona (verificar console do navegador)
4. ✅ Variáveis de ambiente estão disponíveis

## Problemas Comuns

### Build falha

- Verifique se todas as dependências estão no `package.json`
- Confirme que a versão do Node.js é 18+ (Cloudflare Pages usa Node 18 por padrão)

### Variáveis de ambiente não funcionam

- Lembre-se que `NEXT_PUBLIC_*` são injetadas no build
- Rebuild o projeto após mudar variáveis de ambiente

### Supabase não conecta

- Verifique se as credenciais estão corretas
- Confirme que as políticas RLS estão configuradas no Supabase

## Suporte

Para mais informações sobre Cloudflare Pages:
- [Documentação Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Guia Next.js no Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
