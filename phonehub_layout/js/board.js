window.addEventListener("load", function() {
	const myTabs = document.querySelectorAll(".tab_menus > li");
  function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
		const clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		const tabContent = document.querySelectorAll(".tab_content");
		for (i = 0; i < tabContent.length; i++) {
			tabContent[i].classList.remove("active");
		}
		const anchorReference = tabClickEvent.target;
		const activePaneId = anchorReference.getAttribute("href");
		const activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
	}
	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks)
	}
});