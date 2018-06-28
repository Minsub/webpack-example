export default function printMe() {
  console.log('Updating print.js...');
  // ERROR CODE
  // cosnole.log('I get called from print.js!');

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(e => console.error('Something Wrong', e));
}