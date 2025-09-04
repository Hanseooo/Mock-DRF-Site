const toggleSignInBtn = document.querySelector("#toggle-sign-in")
const toggleRegisterBtn = document.querySelector("#toggle-register")
const signInForm = document.querySelector("#sign-in-form")
const registerForm = document.querySelector("#register-form")
const signOutBtn = document.querySelector("#sign-out-btn")
const welcomeHeader = document.querySelector("#welcome-header")
const displayUserList = document.querySelector("#user-list")

let user = localStorage.getItem("user") || ""
let userList: string[] = []


window.onload = async () => {
    if (user) {
        welcomeHeader!.textContent = `Welcome ${user}`
    } else {
        welcomeHeader!.textContent = `Welcome Guest`
    }

try {
    const response = await fetch("http://127.0.0.1:8000/users/");
    if (!response.ok) throw new Error("Failed to fetch users");

    const data = await response.json();

    data.forEach((userObj: { username: string }) => {
      userList.push(userObj.username);
    });

    displayUserList!.innerHTML = ""; 
    userList.forEach(username => {
      const li = document.createElement("li");
      li.textContent = username;
      li.className = "list-group-item "; 
      displayUserList!.appendChild(li);
    });

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

signOutBtn?.addEventListener('click', () => {
    localStorage.removeItem("user")
    window.location.href = "index.html"
})

toggleSignInBtn?.addEventListener('click', () => {
    signInForm?.classList.add("d-flex")
    signInForm?.classList.remove("d-none")
    registerForm?.classList.add("d-none")
})
toggleRegisterBtn?.addEventListener('click', () => {
    registerForm?.classList.add("d-flex")
    registerForm?.classList.remove("d-none")
    signInForm?.classList.add("d-none")
})

registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = (document.querySelector("#username") as HTMLInputElement).value
    const password = (document.querySelector("#password") as HTMLInputElement).value
    const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        }),
    })
    const data = await response.json()
    if (!response.ok) {
        alert("Registration failed: " + JSON.stringify(data))
        return
    }
    user = data.username
    localStorage.setItem("user", user)
    window.location.href = "home.html"
})

signInForm?.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = (document.querySelector<HTMLInputElement>("#sign-in-username")!).value
    const password = (document.querySelector<HTMLInputElement>("#sign-in-password")!).value

    const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })

    const data = await response.json()

    if (response.ok) {
        user = data.username
        localStorage.setItem("user", user)
        window.location.href = "home.html"
    } else {
        alert("Login failed: " + JSON.stringify(data))
    }
})