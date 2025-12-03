# Correção de React Hooks - Skills & Projects

## 🐛 Problema Identificado

**Erro:** `React has detected a change in the order of Hooks called by SkillCard/ProjectCard`

**Causa Raiz:** Violação das [Rules of Hooks](https://react.dev/link/rules-of-hooks) do React.

### Componentes Afetados:
1. `components/Skills.tsx` - SkillCard
2. `components/Projects.tsx` - ProjectCard

## 🔍 Análise do Erro

### O que estava errado?

Os hooks `useMotionTemplate()` e `useTransform()` do Framer Motion estavam sendo chamados **dentro de blocos condicionais JSX**:

```tsx
// ❌ ERRADO - Hook dentro de condicional
{!isLowPower && (
  <motion.div
    style={{
      background: useMotionTemplate`...` // ⚠️ Violação!
    }}
  />
)}
```

### Por que isso é um problema?

React **EXIGE** que hooks sejam chamados:
1. **Na mesma ordem** em cada render
2. **Sempre** no top-level do componente
3. **Nunca** dentro de condicionais, loops ou funções aninhadas

Quando `isLowPower` muda, a quantidade de hooks renderizados mudava, causando o erro.

## ✅ Solução Implementada

### Skills.tsx (SkillCard)

**Antes:**
```tsx
const SkillCard = ({ skill, index }) => {
  const { isLowPower } = usePerformance();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // ...

  return (
    <motion.div>
      {!isLowPower && (
        <motion.div
          style={{
            background: useMotionTemplate`...` // ❌ Hook condicional
          }}
        />
      )}
      {!isLowPower && (
        <motion.div
          style={{
            background: useMotionTemplate`...` // ❌ Hook condicional
          }}
        />
      )}
      {!isLowPower && (
        <motion.div
          style={{
            x: useTransform(xPct, ...) // ❌ Hook condicional
          }}
        />
      )}
    </motion.div>
  );
};
```

**Depois:**
```tsx
const SkillCard = ({ skill, index }) => {
  const { isLowPower } = usePerformance();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // ✅ Sempre chamados, independentemente de isLowPower
  const borderGlow = useMotionTemplate`
    radial-gradient(
      600px circle at ${x}px ${y}px,
      rgba(99, 102, 241, 0.5),
      transparent 40%
    )
  `;

  const innerSpotlight = useMotionTemplate`
    radial-gradient(
      400px circle at ${x}px ${y}px,
      rgba(168, 85, 247, 0.1),
      transparent 80%
    )
  `;

  const lightSweepX = useTransform(xPct, [0, 1], ["-150%", "150%"]);

  return (
    <motion.div>
      {!isLowPower && (
        <motion.div
          style={{ background: borderGlow }} // ✅ Variável pré-computada
        />
      )}
      {!isLowPower && (
        <motion.div
          style={{ background: innerSpotlight }} // ✅ Variável pré-computada
        />
      )}
      {!isLowPower && (
        <motion.div
          style={{ x: lightSweepX }} // ✅ Variável pré-computada
        />
      )}
    </motion.div>
  );
};
```

### Projects.tsx (ProjectCard)

**Mesma correção aplicada:**
```tsx
// ✅ Hooks chamados fora do JSX condicional
const glareXTransform = useTransform(glareX, val => `-${val}%`);
const glareYTransform = useTransform(glareY, val => `-${val}%`);

// ✅ Uso das variáveis dentro do JSX
{!isLowPower && (
  <motion.div
    style={{ 
      x: glareXTransform, 
      y: glareYTransform 
    }}
  />
)}
```

## 📊 Resultado

### Antes:
- ❌ Erro: "Rendered more hooks than during the previous render"
- ❌ 43 hooks em um render, 42 no próximo
- ❌ Aplicação crashava ao mudar condições de performance

### Depois:
- ✅ **Zero erros de hooks**
- ✅ Mesma quantidade de hooks em todos os renders
- ✅ Performance otimizada mantida (condicionais JSX ainda funcionam)
- ✅ Aplicação estável em todos os tiers de performance

## 🎯 Impacto

### Performance:
- **Sem overhead adicional**: `useMotionTemplate` e `useTransform` são baratos
- **Memoização interna**: Framer Motion já otimiza essas chamadas
- **Condicionais JSX preservadas**: Elementos ainda não renderizam em `isLowPower`

### Manutenibilidade:
- **Código mais limpo**: Todos os hooks no topo do componente
- **Mais fácil de entender**: Lógica de performance separada da renderização
- **Segue best practices**: Alinhado com as Rules of Hooks do React

## 📚 Lições Aprendidas

1. **Sempre chamar hooks incondicionalmente**: Mesmo que o valor não seja usado
2. **Pre-computar valores de hooks**: Criar variáveis antes do JSX
3. **Condicionais no JSX, não em hooks**: Controlar renderização no return
4. **Testar em diferentes estados**: Verificar com `isLowPower` true/false

## 🔗 Recursos

- [React Rules of Hooks](https://react.dev/link/rules-of-hooks)
- [Framer Motion useMotionTemplate](https://www.framer.com/motion/motiontemplate/)
- [React Performance Context](./PERFORMANCE_SYSTEM.md)

---

**Data da Correção:** 3 de dezembro de 2025  
**Commit:** `6fc3bf8` - "Fix React Hooks violations in Skills and Projects components"
