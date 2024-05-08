const searchConfig = {
	formItem: [
		{
			type: 'input',
			prop: 'name',
			label: '角色名称',
			placeholder: '请输入查询的角色名称',
		},
		{
			type: 'input',
			prop: 'intro',
			label: '权限介绍',
			placeholder: '请输入查询的权限介绍'
		},
		{
			type: 'date-picker',
			prop: "createAt",
			label: '创建时间',
		},
		{
			type: 'select',
			prop: 'enable',
			label: '状态',
			placeholder: '请选择查询状态',
			options: [
				{ label: '启动', value: 1 },
				{ label: '禁用', value: 0 },
			]
		}
	]
}

export default searchConfig
