/*
    Méthodes d'accès aux services Web API_Server/bookmarks
 */

const apiBaseURL = "http://localhost:5000/api/bookmarks";
const accountBaseUrl = "http://localhost:5000/";
//const apiBaseURL= "https://blushing-imaginary-streetcar.glitch.me/api/bookmarks";
function storeAccessToken(token) {
    localStorage.setItem('access_Token', token);
}
function eraseAccessToken() {
    localStorage.setItem('access_Token', null);
}
function retreiveAccessToken() {
    return localStorage.getItem('access_Token');
}
function getBearerAuthorizationToken() {
    return { 'Authorization': 'Bearer ' + retreiveAccessToken() };
}
function storeLoggedUsername(username) {
    localStorage.setItem('username', username);
}
function storeLoggedEmail(email) {
    localStorage.setItem('email', email);
}
function retreiveLoggedUsername() {
    return localStorage.getItem('username');
}
function retreiveLoggedEmail() {
    return localStorage.getItem('email');
}

function webAPI_GET_ALL(queryString, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + queryString,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: data => { successCallBack(data); console.log("webAPI_GET_ALL - success", data); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_GET_ALL - error");
        }
    });
}

function webAPI_GET(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: data => { successCallBack(data); console.log("webAPI_GET - success", data); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_GET - error");
        }
    });
}

function webAPI_POST(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(); console.log("webAPI_POST - success", data); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_POST - error");
        }
    });
}

function webAPI_PUT(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + data.Id,
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (s) => { successCallBack(); console.log("webAPI_PUT - success", s); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_PUT - error");
        }
    });
}

function webAPI_DELETE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        contentType: 'text/plain',
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
        success: () => { successCallBack(); console.log("webAPI_DELETE - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_DELETE - error");
        }
    });
}

function webAPI_accounts(successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseUrl + "accounts",
        contentType: 'text/plain',
        type: 'GET',
        data: {},
        success: data => { successCallBack(data); console.log("webAPI_account - success", data); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_account - error");
        }
    });
}

function webAPI_login(email, password, successCallBack, errorCallBack) {
    let data = { Email: email, Password: password}
    $.ajax({
        url: accountBaseUrl + "token",
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data); console.log("webAPI_login - success", data); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_login - error");
        }
    });
}

function webAPI_register(account, errorCallBack) {
    $.ajax({
        url: accountBaseUrl + "accounts/register",
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(account),
        success: data => { console.log("webAPI_register - success", data); return data; },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_register - error");
        }
    });
}

function webAPI_change(account, errorCallBack) {
    $.ajax({
        url: accountBaseUrl + "accounts/change",
        contentType: 'application/json',
        type: 'PUT',
        headers: getBearerAuthorizationToken(),
        data: JSON.stringify(account),
        success: data => { console.log("webAPI_change - success", data); return data; },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_change - error");
        }
    });
}

function webAPI_deleteAccount(id, successCallBack,errorCallBack) {
    $.ajax({
        url: accountBaseUrl + "accounts/remove/" + id,
        contentType: 'text/plain',
        type: 'DELETE',
        headers: getBearerAuthorizationToken(),
        success: account => { successCallBack(account); console.log("webAPI_deleteAccount - success", account); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack(errorThrown);
            console.log("webAPI_change - error");
        }
    });
}
