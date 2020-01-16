<template>
  <q-page padding>
    <movies-table></movies-table>
  </q-page>
</template>

<script>
import MoviesTable from '../components/MoviesTable.vue'

export default {
  name: 'MoviePage',
  components: {
    MoviesTable
  }

}
</script>

<style>
</style>
