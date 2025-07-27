# TechStore - Projeto Inspirado no Site da Lenovo

Um projeto web moderno que reproduz o design e funcionalidades do site oficial da Lenovo, focado na venda de notebooks e produtos de tecnologia.

## 🚀 Características

### Design e Interface
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Hero Section**: Seção de destaque com gradiente moderno e animações
- **Navegação Intuitiva**: Header fixo com menu principal e submenu
- **Cards de Produtos**: Design elegante com efeitos hover e animações

### Funcionalidades Implementadas
- ✅ **Sistema de Filtros**: Filtros por preço, família e série de produtos
- ✅ **Busca Inteligente**: Sistema de pesquisa com debounce e highlight
- ✅ **Navegação Dinâmica**: Scroll suave entre seções
- ✅ **Modal de Produtos**: Popup detalhado ao clicar nos produtos
- ✅ **Animações**: Efeitos de entrada, parallax e animações de preço
- ✅ **WhatsApp Integration**: Botão flutuante de contato

### Seções Principais
1. **Header Completo**
   - Logo da marca
   - Barra de pesquisa
   - Links de conta e carrinho
   - Menu de navegação principal
   - Submenu de categorias

2. **Banner Promocional**
   - Mensagem de programa de benefícios
   - Navegação por setas

3. **Hero Section**
   - Título principal
   - Badge do Windows 11
   - Background gradiente com animações

4. **Área de Produtos**
   - Produtos em destaque
   - Seção "Pesquisa por Marca"
   - 6 categorias principais (IdeaPad, Serie V, Legion, LOQ, Yoga, ThinkBook)

5. **Sidebar de Filtros**
   - Filtros colapsáveis
   - Contadores dinâmicos
   - Seção de opinião

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos avançados com Grid, Flexbox e animações
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Inter

## 📱 Responsividade

O projeto inclui breakpoints para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Até 767px

## 🎨 Paleta de Cores

- **Vermelho Principal**: #e60012 (cor da Lenovo)
- **Cinza Escuro**: #333
- **Cinza Claro**: #666
- **Background**: #f8f9fa
- **Branco**: #fff

## ⚡ Funcionalidades JavaScript

### Filtros Dinâmicos
```javascript
// Sistema de filtros com múltiplas categorias
function applyFilters() {
    const activeFilters = getActiveFilters();
    // Aplica filtros aos produtos
}
```

### Busca Inteligente
```javascript
// Busca com debounce para performance
function performSearch(searchTerm) {
    // Filtra produtos em tempo real
}
```

### Animações e UX
- **Intersection Observer**: Para animações ao scroll
- **Parallax Effect**: Na hero section
- **Smooth Scrolling**: Entre seções
- **Modal System**: Para detalhes dos produtos

## 🚀 Como Executar

1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em um navegador moderno
3. Ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   ```

## 📂 Estrutura de Arquivos

```
projeto-lenovo/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md          # Documentação
```

## 🔧 Customização

### Alterando Cores
Modifique as variáveis CSS principais em `styles.css`:
```css
:root {
    --primary-color: #e60012;
    --secondary-color: #333;
    --background-color: #f8f9fa;
}
```

### Adicionando Produtos
Adicione novos cards no HTML seguindo a estrutura:
```html
<div class="product-card featured-card">
    <div class="product-image">
        <img src="url-da-imagem" alt="Nome do Produto">
    </div>
    <h3>Nome do Produto</h3>
    <!-- Rating e preço -->
</div>
```

### Configurando WhatsApp
Altere o número no link do WhatsApp em `index.html`:
```html
<a href="https://wa.me/SEU_NUMERO" target="_blank">
```

## 📊 Performance

- **CSS Otimizado**: Uso eficiente de Grid e Flexbox
- **JavaScript Modular**: Funções organizadas e reutilizáveis
- **Imagens Responsivas**: Diferentes tamanhos para cada dispositivo
- **Lazy Loading**: Para melhor performance de carregamento

## 🌟 Melhorias Futuras

- [ ] Sistema de carrinho de compras
- [ ] Integração com API de produtos
- [ ] Sistema de autenticação
- [ ] Filtros avançados (processador, RAM, etc.)
- [ ] Comparador de produtos
- [ ] Sistema de avaliações
- [ ] Chat bot integrado

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através do WhatsApp integrado no site.

---

**Desenvolvido com base no design oficial da Lenovo** - Este é um projeto educacional que demonstra técnicas modernas de desenvolvimento web.
