import isEqual from 'lodash/isEqual';

let instance = null;

class DataProvider {
  constructor() {
    if (!instance) {
      instance = this;
      this.counter = 0;
      this.eventMap = {};
    }
    return instance;
  }

  /** addDataList(lst) {
    lst.map(itm => {
      let val = Object.values(itm);
      val = val && val[0];
      if (val && !this.eventMap[val]) {
        this.eventMap[val] = { cbs: {} };
      }
      return null;
    });
  } */

  addDataList(lst) {
    lst.map(itm => {
      if (!this.eventMap[itm]) {
        this.eventMap[itm] = { cbs: {} };
      }
      return null;
    });
  }

  addDataListener(event, callback) { // return id for remove
    if (this.eventMap[event]) {
      this.eventMap[event].cbs[this.counter] = callback;
      return this.counter++;
    } 
    console.error(`Error: event ${event} not defined!`);
    return -1;
  }

  removeDataListener(event, id) {
    if (this.eventMap[event]) {
      delete this.eventMap[event].cbs[id];
    }
  }

  getData(event) {
    if (this.eventMap[event]) {
      return this.eventMap[event].data;
    }
    console.error(`Error: getData ${event} got empty!`);
    return null;
  }

  setData(event, data) {
    if (this.eventMap[event] && !isEqual(data, this.eventMap[event].data)) {
      this.eventMap[event].data = data;
      Object.values(this.eventMap[event].cbs).map(itm => {
        setTimeout(() => {
          try {
            itm(event, data);
          } catch (error) {
            console.error(error);
          }
        });
        return null;
      });
    }
  }
}

const inst = new DataProvider();
export default inst;
