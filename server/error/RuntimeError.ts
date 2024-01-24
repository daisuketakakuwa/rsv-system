class RuntimeError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // TypeScriptではErrorオブジェクトのプロパティを正しく拡張するために
    // 以下のコードが必要です（ES2015以降のクラス継承の仕様に基づく）
    Object.setPrototypeOf(this, RuntimeError.prototype);
  }
}

export default RuntimeError;
