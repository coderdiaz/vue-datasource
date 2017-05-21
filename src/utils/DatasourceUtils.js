export default {
  /**
   * Find the element value using Recursive Method and return the value rendered if it's defined
   * @param obj
   * @param column
   * @param render
   * @returns {*}
   */
  fetchFromObject (obj, column, render) {
    if (typeof obj === 'undefined') return false
    let _index = column.indexOf('.')
    if (_index > -1) {
      return this.fetchFromObject(obj[column.substring(0, _index)], column.substr(_index + 1))
    }
    if (typeof render !== 'undefined') {
      return render(obj[column])
    }
    return obj[column]
  },

  /**
   * Emit event to change page from pagination
   * @param page
   * @return {void}
   */
  changePage (page) {
    this.selected = null
    this.indexSelected = -1
    this.pagination.current_page = page
    this.setData()
    this.$emit('change', { perpage: this.perpage, page: page })
  },

  /**
   * Effect toggle to selected row
   * @param row
   * @param index
   * @return {void}
   */
  selectRow (e, row, index) {
    e.preventDefault()
    if (this.indexSelected === index) {
      this.indexSelected = -1
      this.selected = null
    } else {
      this.indexSelected = index
      this.selected = {
        'row': row,
        'index': index
      }
    }
  },

  /**
   * Computed property: Building custom string information with translation
   * @returns {String}
   */
  tableInfo () {
    let labelShow = this.translation.pagination.show
    let from = (this.pagination.from === null) ? 0 : this.pagination.from
    let labelTo = this.translation.pagination.to
    let to = (this.pagination.to === null) ? 0 : this.pagination.to
    let labelOf = this.translation.pagination.of
    let total = this.pagination.total
    let labelEntries = this.translation.pagination.entries
    return `${labelShow} ${from} ${labelTo} ${to} ${labelOf} ${total} ${labelEntries}`
  },

  /**
   * Computed property: Build custom array with the pagination items
   * @return Array
   */
  gettingItems () {
    let temp = []
    let bottomLimit = this.pages.current_page - 2
    let topLimit = this.pages.current_page + 2
    let showing = 5
    if (bottomLimit <= 0) {
      bottomLimit = 1
      topLimit = 5
    }
    if (topLimit >= this.pages.last_page) {
      bottomLimit = this.pages.last_page - 4
      topLimit = this.pages.last_page
    }
    if (this.pages.last_page < 5) {
      showing = this.pages.last_page
    }
    if (bottomLimit <= 0) {
      bottomLimit = 1
    }
    if (this.pages.last_page === 0 || this.pages.last_page === 1) {
      showing = 1
    }
    for (let i = 0; i < showing; i++) {
      temp[i] = i + bottomLimit
    }
    return temp
  }
}
