document.querySelector(".home").addEventListener("click", getHome);
document.querySelector(".about").addEventListener("click", getAbout);
document.querySelector(".contact_link").addEventListener("click", getContact);
let search_form = document.querySelector("form");
search_form.addEventListener("submit", getInfo);
search_form.lastElementChild.addEventListener("click", reset);
let content = document.querySelector(".social-sidebar").nextElementSibling;
let search = document.querySelector("[type='search']");
let search_result = document.querySelector(".search_result");

function getHome(event) {
    document.querySelector(".active").classList.toggle("active");
    event.target.classList.toggle("active");
    let home = ` <h1>Macəra Səni Gözləyir</h1>
                <p>
                    Azərbaycanın qərbində yerləşən Tovuz, həm təbiəti, həm də qədim tarixi ilə macərasevərlərin
                    diqqətini cəlb edən unikal bir məkandır. Yaşıllıqlarla örtülü dağlar, saf bulaqlar, üzüm bağları və
                    qonaqpərvər insanlarla dolu bu diyar, səyahət həvəskarları üçün əsl cənnətdir. Tarixlə maraqlananlar
                    üçün Qədim Gədəbəy yolu, Yanıqlı nekropolu, və Alakol qalası kimi abidələr maraqlı olacaq. Təbii
                    gözəlliklər axtaranlar isə Əsrik meşələrində gəzişə, Zəyəm çayının sahilində dincələ və ya kənd
                    həyatını daha yaxından tanıya bilər. Tovuz həmçinin öz zəngin mətbəxi ilə də seçilir – yerli pendir,
                    təzə meyvə-tərəvəz, və xüsusilə Tovuzun məşhur şərabları sənin zövqünü oxşayacaq.
                </p>

                <button class="btn btn-outline-info">İndi Sifariş Et</button>`;
    document.querySelector(".jumbotron").innerHTML = home;
}

function getAbout(event) {
    document.querySelector(".active").classList.toggle("active");
    event.target.classList.toggle("active");
    fetch("./about.html")
        .then((res) => res.text())
        .then((data) => (content.innerHTML = data));
    // document.querySelector(".jumbotron").innerHTML = about;
}

function getContact(event) {
    document.querySelector(".active").classList.toggle("active");
    event.target.classList.toggle("active");
    fetch("./contact.html")
        .then((res) => res.text())
        .then((data) => (content.innerHTML = data));
}

function getInfo(event) {
    event.preventDefault();
    let search_value = search.value.trim().toLowerCase();
    fetch("./data/travel_recommendation_api.json")
        .then((res) => res.json())
        .then(async (data) => {
            let res = await fetch("./search_result.html");
            let html = await res.text();
            let result = data[search_value];

            if (search_value == "countries") {
                result = result.map((country) => country.cities).flat();
            }

            search_result.innerHTML = result
                .map((r) => {
                    return html
                        .replace("{src}", r.imageUrl)
                        .replace("{name}", r.name)
                        .replace("{description}", r.description)
                        .replace("{img_name}", r.name);
                })
                .join("");
        });
}

function reset(event) {
    event.preventDefault();
    search_result.innerHTML = "";
    search.value = "";
}
