<template>
  <q-page class="q-pa-xl">
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Você deseja realmente apagar {{ selected.length }} itens?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="primary" v-close-popup />
          <q-btn
            flat
            label="SIM"
            color="primary"
            v-close-popup
            @click="deleteItems"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="text-right">
      <q-btn
        unelevated
        color="primary"
        label="Cadastrar nota"
        :to="{ name: 'NewNote' }"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        dense
        :data="dataTable"
        :columns="columns"
        row-key="id"
        :loading="carregando"
        selection="multiple"
        :selected.sync="selected"
      />
      <div class="q-mt-lg">
        <q-btn
          v-show="selected.length > 0"
          color="negative"
          label="Apagar selecionados"
          @click="dialog = true"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",

  async created() {
    await this.fetchData()
    // const response = fetch('http://localhost:3000/notas')
    // response.then(result => {
    //   console.log('TUDO CERTO Result')
    //   this.carregando = false
    //   if (result.ok) {
    //     const dtJson = result.json()
    //     dtJson.then(jsonResult => {
    //       this.data = jsonResult
    //     })
    //   }
    // })
    // response.catch(error => {
    //   this.carregando = false
    //   console.log('OCORREU UM ERRO', error)
    //   this.$q.notify({
    //     position: 'top-left',
    //     color: 'negative',
    //     message: error.message
    //   })
    // })
  },

  data() {
    return {
      carregando: false,
      columns: [
        {
          name: "id",
          required: true,
          label: "id",
          align: "center",
          field: "id",
          sortable: true,
        },
        { name: "title", align: "center", label: "Titulo", field: "title" },
        {
          name: "value",
          align: "center",
          label: "Valor",
          field: "value",
          sortable: true,
        },
        { name: "taxes", label: "Imposto", field: "taxes", sortable: true },
        { name: "trash", label: "apagar", field: "trash", sortable: false },
      ],

      dataTable: [],
      selected: [],
      dialog: false,
    };
  },

  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },

    async deleteItems() {
      const body = {
        ids: [],
      };

      for (const item of this.selected) {
        body.ids.push(item.id);
      }

      console.log("body", JSON.stringify(body));

      try {
        await fetch("http://localhost:3000/notas", {
          method: "DELETE",
          body: JSON.stringify(body),
        });

        this.$q.notify({
          position: "top-left",
          color: "positive",
          text: "black",
          message: `Itens deletas com sucesso`,
        });
        await this.fetchData()
        this.selected.length = 0
      } catch (error) {
        console.log("OCORREU UM ERRO", error);
        this.$q.notify({
          position: "top-left",
          color: "negative",
          message: error.message,
        });
      }
    },

    async fetchData() {
      this.carregando = true;

      try {
        const response = await fetch("http://localhost:3000/notas");
        if (response.ok) {
          this.dataTable = await response.json();
          this.carregando = false;
        }
      } catch (error) {
        this.carregando = false;
        console.log("OCORREU UM ERRO", error);
        this.$q.notify({
          position: "top-left",
          color: "negative",
          message: error.message,
        });
      }
    },
  },
};
</script>
