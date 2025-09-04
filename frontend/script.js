var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var toggleSignInBtn = document.querySelector("#toggle-sign-in");
var toggleRegisterBtn = document.querySelector("#toggle-register");
var signInForm = document.querySelector("#sign-in-form");
var registerForm = document.querySelector("#register-form");
var signOutBtn = document.querySelector("#sign-out-btn");
var welcomeHeader = document.querySelector("#welcome-header");
var displayUserList = document.querySelector("#user-list");
var user = localStorage.getItem("user") || "";
var userList = [];
window.onload = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (user) {
                    welcomeHeader.textContent = "Welcome ".concat(user);
                }
                else {
                    welcomeHeader.textContent = "Welcome Guest";
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://127.0.0.1:8000/users/")];
            case 2:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to fetch users");
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                data.forEach(function (userObj) {
                    userList.push(userObj.username);
                });
                displayUserList.innerHTML = "";
                userList.forEach(function (username) {
                    var li = document.createElement("li");
                    li.textContent = username;
                    li.className = "list-group-item ";
                    displayUserList.appendChild(li);
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error fetching users:", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
signOutBtn === null || signOutBtn === void 0 ? void 0 : signOutBtn.addEventListener('click', function () {
    localStorage.removeItem("user");
    window.location.href = "index.html";
});
toggleSignInBtn === null || toggleSignInBtn === void 0 ? void 0 : toggleSignInBtn.addEventListener('click', function () {
    signInForm === null || signInForm === void 0 ? void 0 : signInForm.classList.add("d-flex");
    signInForm === null || signInForm === void 0 ? void 0 : signInForm.classList.remove("d-none");
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.add("d-none");
});
toggleRegisterBtn === null || toggleRegisterBtn === void 0 ? void 0 : toggleRegisterBtn.addEventListener('click', function () {
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.add("d-flex");
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.remove("d-none");
    signInForm === null || signInForm === void 0 ? void 0 : signInForm.classList.add("d-none");
});
registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var username, password, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                username = document.querySelector("#username").value;
                password = document.querySelector("#password").value;
                return [4 /*yield*/, fetch("http://127.0.0.1:8000/register/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (!response.ok) {
                    alert("Registration failed: " + JSON.stringify(data));
                    return [2 /*return*/];
                }
                user = data.username;
                localStorage.setItem("user", user);
                window.location.href = "home.html";
                return [2 /*return*/];
        }
    });
}); });
signInForm === null || signInForm === void 0 ? void 0 : signInForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var username, password, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                username = (document.querySelector("#sign-in-username")).value;
                password = (document.querySelector("#sign-in-password")).value;
                return [4 /*yield*/, fetch("http://127.0.0.1:8000/login/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                        }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (response.ok) {
                    user = data.username;
                    localStorage.setItem("user", user);
                    window.location.href = "home.html";
                }
                else {
                    alert("Login failed: " + JSON.stringify(data));
                }
                return [2 /*return*/];
        }
    });
}); });
