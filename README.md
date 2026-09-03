# Felipe Comunello - Site Portfólio

**URL:** `https://felipecomunello.github.io` (ou domínio customizado)

**Tipo:** Site estático HTML/CSS/JS hospedado no GitHub Pages  
**Arquitetura:** Sem frameworks, sem build tools complexos, sem dependências npm pesadas  
**Objetivo:** Portfolio + Blog + Cases + Espaço Criativo + Serviços

---

## 📁 Estrutura de Pastas

```
felipecomunello.github.io/
│
├── index.html                    # Página HOME (ponto de entrada principal)
├── README.md                     # Este arquivo
├── robots.txt                    # Instruções para crawlers (SEO)
├── sitemap.xml                   # Mapa do site (SEO)
│
├── css/
│   ├── base.css                  # Reset, variáveis CSS, tipografia base
│   ├── layout.css                # Grid, containers, navbar, footer
│   └── components.css            # Botões, cards, testimonials, interações
│
├── js/
│   └── main.js                   # Smooth scroll, fade-in, interações globais
│
├── assets/
│   ├── images/                   # Imagens globais (logos, avatars)
│   ├── icons/                    # Ícones SVG
│   └── fonts/                    # Fontes locais (se necessário)
│
├── blog/
│   ├── index.html                # Hub de blog (lista de todos os posts)
│   ├── feed.xml                  # RSS feed (para Substack)
│   │
│   ├── growth/
│   │   ├── index.html            # Listagem categoria Growth
│   │   ├── gtm-b2b-fails.html    # POST 1
│   │   └── assets/
│   │
│   ├── automacao/
│   │   ├── index.html
│   │   ├── pipeline-revops.html  # POST 2
│   │   └── assets/
│   │
│   ├── ia/
│   │   ├── index.html
│   │   ├── agentes-ia.html       # POST 3
│   │   └── assets/
│   │
│   ├── dados/
│   │   ├── index.html
│   │   ├── crm-attribution.html  # POST 4
│   │   └── assets/
│   │
│   ├── caso/
│   │   ├── index.html
│   │   ├── neuroinsight.html     # POST 5
│   │   └── assets/
│   │
│   └── filosofia/
│       └── index.html            # Categoria vazia por enquanto
│
├── cases/
│   ├── index.html                # Galeria visual de cases
│   │
│   ├── aldeia/
│   │   ├── index.html            # Página do case
│   │   └── assets/
│   │
│   ├── maieutics/
│   │   ├── index.html
│   │   └── assets/
│   │
│   ├── maieutics-pivot/
│   │   ├── index.html
│   │   └── assets/
│   │
│   ├── frantic/
│   │   ├── index.html
│   │   └── assets/
│   │
│   └── neuroinsight/
│       ├── index.html
│       └── assets/
│
├── criativo/
│   ├── index.html                # Galeria de projetos artísticos
│   └── assets/
│
└── servicos/
    ├── index.html                # Página detalhada de serviços
    └── assets/
```

---

## 🚀 Como Começar (Setup Inicial)

### 1️⃣ **Clonar o repositório**

```bash
git clone https://github.com/felipecomunello/felipecomunello.github.io.git
cd felipecomunello.github.io
```

### 2️⃣ **Estrutura Base já está pronta**

Os seguintes arquivos já foram criados:
- ✅ `index.html` (Home completa)
- ✅ `css/base.css`, `css/layout.css`, `css/components.css`
- ✅ `js/main.js`

**Próximo passo:** Criar as pastas e arquivos das seções internas.

### 3️⃣ **Criar pastas necessárias** (localmente)

Execute este comando na raiz do projeto:

```bash
mkdir -p css js assets/images assets/icons \
         blog/{growth,automacao,ia,dados,caso,filosofia} \
         blog/{growth,automacao,ia,dados,caso}/assets \
         cases/{aldeia,maieutics,maieutics-pivot,frantic,neuroinsight} \
         cases/{aldeia,maieutics,maieutics-pivot,frantic,neuroinsight}/assets \
         criativo/assets \
         servicos/assets
```

### 4️⃣ **Testar localmente** (opcional)

Se quiser visualizar o site antes de publicar:

```bash
# Usando Python 3
python -m http.server 8000

# Ou usando Node.js (se tiver)
npx http-server

# Abra no navegador: http://localhost:8000
```

### 5️⃣ **Fazer deploy no GitHub Pages**

```bash
git add .
git commit -m "feat: inicia site com home, css e estrutura base"
git push origin main
```

