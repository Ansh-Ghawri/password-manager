// Get form elements
const websiteInput = document.getElementById('website');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const form = document.getElementById('passwordForm');

function maskPassword(pass){
    return "*".repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => e.website != website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show";
    } else {
        tb.innerHTML = `
            <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;
        let arr = JSON.parse(data);
        let str = arr.map(element => `
            <tr>
                <td>${element.website} <button onclick="copyText('${element.website}')" class="copy-btn">Copy</button></td>
                <td>${element.username} <button onclick="copyText('${element.username}')" class="copy-btn">Copy</button></td>
                <td>${maskPassword(element.password)} <button onclick="copyText('${element.password}')" class="copy-btn">Copy</button></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`
        ).join('');
        tb.innerHTML += str;
    }
    
    // Clear form
    websiteInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
}

// Initialize
showPasswords();

// Form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    const newEntry = {
        website: websiteInput.value,
        username: usernameInput.value,
        password: passwordInput.value
    };

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];
    json.push(newEntry);
    
    localStorage.setItem("passwords", JSON.stringify(json));
    alert("Password Saved");
    showPasswords();
});