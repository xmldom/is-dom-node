export enum NodeTypes {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
}

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

export function assertIsNodeLike(value: unknown): asserts value is Node {
  if (!isNodeLike(value)) {
    throw new Error(`Value is not a Node-like object. Received: ${value}`);
  }
}

export function isArrayOfNodes(value: unknown): value is Node[] {
  return Array.isArray(value) && value.every(isNodeLike);
}

export function assertIsArrayOfNodes(value: unknown): asserts value is Node[] {
  if (!isArrayOfNodes(value)) {
    throw new Error("Value is not an array of Nodes");
  }
}

function isNodeOfType(type: number, value: unknown): value is Node {
  return isNodeLike(value) && value.nodeType === type;
}

function assertIsNodeOfType(type: number, value: unknown): void {
  const typeName = Object.keys(NodeTypes).find(
    (key) => NodeTypes[key as keyof typeof NodeTypes] === type,
  );
  if (!isNodeOfType(type, value)) {
    throw new Error(`Value is not of type ${typeName}`);
  }
}

export const isElementNode = (value: unknown): value is Element =>
  isNodeOfType(NodeTypes.ELEMENT_NODE, value);
export const isAttributeNode = (value: unknown): value is Attr =>
  isNodeOfType(NodeTypes.ATTRIBUTE_NODE, value);
export const isTextNode = (value: unknown): value is Text =>
  isNodeOfType(NodeTypes.TEXT_NODE, value);
export const isCDATASectionNode = (value: unknown): value is CDATASection =>
  isNodeOfType(NodeTypes.CDATA_SECTION_NODE, value);
export const isProcessingInstructionNode = (value: unknown): value is ProcessingInstruction =>
  isNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE, value);
export const isCommentNode = (value: unknown): value is Comment =>
  isNodeOfType(NodeTypes.COMMENT_NODE, value);
export const isDocumentNode = (value: unknown): value is Document =>
  isNodeOfType(NodeTypes.DOCUMENT_NODE, value);
export const isDocumentTypeNode = (value: unknown): value is DocumentType =>
  isNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE, value);
export const isDocumentFragmentNode = (value: unknown): value is DocumentFragment =>
  isNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE, value);

export const assertIsElementNode: (value: unknown) => asserts value is Element = (
  value: unknown,
): asserts value is Element => {
  assertIsNodeOfType(NodeTypes.ELEMENT_NODE, value);
};
export const assertIsAttributeNode: (value: unknown) => asserts value is Attr = (value) =>
  assertIsNodeOfType(NodeTypes.ATTRIBUTE_NODE, value);

export const assertIsTextNode: (value: unknown) => asserts value is Text = (value) =>
  assertIsNodeOfType(NodeTypes.TEXT_NODE, value);

export const assertIsCDATASectionNode: (value: unknown) => asserts value is CDATASection = (
  value,
) => assertIsNodeOfType(NodeTypes.CDATA_SECTION_NODE, value);

export const assertIsProcessingInstructionNode: (
  value: unknown,
) => asserts value is ProcessingInstruction = (value) =>
  assertIsNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE, value);

export const assertIsCommentNode: (value: unknown) => asserts value is Comment = (value) =>
  assertIsNodeOfType(NodeTypes.COMMENT_NODE, value);

export const assertIsDocumentNode: (value: unknown) => asserts value is Document = (value) =>
  assertIsNodeOfType(NodeTypes.DOCUMENT_NODE, value);

export const assertIsDocumentTypeNode: (value: unknown) => asserts value is DocumentType = (
  value,
) => assertIsNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE, value);

export const assertIsDocumentFragmentNode: (value: unknown) => asserts value is DocumentFragment = (
  value,
) => assertIsNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE, value);
