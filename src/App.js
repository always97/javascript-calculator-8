import * as MissionUtils from "@woowacourse/mission-utils";

class App {
  async getUserNumber() {
    const userInput = await MissionUtils.Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요. \n"
    );
  }

  async run() {
    await this.getUserNumber();
  }
}

export default App;
