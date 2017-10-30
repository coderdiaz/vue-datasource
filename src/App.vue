<script>
import axios from 'axios'
import Datasource from './components/ServerDatasource.vue'
export default {
  name: 'app',
  components: {
    Datasource
  },
  mounted () {
    this.getSource()
  },
  render (h) {
    return (
      <div id="app">
        <h2 class="text-center mb3">Vue Datasource</h2>
        <datasource source={this.information} total={this.total} limits={this.limits} actions={this.actions} columns={this.columns} on-change={this.change}></datasource>
      </div>
    )
  },
  data () {
    return {
      information: [],
      columns: [
        {
          name: 'Id',
          key: 'id',
          order: true
        },
        {
          name: 'First Name',
          key: 'first_name',
          order: true
        },
        {
          name: 'Last Name',
          key: 'last_name',
          render: (value, row) => {
            return <strong><i>Epic</i> {value} <img src={row.avatar} width="20" /></strong>
          }
        }
      ],
      actions: [
        {
          text: 'Edit',
          icon: 'glyphicon glyphicon-pencil',
          class: 'btn-primary',
          show (selectedRow) {
            if (selectedRow) {
              return (selectedRow.row.id === 1)
            } else {
              return true
            }
          },
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
          show (selectedRow) {
            return true
          },
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
          show (selectedRow) {
            return true
          },
          event (e, row) {
            console.warn('Are you clicked me?', e)
            if (row === null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row))
            }
          }
        }
      ],
      limits: [3, 5, 10, 15, 20],
      page: 1,
      perpage: 10,
      pagination: {},
      search: '',
      total: 0
    }
  },
  methods: {
    getSource () {
      axios.get(`https://reqres.in/api/users?per_page=${this.perpage}&page=${this.page}`).then((response) => {
        this.information = response.data.data
        this.total = response.data.total
      })
    },
    change (value) {
      this.page = value.page
      this.perpage = value.perpage
      this.getSource()
    },
    searching (value) {
      this.search = value
      this.getSource()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
@import "./assets/app.css";
#app {
  font-family: 'Roboto' !important;
  margin: 150px 0;
}
.mb3 {
  margin-bottom: 30px;
}
</style>
