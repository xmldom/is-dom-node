export const NodeTypes: { [key: string]: number } = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNodeLike(value: any): value is Node {
  return (
    value &&
    typeof value === "object" &&
    Number.isInteger(value.nodeType) &&
    value.nodeType >= 1 &&
    value.nodeType <= 11 &&
    typeof value.nodeName === "string" &&
    typeof value.appendChild === "function" &&
    typeof value.removeChild === "function"
  );
}

export function assertIsNodeLike(value: unknown): void {
  if (!isNodeLike(value)) {
    throw new Error("Value is not a Node-like object");
  }
}

export function isArrayOfNodes(value: unknown): value is Node[] {
  return Array.isArray(value) && value.every(isNodeLike);
}

export function assertIsArrayOfNodes(value: unknown): void {
  if (!isArrayOfNodes(value)) {
    throw new Error("Value is not an array of Nodes");
  }
}

export function isNodeOfType(type: number, value: unknown): value is Node {
  return isNodeLike(value) && value.nodeType === type;
}

export function assertIsNodeOfType(type: number, value: unknown): void {
  const typeName = Object.keys(NodeTypes).find((key) => NodeTypes[key] === type);
  if (!isNodeOfType(type, value)) {
    throw new Error(`Value is not of type ${typeName}`);
  }
}

export const isElementNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.ELEMENT_NODE, value);
export const isAttributeNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.ATTRIBUTE_NODE, value);
export const isTextNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.TEXT_NODE, value);
export const isCDATASectionNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.CDATA_SECTION_NODE, value);
export const isProcessingInstructionNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE, value);
export const isCommentNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.COMMENT_NODE, value);
export const isDocumentNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.DOCUMENT_NODE, value);
export const isDocumentTypeNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE, value);
export const isDocumentFragmentNode = (value: unknown): value is Node =>
  isNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE, value);

export const assertIsElementNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.ELEMENT_NODE, value);
export const assertIsAttributeNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.ATTRIBUTE_NODE, value);
export const assertIsTextNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.TEXT_NODE, value);
export const assertIsCDATASectionNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.CDATA_SECTION_NODE, value);
export const assertIsProcessingInstructionNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE, value);
export const assertIsCommentNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.COMMENT_NODE, value);
export const assertIsDocumentNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.DOCUMENT_NODE, value);
export const assertIsDocumentTypeNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE, value);
export const assertIsDocumentFragmentNode = (value: unknown): void =>
  assertIsNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE, value);
