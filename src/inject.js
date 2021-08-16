const betterOrgChart = document.createElement('a');
betterOrgChart.innerHTML += "Better Org Chart";
betterOrgChart.onclick = function() {
    document.getElementById("content").style.width="auto";
    document.getElementById("people-subheader").querySelector('.on').className="off"; 
    document.getElementById("content").firstChild.firstChild.classList.add("layout-1c");
    betterOrgChart.className="on"; 
    var peoplePage = document.getElementById("people-page");
    peoplePage.removeAttribute("class"); 
    peoplePage.innerHTML = "<div id=\"BetterOrgChart\"></div>";


    fetch('/organization_chart_profiles',{credentials: 'include'})
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            response.json().then(function(data) {
                const orgnodes = data.people.map(elm => ({ id: elm.id, pid: elm.parent_id, name: elm.full_name, title: elm.job_title, img: elm.img_75_cdn}));
                var chart = new OrgChart(document.getElementById("BetterOrgChart"), {
                    //template: "rony",
                    scaleInitial: OrgChart.match.boundary,
                    layout: OrgChart.mixed,
                    enableDragDrop: true,
                    menu: {
                        pdf: { text: "Export PDF" },
                        png: { text: "Export PNG" },
                        svg: { text: "Export SVG" },
                        csv: { text: "Export CSV" }
                    },
                    nodeMenu: {
                        details: { text: "Details" },
                        add: { text: "Add New" },
                        edit: { text: "Edit" },
                        remove: { text: "Remove" },
                    },
                    nodeBinding: {
                        field_0: "name",
                        field_1: "title",
                        img_0: "img",
                        field_number_children: "field_number_children"
                    },
                    collapse: {
                        level: 1,
                        allChildren: true
                    },
                    collapse: {
                        level: 0,
                        allChildren: true
                    },
                    expand: {
                        nodes: ["079a97e4-3b16-40f2-8990-8bb672a54bd8","609d5731-2eb1-4a96-ada5-ead96f21afaa","09c4cd84-2024-4b23-b164-9c0bf0a2f7c1"],
                        allChildren: true
                    },
                    nodes: orgnodes
                });

            });
            }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

};

document.getElementById("people-subheader").firstChild.appendChild(betterOrgChart);




