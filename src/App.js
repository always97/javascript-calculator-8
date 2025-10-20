class StringCalculator {
  parseAndValidateNumber(str) {
    const trimmedStr = str.trim();

    if (trimmedStr === "") {
      throw new Error("[ERROR] 구분자 사이에 숫자가 없습니다.");
    }

    const num = Number(trimmedStr);

    if (isNaN(num)) {
      throw new Error("[ERROR] 유효하지 않은 숫자가 포함되어 있습니다.");
    }
    if (num < 0) {
      throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
    }
    if (!Number.isInteger(num)) {
      throw new Error("[ERROR] 정수만 입력 가능합니다.");
    }

    return num;
  }

  calculate(text) {
    if (!text) {
      return 0;
    }

    let numbers;

    if (text.startsWith("//")) {
      const match = text.match(/\/\/(.+)\n(.*)/s);
      if (!match) {
        throw new Error("[ERROR] 커스텀 구분자 형식이 올바르지 않습니다.");
      }

      const customDelimiter = match[1];
      const numbersString = match[2];

      numbers = numbersString
        .split(customDelimiter)
        .map(this.parseAndValidateNumber);
    } else {
      numbers = text.split(/[,\:]/).map(this.parseAndValidateNumber);
    }

    const sum = numbers.reduce((currentSum, num) => currentSum + num, 0);

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
