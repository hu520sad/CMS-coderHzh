const modalConfig = {
	pageName: 'department',
	header: {
		newTitle: '新建部门',
		editTitle: '编辑部门'
	},
	formItems: [
		{
			type: 'input',
			label: '部门名称',
			prop: 'name',
			placeholder: '请输入部门名称'
		},
		{
			type: 'input',
			label: '部门领导',
			prop: 'leader',
			placeholder: '请输入领导名称'
		},
		{
			type: 'select',
			label: '上级部门',
			prop: 'parentId',
			placeholder: '请选择上级部门',
			options: [
				{ label: '财务部', value: '111' },
				{ label: '财务部', value: '111' },
				{ label: '财务部', value: '111' },
			]
		},
	]
}

export default modalConfig
