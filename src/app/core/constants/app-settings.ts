export class AppSettings {
  /**
   * Allows get url base for services
   * @param path string
   * @returns string
   */
  public static getApi(path: string) {
    const API = `http://localhost:3000/${path}`;
    return API;
  }

  /**
   * Allows get routes in the application
   */
  public static getRoutes = [
    {
      path: '/movies',
      name: 'Home',
    },
    {
      path: '/new_movie',
      name: 'Add Movie',
    },
  ];
}
