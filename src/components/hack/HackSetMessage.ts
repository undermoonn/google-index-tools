import { useMessage } from 'naive-ui'
import { FunctionalComponent } from 'vue'

import { setMessage } from '../../message'

const HackSetMessage: FunctionalComponent = () => {
  setMessage(useMessage())
}

export default HackSetMessage
