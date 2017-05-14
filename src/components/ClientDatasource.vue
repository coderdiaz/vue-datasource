<script>
import DatasourceUtils from '../utils/DatasourceUtils'
import Pagination from './Pagination.vue'
import { EventBus } from '../utils/EventBus'
export default {
    name: 'ClientDatasource',
    components: {
        Pagination
    },
    render (h) {
        return (<div class="vue-client-datasource"></div>)
    },
    data () {
      return {
        perpage: 10,
        selected: null, // row and Object selected on click event
        indexSelected: -1, // index row selected on click event
        search: '' // word to search in the table
      }
    }
}
</script>
<style scoped>
.vue-datasource .panel-body {
  padding: 0
}

.vue-datasource table {
  margin-bottom: 0
}

.vue-datasource .panel-footer .btn-group-actions {
  margin: 10px 0
}

.pr1 {
  padding-right: 5px
}

.pr2 {
  padding-right: 10px;
}

.mr1 {
  margin-right: 5px;
}
</style>