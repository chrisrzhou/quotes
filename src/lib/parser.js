const normalizeNewline = require('normalize-newline');

const RE_BLOCKQUOTE = /\s*>\s*/;

const RE_AUTHOR = /\s+@\s*/;

const RE_HASHTAG = /\s+#\s*/;

module.exports = content => {
  // apply regex in order of RE_BLOCKQUOTE > RE_AUTHOR > RE_HASHTAG
  return normalizeNewline(content)
    .trim()
    .split(RE_BLOCKQUOTE)
    .filter((q, i) => {
      return i > 0 && q !== '';
    })
    .map(qs => {
      const [withoutAuthor, withAuthor] = qs.split(RE_AUTHOR);
      let author;
      let tags = [];
      if (withAuthor) {
        content = withoutAuthor;
        [author, ...tags] = withAuthor.split(RE_HASHTAG);
      } else {
        [content, ...tags] = withoutAuthor.split(RE_HASHTAG);
      }
      return {
        author: author ? author.trim() : null,
        content: content.trim().replace(/\s\s+/g, ' '),
        tags: tags.map(tag => tag.trim()),
      };
    });
};
