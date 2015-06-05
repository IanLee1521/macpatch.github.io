function orderNav() {
    var list,
        section,
        header,
        sections = [],
        lists = {},
        headers = {};

    var navUl = document.querySelectorAll('#navigation ul')[0],
        navLis = document.querySelectorAll('#navigation ul li'),
        tables = document.getElementById('content').getElementsByTagName('table');

    if (!navUl) return;

    for(var i = 0; i < tables.length; i++) {
        tables[i].className = tables[i].className + " table table-bordered table-striped";
    }

    for (var i = 0; i < navLis.length; i++) {
        var order, li = navLis[i];

        if (li.classList.contains('nav-header')) {
            section = li.textContent || li.innerText;
            sections.push(section);
            headers[section] = li;
            continue;
        }

        if (!lists[section]) {
            lists[section] = [];
        }

        order = parseFloat(li.getAttribute('data-order'))
        lists[section].push([order, li]);
    }

    for (var i = 0; i < sections.length; i++) {
        section = sections[i];
        list = lists[section].sort(function(a, b) {
            return a[0] - b[0];
        });

        if (header = headers[section]) {
            navUl.appendChild(header);
        }
        for (var j = 0; j < list.length; j++) {
            navUl.appendChild(list[j][1]);
        }
    }
}

if (document.querySelectorAll) orderNav();