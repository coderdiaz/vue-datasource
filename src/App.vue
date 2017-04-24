<script>
import Datasource from './components/Datasource.vue'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    Datasource
  },
  render (h) {
    return (
      <div id="app">
        <datasource table-data={this.information} actions={this.actions} columns={this.columns} pagination={this.pagination}></datasource>
      </div>
    )
  },
  created () {
    this.getData()
  },
  data () {
    return {
      information: [],
      columns: [
        {
          name: 'Id',
          key: 'id'
        },
        {
          name: 'Name',
          key: 'name'
        },
        {
          name: 'Username',
          key: 'username'
        },
        {
          name: 'Email',
          key: 'email'
        },
        {
          name: 'Address',
          key: 'address.street'
        }
      ],
      actions: [
        {
          text: 'Edit',
          icon: 'glyphicon glyphicon-pencil',
          class: 'btn-primary',
          event (e, row) {
            console.warn('Are you clicked me?', e)
            if (row === null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row))
            }
          }
        },
        {
          text: 'Delete',
          icon: 'glyphicon glyphicon-trash',
          class: 'btn-danger',
          event (e, row) {
            console.warn('Are you clicked me?', e)
            if (row === null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row))
            }
          }
        },
        {
          text: 'Show',
          icon: 'glyphicon glyphicon-eye-open',
          class: 'btn-info',
          event (e, row) {
            console.warn('Are you clicked me?', e)
            if (row === null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row))
            }
          }
        }
      ]
    }
  },
  computed: {
    pagination () {
      return {
        total: 100,
        per_page: 15,
        current_page: 1,
        last_page: 5,
        from: 1,
        to: 15
      }
    }
  },
  methods: {
    getData () {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        this.information = response.data
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
@import "./assets/app.css";
#app {
  font-family: 'Roboto' !important
}
</style>
