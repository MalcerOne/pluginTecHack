# Plugin para Mozila Firefox
  **Objetivo**: Criação de extensão para navegadores Firefox para detecção de ataques e
violação de privacidade em cliente web.

## Sumário

---

- [Sobre o projeto](#sobre-o-projeto)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Contatos](#contatos)

## Sobre o projeto

---

O projeto deste repositório tem como tema o desenvolvimento de um plugin para navegador Firefox capaz de detectar:
- Armazenamento de dados (storage local – html5) no dispositivo do
usuário (3 pontos)
- A quantidade de cookies injetados no carregamento de uma página (2 pontos)
- Cookies de primeira e terceira parte, bem como sessão ou
navegação (3 pontos)
- Uma pontuação a partir de uma metodologia, indicando se a página respeita a
privacidade do usuário. A metodologia tem como base a quantidade de cookies,
storage local e cookies de primeira e terceira parte (3 pontos)

├── icons\
│   └── privacy_icon.png
|
├── extension.css
├── README.md\
├── privacyPlugin.js
├── extension.html
├── getLocalStorage.js
└── manifest.json

## Uso

---

1. No arquivo **[manifest.json](https://github.com/MalcerOne/pluginTecHack/blob/main/manifest.json)**, tem todas as regras necessarias para que o firefox consiga identificar a extensao:
```json
{
  "manifest_version": 2,
  "name": "PrivacyExtension",
  "version": "1.0",

  "description": "Detection of privacy violations, possible attacks and other security issues in a web client.",

  "icons": {
    "48": "icons/privacy_icon.png"
  },

  "content_scripts": [
    {
      "matches": ["*://*/*"],
      "js": ["privacyPlugin.js"]
    }
  ],

  "browser_action": {
      "default_title": "PrivacyExtension",
      "default_popup": "extension.html",
      "browser_style": true
  },

  "permissions": [
      "cookies",
      "<all_urls>",
      "tabs",
      "storage",
      "http://*/*",
      "https://*/*"
  ]  
}
   
```
2. No Firefox, digite na url:
```terminal
about:debbuging
```
3. Clique em Este Firefox, e em seguida em Carregar extensao temporaria. Escolha o arquivo manifest.json e a extensao sera carregada no navegador automaticamente.

## Contribuição

---

Rafael Malcervelli

## Contatos

---

**Maintainer:** [Rafael Malcervelli](https://github.com/MalcerOne)
**Email:** rafaelsm9@al.insper.edu
