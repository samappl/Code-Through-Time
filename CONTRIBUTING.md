# Contributing to Code Through Time

Thanks for helping! Corrections, new languages, better questions and design fixes are all welcome.

## Quick start

```bash
git clone https://github.com/YOUR-USERNAME/code-through-time.git
cd code-through-time
python3 -m http.server 8000      # then open http://localhost:8000
```

There is no build step. Edit a file, refresh the browser.

## Where things live

| You want to change… | Edit |
| --- | --- |
| Eras, breakthroughs, games/phones timelines | `js/data/00-eras.js` |
| A language | the `js/data/0X-*.js` file that defines `CT.langs["id"]` |
| The AI chapter | `js/data/05-ai.js` |
| People, glossary, coding challenges | `js/data/08-people-glossary-challenges.js` |
| Page layout and behaviour | `js/app.js` |
| Themes and styling | `css/style.css` |

## Rules for content

1. **Every claim needs a source.** Fun facts have a `src` link; languages and eras have `sources` lists. Prefer official docs, original papers and well-cited references.
2. **Code examples must actually run.** If you add one, run it first.
3. **Quiz questions** need 2–4 options with exactly one correct answer, plus an `explain`. The site shuffles options, so don’t write “all of the above”.
4. **Plain, friendly English.** Short sentences. Explain jargon or link the glossary.

## Before you open a pull request

```bash
node tests/validate.mjs
```

It checks every language, era, quiz, fact source and coding-challenge solution. CI runs the same check, and a weekly job checks every source link.
