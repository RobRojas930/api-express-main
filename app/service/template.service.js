const Template = require('../data/models/template.model');

class TemplateService {
    async getAllTemplates() {
        return await Template.find();
    }

    async getTemplateById(id) {
        return await Template.findById(id);
    }

    async createTemplate(data) {
        const template = new Template(data);
        return await template.save();
    }

    async updateTemplate(id, data) {
        return await Template.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteTemplate(id) {
        return await Template.findByIdAndDelete(id);
    }
}

module.exports = TemplateService;
