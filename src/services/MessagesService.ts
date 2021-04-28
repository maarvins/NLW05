import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

//ao colocar o ponto de interrogação antes da definição, estou dizendo que minha aplicação ira rodar com ou sem o objeto em específico. 
interface IMessageCreate {
  admin_id?: string;//opcional
  text: string;
  user_id: string;
}


class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: IMessageCreate) {
        
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id
    });

    await this.messagesRepository.save(message);
    return message;
  }

  async listByUser(user_id: string) {
    
    //levar informações adicionais do usuario na mensagem, como email, nomes, etc... utilizando where e relations
    const list = await this.messagesRepository.find({
      where: {user_id},
      relations: ["user"],
    });

    return list; 
  }
}

export{MessagesService};