document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("vbButton").addEventListener("click", function() {
        let section = document.getElementById("vbNetSection");
        section.style.display = section.style.display === "none" ? "block" : "none";
    });
});
