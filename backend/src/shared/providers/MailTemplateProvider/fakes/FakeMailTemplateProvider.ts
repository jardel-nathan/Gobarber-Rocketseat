import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvider {


  public async parse({variables, file}: IParseMailTemplateDTO): Promise<string> {
    return 'asdads';
  }

}

export default FakeMailTemplateProvider;
