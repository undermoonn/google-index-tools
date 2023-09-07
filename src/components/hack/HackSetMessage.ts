import { useMessage } from 'naive-ui'
import { setMessage } from '../../message'
import { FunctionalComponent } from 'vue'

const HackSetMessage: FunctionalComponent = () => {
  setMessage(useMessage())
}

export default HackSetMessage
