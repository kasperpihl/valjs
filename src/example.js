import 'babel-polyfill';
import val, { bool, string, number, array, object, any, date, func, funcWrap } from './index';




const deleteGoal = funcWrap([
  string.require()
], (err, id) => {
  if(!err){
    console.log('deleting: ' + id);
  }
});

const addGoal = funcWrap([object.as({
  id: string.require(),
  title: string.require()
})], (err, goal) => {
  if(!err){
    console.log('adding', goal);
  }
});

addGoal({id: 'id1', 'title': 'hello'});
deleteGoal('id1');
