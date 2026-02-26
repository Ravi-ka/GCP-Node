export const logInfo = (message: string, metadata: Record<string, any> = {}) => {
  console.log(JSON.stringify({
    severity: "INFO",
    message,
    timestamp: new Date().toISOString(),
    ...metadata
  }));
};

export const logError = (message: string, metadata: Record<string, any> = {}) => {
  console.error(JSON.stringify({
    severity: "ERROR",
    message,
    timestamp: new Date().toISOString(),
    ...metadata
  }));
};