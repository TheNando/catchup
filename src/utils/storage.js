let cache = {}

export default class Storage {
  /**
   * Get the value stored at key in localStorage
   *
   * @param {string} key The key of the value to retrieve from localStorage
   * @memberof Storage
   * @returns any
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
   * @param {string} key The key of the value to be stored in localStorage
   * @param {any} value The value to store
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
