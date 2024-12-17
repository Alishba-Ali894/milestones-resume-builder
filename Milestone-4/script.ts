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
        setupEditableFields();
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

function setupEditableFields(): void {
    const editableFields = document.querySelectorAll('.editable');
    
    editableFields.forEach((field) => {
        field.addEventListener('click', function(this: HTMLElement) {
            if (!this.classList.contains('editing')) {
                const content = this.innerHTML;
                const input = document.createElement('textarea');
                input.value = content;
                input.classList.add('editable-input');
                this.innerHTML = '';
                this.appendChild(input);
                input.focus();
                this.classList.add('editing');

                input.addEventListener('blur', function() {
                    const updatedContent = this.value;
                    field.innerHTML = updatedContent;
                    field.classList.remove('editing');
                    updateFormField(field.getAttribute('data-field') as string, updatedContent);
                });

                input.addEventListener('keydown', function(e: KeyboardEvent) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.blur();
                    }
                });
            }
        });
    });
}

function updateFormField(fieldName: string, value: string): void {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const field = form.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement;
    
    if (field) {
        field.value = value;
    } else if (fieldName === 'contact') {
        const [email, phone] = value.split(' | ');
        (form.elements.namedItem('email') as HTMLInputElement).value = email;
        (form.elements.namedItem('phone') as HTMLInputElement).value = phone;
    }
}