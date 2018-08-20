import dataProvider from './dataProvider';

const dataComponent = eventlist => wrapped => class DataCompontHOC extends wrapped {
  componentWillMount() {
    this._dataComponentEventIDs = eventlist.map(event => {
      this.onDataChange(event, dataProvider.getData(event));
      return { event, id: dataProvider.addDataListener(event, this.onDataChange.bind(this)) };
    });
    if (super.componentWillMount) super.componentWillMount();
  }

  componentWillUnmount() {
    this._dataComponentEventIDs.map(itm => dataProvider.removeDataListener(itm.event, itm.id));
    if (super.componentWillUnmount) super.componentWillUnmount();
  }
};

export default dataComponent;