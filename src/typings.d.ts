// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare namespace jasmine {
  interface Matchers {
    toHaveSameItems(expected: any[], expectationFailOutput?: any): boolean;
  }
}

interface Window {
  __state: any;
}
