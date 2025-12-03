# Correção: Botões de Projetos Não-Clicáveis

## 🐛 Problema Relatado

**Sintoma:** Os botões "Demo" e "Code" nos cards de projetos não estavam clicáveis.

**Comportamento Esperado:** Ao passar o mouse sobre um projeto (ou em mobile), os botões devem ser clicáveis e abrir os links.

## 🔍 Análise do Bug

### Causa Raiz: Conflito de Z-Index

O problema era causado por uma **hierarquia incorreta de z-index** no componente `ProjectCard`:

```
Camadas (ordem de renderização):
├── Content Container (z-20) ← Botões aqui
└── Glare Effect (z-50) ← Bloqueava os cliques! ❌
```

O efeito visual de "glare" (brilho no hover) tinha `z-50`, enquanto o container de conteúdo (onde estão os botões) tinha apenas `z-20`. Resultado: **o glare cobria os botões**, bloqueando os eventos de clique.

### Código Problemático:

```tsx
// Content container - z-20 (BAIXO demais)
<div className="... z-20">
  <div className="pointer-events-auto">
    <a href="..." className="...">Demo</a> {/* Não clicável! */}
  </div>
</div>

// Glare effect - z-50 (ALTO demais, bloqueava cliques)
<motion.div className="... z-50 pointer-events-none">
  {/* Efeito visual */}
</motion.div>
```

Apesar do glare ter `pointer-events-none`, em alguns navegadores/situações o z-index mais alto ainda pode interferir com a camada de eventos.

## ✅ Solução Implementada

### 1. Inverter a Hierarquia de Z-Index

**Antes:**
```tsx
Content Container: z-20
Glare Effect: z-50
```

**Depois:**
```tsx
Content Container: z-30  ← Agora está acima!
Glare Effect: z-20       ← Agora está abaixo!
```

### 2. Adicionar Z-Index Extra nos Botões

```tsx
<div className="flex gap-4 pb-2 relative z-10">
  {/* Botões com z-10 adicional dentro do z-30 pai */}
</div>
```

### 3. Adicionar Cursor Pointer

```tsx
<motion.a 
  className="... cursor-pointer" // ← Melhor UX
>
  Demo
</motion.a>
```

## 📊 Resultado

### Antes:
- ❌ Botões não-clicáveis (glare bloqueava eventos)
- ❌ Cursor não mudava ao passar sobre botões
- ❌ UX frustrante para usuários

### Depois:
- ✅ Botões 100% clicáveis
- ✅ Cursor pointer aparece corretamente
- ✅ Links abrem em nova aba como esperado
- ✅ Efeito visual de glare preservado

## 🎯 Stack de Z-Index Final

```
Camada Visual:
├── Image (z-0)          - Imagem de fundo
├── Gradient Overlay     - Escurecimento
├── Light Sweep (z-10)   - Efeito de luz
├── Glare Effect (z-20)  - Brilho no hover
└── Content (z-30)       - Título, tags, BOTÕES
    └── Buttons (z-10)   - Camada extra de segurança
```

## 📚 Lições Aprendadas

1. **Z-index deve refletir prioridade funcional**: Elementos interativos devem estar acima de decorativos
2. **`pointer-events-none` nem sempre é suficiente**: Z-index alto pode causar problemas mesmo sem eventos
3. **Testar cliques em diferentes navegadores**: Safari/Chrome podem se comportar diferente
4. **Usar `cursor-pointer`**: Feedback visual é essencial para UX

## 🔗 Arquivos Modificados

- `components/Projects.tsx` (linhas 98-169)

## 🧪 Como Testar

1. Acesse http://localhost:3001
2. Role até a seção "Projetos"
3. Passe o mouse sobre um card de projeto
4. Clique nos botões "Demo" ou "Code"
5. Verifique se os links abrem corretamente

---

**Data da Correção:** 3 de dezembro de 2025  
**Commit:** `430c596` - "Fix project card buttons not clickable"  
**Impacto:** 🟢 Botões funcionando, UX melhorada, links acessíveis
