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