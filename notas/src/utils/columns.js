export const columns = [
  {
    name: "id",
    required: true,
    label: "Id",
    align: "center",
    field: "id",
    sortable: true
  },
  {
     name: "title", 
    align: "center", 
    label: "Titulo", 
    field: "title" 
  },
  {
    name: "value",
    align: "center",
    label: "Valor",
    field: "value",
    sortable: true
  },
  { 
    name: "taxes", 
    label: "Imposto", 
    field: "taxes", 
    sortable: true 
  },
  { 
    name: "trash", 
    label: "Apagar", 
    field: "trash", 
    sortable: false 
  }
];
