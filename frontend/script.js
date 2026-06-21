window.addEventListener("error", (e) => {
  const p = document.getElementById("preview");
  if (p) p.innerHTML = `<pre style="color:#FF5151;white-space:pre-wrap;padding:16px">window error: ${e.message}\n${e.filename}:${e.lineno}:${e.colno}</pre>`;
});
window.addEventListener("unhandledrejection", (e) => {
  const p = document.getElementById("preview");
  if (p) p.innerHTML = `<pre style="color:#FF5151;white-space:pre-wrap;padding:16px">unhandled rejection: ${e.reason && e.reason.message ? e.reason.message : e.reason}</pre>`;
});

import { Marp } from "https://esm.sh/@marp-team/marp-core@4";

const loadJSZip = async () => (await import("https://esm.sh/jszip@3")).default;

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const pdfBtn = document.getElementById("pdfBtn");
const editorMode = document.getElementById("editorMode");
const importBtn = document.getElementById("importBtn");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

const STYLE_URL =
  "https://raw.githubusercontent.com/rsfact/rs-marp-theme/refs/heads/main/theme/style.css";

const cacheBust = (url) => {
  const ts = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  return `${url}${url.includes("?") ? "&" : "?"}v=${ts}`;
};

const loadStyle = async () => {
  const r = await fetch(cacheBust(STYLE_URL), { cache: "no-store" });
  if (!r.ok) throw new Error(`style.css を読めません: ${STYLE_URL}`);
  return r.text();
};

let mdText = editor.value;
let cssText = "";
let lastEditorMode = "md";

const localImageStore = new Map();
const IMG_REF = /!\[([^\]]*)\]\(\.\/([^)\s]+)\)/g;

const resolveLocalEmbeds = (md) =>
  md.replace(IMG_REF, (full, alt, name) => {
    const url = localImageStore.get(name);
    return url ? `![${alt}](${url})` : full;
  });

const referencedNames = (md) => {
  const names = new Set();
  for (const m of md.matchAll(IMG_REF)) names.add(m[2]);
  return names;
};

const sanitizeName = (name) => {
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "");
  return (base || "image") + ext;
};

const uniqueName = (name) => {
  if (!localImageStore.has(name)) return name;
  const dot = name.lastIndexOf(".");
  const base = dot >= 0 ? name.slice(0, dot) : name;
  const ext = dot >= 0 ? name.slice(dot) : "";
  let i = 1;
  while (localImageStore.has(`${base}-${i}${ext}`)) i++;
  return `${base}-${i}${ext}`;
};

const themeName = (css) => {
  const m = css.match(/\/\*\s*@theme\s+(\S+)\s*\*\//);
  return m ? m[1] : "rs-marp-theme-v0.1.0";
};

const withFrontmatter = (md) => {
  if (/^---[\s\S]*?---\s*/.test(md)) return md;
  return `---\nmarp: true\ntheme: ${themeName(cssText)}\ntitle: "RS Marp"\npaginate: true\n---\n\n${md}`;
};

const ensureThemeName = (css, name = "rs-marp-theme-v0.1.0") =>
  /\/\*\s*@theme\s+\S+\s*\*\//.test(css) ? css : `/* @theme ${name} */\n${css}`;

const createMarp = () => {
  const marp = new Marp({ html: true });
  if (cssText) marp.themeSet.add(ensureThemeName(cssText));
  return marp;
};

const showError = (msg) => {
  preview.innerHTML = `<pre style="color:#FF5151;white-space:pre-wrap;padding:16px">${msg}</pre>`;
};

const render = () => {
  try {
    const marp = createMarp();
    const markdown = withFrontmatter(resolveLocalEmbeds(mdText));
    const { html, css } = marp.render(markdown);
    preview.innerHTML = `<style>${css}</style>${html}`;
  } catch (e) {
    showError(`render error: ${e.message}\n${e.stack || ""}`);
    console.error(e);
  }
};

const syncEditorFromMode = () => {
  editor.value = editorMode.value === "md" ? mdText : cssText;
};

const persistEditorToMode = () => {
  if (editorMode.value === "md") mdText = editor.value;
  else cssText = editor.value;
};

const persistFromLastMode = () => {
  if (lastEditorMode === "md") mdText = editor.value;
  else cssText = editor.value;
};

editorMode.addEventListener("change", () => {
  persistFromLastMode();
  lastEditorMode = editorMode.value;
  syncEditorFromMode();
});

editor.addEventListener("input", () => {
  persistEditorToMode();
  render();
});

const allowedImageFile = (file) => {
  if (file.type === "image/png" || file.type === "image/jpeg") return true;
  if (!file.type && /\.(png|jpe?g)$/i.test(file.name)) return true;
  return false;
};

const readAsDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });

