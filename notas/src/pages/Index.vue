<template>
  <q-page class="bg-black q-pa-xl">
    <q-dialog id="deletar" v-model="dialogDelet" persistent>
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
    <q-dialog id="editar" v-model="dialogEdit" persistent>
      <q-card>
        <q-card-section>
          <q-input label="Id Nota" v-model="editedNota.id"></q-input>
          <q-input label="Título" v-model="editedNota.title"></q-input>
          <q-input label="Valor" v-model="editedNota.value"></q-input>
          <q-input label="Imposto" v-model="editedNota.taxes"></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Atualizar"
            color="primary"
            v-close-popup
            @click="editItem"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="text-right q-gutter-x-md">
      <q-btn
        unelevated
        color="primary"
        label="Cadastrar nota"
        :to="{ name: 'NewNote' }"
      />
      <q-btn
        unelevated
        color="secondary"
        label="Testar Data"
        :to="{ name: 'ValidateDate' }"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        dense
        :data="dataTable"
        :columns="columnsInfo"
        row-key="id"
        :loading="carregando"
        selection="multiple"
        :selected.sync="selected"
      />
      <div class="q-mt-md q-gutter-x-md">
        <q-btn
          v-show="selected.length > 0"
          color="negative"
          label="Apagar selecionados"
          @click="dialogDelet = true"
        />
        <q-btn
          v-show="selected.length > 0"
          color="primary"
          label="Editar selecionados"
          @click="editNota"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { columns } from "../utils/columns";
export default {
  name: "PageIndex",
  async created() {
    await this.fetchData();
  },
  data() {
    return {
      carregando: false,
      columnsInfo: columns,
      dataTable: [],
      selected: [],
      editedNota: {
        id: null,
        taxes: null,
        title: "",
        value: null
      },
      dialogDelet: false,
      dialogEdit: false
    };
  },
  methods: {
    editNota(){
      console.log("selected", this.selected);
      this.editedNota = this.selected[0]
      this.dialogEdit = true
    },
    notifyError(error){
      console.log("OCORREU UM ERRO", error);
        this.$q.notify({
          position: "top-left",
          color: "negative",
          message: error.message,
        });
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    async editItem(){
      const body = {...this.editedNota}
      console.log("body edit",body);
      try {
        await fetch("http://localhost:3000/notas", {
          method: "PUT",
          body: JSON.stringify(body)
        });
        this.$q.notify({
          position: "top-left",
          color: "positive",
          text: "black",
          message: `Notas Editadas com sucesso`,
        });
      } catch (error) {
        notifyError(error)
      }
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
          message: `Notas deletadas com sucesso`,
        });
        await this.fetchData();
        this.selected.length = 0;
      } catch (error) {
        notifyError(error)
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
        notifyError(error)
      }
    },
  },
};
</script>
