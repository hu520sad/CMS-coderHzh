import hyRequest from '@/service'

export function getAmountData() {
	return hyRequest.get({
		url: '/goods/amount/list'
	})
}

export function getCategoryData() {
	return hyRequest.get({
		url: '/goods/category/count'
	})
}

export function getRoseData() {
	return hyRequest.get({
		url: '/goods/category/sale'
	})
}
