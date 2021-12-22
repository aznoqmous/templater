import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { Template } from './template.schema';
import { TemplatesService } from './template.service';

@Controller("templates")
export class TemplateController {
    constructor(
        private templatesService: TemplatesService
    ){}

    @Get()
    @Render('template-list')
    async index(){
        let templates = await this.templatesService.findAll()
        return {
            templates
        };
    }

    @Get("/create")
    async createForm(@Res() res){
        let template = await this.templatesService.create(
            "New Template " + Date.now(), 
            ""
        )
        return res.redirect(`/templates/${template._id}`)
    }

    @Post("/create")
    async create(@Req() request: Request, @Res() res){
        await this.templatesService.create(
            request.body.name, 
            request.body.content
        )
        return res.redirect("/templates")
    }
    
    @Get("/generate/:id")
    @Render("template-generate")
    async generateForm(@Req() request: Request){
        return {
            template: await this.templatesService.findById(request.params.id)
        }
    }

    
    @Get("/:id/delete")
    async delete(@Req() request: Request, @Res() res){
        let template = await this.templatesService.findById(request.params.id)
        await template.delete()
        return res.redirect("/templates")
    }

    @Get("/:id")
    @Render("template-edit")
    async editForm(@Req() request: Request){
        return {
            template: await this.templatesService.findById(request.params.id)
        }
    }
    @Post("/:id")
    async update(@Req() request: Request){
        return await this.templatesService.update(request.params.id, request.body);
    }

}
