import {atom} from 'recoil'

//Learn more
//(https://recoiljs.org/docs/basic-tutorial/atoms)

//Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item.

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '6HYFCImVRJ56jGx5T7gbzJ',
})
export const playlistState = atom({
  key: 'playlistState',
  default: null,
})
