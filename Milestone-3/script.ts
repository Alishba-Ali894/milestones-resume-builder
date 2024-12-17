interface ResumeData {
    name: string;
    email: string;
    phone: string;
    degree: string;
    university: string;
    graduationYear: string;
    jobTitle: string;
    company: string;
    workYears: string;
    jobDescription: string;
    skills: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            degree: formData.get('degree') as string,
            university: formData.get('university') as string,
            graduationYear: formData.get('graduationYear') as string,
            jobTitle: formData.get('jobTitle') as string,
            company: formData.get('company') as string,
            workYears: formData.get('workYears') as string,
            jobDescription: formData.get('jobDescription') as string,
            skills: formData.get('skills') as string
        };
        generateResume(resumeData);
    });

    // Real-time update
    form.addEventListener('input', () => {
        const formData = new FormData(form);
        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            degree: formData.get('degree') as string,
            university: formData.get('university') as string,
            graduationYear: formData.get('graduationYear') as string,
            jobTitle: formData.get('jobTitle') as string,
            company: formData.get('company') as string,
            workYears: formData.get('workYears') as string,
            jobDescription: formData.get('jobDescription') as string,
            skills: formData.get('skills') as string
        };
        generateResume(resumeData);
    });
});

function generateResume(data: ResumeData): void {
    const resumeName = document.getElementById('resumeName') as HTMLHeadingElement;
    const resumeContact = document.getElementById('resumeContact') as HTMLParagraphElement;
    const educationContent = document.getElementById('educationContent') as HTMLDivElement;
    const experienceContent = document.getElementById('experienceContent') as HTMLDivElement;
    const skillsContent = document.getElementById('skillsContent') as HTMLDivElement;

    resumeName.textContent = data.name;
    resumeContact.textContent = `${data.email} | ${data.phone}`;

    educationContent.innerHTML = `
        <h3>${data.degree}</h3>
        <p>${data.university}, ${data.graduationYear}</p>
    `;

    experienceContent.innerHTML = `
        <h3>${data.jobTitle}</h3>
        <p>${data.company}, ${data.workYears} years</p>
        <p>${data.jobDescription}</p>
    `;

    const skillsList = data.skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    skillsContent.innerHTML = `<ul>${skillsList}</ul>`;
}