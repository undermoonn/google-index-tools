import { useMessage } from 'naive-ui'
import { FunctionalComponent } from 'vue'

import { Message } from '../../adapter'

const HackSetMessage: FunctionalComponent = () => {
  Message.setInstance(useMessage())
}

export default HackSetMessage
