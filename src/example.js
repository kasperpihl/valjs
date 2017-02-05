import val, { bool, string, number, array, object, any, date, func, funcWrap } from './index';

const deleteGoal = funcWrap([
  string.require()
], (err, id) => {
  if(!err){
    console.log('deleting: ' + id);
  }
});
console.log('test begun');
console.log('error', array.of(string).test(null));
console.log('test end');
// T_TODO: This should return null


const addGoal = funcWrap([object.as({
  id: string.require(),
  title: string.require()
})], (err, goal) => {
  if(!err){
    return 'returning some value'
  }
});

const addGoal2 = () => {
  console.log(addGoal({id: 'id1', 'title': 'hello'}));
}

addGoal2();
deleteGoal('id1');
