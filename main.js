"use strict";

{
  // 残り時間の表示
  function show(countdown) {
    const totalSeconds = Math.floor(countdown / 1000);

    const hours = Math.floor(totalSeconds / 60 / 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    const hoursFormatted = String(hours).padStart(2, "0");
    const minutesFormatted = String(minutes).padStart(2, "0");
    const secondsFormatted = String(seconds).padStart(2, "0");

    timer.textContent = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  }

  function check() {
    let countdown;
    if (startTime - new Date() > 0) {
      //開始時刻の前
      document.querySelector("#status").textContent = "開始時刻まで";
      countdown = startTime - new Date();
    } else {
      //開始時刻の後
      mainElem.classList.remove("timer-prepare");
      mainElem.classList.add("timer-active");
      document.querySelector("#status").textContent = "終了時刻まで";
      countdown = endTime - new Date().getTime();

      // タイマーの終了
      if (countdown <= 0) {
        clearInterval(intervalId);
        countdown = 0;
        mainElem.classList.remove("timer-active");
        mainElem.classList.add("timer-finished");
        document.querySelector("#status").textContent = "タイマー終了";
        audio.play();
      }
    }

    show(countdown);
  }

  let startTime;
  let endTime;
  let intervalId;

  const timer = document.querySelector("#timer");
  const btn = document.querySelector("#startBtn");
  const startElem = document.querySelector("#startTime");
  const endElem = document.querySelector("#finishTime");
  const mainElem = document.querySelector("main");

  const audio = new Audio("Alarm.mp3");

  btn.addEventListener("click", () => {
    btn.remove();
    const inputTime =
      Number(prompt("半角数字でタイマーの時間 [分] を入力してください。")) *
      60 *
      1000;
    const inputSTime = prompt("半角で開始時刻を入力してください。<例> 12:01");
    const inputSHours = Number(inputSTime.split(":")[0]);
    const inputSMinutes = Number(inputSTime.split(":")[1]);
    const now = new Date();

    if (now.getHours() <= inputSHours) {
      // 開始時刻が当日
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        inputSHours,
        inputSMinutes
      );
    } else {
      // 開始時刻が翌日
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        inputSHours,
        inputSMinutes
      );
    }

    // 開始時刻、終了時刻を表示する
    endTime = startTime.getTime() + inputTime;
    const endFormat = new Date(endTime);
    startElem.textContent = `開始時刻 ${String(startTime.getHours()).padStart(
      2,
      "0"
    )}:${String(startTime.getMinutes()).padStart(2, "0")}`;
    endElem.textContent = `終了時刻 ${String(endFormat.getHours()).padStart(
      2,
      "0"
    )}:${String(endFormat.getMinutes()).padStart(2, "0")}`;

    // 残り時間を求める
    intervalId = setInterval(check, 100);
  });
}
