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
        <datasource table-data={this.information} limits={this.limits} actions={this.actions} columns={this.columns} pagination={this.pagination} onChange={this.change}></datasource>
      </div>
    )
  },
  mounted () {
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
          name: 'Year',
          key: 'year',
          render: function (value) {
            return `<strong>${value}</strong>`
          }
        },
        {
          name: 'Code color',
          key: 'pantone_value'
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
      current_page: 1,
      per_page: 3,
      total: 0
    }
  },
  computed: {
    pagination () {
      return {
        total: this.total,
        per_page: 3,
        current_page: this.current_page,
        last_page: 5,
        from: (this.current_page === 1) ? 1 : this.per_page,
        to: (this.current_page === 1) ? this.per_page : this.per_page * this.current_page
      }
    }
  },
  methods: {
    getData () {
      axios.get(`https://reqres.in/api/products?per_page=${this.pagination.per_page}&page=${this.pagination.current_page}`)
      .then((response) => {
        this.pagination.per_page = parseInt(response.data.per_page)
        this.per_page = parseInt(response.data.per_page)
        this.total = parseInt(response.data.total)
        this.pagination.current_page = parseInt(response.data.page)
        this.current_page = parseInt(response.data.page)
        this.pagination.last_page = parseInt(response.data.total_pages)
        this.information = response.data.data
      })
      .catch((error) => {
        console.error(error)
      })
    },
    change (value) {
      this.pagination.per_page = parseInt(value.perpage)
      this.pagination.current_page = parseInt(value.page)
      this.getData()
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
