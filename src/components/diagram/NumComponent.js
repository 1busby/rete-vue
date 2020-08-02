import Rete from 'rete';
import { numSocket } from './sockets';

import NumControl from './NumControl';

export default class NumComponent extends Rete.Component {
  constructor() {
    super('Number');
  }

  builder(node) {
    var out1 = new Rete.Output('num', 'Number', numSocket);

    return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs['num'] = node.data.num;
  }
}