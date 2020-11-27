<template>
  <div class="editor">
    <div id="rete"></div>
  </div>
</template>

<script>
import Rete from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import AreaPlugin from 'rete-area-plugin';
import HistoryPlugin from 'rete-history-plugin';
import CommentPlugin from 'rete-comment-plugin';
import ConnectionMasteryPlugin from 'rete-connection-mastery-plugin';

import AddComponent from './AddComponent';
import NumComponent from './NumComponent';
import DatasetComponent from './DatasetComponent';


export default {
  name: 'ChartEditor',
  props: {
    msg: String,
  },
  data() {
    return {
      ConnectionPlugin,
      VueRenderPlugin,
      ContextMenuPlugin,
      AreaPlugin,
      CommentPlugin,
      HistoryPlugin,
      ConnectionMasteryPlugin,
    };
  },
  async mounted() {
    var container = document.querySelector('#rete');
    var components = [new NumComponent(), new AddComponent(), new DatasetComponent('Daily Summary')];
    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin);
    editor.use(HistoryPlugin);
    editor.use(ConnectionMasteryPlugin);

    var engine = new Rete.Engine('demo@0.1.0');

    components.map((c) => {
      editor.register(c);
      engine.register(c);
    });

    var n1 = await components[0].createNode({ num: 2 });
    var n2 = await components[0].createNode({ num: 0 });
    var add = await components[1].createNode();
    var dataset = await components[2].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];
    dataset.position = [80, 600]

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);
    editor.addNode(dataset);

    editor.connect(n1.outputs.get('num'), add.inputs.get('num'));
    editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));

    editor.on(
      'process nodecreated noderemoved connectioncreated connectionremoved',
      async () => {
        console.log('process');
        await engine.abort();
        await engine.process(editor.toJSON());
      }
    );

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.editor {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#rete {
  flex-grow: 1;
}

.node .control input,
.node .input-control input {
  width: 140px;
}
select,
input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>
