class Session{

  _token: string|null;
  _user: any;

  constructor() {
    this._token = null;
    this._user = null;
  }

  getUser(){
    if (!this._user) {
      const user = localStorage.getItem("_user");
      this._user = user && user !== "undefined"?JSON.parse(user):null;
    }
    return this._user;
  }

  getToken(){
    if(!this._token) {
      this._token = localStorage.getItem("_token") || null;
    }
    return this._token;
  }

  setUser(user: any){
    this.set('_user', JSON.stringify(user));
  }

  setToken(token: string){
    this.set('_token', token);
  }

  set(key: string, value: string){
    return localStorage.setItem(key, value);
  }

  logout(){
    localStorage.clear();
    this._token = null;
    this._user = null;
  }
}

export default new Session();