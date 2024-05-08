import useLoginStore from "@/store/login/useLoginStore"

function usePermission(permissionID: string) {
	const loginStore = useLoginStore()
	const { userPermission } = loginStore

	return !!userPermission.find((item: any) => item.includes(permissionID))
}

export default usePermission
