// Loads the shared header from header.html into #site-header, then runs initUI.
(function () {
    const ph = document.getElementById('site-header');
    if (!ph) return;

    fetch('header.html')
        .then(r => r.text())
        .then(html => {
            ph.outerHTML = html.trim();
            if (window.initUI) window.initUI();
        })
        .catch(err => {
            console.error('Failed to load header', err);
        });
})();
