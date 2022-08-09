---
title: 'Tutorial de documentação'
sidebar_position: 1
---

<!--
    ISSO É UM COMENTÁRIO

    pessoal, algumas dicas pra fazer os documentos

    na primeira linha do documento, sempre vão ficar as propriedades dele
    sidebar_label é o título do documento que você tá escrevendo na sidebar
    essa é a única que importa, por enquanto

    escrevam o documento com a sintaxe comum de markdown
    se tiverem dúvidas, usem de referência:
    https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open

    as imagens estão em um formato diferente pra ter uma formatação melhor no documento
    vocês têm DUAS opções:
        - colocar como imagem mesmo: ![Alt](src)
        - copiar o código que eu já fiz
 -->

# Introdução

Salve, meus queridos DVPers! Essa é a nossa tão querida byron.wiki começando a sair, e pra isso tô escrevendo esse arquivo de documentação pra guiar vocês em qualquer dúvida que vocês possam vir a ter!

O Docusaurus é um gerador de documentação automatizado baseado em React (!!!), feito pelo Facebook (que também desenvolveu o React). Contudo, você não precisa saber React pra popular nossa querida documentação (ufa!). Basta saber Markdown e, no máximo, um HTML básico, coisa que todos os efetivados da byron sabem.

O Markdown usado é, na verdade, o MDX, que é uma extensão do Markdown comum para suportar recursos de linguagem do JSX (JS + HTML, usado em React). Na prática, vocês não precisam saber muito além de colocar a extensão `.mdx` nos arquivos de vocês.

## Localização dos documentos

Depois de terem esse repositório rodando certinho (vocês já fizeram isso, visto que tão vendo essa página), vocês já podem começar a escrever os nossos documentos!

Primeiro de tudo, caso tenham alguma dúvida que não foi respondida por esse tutorialzinho, olhem a [documentação do Docusaurus](https://docusaurus.io/docs/).

**Todos** os documentos vão ficar dentro da pasta `/docs`. A separação das páginas e o conteúdo na sidebar é feito automaticamente, de acordo com a própria estrutura de arquivos da documentação.

Basicamente, a estrutura vai ser `/docs/{diretoria}`. Então, se vamos ~~re~~mapear DVP, os processos vão ficar localizados em `/docs/dvp/`, certo?

Feito isso, vocês devem criar uma pasta para o próprio documento. Então, se eu tô mapeando o Planejamento Financeiro, por exemplo, vou criar a pasta `/docs/dvp/planejamento-financeiro`. Dentro dessa pasta, existirão duas coisas:

- O arquivo `index.mdx`
- A pasta `img`

O arquivo `index.mdx` será onde vocês vão passar maior parte do tempo de vocês. É lá que acontece a mágica do Markdown e tudo que vocês esperam. Escrevam Markdown comum como aprenderam, salvo algumas [exceções](#recursos-extra).

A pasta `img` será onde vocês vão salvar as imagens usadas nos processos de vocês.

## Configurações do documento

Um recurso um pouco mais exclusivo do Docusaurus é a seção de opções do documento ao início de todo arquivo Markdown.

```md
---
title: 'Título da página'
sidebar_label: 'Título da página na sidebar'
---

Seu markdown aqui.
```

Essas configurações devem, **SEMPRE**, ser a primeira coisa no documento. Caso contrário, não vão ser aplicadas e vocês vão ficar lelé da cuca tentando entender o que rolou.

## Recursos Extra

O Docusaurus suporta a implementação de recursos adicionais ao Markdown, e nós temos (por enquanto) um recurso adicional: as imagens!

### tag `image`

A tag `<image />` é uma extensão que eu fiz pra facilitar o uso das imagens e colocar legendas nelas sem muitas dificuldades.

Ao invés de vocês, toda vez que forem incluir uma imagem, terem que lidar com o seguinte código:

```html
<div style="text-align: center; max-width: 600px; margin-inline: auto;">
  <img src="./caminho/da/imagem" alt="Legenda" />
  <span style="font-size: 12px;">Legenda</span>
</div>
```

Vocês só tem que fazer o seguinte uso:

```jsx
import imgX from './img/imagem.png';

<image src={imgX} alt='Legenda' />;
```

Mais fácil, né?

Além disso, a tag `image` suporta, por enquanto, uma prop, que é o `hideLegend`. Caso a imagem usada não precise de uma legenda embaixo da imagem (por exemplo, no caso do fluxograma), basta incluir essa opção dentro da tag.

```jsx
import imgX from './img/imagem.png';

<image src={imgX} alt='Legenda' hideLegend />;
```

Pronto! Muito simples!

Outra recomendação que faço é: mantenham todos os imports no início do arquivo, mas NUNCA antes da seção de [configurações do arquivo](#configurações-do-documento).
