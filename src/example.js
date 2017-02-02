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
    return 'returning some value'
  }
});

const addGoal2 = () => {
  console.log(addGoal({id: 'id1', 'title': 'hello'}));
}

addGoal2();
deleteGoal('id1');
