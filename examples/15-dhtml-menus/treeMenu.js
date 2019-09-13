function treeMenu(navid, indexpage)
{
	if (typeof document.getElementById == 'undefined') { return; }

	var rollover = new Image;
	rollover.src = 'down-red.gif';
	rollover = new Image;
	rollover.src = 'minus.gif';

	var tree = document.getElementById(navid);
	if (tree)
	{
		var items = tree.getElementsByTagName('li');
		for (var i = 0; i < items.length; i++)
		{
			treeTrigger(tree, items[i], navid);
		}

		if (navigator.vendor == 'Apple Computer, Inc.'
				|| typeof window.opera != 'undefined')
		{
			displayReset(tree);
		}

		findHere(tree, navid, indexpage);
	}
}

var isreset = false;

function displayReset(tree)
{
	var menus = tree.getElementsByTagName('ul');
	for (var i = 0; i < menus.length; i++)
	{
		if (menus[i].style.position != 'static')
		{
			menus[i].style.display = 'none';
		}
		menus[i].style.position = 'static';
	}
	isreset = true;
}

function treeTrigger(tree, li, navid)
{
	var a = li.getElementsByTagName('a')[0];
	var menu = li.getElementsByTagName('ul').length > 0
		? li.getElementsByTagName('ul')[0] : null;

	if (menu)
	{
		li.className += (li.className == '' ? '' : ' ') + 'hasmenu';
	}

	li.onclick = function(e)
	{
		var target = e ? e.target : window.event.srcElement;
		while (target.nodeName.toUpperCase() != 'LI')
		{
			target = target.parentNode;
		}
		if (target == this && isreset)
		{
			if (menu)
			{
				if (menu.style.display == 'none')
				{
					clearSiblingBranches(this);
					menu.style.display = 'block';
					a.className += (a.className=='' ? '' : ' ') + 'rollover';
				}
				else
				{
					menu.style.display = 'none';
					a.className = a.className.replace(/ ?rollover/g, '');
				}
				return false;
			}
			else
			{
				return true;
			}
		}
	};

	attachEventListener(a, 'keyup', function(e)
	{
		if (!isreset && e.keyCode == 9)
		{
			displayReset(tree);
		}
	}, false);

	var moves = 0;
	attachEventListener(a, 'mousemove', function()
	{
		if (!isreset)
		{
			moves++;
			if (moves > 2) { displayReset(tree); }
		}
	}, false);
}

function clearSiblingBranches(trigger)
{
	var menus = trigger.parentNode.getElementsByTagName('ul');
	for (var i = 0; i < menus.length; i++)
	{
		menus[i].style.display = 'none';

		var a = menus[i].parentNode.getElementsByTagName('a')[0];
		if (a)
		{
			a.className = a.className.replace(/ ?rollover/g, '');
		}
	}
}

function findHere(tree, navid, indexpage)
{
	var page = document.location.href;
	page = page.replace(indexpage, '').replace(/,/g,'%2C');

	var links = tree.getElementsByTagName('a');
	var matches = [];
	for (var i = 0; i < links.length; i++)
	{
		var href = links[i].href;
		if (href && !/[a-z]+\:\/\//.test(href))
		{
			matches = [];
			break;
		}

		href = href.replace(indexpage, '').replace(/,/g,'%2C');
		if (href != '' && page.indexOf(href) != -1)
		{
			matches[matches.length] = links[i];
		}
	}
	if (matches.length < 1) { return; }

	var probabilities = [];
	for (i = 0; i < matches.length; i++)
	{
		href = matches[i].href;
		probabilities[i] = [0, href];

		for (var j = 0; j < href.length; j++)
		{
			if (href.charAt(j) == page.charAt(j))
			{
				probabilities[i][0]++;
			}
		}
	}

	probabilities.sort(compare);
	href = probabilities[0][1];

	for (i = 0; i < links.length; i++)
	{
		if (links[i].href == href)
		{
			youAreHere(links[i], href, navid);
			break;
		}
	}
}

function compare(a, b)
{
	return b[0] - a[0];
}

function youAreHere(link, href, navid)
{
	link.className += (link.className == '' ? '' : ' ') + 'rollover';

	var li = link.parentNode;
	var menu = li.getElementsByTagName('ul').length > 0
		? li.getElementsByTagName('ul')[0] : null;

	if (menu)
	{
		menu.style.display = 'block';
		menu.style.position = 'static';
	}

	var text = (link.getAttribute('title') && link.title != '')
		? link.title : link.firstChild.nodeValue;

	link.title = text + (link.href == href
		? ' [you are here]' : ' [you\'re in this section]');

	if (li.parentNode.id != navid)
	{
		link = li.parentNode.parentNode.getElementsByTagName('a')[0];
		youAreHere(link, href, navid);
	}
}

function attachEventListener(target, eventType, functionRef, capture)
{
	if (typeof target.addEventListener != 'undefined')
	{
		target.addEventListener(eventType, functionRef, capture);
	}
	else if (typeof target.attachEvent != 'undefined')
	{
		target.attachEvent('on' + eventType, functionRef);
	}
	else
	{
		eventType = 'on' + eventType;

		if (typeof target[eventType] == 'function')
		{
			var oldListener = target[eventType];

			target[eventType] = function()
			{
				oldListener();

				return functionRef();
			}
		}
		else
		{
			target[eventType] = functionRef;
		}
	}
	
	return true;
}

function addLoadListener(fn)
{
	if (typeof window.addEventListener != 'undefined')
	{
		window.addEventListener('load', fn, false);
	}
	else if (typeof document.addEventListener != 'undefined')
	{
		document.addEventListener('load', fn, false);
	}
	else if (typeof window.attachEvent != 'undefined')
	{
		window.attachEvent('onload', fn);
	}
	else
	{
		var oldfn = window.onload;
		if (typeof window.onload != 'function')
		{
			window.onload = fn;
		}
		else
		{
			window.onload = function()
			{
				oldfn();
				fn();
			};
		}
	}
}

addLoadListener(function() { treeMenu('navigation', 'index.html'); });
