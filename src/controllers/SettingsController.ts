//a partir da rota, chamamos o controller...
//controller é responsavel por acessar repositorio, por fazer toda parte de acesso e criação de dados...



import { Request, Response} from "express";
import {SettingsService} from "../services/SettingsService";



class SettingsController {
  async create(request: Request, response: Response) {
    const {chat, username} = request.body;

    const settingsService = new  SettingsService();

  //colocando requisição e retorno dentro de um Try com o catch ...dentro do catch será colocada tratativa em caso de algum erro...
  //tentar cadastrar, e retornar algo... exemplo, cadastro de cliente. Em caso de ja estiver cadastrado, utilizar catch para tratar.
  try {
    const settings = await settingsService.create({chat, username});

    return response.json(settings);
  }catch(err) {
    return response.status(400).json({
      message:err.message,

    });
  }

  }
}

export {SettingsController}