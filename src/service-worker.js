// service-worker.js
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
if (registration?.waiting) {
    const confirmed = window.confirm("New version available. Reload now?");
    if (confirmed) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
    }
}
