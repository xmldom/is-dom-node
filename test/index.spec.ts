import * as isDomNode from "../src/index";
import assert from "assert";
import { DOMParser } from "@xmldom/xmldom";

const parser = new DOMParser();

const parseXml = (xml: string, mimeType = "text/xml") => parser.parseFromString(xml, mimeType);

describe("Node type tests", () => {
  it("should correctly identify a Node of type Element", () => {
    const doc = parseXml("<book />");
    const element = doc.createElement("characters");

    assert.ok(isDomNode.isNodeLike(element));
    assert.ok(isDomNode.isElementNode(element));
    assert.ok(!isDomNode.isAttributeNode(doc));

    isDomNode.assertIsElementNode(element);
    assert.throws(
      () => isDomNode.assertIsAttributeNode(element),
      /Value is not of type ATTRIBUTE_NODE/,
    );
  });

  it("should correctly identify a Node of type Attribute", () => {
    const doc = parseXml("<book />");
    const attribute = doc.createAttribute("name");

    assert.ok(isDomNode.isNodeLike(attribute));
    assert.ok(isDomNode.isAttributeNode(attribute));
    assert.ok(!isDomNode.isTextNode(attribute));

    isDomNode.assertIsAttributeNode(attribute);
    assert.throws(() => isDomNode.assertIsTextNode(attribute), /Value is not of type TEXT_NODE/);
  });

  it("should correctly identify a Node of type Text", () => {
    const doc = parseXml("<book />");
    const text = doc.createTextNode("Harry Potter");

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
    const doc = parseXml("<book />");
    const cdata = doc.createCDATASection("Harry Potter");

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
    const doc = parseXml("<book />");
    const pi = doc.createProcessingInstruction(
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
    const doc = parseXml("<book />");
    const comment = doc.createComment("Harry Potter");

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
    const doc = parseXml("<book />");

    assert.ok(isDomNode.isNodeLike(doc));
    assert.ok(isDomNode.isDocumentNode(doc));
    assert.ok(!isDomNode.isDocumentTypeNode(doc));

    isDomNode.assertIsDocumentNode(doc);
    assert.throws(
      () => isDomNode.assertIsDocumentTypeNode(doc),
      /Value is not of type DOCUMENT_TYPE_NODE/,
    );
  });

  it("should correctly identify a Node of type DocumentType", () => {
    const doc = parseXml("<book />");
    const docType = doc.implementation.createDocumentType("book", "", "");

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
    const doc = parseXml("<book />");
    const fragment = doc.createDocumentFragment();

    assert.ok(isDomNode.isNodeLike(fragment));
    assert.ok(isDomNode.isDocumentFragmentNode(fragment));
    assert.ok(!isDomNode.isElementNode(fragment));

    isDomNode.assertIsDocumentFragmentNode(fragment);
    assert.throws(
      () => isDomNode.assertIsElementNode(fragment),
      /Value is not of type ELEMENT_NODE/,
    );
  });

  it("should not identify a string as a Node", () => {
    assert.ok(!isDomNode.isNodeLike("Harry Potter"));

    assert.throws(
      () => isDomNode.assertIsNodeLike("Harry Potter"),
      /Value is not a Node-like object/,
    );
  });

  it("should not identify a number as a Node", () => {
    assert.ok(!isDomNode.isNodeLike(45));

    assert.throws(() => isDomNode.assertIsNodeLike(45), /Value is not a Node-like object/);
  });

  it("should not identify a boolean as a Node", () => {
    assert.ok(!isDomNode.isNodeLike(true));

    assert.throws(() => isDomNode.assertIsNodeLike(true), /Value is not a Node-like object/);
  });

  it("should not identify null as a Node", () => {
    assert.ok(!isDomNode.isNodeLike(null));

    assert.throws(() => isDomNode.assertIsNodeLike(null), /Value is not a Node-like object/);
  });

  it("should not identify undefined as a Node", () => {
    assert.ok(!isDomNode.isNodeLike(undefined));

    assert.throws(() => isDomNode.assertIsNodeLike(undefined), /Value is not a Node-like object/);
  });

  it("should not identify an array as a Node", () => {
    assert.ok(!isDomNode.isNodeLike([]));

    assert.throws(() => isDomNode.assertIsNodeLike([]), /Value is not a Node-like object/);
  });

  it("should identify an array of Nodes as such", () => {
    const doc = parseXml("<book />");
    const fragment = doc.createDocumentFragment();
    const nodes = [doc, fragment];

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
    const doc = parseXml("<book />");
    const fragment = doc.createDocumentFragment();
    const nodes = [doc, fragment, "Harry Potter"];

    assert.ok(!isDomNode.isArrayOfNodes(nodes));
    assert.ok(!isDomNode.isNodeLike(nodes));

    assert.throws(() => isDomNode.assertIsArrayOfNodes(nodes), /Value is not an array of Nodes/);
    assert.throws(() => isDomNode.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });
});
