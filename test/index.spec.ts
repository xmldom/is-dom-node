import * as is_dom_node from "../src/index";
import assert from "assert";
import { DOMParser as dom } from "@xmldom/xmldom";

const parser = new dom();

const parseXml = (xml: string, mimeType = "text/xml") => parser.parseFromString(xml, mimeType);

describe("Node type tests", () => {
  it("should correctly identify a Node of type Element", () => {
    const doc = parseXml("<book />");
    const element = doc.createElement("characters");

    assert.ok(is_dom_node.isNodeLike(element));
    assert.ok(is_dom_node.isElementNode(element));
    assert.ok(!is_dom_node.isAttributeNode(doc));

    is_dom_node.assertIsElementNode(element);
    assert.throws(
      () => is_dom_node.assertIsAttributeNode(element),
      /Value is not of type ATTRIBUTE_NODE/,
    );
  });

  it("should correctly identify a Node of type Attribute", () => {
    const doc = parseXml("<book />");
    const attribute = doc.createAttribute("name");

    assert.ok(is_dom_node.isNodeLike(attribute));
    assert.ok(is_dom_node.isAttributeNode(attribute));
    assert.ok(!is_dom_node.isTextNode(attribute));

    is_dom_node.assertIsAttributeNode(attribute);
    assert.throws(() => is_dom_node.assertIsTextNode(attribute), /Value is not of type TEXT_NODE/);
  });

  it("should correctly identify a Node of type Text", () => {
    const doc = parseXml("<book />");
    const text = doc.createTextNode("Harry Potter");

    assert.ok(is_dom_node.isNodeLike(text));
    assert.ok(is_dom_node.isTextNode(text));
    assert.ok(!is_dom_node.isCDATASectionNode(text));

    is_dom_node.assertIsTextNode(text);
    assert.throws(
      () => is_dom_node.assertIsCDATASectionNode(text),
      /Value is not of type CDATA_SECTION_NODE/,
    );
  });

  it("should correctly identify a Node of type CDATASection", () => {
    const doc = parseXml("<book />");
    const cdata = doc.createCDATASection("Harry Potter");

    assert.ok(is_dom_node.isNodeLike(cdata));
    assert.ok(is_dom_node.isCDATASectionNode(cdata));
    assert.ok(!is_dom_node.isProcessingInstructionNode(cdata));

    is_dom_node.assertIsCDATASectionNode(cdata);
    assert.throws(
      () => is_dom_node.assertIsProcessingInstructionNode(cdata),
      /Value is not of type PROCESSING_INSTRUCTION_NODE/,
    );
  });

  it("should correctly identify a Node of type ProcessingInstruction", () => {
    const doc = parseXml("<book />");
    const pi = doc.createProcessingInstruction("xml-stylesheet", 'href="mycss.css" type="text/css"');

    assert.ok(is_dom_node.isNodeLike(pi));
    assert.ok(is_dom_node.isProcessingInstructionNode(pi));
    assert.ok(!is_dom_node.isCommentNode(pi));

    is_dom_node.assertIsProcessingInstructionNode(pi);
    assert.throws(() => is_dom_node.assertIsCommentNode(pi), /Value is not of type COMMENT_NODE/);
  });

  it("should correctly identify a Node of type Comment", () => {
    const doc = parseXml("<book />");
    const comment = doc.createComment("Harry Potter");

    assert.ok(is_dom_node.isNodeLike(comment));
    assert.ok(is_dom_node.isCommentNode(comment));
    assert.ok(!is_dom_node.isDocumentNode(comment));

    is_dom_node.assertIsCommentNode(comment);
    assert.throws(
      () => is_dom_node.assertIsDocumentNode(comment),
      /Value is not of type DOCUMENT_NODE/,
    );
  });

  it("should correctly identify a Node of type Document", () => {
    const doc = parseXml("<book />");

    assert.ok(is_dom_node.isNodeLike(doc));
    assert.ok(is_dom_node.isDocumentNode(doc));
    assert.ok(!is_dom_node.isDocumentTypeNode(doc));

    is_dom_node.assertIsDocumentNode(doc);
    assert.throws(
      () => is_dom_node.assertIsDocumentTypeNode(doc),
      /Value is not of type DOCUMENT_TYPE_NODE/,
    );
  });

  it("should correctly identify a Node of type DocumentType", () => {
    const doc = parseXml("<book />");
    const docType = doc.implementation.createDocumentType("book", "", "");

    assert.ok(is_dom_node.isNodeLike(docType));
    assert.ok(is_dom_node.isDocumentTypeNode(docType));
    assert.ok(!is_dom_node.isDocumentFragmentNode(docType));

    is_dom_node.assertIsDocumentTypeNode(docType);
    assert.throws(
      () => is_dom_node.assertIsDocumentFragmentNode(docType),
      /Value is not of type DOCUMENT_FRAGMENT_NODE/,
    );
  });

  it("should correctly identify a Node of type DocumentFragment", () => {
    const doc = parseXml("<book />");
    const fragment = doc.createDocumentFragment();

    assert.ok(is_dom_node.isNodeLike(fragment));
    assert.ok(is_dom_node.isDocumentFragmentNode(fragment));
    assert.ok(!is_dom_node.isElementNode(fragment));

    is_dom_node.assertIsDocumentFragmentNode(fragment);
    assert.throws(
      () => is_dom_node.assertIsElementNode(fragment),
      /Value is not of type ELEMENT_NODE/,
    );
  });

  it("should not identify a string as a Node", () => {
    assert.ok(!is_dom_node.isNodeLike("Harry Potter"));

    assert.throws(
      () => is_dom_node.assertIsNodeLike("Harry Potter"),
      /Value is not a Node-like object/,
    );
  });

  it("should not identify a number as a Node", () => {
    assert.ok(!is_dom_node.isNodeLike(45));

    assert.throws(() => is_dom_node.assertIsNodeLike(45), /Value is not a Node-like object/);
  });

  it("should not identify a boolean as a Node", () => {
    assert.ok(!is_dom_node.isNodeLike(true));

    assert.throws(() => is_dom_node.assertIsNodeLike(true), /Value is not a Node-like object/);
  });

  it("should not identify null as a Node", () => {
    assert.ok(!is_dom_node.isNodeLike(null));

    assert.throws(() => is_dom_node.assertIsNodeLike(null), /Value is not a Node-like object/);
  });

  it("should not identify undefined as a Node", () => {
    assert.ok(!is_dom_node.isNodeLike(undefined));

    assert.throws(() => is_dom_node.assertIsNodeLike(undefined), /Value is not a Node-like object/);
  });

  it("should not identify an array as a Node", () => {
    assert.ok(!is_dom_node.isNodeLike([]));

    assert.throws(() => is_dom_node.assertIsNodeLike([]), /Value is not a Node-like object/);
  });

  it("should identify an array of Nodes as such", () => {
    const doc = parseXml("<book />");
    const fragment = doc.createDocumentFragment();
    const nodes = [doc, fragment];

    assert.ok(is_dom_node.isArrayOfNodes(nodes));
    assert.ok(!is_dom_node.isNodeLike(nodes));

    is_dom_node.assertIsArrayOfNodes(nodes);
    assert.throws(() => is_dom_node.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });

  it("should not identify an array of non-Nodes as an array of Nodes", () => {
    const nodes = ["Harry Potter", 45];

    assert.ok(!is_dom_node.isArrayOfNodes(nodes));
    assert.ok(!is_dom_node.isNodeLike(nodes));

    assert.throws(() => is_dom_node.assertIsArrayOfNodes(nodes), /Value is not an array of Nodes/);
    assert.throws(() => is_dom_node.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });

  it("should not identify an array of mixed Nodes and non-Nodes as an array of Nodes", () => {
    const doc = parseXml("<book />");
    const fragment = doc.createDocumentFragment();
    const nodes = [doc, fragment, "Harry Potter"];

    assert.ok(!is_dom_node.isArrayOfNodes(nodes));
    assert.ok(!is_dom_node.isNodeLike(nodes));

    assert.throws(() => is_dom_node.assertIsArrayOfNodes(nodes), /Value is not an array of Nodes/);
    assert.throws(() => is_dom_node.assertIsNodeLike(nodes), /Value is not a Node-like object/);
  });
});