O GitHub Pages vai publicar automaticamente em `https://felipecomunello.github.io`

---

## 📝 Como Adicionar Conteúdo

### **ADICIONAR UM NOVO BLOG POST**

#### Passo 1: Criar arquivo HTML

Salve em: `/blog/[categoria]/[slug-do-post].html`

Exemplo: `/blog/growth/como-estruturar-gtm.html`

#### Passo 2: Usar template base

Copie este template e preencha:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[TÍTULO DO POST] | Felipe Comunello</title>
    <meta name="description" content="[DESCRIÇÃO CURTA]">
    <meta name="keywords" content="[KEYWORDS SEPARADAS POR VÍRGULA]">
    
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/components.css">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "[TÍTULO]",
      "description": "[DESCRIÇÃO]",
      "datePublished": "[DATA: 2026-01-20]",
      "author": {
        "@type": "Person",
        "name": "Felipe Comunello",
        "url": "https://felipecomunello.com"
      }
    }
    </script>
</head>
<body>

<header class="navbar">
  <div class="navbar-container">
    <div class="navbar-brand">
      <a href="/">FC</a>
    </div>
    <nav class="navbar-menu">
      <a href="/#blog">Blog</a>
      <a href="/cases/">Cases</a>
      <a href="/#criativo">Criativo</a>
    </nav>
  </div>
</header>

<main class="container-tight">
  <article style="padding: var(--space-xxl) var(--space-lg);">
    
    <nav class="breadcrumb" style="margin-bottom: var(--space-xl);">
      <a href="/">Home</a> / 
      <a href="/blog/">Blog</a> / 
      <a href="/blog/[categoria]/">Growth</a> / 
      <span>[TÍTULO]</span>
    </nav>

    <header style="margin-bottom: var(--space-xl);">
      <h1>[TÍTULO DO POST]</h1>
      <p style="color: var(--color-text-light); font-size: var(--font-size-base);">
        Por <strong>Felipe Comunello</strong> • 20 de janeiro, 2026 • 8 min de leitura
      </p>
    </header>

    <!-- SEU CONTEÚDO AQUI EM HTML -->
    <h2>Introdução</h2>
    <p>Seu texto aqui...</p>

    <h2>Desenvolvimento</h2>
    <p>Seu texto aqui...</p>

    <h2>Conclusão</h2>
    <p>Seu texto aqui...</p>

    <!-- CTA: SUBSTACK -->
    <div style="background-color: var(--color-bg-alt); padding: var(--space-lg); border-radius: 4px; margin: var(--space-xl) 0; text-align: center;">
      <h3>📬 Receber insights como este no seu email</h3>
      <p style="color: var(--color-text-light); margin-bottom: var(--space-lg);">
        Publicamos novos artigos toda semana sobre Growth, GTM, RevOps e Automação.
      </p>
      <a href="https://substack.com/@felipecomunello" class="btn btn-primary">Inscrever no Substack</a>
    </div>

    <!-- CTA: CONTATO -->
    <div style="background-color: var(--color-bg-alt); padding: var(--space-lg); border-radius: 4px; margin: var(--space-xl) 0; text-align: center;">
      <h3>Quer implementar isso na sua operação?</h3>
      <p style="color: var(--color-text-light); margin-bottom: var(--space-lg);">
        Posso ajudar sua empresa a estruturar sistemas de Growth, GTM e Revenue Operations.
      </p>
      <a href="https://entr.ai/felipecomunello" class="btn btn-primary">Agendar Mentoria</a>
    </div>

  </article>
</main>

<footer style="margin-top: var(--space-giant);">
  <div class="container">
    <div>
      <h4>Felipe Comunello</h4>
      <a href="mailto:felipecogumello@gmail.com">felipecogumello@gmail.com</a>
    </div>
    <div>
      <h4>Comunidade</h4>
      <a href="https://linkedin.com/in/felipecomunello">LinkedIn</a>
      <a href="https://substack.com/@felipecomunello">Substack</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Felipe Comunello.</p>
  </div>
</footer>

<script src="/js/main.js"></script>
</body>
</html>
```

#### Passo 3: Adicionar à lista de posts

Edite `/blog/[categoria]/index.html` e adicione um link ao novo post:

```html
<a href="./novo-post.html" class="link-block">
  <div class="link-block-title">Título do Novo Post</div>
  <p class="link-block-description">Descrição curta do post...</p>
