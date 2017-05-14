<script>
import DatasourceUtils from '../utils/DatasourceUtils'
import Pagination from './Pagination.vue'
import { EventBus } from '../utils/EventBus'
export default {
  name: 'Datasource',
  components: {
    Pagination
  },
  render (h) {
    return (
      <div class="vue-datasource">
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
                <button type="button" class=" btn btn-primary" on-click={ (e) => this.searching(e) }>{ this.translation.search }</button>
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
     * Table information
     * @type {Array}
     */
    tableData: {
      type: Array,
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
     * Pagination information about the table data
     * @type {Object}
     */
    pagination: {
      type: Object,
      default () {
        return {
          total: 0,
          to: 0,
          from: 0,
          per_page: 15
        }
      }
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
  },
  data () {
    return {
      perpage: 10,
      selected: null, // row and Object selected on click event
      indexSelected: -1, // index row selected on click event
      search: '' // word to search in the table
    }
  },
  computed: {
    limitOptions () {
      return this.limits.map((limit, index) => {
        return <option value={ limit } selected={ this.perpage === limit }>{ limit }</option>
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
      this.$emit('searching', this.search)
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
      this.$emit('change', {perpage: this.perpage, page: 1})
    },
    tableData () {
      this.selected = null
      this.indexSelected = -1
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
