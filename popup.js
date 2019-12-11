//Right after the website loads, we check what was the last state of the switch,
// so we can keep it like that, instead of resetting it to a default value like OFF.
(function () {
	chrome.storage.sync.get({toggle: false}, function(data) {
	  
		chrome.storage.sync.set({toggle: data.toggle}, function() {
			var toggleBtn = document.getElementById('toggleBtnInput');
			toggleBtn.checked = data.toggle;
		});
	});
})();


//Add a "click" listener on the switch that appears on the popup, so with every click we change the value of the variable "toggle"
// stored in the chrome storage, so the javascipt in "content.js" can use it to start/stop the extension
document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('toggleBtn');
    toggleBtn.addEventListener('click', function() {
		chrome.storage.sync.get(['toggle'], function(items) {
		    
		    var toggle = !items.toggle;
		    
		    toggleBtn.value = toggle;
		    toggleBtn.checked = toggle;

    		chrome.storage.sync.set({'toggle': toggle}, function () {
		       // console.log("NewToggle:",toggle)
		    });	    
	    });
    });
});