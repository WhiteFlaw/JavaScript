class Data {
    _createWorld() {
        this.worldList = [1, 2, 3];
    }
    peek() {
        console.log(this.worldList);
    }
}

const data = new Data();
data._createWorld();
data.peek();