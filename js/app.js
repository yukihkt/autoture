// Redirect to login page if user directly access in-app pages without logging in
const path = window.location.pathname;
const currentPage = path.split("/").pop();
const pages = ['index.html', 'login.html', 'sign-up.html', 'signup-confirmation.html']

if (!pages.includes(currentPage)) {
    const sessionIdentity = sessionStorage.getItem('token');
    if (currentPage != "login.html" && sessionIdentity == null) {
        window.location.replace("login.html");
    }
}

if (currentPage === 'login.html') {
    const accountIdentity = sessionStorage.getItem("role");
    const token = sessionStorage.getItem('token')
    if (accountIdentity == "business" && token != null) {
        window.location.replace("freelancer.html");
    } 
}

function goToHome() {
    const accountIdentity = sessionStorage.getItem("role");
    if (accountIdentity == "user" && token != null) {
        window.location.replace("freelancer.html");
    } else {
        window.location.replace("login.html");
    }
}

function routeToPage(place) {
    const accountIdentity = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");
    if (accountIdentity == "business" && token != null && place=="freelancer") {
        window.location.replace("freelancer.html");
    } else if (accountIdentity == "business" && token != null && place=="client") {
        window.location.replace("client.html");
    } else  {
        window.location.replace("login.html");
    }


    // if (place == "freelancer") {
    //     window.location.replace("freelancer.html");
    // } else if (place == "client") {
    //     window.location.replace("client.html");
    // } else if (place == "login") {
    //     window.location.replace("login.html");
    // }
}


async function logout() {
    let identity = sessionStorage.getItem('role')
    let username = sessionStorage.getItem('username')

    sessionStorage.clear();
    window.location.replace("login.html");
}