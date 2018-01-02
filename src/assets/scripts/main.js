import { $query } from './components/variables'
import Test from './components/test'
import logger from './components/log'
import { blocker } from './components/log'

const test = new Test(0, 0, 0)
test.test()
logger($query)
blocker()