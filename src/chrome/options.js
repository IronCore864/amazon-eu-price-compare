function save_options() {
	var showRanks = document.getElementById('show-ranks').checked
	chrome.storage.sync.set({
		showRanks: showRanks
	}, function() {
		var status = document.getElementById('status')
		status.textContent = 'Options saved.'
		setTimeout(() => {status.textContent = ''}, 1000)
	})
}

function restore_options() {
	chrome.storage.sync.get({
		showRanks: false
	}, function(items) {
		console.log(items)
		document.getElementById('show-ranks').checked = items.showRanks
	})
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)