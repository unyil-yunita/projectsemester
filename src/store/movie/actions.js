import axios from 'axios'

export function index ({ commit }, payload) {
  console.log('payload do action do movie ====> ', payload)

  return axios.get('https://api.themoviedb.org/3/discover/movie?', {
    params: {
      api_key: '2ed54a614803785fce2d7fe401cc3b21',
      sort_by: payload.sort_by,
      page: payload.page
    }
  })
    .then((response) => {
      console.log('response => ', response)
      console.log('payload => ', payload)
      if (response.status === 200) {
        commit('setMovies', response.data)
      } else {
        console.log('DEU RUIMMMMMMMMMMMM')
        return false
      }
    }).catch((error) => {
      console.log('asdasd', error)
      return false
    })
}
