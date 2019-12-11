
//Listener to check for changes in the storage.
(function () {
    chrome.storage.onChanged.addListener(function (changes,areaName) {

    	if(changes.toggle){
    		if (changes.toggle.newValue)
				start();
			else
				stop();
    	}
    })
    //toggle: false -> default value to keep the extension turned off on the first install,
    // after that it will remember the last "button state" by reading it from the storage
    chrome.storage.sync.get({toggle: false}, function(data) {

		chrome.storage.sync.set({toggle: data.toggle}, function() {
    			if (data.toggle)
					start();
				else
					stop();
		});
	});
})();

//Calls setInterval to call the function that contains the main funcionality every minute.
function start(){

	//console.log("[Gears 5 Autoclicker]==> Autoclicker: ON");
	var interval = setInterval(function() {
		var $questsTabButton = document.querySelector("button[title='Quests']");
		if($questsTabButton){
			$questsTabButton.click(); //Try to open the "quests" tab
		}
		var $closePopUpButton = document.querySelector(".icon-cancel-thin"); 
		if ($closePopUpButton) {
			$closePopUpButton.click(); //Try to close any possible pop-up to clear the screen
		} 
		var $claimRewardButton = document.querySelector(".styles__ClaimReward-ga76s6-0"); 
		if ($claimRewardButton) { 
			$claimRewardButton.click(); //Try to click the actual "claim reward" button
		}
	}, 60000); //60000 -> 60 seconds
	chrome.storage.sync.set({'interval': interval}, function () {
        //console.log("Interval:",interval)
    });

}
//Stop calling the function every minute. For that, we need the ID that the setInterval 
//call returns, so we store it in the start function and recover it here.
function stop(){
	//console.log("[Gears 5 Autoclicker]==> Autoclicker: OFF");
	chrome.storage.sync.get(['interval'], function(items) {
  		clearInterval(items.interval);
    });
}