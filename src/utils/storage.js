let cache = {}

export default class Storage {
  /**
   * Get the value stored at key in localStorage
   *
   * @param {string} key
   * @memberof Storage
   */
  static get(key) {
    if (!cache.hasOwnProperty(key)) {
      cache[key] = JSON.parse(localStorage.getItem(key) || null)
    }
    return cache[key]
  }

  /**
   * Store the given value in localStorage at key
   *
   * @param {string} key
   * @param {any} value
   * @memberof Storage
   */
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    cache[key] = value
  }
  /**
   * Clear localStorage of all data
   *
   * @memberof Storage
   */
  static clear() {
    localStorage.clear()
    cache = {}
  }
}
