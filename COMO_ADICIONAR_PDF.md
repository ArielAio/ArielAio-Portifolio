# 📄 Como Adicionar o Currículo PDF

## Passo 1: Localizar seu currículo

Encontre o arquivo PDF do seu currículo no seu computador.

## Passo 2: Copiar para o projeto

Você tem duas opções:

### Opção A: Via Terminal (Rápido)
```bash
# Navegue até onde está seu currículo e copie para o projeto
cp /caminho/para/seu/curriculo.pdf /Users/arielaio/Desktop/Arquivos/Projetos/Portifolio/ArielAio-Portifolio/public/Curriculo_Ariel_Aio.pdf
```

### Opção B: Via Finder (Visual)
1. Abra o Finder
2. Navegue até a pasta do projeto:
   ```
   /Users/arielaio/Desktop/Arquivos/Projetos/Portifolio/ArielAio-Portifolio/public/
   ```
3. Arraste seu currículo PDF para essa pasta
4. Renomeie o arquivo para: `Curriculo_Ariel_Aio.pdf`

## Passo 3: Verificar se funcionou

1. Acesse http://localhost:3001
2. Na seção Hero (topo da página), clique no botão **"Baixar PDF"**
3. O download deve iniciar automaticamente

## Passo 4: Fazer commit (opcional)

Se quiser versionar o PDF no git:

```bash
cd /Users/arielaio/Desktop/Arquivos/Projetos/Portifolio/ArielAio-Portifolio
git add public/Curriculo_Ariel_Aio.pdf
git commit -m "Add resume PDF for download"
git push
```

**⚠️ Nota:** PDFs podem ser grandes. Se preferir, você pode:
- Adicionar ao `.gitignore` e hospedar em outro lugar (Google Drive, Dropbox)
- Comprimir o PDF antes de adicionar
- Manter apenas em produção (não versionar)

## Estrutura Esperada

Após adicionar, sua pasta `public/` deve ter:

```
public/
├── codewise.jpeg
├── Curriculo_Ariel_Aio.pdf  ← SEU CURRÍCULO AQUI
├── favicon.svg
└── README-PDF.txt
```

## Troubleshooting

### Problema: Download não funciona
- Verifique se o arquivo está em `public/` (não em subpastas)
- Verifique se o nome está **exatamente** como: `Curriculo_Ariel_Aio.pdf`
- Recarregue a página (Cmd+R ou Ctrl+R)

### Problema: Arquivo muito grande
```bash
# Comprimir PDF no macOS
/System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py -o output.pdf input.pdf
```

Ou use ferramentas online:
- https://www.ilovepdf.com/compress_pdf
- https://smallpdf.com/compress-pdf

---

✅ Pronto! Seu currículo estará disponível para download no portfólio.
