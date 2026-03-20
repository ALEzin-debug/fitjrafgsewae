// =============================================
// FitJR - Service Worker (Auto-Destruidor)
// =============================================
// Este SW existe APENAS para limpar caches antigos
// de clientes que já instalaram versões anteriores.
// Ele se desregistra sozinho após a limpeza.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then(clients => {
        clients.forEach(client => client.navigate(client.url));
      })
  );
});
