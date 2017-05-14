<script>
import Datasource from './components/ServerDatasource.vue'
export default {
  name: 'app',
  components: {
    Datasource
  },
  render (h) {
    return (
      <div id="app">
        <datasource source="http://young-falls-97690.herokuapp.com/getusers" limits={this.limits} actions={this.actions} columns={this.columns}></datasource>
      </div>
    )
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
          name: 'City',
          key: 'city',
          render: function (value) {
            return `<strong>${value}</strong>`
          }
        },
        {
          name: 'Company',
          key: 'company'
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
      search: ''
    }
  },
  methods: {
    change (value) {
      this.page = value.page
      this.perpage = value.perpage
      this.getData()
    },
    searching (value) {
      this.search = value
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
