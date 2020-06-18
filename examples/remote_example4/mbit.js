// Remote Example1 - reciever
// for CHIRIMEN with:microbit

var microBitBle;
var channel;
var gpioPort0;

async function connect(){
	// chirimen with micro:bitの初期化
	microBitBle = await microBitBleFactory.connect();
	msgDiv.innerHTML=("micro:bitとのBLE接続が完了しました");
	
	// GPIOポート0の初期化
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort0 = mbGpioPorts.get(0);
	await gpioPort0.export("out"); //port0 out
	
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenLED");
	msgDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onMessage(controlLED);
}

function controlLED(messge){
	msgDiv.innerText=messge;
	if ( messge =="LED ON"){
		gpioPort0.write(1);
		console.log("ON");
		channel.sendMessage("LEDをオンにしました");
	} else if ( messge =="LED OFF"){
		gpioPort0.write(0);
		console.log("OFF");
		channel.sendMessage("LEDをオフにしました");
	}
}
