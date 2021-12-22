import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './template.schema';

@Injectable()
export class TemplatesService {
    constructor(
        @InjectModel(Template.name) private templateModel: Model<TemplateDocument>
    ){}

    async create(name: String, content: String){
        let template = new this.templateModel({
            name, 
            content,
            createdAt: Date.now()
        })
        await template.save()
        return template
    }
    async update(_id, data: any){
        let template = await this.findById(_id)
        template.set({
            ...data,
            updatedAt: Date.now()
        })
        await template.save()
        return template
    }

    async findAll(): Promise<Template[]> {
        return await this.templateModel.find();
    }
    async findById(_id){
        return await this.templateModel.findOne({_id})
    }

}