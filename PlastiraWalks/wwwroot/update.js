let waitingWorker = null;
let registrationStarted = false;

export async function initializeUpdateDetection(dotNetRef) {
    if (registrationStarted || !('serviceWorker' in navigator)) {
        return;
    }

    registrationStarted = true;

    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');

        if (registration.waiting) {
            waitingWorker = registration.waiting;
            dotNetRef.invokeMethodAsync('ShowUpdateToast');
        }

        registration.addEventListener('updatefound', () => {
            const installing = registration.installing;
            if (!installing) {
                return;
            }

            installing.addEventListener('statechange', () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                    waitingWorker = registration.waiting || installing;
                    dotNetRef.invokeMethodAsync('ShowUpdateToast');
                }
            });
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    } catch {
        // ignore
    }
}

export async function activateUpdate() {
    clearSessionState();

    if (waitingWorker) {
        waitingWorker.postMessage({ type: 'SKIP_WAITING' });
        return;
    }

    window.location.reload();
}

function clearSessionState() {
    try {
        sessionStorage.clear();
    } catch {
        // ignore
    }

    try {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqIndex = cookie.indexOf('=');
            const name = (eqIndex > -1 ? cookie.slice(0, eqIndex) : cookie).trim();
            if (!name) {
                continue;
            }

            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${location.hostname}`;
        }
    } catch {
        // ignore
    }
}