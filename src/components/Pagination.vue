<script>
import DatasourceUtils from '../utils/DatasourceUtils'
import { EventBus } from '../utils/EventBus'
export default {
  name: 'Datasource-Pagination',
  render (h) {
    return (
      <div class="vue-pagination">
        <nav>
          <ul class="pagination">
            <li class={{ disabled: this.pages.current_page === 1 }}>
              <a href="#" on-click={ (e) => this.firstPage(e) }><span aria-hidden="true">&laquo;&laquo;</span></a>
            </li>
            <li class={{ disabled: this.pages.current_page === 1 }}>
              <a href="#" on-click={ (e) => this.previous(e) }><span aria-hidden="true">&laquo;</span></a>
            </li>
            { this.paginationItems }
            <li class={{ disabled: this.pages.current_page === this.pages.last_page }}>
              <a href="#" on-click={ (e) => this.next(e) }><span aria-hidden="true">&raquo;</span></a>
            </li>
            <li class={{ disabled: this.pages.current_page === this.pages.last_page }}>
              <a href="#" on-click={ (e) => this.lastPage(e, this.pages.last_page) }><span aria-hidden="true">&raquo;&raquo;</span></a>
            </li>
          </ul>
        </nav>
      </div>
    )
  },
  props: ['pages'],
  created () {
    window.addEventListener('keyup', ({key}) => this.changePageWithKeyBoard(key))
  },
  computed: {
    items: DatasourceUtils.gettingItems,
    paginationItems () {
      return this.items.map((item, index) => {
        return <li class={{ active: (this.pages.current_page === item) }}>
          <a href="#" on-click={ (e) => this.change(e, item) }>{ item }</a>
        </li>
      })
    }
  },
  methods: {
    firstPage (e) {
      e.preventDefault()
      if (this.pages.current_page !== 1) {
        this.change(e, 1)
      }
    },
    previous (e) {
      e.preventDefault()
      if (this.pages.current_page !== 1) {
        this.change(e, --this.pages.current_page)
      }
    },
    change (e, page) {
      e.preventDefault()
      EventBus.$emit('pagination-change', page)
    },
    next (e) {
      e.preventDefault()
      if (this.pages.current_page !== this.pages.last_page) {
        this.change(e, ++this.pages.current_page)
      }
    },
    lastPage (e, page) {
      e.preventDefault()
      if (this.pages.current_page !== this.pages.last_page) {
        this.change(e, page)
      }
    },
    changePageWithKeyBoard (key) {
      if (key === 'ArrowLeft') {
        this.previous()
      } else if (key === 'ArrowRight') {
        this.next()
      }
    }
  }
}
</script>
<style scoped>
.vue-pagination nav .pagination {
    margin: 10px 0
}
</style>
