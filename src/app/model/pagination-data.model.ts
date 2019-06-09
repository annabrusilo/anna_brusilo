export class PaginationDataModel {
  public lastPage: number;
  public activePage: number;

  constructor(options: {
    lastPage?: number,
    activePage?: number,
  } = {}) {
    options = options || {};
    this.lastPage = options.lastPage || 1;
    this.activePage = options.activePage || 1;
  }
}
