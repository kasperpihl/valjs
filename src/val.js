import {
  getType,
  isValHandler,
  run,
} from './util';


const globalOptions = {
  resolveOnly: false,
  runCondition: () => true,
  log: false,
};

// ======================================================
// Main function - this is run by the user
// ======================================================
export default function val(obj, valHandler, options) {
  const mergedOptions = Object.assign({}, globalOptions, options);
  // Checking if run condition is set.
  if (!mergedOptions.runCondition()) {
    return null;
  }

  let error;
  if (isValHandler(valHandler)) {
    error = valHandler.nested('', obj);
  } else {
    console.warn('valjs: invalid valHandler provided');
  }
  if(error){
    let prefix = 'Invalid';
    if(typeof error === 'object'){
      const type = getType(obj);
      if(error.key.length){
        error = `${prefix} ${type}${error.key}: ${error.error}`;
      }
      else{
        error = `${prefix}: ${error.error}`;
      }
    }
    else{
      error = `${prefix}: ${error}`;
    }
  }
  if(mergedOptions.log){
    console.log(error || 'passed');
  }

  return error || null;
}

// Support for setting global options.
val.setGlobal = (key, value) => {
  globalOptions[key] = value;
};
