

// DTO são objetos que representam os dados que serão enviados para o service, eles são utilizados para validação de dados

interface ITemplateVariables {
  [key: string]: string | number; //esta interface define que todos os valores que vão ser passados para o template devem ser do tipo string ou number
}

export default interface IParseMailTemplateDTO {

    file: string;
    variables: ITemplateVariables;

}
