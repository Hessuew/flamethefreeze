/**
 * Endpoint configuration for the urFIT-child project
 */

interface EndpointConfig {
  publicFiles: string;
}

function getEndpointConfig(): EndpointConfig {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV;

  if (isDev) {
    return {
      publicFiles: "http://localhost:8787/files",
    };
  }

  // Production endpoints
  return {
    publicFiles: "https://flamethefreeze-worker.juhani-juusola.workers.dev/files",
  };
}

export const ENDPOINTS = getEndpointConfig();
