<template>
	<div>
		<q-btn label="Voltar" unelevated color="primary" @click="$router.back()"/>
		Validar Data
	</div>
</template>

<script>
export default {
	data(){
		return {
			fieldDateBegin: null,
			fieldDateEnd: null
		}
	},
	methods:{

	}
}
</script>

<style>

</style>