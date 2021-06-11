function DOMLoaded(entry) 
{
  document.addEventListener("DOMContentLoaded", entry);
  if (document.readyState === "interactive" || document.readyState === "complete" )
    entry();
}

function InitPrReviewer() 
{
	var prElement = document.getElementById('pull-requests-container');
	if (prElement) 
	{		
		var idCount = 1;
		
		var css = '.zoom { user-select: none; font-size: 20px; cursor: pointer; transition: transform .2s; color:gray;} .zoom:hover { color: green; transform: scale(2);} .checked {background-color: #47BD66 !important; color: whitesmoke} .unchecked {background-color: none !important; color: black}';
		var style = document.createElement('style');

		if (style.styleSheet) 
			style.styleSheet.cssText = css;
		else 
			style.appendChild(document.createTextNode(css));
	
		document.getElementsByTagName('head')[0].appendChild(style);
		
		function UpdateCheckMarks()
		{
			var comments = prElement.getElementsByClassName("comment");

			for (let i = 0; i < comments.length; i++) {
				if(comments[i].id || !comments[i].parentElement.classList.contains('is-root-comment'))
					continue;
				
				comments[i].id = idCount;
				idCount +=1;
				comments[i].parentElement.setAttribute('checked', 'false');
				let header = comments[i].getElementsByClassName("comment-header")[0];
				let appendHtml = "<span class='zoom toggleCommentSpan' parentid='"+comments[i].id+"'>✔</span>";
				header.innerHTML += appendHtml;
				
				header.getElementsByClassName('toggleCommentSpan')[0].onclick = function(e){
					let spanElement = e.target;
					
					let comment = document.getElementById(spanElement.attributes.parentid.value).parentElement;
					if(comment.getAttribute('checked') == 'false')
					{
						comment.classList.remove("unchecked");
						comment.classList.add("checked");
						comment.setAttribute('checked', 'true');
					}
					else
					{
						comment.classList.remove("checked");
						comment.classList.add("unchecked");
						comment.setAttribute('checked', 'false');
					}
				};
			}
		}

		var observer = new MutationObserver(function(mutations) 
		{
			UpdateCheckMarks();
		});

		observer.observe(prElement, 
		{
		  attributes: false,
		  characterData:false,
		  childList: true,
		  subtree: true,
		});
		
		UpdateCheckMarks();
	}
}

DOMLoaded(InitPrReviewer);