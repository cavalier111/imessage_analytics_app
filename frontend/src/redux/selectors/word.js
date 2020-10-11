export const getFrequencyListState = store => store.frequencyList

export const getFrequencyList = store =>
  getFrequencyListState(store) ? getFrequencyListState(store) : []

// export const getTodoById = (store, id) =>
//   getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {}

// export const getTodos = store =>
//   getTodoList(store).map(id => getTodoById(store, id))