let editorDndDepth = 0;

editor.addEventListener("dragenter", (e) => {
  e.preventDefault();
  editorDndDepth++;
  editor.classList.add("editor-dnd-over");
});

editor.addEventListener("dragleave", (e) => {
  e.preventDefault();
  editorDndDepth = Math.max(0, editorDndDepth - 1);
  if (editorDndDepth === 0) editor.classList.remove("editor-dnd-over");
});

editor.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
});

editor.addEventListener("drop", async (e) => {
  e.preventDefault();
  editorDndDepth = 0;
  editor.classList.remove("editor-dnd-over");

  if (editorMode.value !== "md") return;

  const files = [...e.dataTransfer.files].filter(allowedImageFile);
  if (files.length === 0) return;

  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const before = editor.value.slice(0, start);
  const after = editor.value.slice(end);

  const blocks = await Promise.all(
    files.map(async (file) => {
      const name = uniqueName(sanitizeName(file.name));
      const dataUrl = await readAsDataURL(file);
      localImageStore.set(name, dataUrl);
      return `![${name}](./${name})`;
    })
  );
  const insertion = `${blocks.join("\n\n")}\n`;

  editor.value = before + insertion + after;
  const caret = before.length + insertion.length;
  editor.selectionStart = editor.selectionEnd = caret;

  editor.dispatchEvent(new Event("input", { bubbles: true }));
  editor.focus();
});

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const exportZip = async () => {
  persistEditorToMode();
  const JSZip = await loadJSZip();
  const zip = new JSZip();
  zip.file("slide.md", mdText);
  const refs = referencedNames(mdText);
  for (const [name, dataUrl] of localImageStore) {
    if (!refs.has(name)) continue;
    const blob = await (await fetch(dataUrl)).blob();
    zip.file(name, blob);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob(blob, "slide.zip");
};

const importZip = async (file) => {
  const JSZip = await loadJSZip();
  const zip = await JSZip.loadAsync(file);
  const entries = Object.values(zip.files).filter((e) => !e.dir);
  let md = null;
  const images = new Map();
  for (const entry of entries) {
    const name = entry.name.split("/").pop();
    if (/\.md$/i.test(name)) {
      if (md === null) md = await entry.async("string");
    } else if (/\.(png|jpe?g)$/i.test(name)) {
      const mime = /\.png$/i.test(name) ? "image/png" : "image/jpeg";
      const base64 = await entry.async("base64");
      images.set(name, `data:${mime};base64,${base64}`);
    }
  }
  if (md === null) throw new Error("ZIP内に Markdown ファイル(.md)が見つかりません");
  localImageStore.clear();
  for (const [k, v] of images) localImageStore.set(k, v);
  mdText = md;
  syncEditorFromMode();
  render();
};

exportBtn.addEventListener("click", () => {
  exportZip().catch((e) => alert(e.message));
});

importBtn.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", async () => {
  const file = importFile.files[0];
  if (!file) return;
  try { await importZip(file); }
  catch (e) { alert(e.message); }
  finally { importFile.value = ""; }
});

const printHtmlDocument = (fullHtml) => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden"
  );
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  doc.open();
  doc.write(fullHtml);
  doc.close();

  const cleanup = () => iframe.remove();

  const runPrint = () => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } finally {
      iframe.contentWindow.addEventListener("afterprint", cleanup, { once: true });
      setTimeout(cleanup, 2 * 60 * 1000);
    }
  };

  if (iframe.contentDocument.readyState === "complete") {
    requestAnimationFrame(runPrint);
  } else {
    iframe.onload = () => requestAnimationFrame(runPrint);
  }
};

pdfBtn.addEventListener("click", () => {
  persistEditorToMode();
  const marp = createMarp();
  const markdown = withFrontmatter(resolveLocalEmbeds(mdText));
  const { html, css } = marp.render(markdown);
  const fullHtml = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>RS Marp Editor</title>
  <style>
    ${css}
    body { margin: 0; background: #fff; }
  </style>
</head>
<body>${html}</body>
</html>`;
  printHtmlDocument(fullHtml);
});

preview.innerHTML = `<pre style="padding:16px;color:#888">style.css を読み込み中…</pre>`;

loadStyle()
  .then((css) => { cssText = css; render(); })
  .catch((e) => {
    console.error("style.css load failed:", e);
    showError(`style.css 読み込み失敗: ${e.message}\n（テーマなしで描画します）`);
    setTimeout(render, 1500);
  });
