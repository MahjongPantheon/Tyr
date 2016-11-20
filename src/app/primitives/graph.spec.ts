/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Node, EdgeType, Graph } from './graph';

describe('Graph module', () => {
  it('should create the graph', async(() => {
    let graph = new Graph<number>();
    expect(graph).toBeTruthy();
  }));

  it('should add nodes to graph', async(() => {
    let graph = new Graph<number>();
    graph.addNode({ id: 'foo', data: 123 });
    graph.addNode({ id: 'bar', data: 321 });

    let node = graph.getNodeById('foo');
    expect(node).toBeTruthy();
    expect(node).toEqual({ id: 'foo', data: 123 });
  }));

  it('should add edges to graph', async(() => {
    let graph = new Graph<number>();

    let node1 = { id: 'foo', data: 123 };
    let node2 = { id: 'bar', data: 321 };

    graph.addNode(node1).addNode(node2);
    graph.addBiEdge(node1, node2, EdgeType.Combines);
    expect(graph.edgeExists(node1, node2)).toBeTruthy();
  }));
});
