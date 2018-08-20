# datasystem
=========

A small library that you can share data and receive notification when data change. It's easier compared to redux.

## Installation

  `npm install datasystem`

## Usage
    import { dataProvider } from 'datasystem';

    // first, add all data you need to share
    dataProvider.addDataList(['test1', 'test2', ...]);

    // then you may give your data some init values, or somewhere you want to change your data value, call setData function
    dataProvider.setData('test1', somedata);
    dataProvider.setData('test2', somedata);
    ...

    // somewhere you want to get the latest value of your instrested data, you call addDataListener. Whenever the data changed, your callback will be called.
    // this function will return an id, so that you can unsubscribe data by calling removeDataListener, after this you will not receive data change message.
    // for this example, whenever 'test1' changed after calling dataProvider.setData, callback will be called
    const removeid = dataProvider.addDataListener('test1', (event, data) => {
       if (event === 'test1') {
           // do some work here
       }
    });

    // unsubscribe data by calling removeDataListener
    dataProvider.removeDataListener('test1', removeid);

  
for react, using dataComponent will be more straightforward. Just call dataProvider.addDataList to add all data need to share, then

    import { dataProvider } from 'datasystem';

    // pass all your insterested data to dataComponent
    @dataComponent(['test1'])
    class SomeClass extends React.Component {
    // add a callback named onDataChange, so in this example, whenever 'test1' changed, this onDataChange will be called
    onDataChange(event, data) {
      if (event === 'test1') {
        // do some work here
      }
    }

after that you call dataProvider.setData('test1', somedata), and onDataChange would be hit.