import _ from 'lodash';
import './style.css';
import Icon from './icon.jpg'
import printMe from './print.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// dynamic loading
import(/* webpackChunkName: "immutable" */ 'immutable').then(function(Immutable) {
  console.log('import immutable!!!');
  const map = Immutable.fromJS({'a':1, 'b':2});
  console.log(map);
}).catch(e => console.log('immutable error', e));

function component() {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
};

// document.body.appendChild(component());
let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}