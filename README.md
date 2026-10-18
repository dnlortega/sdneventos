# SDN Eventos | Locação de Tendas em Bauru-SP

Website institucional e catálogo digital da **SDN Eventos**, empresa especializada em locação de tendas chapéu de bruxa (3x3, 4x4 e 5x5), montagem e desmontagem de palcos, e carga e descarga de equipamentos artísticos em Bauru-SP e região, atuando no mercado desde 2001.

---

## 📌 Visão Geral

O projeto foi desenvolvido com foco em alta performance, usabilidade móvel, design limpo e geração rápida de contatos comerciais via WhatsApp.

### Principais Funcionalidades:
- **Catálogo de Tamanhos Interativo:** Apresentação visual das tendas com ilustrações vetoriais (SVG) e microanimação de montagem via `IntersectionObserver`.
- **Galeria de Fotos com Carrossel:**
  - Suporte a rolagem por toque em dispositivos móveis e atalhos no teclado (`←` e `→`).
  - Miniaturas sincronizadas com rolagem automática.
  - Contador de fotos em tempo real.
  - Modal / Lightbox para ampliação de imagens em tela cheia com fechamento por clique ou tecla `ESC`.
- **Formulário de Orçamento Rápido:** Capta os dados do cliente (Nome, Telefone, Tamanho da tenda e Mensagem) e monta uma mensagem formatada direto no WhatsApp da empresa.
- **Botão Flutuante do WhatsApp:** Acesso rápido ao atendimento para usuários em dispositivos móveis.
- **Menu Responsivo:** Barra de navegação com botão hambúrguer e gaveta lateral (*drawer*) para navegação fluida em smartphones e tablets.
- **Otimização de Performance:** Imagens desacopladas do código fonte com suporte a cache de navegador e carregamento sob demanda (`loading="lazy"`).
- **SEO & Dados Estruturados:** Configurado com meta tags Open Graph e esquema `LocalBusiness` via JSON-LD para melhor indexação nos mecanismos de busca do Google.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e acessível.
- **CSS3 Puro (Vanilla CSS):**
  - Variáveis CSS (*Design Tokens*) para paleta de cores e tipografia.
  - Flexbox e CSS Grid para layouts responsivos.
  - Media queries otimizadas para desktop, tablets e smartphones.
- **JavaScript Puro (Vanilla JS):** Lógica do carrossel, modal lightbox, animações e integração com a API do WhatsApp, sem dependência de bibliotecas pesadas.
- **Tipografia:** Google Fonts (*Libre Baskerville* e *Figtree*).

---

## 📁 Estrutura do Projeto

```text
sdneventos/
│
├── index.html          # Página principal estruturada e semântica
├── README.md           # Documentação do projeto
├── .gitignore          # Arquivos e extensões ignorados pelo Git
│
├── css/
│   └── style.css       # Estilização modular e regras responsivas
│
├── js/
│   └── main.js         # Lógica da galeria, menu mobile e formulário
│
└── assets/
    └── img/            # Logotipo e fotos de eventos realizados
        ├── logo.png
        ├── foto-01.jpg
        └── ... (até foto-20.jpg)
```

---

## 🚀 Como Executar o Projeto

Não é necessária a instalação de dependências externas ou compiladores.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/dnlortega/sdneventos.git
   ```

2. **Abra o projeto:**
   - Basta abrir o arquivo `index.html` em qualquer navegador web moderno.
   - Ou execute com uma extensão de servidor local (ex: *Live Server* no VS Code).

---

## 📞 Contato & Localização

- **Empresa:** SDN Eventos
- **Localização:** Rua Maria das Dores da Silva Fazzio, 1-46, Jd. Vitória — Bauru/SP
- **Telefones:** (14) 99602-5928 / (14) 99643-4304
- **E-mails:** sdneventos.tendas@gmail.com | Sdneventos@hotmail.com

---

## 👨‍💻 Desenvolvedor

Projeto criado e estruturado por **Daniel Ortega Pereira**:
- **LinkedIn:** [linkedin.com/in/daniel-op](https://www.linkedin.com/in/daniel-op/)
- **WhatsApp:** [(14) 98129-4913](https://wa.me/5514981294913)

---

© SDN Eventos. Todos os direitos reservados.
