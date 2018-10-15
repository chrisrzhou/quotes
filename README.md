# Quotes

View and search for quotes written in markdown.

https://quotes.chrisrzhou.io

## About

Quotes are great and inspiration, but documenting and viewing quotes is a fairly disorganized process. Quotes are often stored in many systems and are difficult to search over time.

This project focuses on the simplicity of writing quotes in markdown, and provides an interactive UI to view quotes. The UI also supports searching quotes by content, author or tags (which are specified in the markdown file).

## Features

- Write quotes in simple markdown
- View quotes in an interactive UI
  - Presentation (auto) mode
  - Next/Back navigation
  - Search for quotes by contents, author or hashtags
- Share your quote on social media

## Managing quotes

To write a quote, all you need is to add/edit/remove blockquotes in the `quotes.md` markdown file. You can cite the author and include hashtags using the following intuitive notation

```
> Not everything that can be counted counts, and not everything that counts can be counted. --Einstein #physics #universe

> I love quotes! --Chris Zhou #me
```

When developing and building, the app will automatically pick up any changes in the `quotes.md` file and update the data for the UI.

## How does it work?

We watch for changes in `quotes.md`, and use regular expression to parse out quote contents, authors and hashtags. This structured data is then fed into the React application for rendering.
