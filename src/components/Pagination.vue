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
            <li class={{disabled: this.currentPage === 1}}>
              <a href="#" on-click={(e) => this.firstPage(e)}><span aria-hidden="true">&laquo;&laquo;</span></a>
            </li>
            <li class={{ disabled: this.currentPage === 1 }}>
              <a href="#" on-click={(e) => this.previous(e)}><span aria-hidden="true">&laquo;</span></a>
            </li>
            {this.paginationItems}
            <li class={{disabled: this.currentPage === this.lastPage}}>
              <a href="#" on-click={(e) => this.next(e)}><span aria-hidden="true">&raquo;</span></a>
            </li>
            <li class={{ disabled: this.currentPage === this.lastPage }}>
              <a href="#" on-click={(e) => this.goTolastPage(e, this.lastPage)}><span aria-hidden="true">&raquo;&raquo;</span></a>
            </li>
          </ul>
        </nav>
      </div>
    )
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 0
    }
  },
  created () {
    window.addEventListener('keyup', ({key}) => this.changePageWithKeyBoard(key))
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    items: DatasourceUtils.gettingItems,
    paginationItems () {
      return this.items.map((item, index) => {
        return <li class={{active: (this.currentPage === item)}}>
          <a href="#" on-click={(e) => this.change(e, item)}>{item}</a>
        </li>
      })
    },
    lastPage () {
      if (this.total === 0) return 1
      return parseInt(((this.total - 1) / this.perPage) + 1)
    }
  },
  methods: {
    firstPage (e) {
      e.preventDefault()
      if (this.currentPage !== 1) {
        this.change(e, 1)
      }
    },
    previous (e) {
      e.preventDefault()
      if (this.currentPage !== 1) {
        this.change(e, --this.currentPage)
      }
    },
    change (e, page) {
      e.preventDefault()
      this.currentPage = page
      EventBus.$emit('pagination-change', page)
    },
    next (e) {
      e.preventDefault()
      if (this.currentPage !== this.lastPage) {
        this.change(e, ++this.currentPage)
      }
    },
    goTolastPage (e, page) {
      e.preventDefault()
      if (this.currentPage !== this.lastPage) {
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
