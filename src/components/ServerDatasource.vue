<script>
import axios from 'axios'
import _ from 'lodash'
import DatasourceUtils from '../utils/DatasourceUtils'
import Pagination from './Pagination.vue'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { EventBus } from '../utils/EventBus'
export default {
  name: 'ServerDatasource',
  components: {
    Pagination, MoonLoader
  },
  render (h) {
    return (
      <div class="vue-server-datasource">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="form-inline">
              <div class="form-group pull-left">
                <label class="control-label pr2">{ this.translation.limit }</label>
                <select on-change={ (e) => this.sync('perpage', parseInt(e.target.value)) } class="form-control" number>
                  { this.limitOptions }
                </select>
              </div>
              <div class="form-group pull-right">
                <input class="form-control mr1" type="text" on-input={ (e) => this.sync('search', e.target.value) } placeholder={this.translation.placeholder_search} />
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  { this.columnItems }
                </tr>
              </thead>
              <tbody>
                { this.columnObjects }
                <tr>
                  <td class="text-center warning" colspan={ this.columns.length }>{ this.tableInfo }</td>
                </tr>
              </tbody>
            </table>
            { this.spinnerItem }
          </div>
          <div class="panel-footer">
            <div class="pull-left btn-group btn-group-actions">
              { this.actionsObject }
            </div>
            <div class="pull-right">
              <pagination pages={ this.pagination }></pagination>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    )
  },
  props: {
    /**
     * Table source url
     * @type {Array}
     */
    source: {
      type: String,
      required: true
    },
    /**
     * Limits to display
     * @type {Array}
     */
    limits: {
      type: Array,
      default () {
        return [1, 5, 10, 15, 20]
      }
    },
    /**
     * Translation to display
     * @type {Object}
     */
    translation: {
      type: Object,
      default () {
        return {
          limit: 'Limit',
          search: 'Search',
          placeholder_search: 'Type to search..',
          records_not_found: 'No records found',
          pagination: {
            show: 'Showing',
            to: 'to',
            of: 'of',
            entries: 'entries'
          }
        }
      }
    },
    /**
     * Columns to display
     * @type {Array}
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * Action buttons
     * @type {Array}
     */
    actions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    EventBus.$on('pagination-change', this.changePage)
    this.setData()
  },
  data () {
    return {
      perpage: 10,
      tableData: [],
      loading: false,
      selected: null, // row and Object selected on click event
      indexSelected: -1, // index row selected on click event
      search: '', // word to search in the table,
      pagination: {
        total: 0,
        to: 0,
        from: 0,
        per_page: 10,
        current_page: 1
      }
    }
  },
  computed: {
    spinnerItem () {
      if (this.loading) {
        return <div class="vue-spinner-wrapper">
          <moon-loader></moon-loader>
        </div>
      }
    },
    limitOptions () {
      return this.limits.map((limit, index) => {
        return <option value={ limit } selected={ parseInt(this.perpage) === parseInt(limit) }>{ limit }</option>
      })
    },
    columnItems () {
      return this.columns.map((column, index) => {
        return <th>{ column.name }</th>
      })
    },
    columnObjects () {
      if (this.tableData.length === 0) {
        return <tr class="text-center">
          <td colspan={ this.columns.length }>{ this.translation.records_not_found }</td>
        </tr>
      } else {
        return this.tableData.map((row, index) => {
          let columns = this.columns.map((column, index) => {
            return <td domPropsInnerHTML={ this.fetchFromObject(row, column.key, column.render) }></td>
          })
          return <tr class={{ success: index === this.indexSelected }} on-click={ (e) => this.selectRow(e, row, index) }>{ columns }</tr>
        })
      }
    },
    actionsObject () {
      return this.actions.map((action, index) => {
        try {
          if (action.show(this.selected)) {
            return <button class={this.dynamicClass('btn', action.class)} type="button" on-click={ (e) => action.event(e, this.selected) }>
              <i class={ this.dynamicClass('pr1', action.icon) }></i>
              { action.text }
            </button>
          }
        } catch (ex) {
          console.warn(`[VueDatasource] The callback show is not defined in action ${action.text}.`)
        }
      })
    },
    tableInfo: DatasourceUtils.tableInfo
  },
  methods: {
    fetchFromObject: DatasourceUtils.fetchFromObject,
    changePage: DatasourceUtils.changePage,
    selectRow: DatasourceUtils.selectRow,
    dynamicClass (defaultClass, customClass) {
      return `${defaultClass} ${customClass}`
    },
    sync (prop, value) {
      this[prop] = value
    },
    searching (e) {
      this.selected = null
      this.indexSelected = -1
      this.pagination.current_page = 1
      this.setData()
      this.$emit('searching', this.search)
    },
    setData () {
      this.loading = true
      axios.get(`${this.source}?per_page=${this.perpage}&page=${this.pagination.current_page}&search=${this.search}`)
      .then((response) => {
        this.loading = false
        this.tableData = response.data.data
        this.pagination = response.data.pagination
        this.perpage = this.pagination.per_page
      })
      .catch((error) => {
        this.loading = false
        console.warn(`[VueDatasource] ${error}`)
      })
    }
  },
  watch: {
    /**
     * Handle show limit changed.
     * @return {void}
     */
    perpage () {
      this.selected = null
      this.indexSelected = -1
      this.pagination.current_page = 1
      this.setData()
      this.$emit('change', {perpage: this.perpage, page: 1})
    },
    tableData () {
      this.selected = null
      this.indexSelected = -1
    },
    search: _.debounce(function () {
      this.setData()
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.vue-server-datasource {
  .panel-body {
    position: relative;
    padding: 0;
  }
  table {
    margin-bottom: 0;
  }
  .panel-footer {
    .btn-group-actions {
      margin: 10px 0;
    }
  }
  .vue-spinner-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(229, 229, 229, 0.5);
    
    .v-spinner {
      position: absolute; 
      top: 50%;
      left: 50%;
      margin-left: -25px;
      margin-top: -50px;
    }
  }
}

.pr1 {
  padding-right: 5px;
}
.pr2 {
  padding-right: 10px;
}
.mr1 {
  margin-right: 5px;
}
</style>
