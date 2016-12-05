export class RemoteError extends Error {
  private _errcode: number;

  constructor(message: string, code: string) {
    super('[REMOTE]: ' + message);
    this._errcode = parseInt(code, 10);
  }

  get code() {
    return this._errcode;
  }
}
