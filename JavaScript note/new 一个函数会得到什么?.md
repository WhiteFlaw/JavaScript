工作, 拿到一个three的项目, 看到里面有这个用法, 作者将一个js文件的所有内容囊括在一个函数Editor中, 最后`export {Editor}`将其导出.
然后在main.js导入, 像对待一个类那样使用了`new`并使用一个值来存储该操作的结果, 我不知道这会得到一个什么东西所以拆出来仿写了一套.

editor.js:
```JavaScript
function Editor(editorUi, wrapperUi, editorCfg, data, name = "editor") {
    this.editorCfg = editorCfg;
    this.sideview_enabled = true;
    this.editorUi = editorUi;
    this.wrapperUi = wrapperUi;
    this.container = null;
    this.name = name;
    this.run = function () {
        //this.animate();
        this.render();
        //$( "#maincanvas" ).resizable();


        this.imageContextManager.init_image_op(() => this.selected_box);

        this.add_global_obj_type();
    };

    this.hide = function () {
        this.wrapperUi.style.display = "none";
    };
    this.show = function () {
        this.wrapperUi.style.display = "block";
    };
    this.render = function () {

        this.viewManager.mainView.render();
        this.boxEditor.boxView.render();

        this.floatLabelManager.update_all_position();
        if (this.selected_box) {
            this.fastToolBox.setPos(this.floatLabelManager.getLabelEditorPos(this.selected_box.obj_local_id));
        }
    };
}

export { Editor }
```

main.js
```JavaScript
import { Editor } from './editor.js';

let editor = new Editor('参1', '参2', '参3', '参4');
console.log(editor);
```

输出结果:
```JavaScript
Editor {
  editorCfg: '参3',      
  sideview_enabled: true,
  editorUi: '参1',
  wrapperUi: '参2',
  container: null,
  name: 'editor',
  run: [Function (anonymous)],
  hide: [Function (anonymous)],
  show: [Function (anonymous)],
  render: [Function (anonymous)]
}
```
可以像使用一个类一样去使用它, new之后实例化一个对象, 具备函数内部所有的属性(必须是this.xxx属性)和方法(必须是this.xxx方法).
