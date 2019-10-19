const logger = (store) => (next) => (action) => {
    //show any time when a new action is dispatcj
    //and what new state look like after dispatch
    console.group(action.type)
        console.log('the action: ', action)
        const returnValue = next(action)
        console.log('the new state: ', store.getState())
    console.groupEnd()
    return returnValue
}

export default logger