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
      return render(obj[column], obj)
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
    this.current_page = page
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
   * Computed property: Build custom array with the pagination items
   * @return Array
   */
  gettingItems () {
    let temp = []
    let bottomLimit = this.currentPage - 2
    let topLimit = this.currentPage + 2
    let showing = 5
    if (bottomLimit <= 0) {
      bottomLimit = 1
      topLimit = 5
    }
    if (topLimit >= this.lastPage) {
      bottomLimit = this.lastPage - 4
      topLimit = this.lastPage
    }
    if (this.lastPage < 5) {
      showing = this.lastPage
    }
    if (bottomLimit <= 0) {
      bottomLimit = 1
    }
    if (this.lastPage === 0 || this.lastPage === 1) {
      showing = 1
    }
    for (let i = 0; i < showing; i++) {
      temp[i] = i + bottomLimit
    }
    return temp
  },

  roundNumber (value, precision) {
    let multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }
}
