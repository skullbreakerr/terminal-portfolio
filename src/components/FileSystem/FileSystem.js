import { createFileSystem } from '../../data/fileSystem';
import { portfolioData } from '../../data/portfolio';

export const initializeFileSystem = () => {
  return createFileSystem(portfolioData);
};

export const getNodeType = (fileSystem, path) => {
  const node = fileSystem[path];
  return node ? node.type : null;
};

export const getNodeContent = (fileSystem, path) => {
  const node = fileSystem[path];
  return node && node.content ? node.content : null;
};

export const getNodeChildren = (fileSystem, path) => {
  const node = fileSystem[path];
  return node && node.children ? node.children : [];
};