# Quotes

https://quotes.chrisrzhou.io

[![MIT License][license-badge]](LICENSE.md)

[license-badge]: https://flat.badgen.net/badge/license/MIT/blue

View and search for [quotes](./src/quotes.md) written in markdown.

## TODO

- [ ] Build SearchResults component
- [ ] Handle parser for edge cases (allow up to one newline for new blockquotes)
- [ ] Allow autoplaying for filtered quotes (show currentQuoteNumber / filteredQuotesCount)
- [ ] Share quotes on twitter/fb (social buttons)
- [ ] screensaver support (Mac/PC/Linux)
- [ ] swipe support

## About

Everyone loves inspirational quotes, but documenting and viewing them is a fairly disorganized process. They are often stored in many systems and are difficult to search and organize over time.

This project focuses on the simplicity of writing quotes in markdown, and provides an interactive UI to search and explore quotes by content, author or tags.

## Personal Motivation

This project helps me set up a common place to store quotes using a convenient markdown format. It is easy to view the readable markdown file, or use the accompanying UI to explore quotes by author and tags. I also wanted to take this project as an opportunity to write a babel loader that parses the markdown file into structured javascript data.

## Writing quotes

Write your quotes in simple markdown in the [quotes.md](./src/quotes.md) file, using the standardized markdown blockquote notation, and intuitive notations for mentioning authors and adding hashtags:

```
> Not everything that can be counted counts, and not everything that counts can be counted. @Einstein #physics #universe

> I love Quotes! @Chris Zhou #me
```

## Developing and building

To develop, install dependencies using `yarn` and run

```sh
yarn start
```

You can build and deploy the production app by running:

```sh
git clone git@github.com:chrisrzhou/quotes.git
yarn
yarn build
# serve build folder
```

Or, you can deploy to Netlify by hitting the button below:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chrisrzhou/quotes)
