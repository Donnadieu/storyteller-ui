import Provider, { StoryBuilderContext as Context } from './Provider'
import Drawer from './SwipeableDrawer'
import Status from './Status'
import { useContext } from 'react'

// export { default as Provider, StoryBuilderContext as Context } from './Provider'
export { default as Drawer } from './SwipeableDrawer'
export { default as Status } from './Status'

const StoryBuilderAPI = {
  Provider,
  Context,
  Drawer,
  Status,
  useContext: () => useContext(Context)
}

export default StoryBuilderAPI
