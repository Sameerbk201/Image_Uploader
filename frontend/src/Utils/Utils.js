class UtilClass {
  constructor(url = `http://localhost:5000`) {
    this.url = url;
  }
  get_Url() {
    return this.url;
  }
}

const utilobj = new UtilClass();
export default utilobj;
