export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    console.log(102, 'loadState()', JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    setTimeout(()=> {
      // localStorage.setItem('state', serializedState);
      console.log(103, 'saveState()', state);
    }, 0);
  } catch (err) {
    // Ignore write errors.
  }
};