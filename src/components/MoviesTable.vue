<template>
  <div class="q-pa-md">

    <q-table
        :title="title"
        :columns="columns"
        :data="data"
        row-key="id"
        :pagination.sync="pagination"
        :filter="filter"
        @request="onRequest"
        @update="updatePagination"
        binary-state-sort
        flat
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer pb-row">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>

    </q-table>

  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Movies',
  data () {
    return {
      title: 'data film ku',
      columns: [
        { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
        { name: 'popularity', label: 'Popularity', align: 'left', field: 'popularity', sortable: true },
        { name: 'original_title', label: 'Original Title', align: 'left', field: 'original_title', sortable: true },
        { name: 'release_date', label: 'Release Date', align: 'left', field: 'release_date', sortable: true, format: (val, row) => `${date.formatDate(val, 'DD/MM/YYYY HH:mm:ss')}` }
      ],
      data: [],
      filter: null,
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 0
      }
    }
  },
  created () {
    this.pagination.sortBy = 'popularity'
    this.pagination.descending = true
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    onRequest (requestProp) {
      this.$store.dispatch('movie/index',
        {
          page: requestProp.pagination.page,
          sort_by: `${requestProp.pagination.sortBy}.${requestProp.pagination.descending ? 'desc' : 'asc'}`
        })
        .then((success) => {
          if (this.$store.getters['movie/getMovies']) {
            let aux = this.$store.getters['movie/getMovies']
            this.data = aux.results
            if (aux.page) {
              // update whole pagination object based on the props you passed in your request method first
              this.pagination = requestProp.pagination // -> the missing piece

              let total = aux.total_results
              let totalPages = aux.total_pages
              this.pagination.page = aux.page
              this.pagination.rowsPerPage = Math.round(total / totalPages)
              this.pagination.rowsNumber = aux.total_results
            }
          }
        }).catch(() => {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Ops... Something went wrong!'
          })
        })
    },
    rowClick (row) {
      console.log('Clickiiiing!')
    },
    updatePagination (newPagination) {
      console.info('UPDATE PAGINATION!!!!!!!!!!!!!!')
    }
  }
}
</script>

<style>
</style>
