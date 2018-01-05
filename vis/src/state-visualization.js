import { bindable } from 'aurelia-framework';
import vis from 'vis';

export class StateVisualization {
  @bindable() githubUsers = [];

  githubUsersChanged() {
    if (this.githubUsers.length === 0) {
      return;
    }

    const nodes = new vis.DataSet(this.githubUsers.map((user) => ({
      id: user.id,
      label: user.login
    })));

    // create an array with edges
    const edges = new vis.DataSet(this.githubUsers.slice(1).map((user, idx) => {
      return {
        from: this.githubUsers[idx].id,
        to: user.id
      };
    }));

    if (!this.network) {
      this.network = new vis.Network(this.host, { nodes, edges }, {});
    } else {
      this.network.setData({edges, nodes});
    }
  }
}
