document.getElementById('githubUrl').addEventListener('click',function(e)
{
	let dataUrl = e.currentTarget.getAttribute("data-href");
	if(dataUrl!==undefined || dataUrl != null)
		chrome.tabs.create({url:dataUrl})
});