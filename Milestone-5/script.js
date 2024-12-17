var ResumePage = /** @class */ (function () {
    function ResumePage() {
        this.form = document.getElementById('resumeForm');
        this.formContainer = document.getElementById('formContainer');
        this.resumeOutput = document.getElementById('resumeOutput');
        this.resumeContent = document.getElementById('resumeContent');
        this.shareButton = document.getElementById('shareButton');
        this.downloadButton = document.getElementById('downloadButton');
        this.editButton = document.getElementById('editButton');
        this.setupEventListeners();
    }
    ResumePage.prototype.setupEventListeners = function () {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.shareButton.addEventListener('click', this.handleShare.bind(this));
        this.downloadButton.addEventListener('click', this.handleDownload.bind(this));
        this.editButton.addEventListener('click', this.handleEdit.bind(this));
        this.setupEditableFields();
    };
    ResumePage.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var formData = new FormData(this.form);
        var resumeData = {
            username: formData.get('username'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: formData.get('education'),
            experience: formData.get('experience'),
            skills: formData.get('skills')
        };
        this.generateResume(resumeData);
        this.formContainer.classList.add('hidden');
        this.resumeOutput.classList.remove('hidden');
        history.pushState(null, '', "/".concat(resumeData.username));
    };
    ResumePage.prototype.generateResume = function (data) {
        var resumeName = document.getElementById('resumeName');
        var resumeContact = document.getElementById('resumeContact');
        var educationContent = document.getElementById('educationContent');
        var experienceContent = document.getElementById('experienceContent');
        var skillsContent = document.getElementById('skillsContent');
        resumeName.textContent = data.name;
        resumeContact.textContent = "".concat(data.email, " | ").concat(data.phone);
        educationContent.innerHTML = data.education;
        experienceContent.innerHTML = data.experience;
        skillsContent.innerHTML = data.skills;
    };
    ResumePage.prototype.setupEditableFields = function () {
        var editableFields = document.querySelectorAll('.editable');
        editableFields.forEach(function (field) {
            field.addEventListener('click', function () {
                if (!this.classList.contains('editing')) {
                    var content = this.innerHTML;
                    var input = document.createElement('textarea');
                    input.value = content;
                    input.classList.add('editable-input');
                    this.innerHTML = '';
                    this.appendChild(input);
                    input.focus();
                    this.classList.add('editing');
                    input.addEventListener('blur', function () {
                        var updatedContent = this.value;
                        field.innerHTML = updatedContent;
                        field.classList.remove('editing');
                    });
                    input.addEventListener('keydown', function (e) {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            this.blur();
                        }
                    });
                }
            });
        });
    };
    ResumePage.prototype.handleShare = function () {
        var url = window.location.href;
        navigator.clipboard.writeText(url).then(function () {
            alert('Resume URL copied to clipboard!');
        }).catch(function (err) {
            console.error('Failed to copy URL: ', err);
        });
    };
    ResumePage.prototype.handleDownload = function () {
        var element = this.resumeContent;
        html2pdf().from(element).save('resume.pdf');
    };
    ResumePage.prototype.handleEdit = function () {
        this.formContainer.classList.remove('hidden');
        this.resumeOutput.classList.add('hidden');
        history.pushState(null, '', '/');
    };
    return ResumePage;
}());
new ResumePage();
