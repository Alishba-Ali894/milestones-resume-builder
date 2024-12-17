interface ResumeData {
    username: string;
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
}

class ResumePage {
    private form: HTMLFormElement;
    private formContainer: HTMLDivElement;
    private resumeOutput: HTMLDivElement;
    private resumeContent: HTMLDivElement;
    private shareButton: HTMLButtonElement;
    private downloadButton: HTMLButtonElement;
    private editButton: HTMLButtonElement;

    constructor() {
        this.form = document.getElementById('resumeForm') as HTMLFormElement;
        this.formContainer = document.getElementById('formContainer') as HTMLDivElement;
        this.resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
        this.resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
        this.shareButton = document.getElementById('shareButton') as HTMLButtonElement;
        this.downloadButton = document.getElementById('downloadButton') as HTMLButtonElement;
        this.editButton = document.getElementById('editButton') as HTMLButtonElement;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.shareButton.addEventListener('click', this.handleShare.bind(this));
        this.downloadButton.addEventListener('click', this.handleDownload.bind(this));
        this.editButton.addEventListener('click', this.handleEdit.bind(this));
        this.setupEditableFields();
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        const formData = new FormData(this.form);
        const resumeData: ResumeData = {
            username: formData.get('username') as string,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: formData.get('education') as string,
            experience: formData.get('experience') as string,
            skills: formData.get('skills') as string
        };
        this.generateResume(resumeData);
        this.formContainer.classList.add('hidden');
        this.resumeOutput.classList.remove('hidden');
        history.pushState(null, '', `/${resumeData.username}`);
    }

    private generateResume(data: ResumeData): void {
        const resumeName = document.getElementById('resumeName') as HTMLHeadingElement;
        const resumeContact = document.getElementById('resumeContact') as HTMLParagraphElement;
        const educationContent = document.getElementById('educationContent') as HTMLDivElement;
        const experienceContent = document.getElementById('experienceContent') as HTMLDivElement;
        const skillsContent = document.getElementById('skillsContent') as HTMLDivElement;

        resumeName.textContent = data.name;
        resumeContact.textContent = `${data.email} | ${data.phone}`;
        educationContent.innerHTML = data.education;
        experienceContent.innerHTML = data.experience;
        skillsContent.innerHTML = data.skills;
    }

    private setupEditableFields(): void {
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

    private handleShare(): void {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Resume URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    }

    private handleDownload(): void {
        const element = this.resumeContent;
        html2pdf().from(element).save('resume.pdf');
    }

    private handleEdit(): void {
        this.formContainer.classList.remove('hidden');
        this.resumeOutput.classList.add('hidden');
        history.pushState(null, '', '/');
    }
}

new ResumePage();