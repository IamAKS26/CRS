// public/profile.js

document.addEventListener('DOMContentLoaded', () => {

    // const studentData = {
    //     fullname: "Priya Sharma",
    //     email: "priya.sharma@example.com",
    //     phone: "9876543210",
    //     city: "Mumbai",
    //     grade10: 92.5,
    //     grade12: 88.7,
    //     stream: "Engineering",
    //     examScore: 96.4
    // };

    const profileForm = document.getElementById('profile-form');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const formInputs = profileForm.querySelectorAll('input, select');
    const toastNotification = document.getElementById('toast-notification');
    
    function populateForm() {
        document.getElementById('fullname').value = studentData.fullname;
        document.getElementById('email').value = studentData.email;
        document.getElementById('phone').value = studentData.phone;
        document.getElementById('city').value = studentData.city;
        document.getElementById('grade10').value = studentData.grade10;
        document.getElementById('grade12').value = studentData.grade12;
        document.getElementById('stream').value = studentData.stream;
        document.getElementById('examScore').value = studentData.examScore;

        document.getElementById('profile-name-display').textContent = studentData.fullname;
        document.getElementById('profile-email-display').textContent = studentData.email;
    }
    
    
    function toggleEditMode(isEditing) {
        if (isEditing) {
            profileForm.classList.add('is-editing');
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            formInputs.forEach(input => input.disabled = false);
        } else {
            profileForm.classList.remove('is-editing');
            saveButton.style.display = 'none';
            editButton.style.display = 'inline-block';
            formInputs.forEach(input => input.disabled = true);
        }
    }
    
    function showToast(message) {
        toastNotification.textContent = message;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }
    
    editButton.addEventListener('click', () => {
        toggleEditMode(true);
    });
    
    profileForm.addEventListener('submit', (e) => e.preventDefault());
    saveButton.addEventListener('click', () => {
        console.log('Saving profile data...');
        studentData.fullname = document.getElementById('fullname').value;
        studentData.email = document.getElementById('email').value;

        populateForm();
        toggleEditMode(false);
        showToast('Profile saved successfully!');
    });
    
    populateForm();

});