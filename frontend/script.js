"use strict";
const toggleSignInBtn = document.querySelector("#toggle-sign-in");
const toggleRegisterBtn = document.querySelector("#toggle-register");
const signInForm = document.querySelector("#sign-in-form");
const registerForm = document.querySelector("#register-form");
const signOutBtn = document.querySelector("#sign-out-btn");
const welcomeHeader = document.querySelector("#welcome-header");
const displayUserList = document.querySelector("#user-list");
const displayAnnouncementList = document.querySelector("#announcement-list");
const displayOverlay = document.querySelector("#overlay");
const announcementBtn = document.querySelector("#announcement-btn");
const announcementFormContainer = document.querySelector("#announcement-form-container");
const announcementForm = document.querySelector("#announcement-form");
const announcementCancelBtn = document.querySelector("#announcement-cancel-btn");
const announcementSubmitBtn = document.querySelector("#announcement-submit-btn");
const announcementHeaderInput = document.querySelector("#announcement-header");
const announcementMessageInput = document.querySelector("#announcement-message");
const announcementFormHeader = document.querySelector("#announcement-form-header");
let user = localStorage.getItem("user") || "";
let userList = [];
async function fetchAnnouncements() {
    try {
        const response = await fetch("http://127.0.0.1:8000/announcements/");
        if (!response.ok)
            throw new Error("Failed to fetch announcements");
        const announcements = await response.json();
        displayAnnouncementList.innerHTML = "";
        announcements
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .forEach((a) => {
            var _a, _b;
            const li = document.createElement("li");
            li.className = "list-group-item d-flex flex-column mb-1 shadow position-relative";
            li.dataset.id = a.id.toString();
            const actionButtons = user === a.username
                ? `
                        <div class="action-btns position-absolute top-0 end-0 m-2 d-none">
                            <button class="btn btn-sm btn-light border-0 bg-transparent delete-btn me-1">
                                <span class="material-symbols-outlined text-dark">delete</span>
                            </button>
                            <button class="btn btn-sm btn-light border-0 bg-transparent edit-btn">
                                <span class="material-symbols-outlined text-dark">edit</span>
                            </button>
                        </div>`
                : "";
            li.innerHTML = `
                    ${actionButtons}
                    <h5 class="fw-semi-bold border-bottom p-2">${a.header}</h5>
                    <p class="pt-1">${a.message}</p>
                    <div class="d-flex justify-content-between">
                        <small class="text-muted mt-2 posted-by">Posted by: ${a.username}</small>
                        <small class="text-muted mt-2 fst-italic date-text align-self-start">
                            ${new Date(a.created_at).toLocaleString()}
                        </small>
                    </div>
                `;
            displayAnnouncementList.appendChild(li);
            if (user === a.username) {
                // bootstrap-like hover toggle
                li.addEventListener("mouseenter", () => {
                    var _a, _b;
                    (_a = li.querySelector(".action-btns")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none");
                    (_b = li.querySelector(".action-btns")) === null || _b === void 0 ? void 0 : _b.classList.add("d-inline-flex");
                });
                li.addEventListener("mouseleave", () => {
                    var _a, _b;
                    (_a = li.querySelector(".action-btns")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-inline-flex");
                    (_b = li.querySelector(".action-btns")) === null || _b === void 0 ? void 0 : _b.classList.add("d-none");
                });
                (_a = li.querySelector(".delete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => deleteAnnouncement(a.id));
                (_b = li.querySelector(".edit-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => openEditForm(a.id, a.header, a.message));
            }
        });
    }
    catch (error) {
        console.error("Error fetching announcements:", error);
    }
}
window.onload = async () => {
    if (user) {
        welcomeHeader.textContent = `Welcome ${user}`;
    }
    else {
        welcomeHeader.textContent = `Welcome Guest`;
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/users/");
        if (!response.ok)
            throw new Error("Failed to fetch users");
        const data = await response.json();
        data.forEach((userObj) => {
            userList.push(userObj.username);
        });
        displayUserList.innerHTML = "";
        userList.forEach(username => {
            const li = document.createElement("li");
            li.textContent = username;
            li.className = "list-group-item ";
            displayUserList.appendChild(li);
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
    }
    await fetchAnnouncements();
};
signOutBtn === null || signOutBtn === void 0 ? void 0 : signOutBtn.addEventListener('click', () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
});
toggleSignInBtn === null || toggleSignInBtn === void 0 ? void 0 : toggleSignInBtn.addEventListener('click', () => {
    signInForm === null || signInForm === void 0 ? void 0 : signInForm.classList.add("d-flex");
    signInForm === null || signInForm === void 0 ? void 0 : signInForm.classList.remove("d-none");
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.add("d-none");
});
toggleRegisterBtn === null || toggleRegisterBtn === void 0 ? void 0 : toggleRegisterBtn.addEventListener('click', () => {
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.add("d-flex");
    registerForm === null || registerForm === void 0 ? void 0 : registerForm.classList.remove("d-none");
    signInForm === null || signInForm === void 0 ? void 0 : signInForm.classList.add("d-none");
});
registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        }),
    });
    const data = await response.json();
    if (!response.ok) {
        alert("Registration failed: " + JSON.stringify(data));
        return;
    }
    user = data.username;
    localStorage.setItem("user", user);
    window.location.href = "home.html";
});
signInForm === null || signInForm === void 0 ? void 0 : signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = (document.querySelector("#sign-in-username")).value;
    const password = (document.querySelector("#sign-in-password")).value;
    const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    if (response.ok) {
        user = data.username;
        localStorage.setItem("user", user);
        window.location.href = "home.html";
    }
    else {
        alert("Login failed: " + JSON.stringify(data));
    }
});
announcementCancelBtn === null || announcementCancelBtn === void 0 ? void 0 : announcementCancelBtn.addEventListener("click", () => {
    displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.add("d-none");
    displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.remove("d-flex");
});
announcementBtn === null || announcementBtn === void 0 ? void 0 : announcementBtn.addEventListener("click", () => {
    announcementFormHeader.textContent = "New Announcement";
    announcementHeaderInput.value = "";
    announcementMessageInput.value = "";
    displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.remove("d-none");
    displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.add("d-flex");
    announcementSubmitBtn.onclick = async (e) => {
        e.preventDefault();
        const header = announcementHeaderInput.value.trim();
        const message = announcementMessageInput.value.trim();
        const currentUser = localStorage.getItem("user") || "";
        if (!header || !message) {
            alert("Please fill in both header and message.");
            return;
        }
        if (!currentUser) {
            alert("You must be signed in to post an announcement.");
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/announcements/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ header, message, username: currentUser }),
            });
            const data = await response.json();
            if (!response.ok) {
                alert("Failed to post announcement: " + JSON.stringify(data));
                return;
            }
        }
        catch (error) {
            console.error("Error posting announcement:", error);
        }
        displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.add("d-none");
        displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.remove("d-flex");
        announcementHeaderInput.value = "";
        announcementMessageInput.value = "";
        await fetchAnnouncements();
    };
});
async function editAnnouncement(announcementId, newHeader, newMessage) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/update/${announcementId}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ header: newHeader, message: newMessage, username: user })
        });
        const data = await response.json();
        if (!response.ok) {
            alert("Failed to edit announcement: " + JSON.stringify(data));
            return;
        }
    }
    catch (error) {
        console.error("Error editing announcement:", error);
    }
    await fetchAnnouncements();
}
function openEditForm(id, oldHeader, oldMessage) {
    announcementFormHeader.textContent = "Edit Announcement";
    announcementHeaderInput.value = oldHeader;
    announcementMessageInput.value = oldMessage;
    displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.remove("d-none");
    displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.add("d-flex");
    announcementSubmitBtn === null || announcementSubmitBtn === void 0 ? void 0 : announcementSubmitBtn.addEventListener("click", async function handler(e) {
        e.preventDefault();
        await editAnnouncement(id, announcementHeaderInput.value, announcementMessageInput.value);
        displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.add("d-none");
        displayOverlay === null || displayOverlay === void 0 ? void 0 : displayOverlay.classList.remove("d-flex");
        announcementFormHeader.textContent = "New Announcement";
        announcementSubmitBtn === null || announcementSubmitBtn === void 0 ? void 0 : announcementSubmitBtn.removeEventListener("click", handler);
    });
}
async function deleteAnnouncement(announcementId) {
    if (!confirm("Are you sure you want to delete this announcement?"))
        return;
    try {
        const response = await fetch(`http://127.0.0.1:8000/delete/${announcementId}/`, {
            method: "DELETE"
        });
        if (!response.ok) {
            alert("Failed to delete announcement");
            return;
        }
    }
    catch (error) {
        console.error("Error deleting announcement:", error);
    }
    await fetchAnnouncements();
}
