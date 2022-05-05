const user = localStorage.getItem("user");
console.log(user);
window.addEventListener("beforeunload", function (e) {
    this.localStorage.setItem("user",'none'); 
});