import * as isDomNode from "../src/index";
import assert from "assert";
import { JSDOM } from "jsdom";

const { window } = new JSDOM();
const { document } = window;

describe("Node type tests with jsdom", () => {
  it("should correctly identify a Node of type Element", () => {
    const element = document.createElement("characters");

    assert.ok(isDomNode.isNodeLike(element));
    assert.ok(isDomNode.isElementNode(element));
    assert.ok(!isDomNode.isAttributeNode(element));

    isDomNode.assertIsElementNode(element);
    assert.throws(
      () => isDomNode.assertIsAttributeNode(element),
      /Value is not of type ATTRIBUTE_NODE/,
    );
  });

  it("should correctly identify a Node of type Attribute", () => {
    const attribute = document.createAttribute("name");

    assert.ok(isDomNode.isNodeLike(attribute));
    assert.ok(isDomNode.isAttributeNode(attribute));
    assert.ok(!isDomNode.isTextNode(attribute));

    isDomNode.assertIsAttributeNode(attribute);
    assert.throws(() => isDomNode.assertIsTextNode(attribute), /Value is not of type TEXT_NODE/);
  });

  it("should correctly identify a Node of type Text", () => {
    const text = document.createTextNode("Harry Potter");

    assert.ok(isDomNode.isNodeLike(text));
    assert.ok(isDomNode.isTextNode(text));
    assert.ok(!isDomNode.isCDATASectionNode(text));

    isDomNode.assertIsTextNode(text);
    assert.throws(
      () => isDomNode.assertIsCDATASectionNode(text),
      /Value is not of type CDATA_SECTION_NODE/,
    );
  });

  it("should correctly identify a Node of type CDATASection", () => {
    const dom = new JSDOM('<html />', { contentType: "application/xml" });
    const document = dom.window.document;
    const cdata = document.createCDATASection("Harry Potter");

    assert.ok(isDomNode.isNodeLike(cdata));
    assert.ok(isDomNode.isCDATASectionNode(cdata));
    assert.ok(!isDomNode.isProcessingInstructionNode(cdata));

    isDomNode.assertIsCDATASectionNode(cdata);
    assert.throws(
      () => isDomNode.assertIsProcessingInstructionNode(cdata),
      /Value is not of type PROCESSING_INSTRUCTION_NODE/,
    );
  });

  it("should correctly identify a Node of type ProcessingInstruction", () => {
    const pi = document.createProcessingInstruction(
      "xml-stylesheet",
      'href="mycss.css" type="text/css"',
    );

    assert.ok(isDomNode.isNodeLike(pi));
    assert.ok(isDomNode.isProcessingInstructionNode(pi));
    assert.ok(!isDomNode.isCommentNode(pi));

    isDomNode.assertIsProcessingInstructionNode(pi);
    assert.throws(() => isDomNode.assertIsCommentNode(pi), /Value is not of type COMMENT_NODE/);
  });

  it("should correctly identify a Node of type Comment", () => {
    const comment = document.createComment("Harry Potter");

    assert.ok(isDomNode.isNodeLike(comment));
    assert.ok(isDomNode.isCommentNode(comment));
    assert.ok(!isDomNode.isDocumentNode(comment));

    isDomNode.assertIsCommentNode(comment);
    assert.throws(
      () => isDomNode.assertIsDocumentNode(comment),
      /Value is not of type DOCUMENT_NODE/,
    );
  });

  it("should correctly identify a Node of type Document", () => {
    assert.ok(isDomNode.isNodeLike(document));
    assert.ok(isDomNode.isDocumentNode(document));
    assert.ok(!isDomNode.isDocumentTypeNode(document));

    isDomNode.assertIsDocumentNode(document);
    assert.throws(
      () => isDomNode.assertIsDocumentTypeNode(document),
      /Value is not of type DOCUMENT_TYPE_NODE/,
    );
  });

  it("should correctly identify a Node of type DocumentType", () => {
    const docType = document.implementation.createDocumentType("book", "", "");

    assert.ok(isDomNode.isNodeLike(docType));
    assert.ok(isDomNode.isDocumentTypeNode(docType));
    assert.ok(!isDomNode.isDocumentFragmentNode(docType));

    isDomNode.assertIsDocumentTypeNode(docType);
    assert.throws(
      () => isDomNode.assertIsDocumentFragmentNode(docType),
      /Value is not of type DOCUMENT_FRAGMENT_NODE/,
    );
  });

  it("should correctly identify a Node of type DocumentFragment", () => {
    const fragment = document.createDocumentFragment();

    assert.ok(isDomNode.isNodeLike(fragment));
    assert.ok(isDomNode.isDocumentFragmentNode(fragment));
    assert.ok(!isDomNode.isElementNode(fragment));

    isDomNode.assertIsDocumentFragmentNode(fragment);
    assert.throws(
      () => isDomNode.assertIsElementNode(fragment),
      /Value is not of type ELEMENT_NODE/,
    );
  });

  it("should identify an array of Nodes as such", () => {
    const fragment = document.createDocumentFragment();
    const nodes = [document, fragment];

    assert.ok(isDomNode.isArrayOfNodes(nodes));
    assert.ok(!isDomNode.isNodeLike(nodes));

    isDomNode.assertIsArrayOfNodes(nodes);
    assert.throws(() => isDomNode.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });

  it("should not identify an array of non-Nodes as an array of Nodes", () => {
    const nodes = ["Harry Potter", 45];

    assert.ok(!isDomNode.isArrayOfNodes(nodes));
    assert.ok(!isDomNode.isNodeLike(nodes));

    assert.throws(() => isDomNode.assertIsArrayOfNodes(nodes), /Value is not an array of Nodes/);
    assert.throws(() => isDomNode.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });

  it("should not identify an array of mixed Nodes and non-Nodes as an array of Nodes", () => {
    const fragment = document.createDocumentFragment();
    const nodes = [document, fragment, "Harry Potter"];

    assert.ok(!isDomNode.isArrayOfNodes(nodes));
    assert.ok(!isDomNode.isNodeLike(nodes));

    assert.throws(() => isDomNode.assertIsArrayOfNodes(nodes), /Value is not an array of Nodes/);
    assert.throws(() => isDomNode.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });
});
