import Rete from 'rete';

import { datasetSocket } from './sockets';
import DatasetControl from './DatasetControl';

export default class DatasetComponent extends Rete.Component {
  constructor(datasetName) {
    super('Dataset - ' + datasetName);
  }

  builder(node) {
    var inp1 = new Rete.Input('dataset', 'Dataset', datasetSocket);
    var out = new Rete.Output('focusdata', 'Focus Data', datasetSocket);

    inp1.addControl(new DatasetControl(this.editor, 'dataset'));

    return node
      .addInput(inp1)
      .addControl(new DatasetControl(this.editor, 'preview', true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    outputs['focusdata'] = { data: 'test' };
  }
}
