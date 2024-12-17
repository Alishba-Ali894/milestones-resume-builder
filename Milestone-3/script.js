document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var resumeOutput = document.getElementById('resumeOutput');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            degree: formData.get('degree'),
            university: formData.get('university'),
            graduationYear: formData.get('graduationYear'),
            jobTitle: formData.get('jobTitle'),
            company: formData.get('company'),
            workYears: formData.get('workYears'),
            jobDescription: formData.get('jobDescription'),
            skills: formData.get('skills')
        };
        generateResume(resumeData);
    });
    // Real-time update
    form.addEventListener('input', function () {
        var formData = new FormData(form);
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            degree: formData.get('degree'),
            university: formData.get('university'),
            graduationYear: formData.get('graduationYear'),
            jobTitle: formData.get('jobTitle'),
            company: formData.get('company'),
            workYears: formData.get('workYears'),
            jobDescription: formData.get('jobDescription'),
            skills: formData.get('skills')
        };
        generateResume(resumeData);
    });
});
function generateResume(data) {
    var resumeName = document.getElementById('resumeName');
    var resumeContact = document.getElementById('resumeContact');
    var educationContent = document.getElementById('educationContent');
    var experienceContent = document.getElementById('experienceContent');
    var skillsContent = document.getElementById('skillsContent');
    resumeName.textContent = data.name;
    resumeContact.textContent = "".concat(data.email, " | ").concat(data.phone);
    educationContent.innerHTML = "\n        <h3>".concat(data.degree, "</h3>\n        <p>").concat(data.university, ", ").concat(data.graduationYear, "</p>\n    ");
    experienceContent.innerHTML = "\n        <h3>".concat(data.jobTitle, "</h3>\n        <p>").concat(data.company, ", ").concat(data.workYears, " years</p>\n        <p>").concat(data.jobDescription, "</p>\n    ");
    var skillsList = data.skills.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
    skillsContent.innerHTML = "<ul>".concat(skillsList, "</ul>");
}
