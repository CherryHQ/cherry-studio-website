# AI Translation App: Translate Selected Text, Documents and PDFs

Reading foreign-language docs, replying to clients abroad, getting through a paper: the slow part is usually copying text back and forth, not the translation itself. Cherry Studio puts AI translation on your desktop. Select text in any app to translate it, or drop in an image, Word file or PDF, and choose which model does the work.

## Three ways to translate

| Situation | Use | How |
| --- | --- | --- |
| A paragraph on a web page, chat or email | Selection Assistant | Select the text and click Translate on the floating toolbar |
| Text you'll keep editing | Translate page | Paste it, pick a target language, click Translate |
| Screenshots, Word, PowerPoint, PDF | Translate page | Drop the file into the input box; images go through OCR first |

## Translate selected text without switching apps

Turn on **Settings → Selection Assistant**, then select text in your browser, PDF reader, chat app or code editor. A small toolbar appears next to it; click Translate and the result shows up right there.

It works out the direction for you: foreign text goes into your target language, and text already in your target language goes into your backup language. The same toolbar can explain, summarize or search the selection. (See [Selection Assistant](/docs/en/cherrystudio/preview/selection-assistant/).)

![Cherry Studio Selection Assistant translating a selected German paragraph from a PDF into English in a floating window](/images/compare/ai-translation-en-1.webp)

On macOS, the first time you enable it you'll need to grant Cherry Studio Accessibility permission. Windows needs no extra setup.

## Documents and PDFs

Drop files straight into the Translate page:

- **Images and screenshots** are read with OCR first. Check numbers and tables in the recognized text.
- **Word, PowerPoint and Excel** files have their text extracted and translated.
- **PDFs** can keep their layout with BabelDOC: the original on the left, the translation on the right, and you can save the translated PDF. Scanned PDFs can't keep their layout yet.

Every translation is saved in history, where you can star, search and reuse it. (See [Translating files, images and long documents](/docs/en/advanced-basic/knowledge-content/translation-workflow/).)

![Cherry Studio Translate page showing layout-preserving PDF translation with the original and translated pages side by side](/images/compare/ai-translation-en-2.webp)

## Pick the model that translates

Many translation tools are tied to one engine. In Cherry Studio you switch models whenever you like: a fast, inexpensive model for everyday sentences, GPT, Claude or DeepSeek for contracts and technical docs, and a local model through Ollama when the text shouldn't leave your computer.

Translation settings also let you edit the translation prompt (for example, "keep English product names" or "use a formal tone"), lock translation to a fixed language pair, or add languages that aren't in the built-in list.

![Cherry Studio Default Model settings with a separate Translate Model and its model picker open](/images/compare/ai-translation-en-3.webp)

## Multilingual projects: let an agent check consistency

For a full set of product materials, prepare a glossary first. After translating, put the files in an agent's working folder and ask it to check terms, headings, links and numbers across all of them. It's much faster than comparing page by page. Contracts, medical and financial content still need review by a qualified person.

> **Download Cherry Studio and translate anything you select**
>
> Free and open source for Windows, macOS and Linux. Selected-text translation, document translation and layout-preserving PDF translation in one app, with the model of your choice.
>
> [Download free →](/download) · [Selection Assistant setup](/docs/en/cherrystudio/preview/selection-assistant/)

## FAQ

### Can Cherry Studio translate a whole PDF?

Yes. Drop the PDF into the Translate page and install BabelDOC to keep the original layout, with side-by-side preview and a translated PDF you can save. Scanned PDFs need OCR first.

### Which apps does selected-text translation work in?

Almost any app where you can select text: browsers, PDF readers, chat apps and code editors. On Linux it's fully supported under X11; under Wayland the toolbar may not follow the selection.

### How is AI translation different from traditional translation tools?

AI translation reads the whole passage for context, so tone and product names come out more naturally, and you can tell it what style you want. For specialist content, use a stronger model and have someone proofread.

### Can I translate offline?

Yes. Run a local model with Ollama or LM Studio and select it on the Translate page. Nothing goes online and the text stays on your computer.
