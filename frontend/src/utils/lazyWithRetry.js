import React from 'react';

export const lazyWithRetry = (componentImport) =>
  React.lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error('Chunk loading failed, retrying...', error);
      // Retry once if chunk loading fails
      return new Promise((resolve) => {
        setTimeout(() => {
          window.location.reload();
          resolve(componentImport());
        }, 1000);
      });
    }
  });

export default lazyWithRetry;
