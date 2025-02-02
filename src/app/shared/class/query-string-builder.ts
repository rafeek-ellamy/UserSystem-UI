export class QueryStringBuilder {
  /**
   * Builds a query string from an object of parameters.
   * @param {Record<string, string | number | boolean | null | undefined>} params - The key-value pairs to include in the query string.
   * @returns {string} The query string.
   */
  static buildQueryString(
    params: Record<string, string | number | boolean | null | undefined>
  ): string {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined) 
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );

    return queryParams.length ? `?${queryParams.join('&')}` : '';
  }
}
