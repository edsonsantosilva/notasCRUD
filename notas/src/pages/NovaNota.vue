<template>
  <q-page class="bg-grey-4 q-pa-xl">
    <div class="text-h4">{{ id ? `Editar Nota` : `Cadastrar Nota` }}</div>
    <q-form class="q-mt-lg" @submit.prevent="onSubmit">
      <div class="q-gutter-y-md">
        <q-input
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo não pode ser vazio',
          ]"
          v-model="title"
          label="Titulo"
        />
        <q-input
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo não pode ser vazio',
          ]"
          v-model="value"
          label="Valor"
        />
        <q-input
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo não pode ser vazio',
          ]"
          v-model="taxes"
          label="Imposto"
        />
      </div>
      <div class="q-mt-md q-gutter-x-md">
        <q-btn
          :disable="carregando"
          @click="$router.back()"
          color="primary"
          label="Cancel"
        />
        <q-btn
          :loading="carregando"
          :disable="carregando"
          type="submit"
          color="secondary"
          label="Submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  props: {
    editedNota: {
      required: false,
      type: Object,
      default: null
    }
  },
  created() {
    console.log("editedNota novanota", this.editedNota)
    if (this.editedNota) {
      let {id, title, value, taxes} = this.editedNota
      this.id = id
      this.title = title
      this.value = value
      this.taxes = taxes
    }
  },
  data() {
    return {
      carregando: false,
      id: null,
      title: null,
      value: null,
      taxes: null,
    };
  },
  methods: {
    async onSubmit() {
      this.carregando = true;
      const body = JSON.stringify({
        title: this.title,
        value: this.value,
        taxes: this.taxes,
      });
      try {
        const response = await fetch("http://localhost:3000/notas", {
          method: "POST",
          body,
        });
        if (response.ok) {
          this.carregando = false;
          const data = await response.json();
          this.$q.notify({
            position: "top-left",
            color: "positive",
            text: "black",
            message: `Nota ${data.title} cadastrada com sucesso!`,
          });
        }
        this.onReset();
      } catch (error) {
        this.carregando = false;
        console.log("Ocorreu um problema: ", error);
        this.$q.notify({
          position: "top-left",
          color: "negative",
          message: error.message,
        });
      }
    },
    onReset() {
      this.title = null;
      this.value = null;
      this.taxes = null;
    },
  },
};
</script>

<style>
</style>