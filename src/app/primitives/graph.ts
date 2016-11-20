export class Node<T> {
  id: string | number;
  data: T;
}

export enum EdgeType {
  Combines,
  Suppresses,
  IsSuppressed
}

export class Graph<T> {
  private _nodes: { [key: string]: Node<T> } = {};
  private _edges: { [key: string]: EdgeType } = {};

  private _edgeId(nodeId1: string, nodeId2: string) {
    return `${nodeId1}->${nodeId2}`;
  }

  addNode(node: Node<T>) {
    if (this._nodes[node.id.toString()]) {
      return false;
    }

    this._nodes[node.id.toString()] = node;
    return true;
  }

  getNodeById(id: string | number): Node<T> | void {
    return this._nodes[id.toString()] || null;
  }

  addBiEdge(node1: Node<T>, node2: Node<T>, type: EdgeType) {
    this.addEdge(node1, node2, type);
    this.addEdge(node2, node1, type);
  }

  addEdge(node1: Node<T>, node2: Node<T>, type: EdgeType) {
    this._edges[this._edgeId(node1.id.toString(), node2.id.toString())] = type;
  }

  edgeExists(node1: Node<T>, node2: Node<T>): boolean {
    return !!this._edges[this._edgeId(node1.id.toString(), node2.id.toString())];
  }

  // Algorithms

  private _isClique(nodeList: Node<T>[]) {
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        if (!this.edgeExists(nodeList[i], nodeList[j]) || !this.edgeExists(nodeList[j], nodeList[i])) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Add new node to list checking if node can be added, 
   * if there are any nodes to be excluded after current node is added.
   */
  tryAddAllowedNode(nodeList: Node<T>[], node: Node<T>) {
    let newNodeList = [node].concat(nodeList);
    if (!this._isClique(newNodeList)) {
      throw new Error('Node list is not a valid clique of this graph after addition of new node');
    }

    // remove suppressed nodes
    let nodesToRemove = [];
    for (let i = 0; i < newNodeList.length; i++) {
      for (let j = i + 1; j < newNodeList.length; j++) {
        switch (this._edges[this._edgeId(newNodeList[i].id.toString(), newNodeList[j].id.toString())]) {
          case EdgeType.Suppresses:
            nodesToRemove.push(newNodeList[j]);
            break;
          case EdgeType.IsSuppressed:
            nodesToRemove.push(newNodeList[i]);
            break;
          case EdgeType.Combines:
          default: ;
        }
      }
    }

    if (nodesToRemove.length === 0) {
      return newNodeList;
    }

    let finalNodeList = [];
    for (let node of newNodeList) {
      if (nodesToRemove.indexOf(node) === -1) {
        finalNodeList.push(node);
      }
    }

    return finalNodeList;
  }

  /**
   * Get list of nodes that make clique with current node list.
   * "Allowed" nodes are not required to make clique with each other - that should be checked separately.
   */
  public getAllowedNodes(nodeList: Node<T>[]) {
    // 1) Check that node list is clique
    if (!this._isClique(nodeList)) {
      throw new Error('Node list is not a valid clique of this graph');
    }

    // 2) Make list of nodes to check
    let nodesToCheck: Node<T>[] = [];
    let nodeListById: { [key: string]: Node<T> } = {};
    for (let node of nodeList) {
      nodeListById[node.id.toString()] = node;
    }
    for (let node in this._nodes) {
      if (!nodeListById[this._nodes[node].id.toString()]) {
        nodesToCheck.push(this._nodes[node]);
      }
    }

    // 3) Get all nodes that are connected to all nodes from list
    let allowedNodes: Node<T>[] = [];
    for (let node of nodesToCheck) {
      if (this._isClique([node].concat(nodeList))) {
        allowedNodes.push(node);
      }
    }

    return allowedNodes;
  }
}