import { useEffect, useState } from 'react';

export function useServiceWorkerUpdate() {
    const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });

            navigator.serviceWorker.ready.then(registration => {
                if (registration.waiting) {
                    setWaitingWorker(registration.waiting);
                }

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setWaitingWorker(newWorker);
                            }
                        });
                    }
                });
            });
        }
    }, []);

    const updateServiceWorker = () => {
        if (waitingWorker) {
            waitingWorker.postMessage({ type: 'SKIP_WAITING' });
        }
    };

    return { updateServiceWorker, isUpdateAvailable: !!waitingWorker };
}
