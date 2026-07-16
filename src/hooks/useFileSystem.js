import { useState, useCallback } from 'react';

export const useFileSystem = (initialFileSystem) => {
  const [fileSystem] = useState(initialFileSystem);

  const getNode = useCallback((path) => {
    return fileSystem[path] || null;
  }, [fileSystem]);

  const isDirectory = useCallback((path) => {
    const node = getNode(path);
    return node && node.type === 'dir';
  }, [getNode]);

  const isFile = useCallback((path) => {
    const node = getNode(path);
    return node && node.type === 'file';
  }, [getNode]);

  const getChildren = useCallback((path) => {
    const node = getNode(path);
    return node && node.children ? node.children : [];
  }, [getNode]);

  const getContent = useCallback((path) => {
    const node = getNode(path);
    return node && node.content ? node.content : null;
  }, [getNode]);

  const resolvePath = useCallback((currentDir, target) => {
    if (target === '..') {
      const parts = currentDir.split('/');
      parts.pop();
      return parts.join('/') || '~';
    }
    if (target === '.' || target === '~') {
      return target;
    }
    return `${currentDir}/${target}`.replace('//', '/');
  }, []);

  return {
    fileSystem,
    getNode,
    isDirectory,
    isFile,
    getChildren,
    getContent,
    resolvePath
  };
};