import { getAmountData, getCategoryData, getRoseData } from '@/service/main/system/analysis'
import { defineStore } from 'pinia'

interface IAmount {
	amountList: any[]
	goodCategory: any[]
	roseData: any[]
}

const useAnalysisStore = defineStore('AnalysisStore', {
	state: (): IAmount => ({
		amountList: [],
		goodCategory: [],
		roseData: []
	}),
	actions: {
		fetchAnalysisDataAction() {
			getAmountData().then((res) => {
				this.amountList = res.data
			})

			getCategoryData().then((res) => {
				this.goodCategory = res.data
			})

			getRoseData().then((res) => {
				this.roseData = res.data
			})
		}
	}
})

export default useAnalysisStore
