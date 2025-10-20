import * as MissionUtils from "@woowacourse/mission-utils";

class StringCalculator {
  calculate(text) {
    if (!text) {
      return 0;
    }

    const defaultDelimiters = [",", ":"];
    let allDelimiters = [...defaultDelimiters];
    let numbersString = text;

    if (text.startsWith("//")) {
      const match = text.match(/\/\/(.+)\n(.*)/s);
      if (!match) {
        throw new Error("[ERROR] 커스텀 구분자 형식이 올바르지 않습니다.");
      }

      const customDelimiter = match[1];
      if (!customDelimiter) {
        throw new Error("[ERROR] 커스텀 구분자가 비어있습니다.");
      }

      allDelimiters.push(customDelimiter); // 기본 구분자에 커스텀 구분자 추가
      numbersString = match[2];
    }

    const escapedDelimiters = allDelimiters.map(
      (d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // 정규식 특수문자 이스케이프
    );
    const delimiterRegex = new RegExp(escapedDelimiters.join("|"));

    const numberTokens = numbersString.split(delimiterRegex);

    if (numberTokens.some((token) => token === "")) {
      throw new Error("[ERROR] 잘못된 입력 형식입니다. (연속된 구분자)");
    }

    const numbers = numberTokens.map(Number);

    const sum = numbers.reduce((currentSum, num) => {
      if (isNaN(num)) {
        throw new Error("[ERROR] 유효하지 않은 숫자가 포함되어 있습니다.");
      }
      if (num < 0) {
        throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
      }
      return currentSum + num;
    }, 0);

    return sum;
  }
}

class App {
  constructor() {
    this.calculator = new StringCalculator();
  }

  async run() {
    try {
      const userInput = await MissionUtils.Console.readLineAsync(
        "덧셈할 문자열을 입력해 주세요.\n"
      );

      const result = this.calculator.calculate(userInput);
      MissionUtils.Console.print(`결과 : ${result}`);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      throw error;
    }
  }
}

export default App;
