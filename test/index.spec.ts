import * as isDomNode from "../src/index";
import assert from "assert";

describe("Assertion functions", () => {
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
});
