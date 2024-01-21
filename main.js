
function switch_mode(){
    document.body.classList.toggle('dark')
    document.body.classList.toggle('light')
}

function tgl_drp() {
    document.getElementById("filter-dp").classList.toggle("vism");
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains('dropdown') == false
        && document.querySelector(".dropdown").contains(event.target) == false) {
        document.getElementById("filter-dp").classList.remove("vism");
    }

});

let cr = 'Asia', ce = document.querySelector('.dropdown-content').children[2]

function load_region(elem, rg = 'Asia', injs = false) {
    cr = rg
    fetch('https://restcountries.com/v3.1/region/' + cr)
        .then((response) => response.json())
        .then((json) => {

            load_container(json)

        });
    if (!injs) {
        elem.classList.toggle('d-active')
        ce.classList.toggle('d-active')
        ce = elem
    }
}

function filter_name(name) {
    if (event.key === 'Enter') {
        if (name == '') { load_region(null, cr, true) }
        else {
            fetch('https://restcountries.com/v3.1/name/' + name)
                .then((response) => response.json())
                .then((json) => {
                    load_container(json)


                });
        }
    }
}

function load_container(data) {
    document.getElementById('ctc').innerHTML = ''
    for (const [k, v] of Object.entries(data)) {
        let html = `<section class="country">
                        <img src="`+ v.flags.svg + `" alt="` + v.name.common + `">
                        <h3 onclick="load_detail('`+ v.name.common + `')">` + v.name.common + `</h3>
                        <p>Population: <span>`+ v.population.toLocaleString('en-US') + `</span></p>
                        <p>Region: <span>`+ v.region + `</span></p>
                        <p>Capital: <span>`+ v.capital + `</span></p>
                    </section>`
        document.getElementById('ctc').innerHTML += html
    }
}

function load_detail(name) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    fetch('https://restcountries.com/v3.1/translation/' + name)
                .then((response) => response.json())
                .then((json) => {
                    for(const [k,v] of Object.entries(json)){
                        if(v.name.common == name){
                            document.getElementById('cdi').src = v.flags.svg
                            document.getElementById('cdi').alt = v.flags.atl
                            document.getElementById('cdh').innerHTML = v.name.common
                            document.getElementById('cdn').children[0].innerHTML = Object.values(v.name.nativeName)[0].official
                            document.getElementById('cdp').children[0].innerHTML = v.population.toLocaleString('en-US')
                            document.getElementById('cdr').children[0].innerHTML = v.region
                            document.getElementById('cds').children[0].innerHTML = v.subregion
                            document.getElementById('cdc').children[0].innerHTML = v.capital
                            document.getElementById('cdt').children[0].innerHTML = v.tld
                            document.getElementById('cdm').children[0].innerHTML = Object.keys(v.currencies)[0]
                            document.getElementById('cdl').children[0].innerHTML=''
                            let lg =[]
                            for(const [a,b] of Object.entries(v.languages)){
                                lg.push(b)
                                
                            }
                            document.getElementById('cdl').children[0].innerHTML = lg.join(', ')
                            let html =''
                            document.getElementById('bdc').innerHTML = ''
                            for(const [a,b] of Object.entries(v.borders)){
                                html+=`<section class="bc"> <p>`+b+`</p> </section>`
                            }
                            document.getElementById('bdc').insertAdjacentHTML('beforeend',html)
                            break
                        }
                    }


                });
    tgl_detail()
}

function tgl_detail() {
    document.getElementById('detail-cc').classList.toggle('vism')
}

load_region(null, cr, true)