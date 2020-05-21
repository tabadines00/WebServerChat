

var d = new Date();
document.getElementById("time").innerHTML = d;



function searchChat() {
    var input, filter, ul, a, i, txtValue;
    input = document.getElementById("keyinput");
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("chats");
    for (i = 0; i < ul.length; i++) {
        a = ul[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            ul[i].style.display = "";
        } else {
            ul[i].style.display = "none";
        }
    }
}
