# Quotes

https://quotes.chrisrzhou.io

[![MIT License][license-badge]](LICENSE.md)

[license-badge]: https://flat.badgen.net/badge/license/MIT/blue

Write your favorite quotes in markdown. Visualize and manage them in a simple and nice UI!

Deploy an instance of this project by clicking the deploy button below. Add and manage your own quotes by editing the [./src/quotes.md](./src/quotes.md) markdown file.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chrisrzhou/quotes)

## About

Everyone loves inspirational quotes, but documenting and viewing them is a fairly disorganized process. Quotes are usually stored in many systems, and are difficult to search and organize over time.

This project focuses on the simplicity of writing quotes in markdown, and provides an interactive UI to search and explore quotes by content, author or tags.

## Writing quotes

Write your quotes in simple markdown in the [quotes.md](./src/quotes.md) file, using the standardized markdown blockquote notation, and intuitive notations for authors and hashtags:

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

## Personal Motivation

This project provides me with a common place to store quotes using markdown format. It is easy to view the standalone markdown file, or use the accompanying UI to explore quotes by author and tags. I wanted to take this project as an opportunity to learn how to write a babel loader that parses markdown files into structured javascript data.
