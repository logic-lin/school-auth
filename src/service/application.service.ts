import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entity/application';

@Provide()
export class ApplicationService {
  @InjectEntityModel(Application)
  applicationModel: Repository<Application>;

  async getApplicationById(id: string) {
    return await this.applicationModel.findOne({ where: { id } });
  }

  async createApplication(application: Partial<Application>) {
    return await this.applicationModel.save(application);
  }

  async getApplicationList(user_id: string) {
    return await this.applicationModel.find({
      where: {
        user_id,
      },
    });
  }
}