</a>
```

#### Passo 4: Fazer push

```bash
git add .
git commit -m "blog: novo artigo sobre [tema]"
git push origin main
```

---

### **ADICIONAR UM NOVO CASE**

#### Passo 1: Criar arquivo

Salve em: `/cases/[nome-empresa]/index.html`

#### Passo 2: Usar template base (similar ao blog)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[NOME EMPRESA] - Case | Felipe Comunello</title>
    
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/components.css">
</head>
<body>

<header class="navbar">...</header>

<main class="container-tight" style="padding: var(--space-xxl) var(--space-lg);">
  <article>
    <h1>[EMPRESA] - Case Study</h1>
    
    <section style="margin: var(--space-xl) 0;">
      <h2>Situação Inicial</h2>
      <p>Descrição do desafio...</p>
    </section>

    <section style="margin: var(--space-xl) 0;">
      <h2>Ações Executadas</h2>
      <p>Descrição das ações...</p>
    </section>

    <section style="margin: var(--space-xl) 0;">
      <h2>Resultados</h2>
      <p>Resultados concretos...</p>
      <div style="background: var(--color-bg-alt); padding: var(--space-lg); border-radius: 4px; margin: var(--space-lg) 0;">
        <p style="font-size: var(--font-size-lg); font-weight: bold;">📈 +100% em receita mensal</p>
      </div>
    </section>

    <!-- CTA -->
    <div style="text-align: center; margin: var(--space-xxl) 0;">
      <a href="https://entr.ai/felipecomunello" class="btn btn-primary">Quero um case como esse</a>
    </div>
  </article>
</main>

<footer>...</footer>

<script src="/js/main.js"></script>
</body>
</html>
```

#### Passo 3: Adicionar à galeria

Edite `/cases/index.html` e adicione um novo card.

---

## 🔍 SEO & Performance

### Checklist SEO

- [ ] Todos os `<title>` têm 50-60 caracteres
- [ ] Todos os `<meta description>` têm 150-160 caracteres
- [ ] Schema.org (JSON-LD) em todas as páginas principais
- [ ] `robots.txt` está correto
- [ ] `sitemap.xml` está atualizado
- [ ] Links internos estão funcionando
- [ ] Imagens têm `alt` text descritivo
- [ ] URLs são amigáveis (slugs em português é OK)

### Performance

- Sem CSS pesado (todo CSS é inline ou em 3 arquivos leves)
- Sem JavaScript pesado (apenas vanilla JS, ~5KB)
- Imagens otimizadas (usar `<picture>` ou `data-src` para lazy loading)
- Teste no Lighthouse: https://pagespeed.web.dev

---

## 🎨 Customizações Comuns

### Mudar Cores

Edite `/css/base.css` na seção `CSS VARIABLES`:

```css
:root {
  --color-bg: #FAFAF8;           /* Alterar fundo */
  --color-text: #2D2D2D;         /* Alterar texto */
  --color-accent: #D4C5B9;       /* Alterar destaque */
}
```

### Mudar Tipografia

Adicione fontes no `<head>` do `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;700&display=swap" rel="stylesheet">
```

Depois altere em `base.css`:

```css
--font-family-sans: 'SuaFonte', sans-serif;
```

### Adicionar Analytics (GTM)

Na seção `<head>` do `index.html`, após `</title>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
```

---

## 📊 Manutenção Mensal

- [ ] Atualizar blog com 1-2 novos artigos
- [ ] Revisar Analytics (se configurado)
- [ ] Testar links internos e externos
- [ ] Atualizar `sitemap.xml`
- [ ] Revisar CTAs (emails, links de contato)

---

## 🆘 Troubleshooting

### "O site não está mostrando as mudanças"

1. Limpar cache do navegador (Ctrl+Shift+Delete)
2. Aguardar 5-10 minutos para GitHub Pages atualizar
3. Verificar se o `git push` foi bem-sucedido

### "Imagens não estão carregando"

1. Verificar se o caminho está correto (case-sensitive)
2. Usar `/assets/...` em vez de `assets/...`
3. Converter para formato otimizado (WebP é melhor que PNG/JPG)

### "Links internos não funcionam"

1. Sempre usar caminhos absolutos: `/blog/` em vez de `blog/`
2. Verificar trailing slash: `/blog/` vs `/blog`

---

## 📞 Suporte

Para dúvidas sobre o site, contate:
- Email: felipecogumello@gmail.com
- WhatsApp: +55 (41) 99618-7650

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0 (MVP Launch)
