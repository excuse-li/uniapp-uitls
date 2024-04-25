"use strict"
if (uni.getSystemInfoSync().platform == "android") {
	var Intent = plus.android.importClass('android.content.Intent');
	var Activity = plus.android.importClass('android.app.Activity');  
	var PendingIntent = plus.android.importClass('android.app.PendingIntent');  
	var IntentFilter = plus.android.importClass('android.content.IntentFilter');  
	var NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');
	var NdefRecord = plus.android.importClass("android.nfc.NdefRecord");
	var NdefMessage = plus.android.importClass("android.nfc.NdefMessage");
	var MifareClassic = plus.android.importClass("android.nfc.tech.MifareClassic");
	var isStop = false
}

// plus.android.importClass("")
var that
class NFCUtils{
	constructor(contenx){
		this.event={}
		this.defaultKey= [ -1, -1, -1, -1, -1, -1]
		if (uni.getSystemInfoSync().platform == "android") {
			
			setInterval(()=>{
				if(!isStop){
					this.init()
				}
			},800)
			this.interval=setInterval(()=>{
				this.intent = this.main.getIntent()
				
				let tag = this.intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
				if(tag){
					this.mifare = MifareClassic.get(tag)
					if(this.mifare.isConnected()){
						isStop=true
					}else{
						if(this.last!=this.intent.__UUID__){
							this.mifare.connect();
							this.last=this.intent.__UUID__
							this.ready=true
							isStop = true
							if(this.event.connected){
								for (var i = 0; i < this.event.connected.length; i++) {
									
									this.event.connected[i](this.mifare)
								}
							}
							
						}else{
							isStop = false
						}
					}
					
				}else{
					isStop = false
				}
			},500)
			
		}
	}
	init(){
		let techListsArray = [
		    ["android.nfc.tech.IsoDep"],  
		    ["android.nfc.tech.NfcA"],  
		    ["android.nfc.tech.NfcB"],  
		    ["android.nfc.tech.NfcF"],  
		    ["android.nfc.tech.Ndef"],  
		    ["android.nfc.tech.NfcV"],  
		    ["android.nfc.tech.NdefFormatable"],  
		    ["android.nfc.tech.MifareClassic"],  
		    ["android.nfc.tech.MifareUltralight"]  
		]
		
		
		this.main = plus.android.runtimeMainActivity(); 
		this.ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");
		this.nfcAdapter = NfcAdapter.getDefaultAdapter(this.main); 
		if(!this.nfcAdapter){
			throw new Error("设备不支持NFC")
		}
		var intent = new Intent(this.main, this.main.getClass());
		intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
		let pendingIntent = PendingIntent.getActivity(this.main, 0, intent, 0);
		var ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");
		let intentFiltersArray = [ndef];
		ndef.addDataType("*/*");
		this.nfcAdapter && this.nfcAdapter.enableForegroundDispatch(this.main, pendingIntent, intentFiltersArray, techListsArray);  
		
	}
	
	
	
	
	addEvent(k,callback){
		if(!this.event[k]){
			this.event[k]=[]
		}
		this.event[k].push(callback)
	}
	destory(){
		clearInterval(this.interval)
	}
}

export  {NFCUtils}
