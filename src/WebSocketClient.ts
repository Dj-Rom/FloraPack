// WebSocketClient.ts
import { useEffect } from 'react';

export const useWebSocketForUpdate = () => {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001'); // или твой backend

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'UPDATE_AVAILABLE') {
                const registration = await navigator.serviceWorker.getRegistration();

                if (registration?.waiting) {
                    // Принудительно активируем новый SW и перезагружаем страницу
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

                    // Дождаться активации и перезагрузить
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        window.location.reload();
                    });
                }
            }
        };

        return () => socket.close();
    }, []);
};
