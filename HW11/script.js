$(document).ready(function () {

    $.getJSON("countries.json", function (data) {

        $.each(data.countries, function (index, country) {

            let euStatus = country.eu_member ? "EU Member" : "Not in EU";
            let euClass = country.eu_member ? "eu" : "non-eu";

            let card = `
                <div class="country-card ${euClass}">
                    <h3>${country.name}</h3>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Area:</strong> ${country.area_km2.toLocaleString()} km²</p>
                    <p><strong>Currency:</strong> ${country.currency}</p>
                    <p><strong>Status:</strong> ${euStatus}</p>
                </div>
            `;

            $("#countries-container").append(card);
        });

        $(".country-card").highlightOnHover();

    });

});


/* =========================
   CUSTOM JQUERY PLUGIN
========================= */

$.fn.highlightOnHover = function () {
    return this.each(function () {

        $(this).hover(
            function () {
                $(this).css({
                    "background-color": "#e0f7fa",
                    "transform": "scale(1.03)",
                    "transition": "0.3s"
                });
            },
            function () {
                $(this).css({
                    "background-color": "white",
                    "transform": "scale(1)"
                });
            }
        );

    });
};