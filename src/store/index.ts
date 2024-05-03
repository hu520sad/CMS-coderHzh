import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/useLoginStore'

const pinia = createPinia()

function freshStore(app: App) {
	app.use(pinia)
	const loginStore = useLoginStore()
	loginStore.freshCacheData()
}

export default freshStore
