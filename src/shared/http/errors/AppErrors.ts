class AppError {
  public readonly _message: string;
  public readonly _statusCode: number;

  constructor(message: string, statusCode = 400) {
    this._message = message;
    this._statusCode = statusCode;
  }
}
export default AppError;
