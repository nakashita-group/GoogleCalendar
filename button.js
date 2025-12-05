document.getElementById("insert_button").addEventListener("click", async () => {
  console.log("button clicked");
  const strYMD = document.getElementById("date").value + "T" + document.getElementById("strTime").value + ":00+09:00";
  const endYMD = document.getElementById("date").value + "T" + document.getElementById("endTime").value + ":00+09:00";
  const summary = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const userName = document.getElementById("UserName").innerText;
  alert("clicked")

  const payload={
    title: summary,
    description: description,
    date: document.getElementById("date").value,
    start: strYMD,
    end: endYMD,
  };
  const res = await fetch("http://googlecalendar-orpin.vercel.app/insert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  alert(res)
  console.log(res);
  const data=await res.json();
  alert(data.message);
  // const message=`GoogleCalendar入力内容
  // タイトル：${summary}
  // 説明：${description}
  // 日付：${document.getElementById("date").value}
  // 開始時間：${document.getElementById("strTime").value}
  // 終了時間：${document.getElementById("endTime").value}
  // 送信者：${userName}`

  // woff.sendMessage({
  //     content: message
  // })
  //     .then(() => {
  //         console.log("メッセージ送信完了");
  //     })
  //     .catch((err) => {
  //         console.log('error', err);
  //     });

  // const event = {
  //     summary: summary,
  //     // location: "800 Howard St., San Francisco, CA 94103",
  //     description: description,
  //     start: {
  //         dateTime: strYMD,
  //         timeZone: "Asia/Tokyo",
  //     },
  //     end: {
  //         dateTime: endYMD,
  //         timeZone: "Asia/Tokyo",
  //     },
  // };

  // try {
  //     const response = await gapi.client.calendar.events.insert({
  //         calendarId: "nakashita0224@gmail.com",
  //         resource: event,
  //     });
  //     console.log("Event created: " + response.result.htmlLink);
  //     alert("送信完了しました。",response.result.htmlLink)
  // } catch (err) {
  //     console.error("Error creating event: ", err);
  //     alert("エラーが発生しました。",err)
  // }
})