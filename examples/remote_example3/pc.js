// Remote Example1 - controller

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenMatrix");
	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onMessage(getMessage);
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	if ( msg.done ){
		messageDiv.innerText = "表示が完了しました";
	} else if ( msg.start ){
		messageDiv.innerText = "文字列 " + msg.start + " の表示を開始しました";
	}
}

function printText(){ // LED ON
	var message = {
		print: messageText.value
	}
	channel.sendMessage( message );
	messageDiv.innerText = "表示を指示します : "+ messageText.value;
}