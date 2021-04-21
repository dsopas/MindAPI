((win, doc) => {
  const mdURL = 'https://raw.githubusercontent.com/dsopas/MindAPI/main/MindAPI.md';

  async function getMarkdown () {
    const res = await fetch(mdURL);

    return await res.text();
  }

  async function render (el) {
    const t = new markmap.Transformer,
          md = await getMarkdown(),
          { root } = t.transform(md);
    const elem = doc.getElementById(el);
    win.markmap.Markmap.create(el, null, root);
  }

  async function downloadInteractiveHTML () {
    const t = new markmap.Transformer,
          md = await getMarkdown(),
          { root, features } = t.transform(md);

    const assets = t.getUsedAssets(features),
          html = markmap.fillTemplate(root, assets);
          a = doc.createElement('a');

    a.setAttribute('href', 'data:text/html;utf8,' + encodeURIComponent(html));
    a.setAttribute('download', 'mindapi.html');
    a.click();
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    // setup download handlers
    doc.getElementById('download-interactive')
      .addEventListener('click', downloadInteractiveHTML);
  });

  win.mindapi = { render }
})(window, document);
