import { Given, When, Then } from '@cucumber/cucumber';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const empresaService = new EmpresaService();

Given('que existe um CNPJ válido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Given('que existe um CNPJ inválido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Given('que já existe empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try {
    empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Existente' });
  } catch (e) {
    // ignore
  }
});

When('eu cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

When('eu tentar cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

Then('o cadastro deve ser bem sucedido', function(this: TestWorld) {
  if (!this.createResult || !this.createResult.ok) throw new Error('esperado sucesso');
});

Then('o cadastro deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.createError) throw new Error('esperado erro');
  if (!this.createError.includes(motivo)) throw new Error(`motivo esperado ${motivo} mas foi ${this.createError}`);
});

When('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

Then('a resposta deve conter razão social {string}', function(this: TestWorld, razao: string) {
  if (!this.queryResult || this.queryResult.razaoSocial !== razao) throw new Error('razão social diferente ou não encontrada');
});

Then('a resposta deve ser vazia', function(this: TestWorld) {
  if (this.queryResult) throw new Error('esperado vazio');
});

Then('a resposta deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (this.queryResult) throw new Error('esperado falha');
});

Then('a resposta não deve expor dados sensíveis', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  if (typeof this.queryResult.cnpj === 'string' && this.queryResult.cnpj.replace(/\D/g, '').length === 14) throw new Error('CNPJ completo exposto');
});

Then('o status da empresa deve ser {string}', function(this: TestWorld, status: string) {
  if (!this.createResult || !this.createResult.company || this.createResult.company.status !== status) throw new Error('status diferente');
});
import { Given, When, Then } from '@cucumber/cucumber';
import { EmpresaService } from '../support/services/empresa.service';
import { TestWorld } from '../support/world';

const empresaService = new EmpresaService();

Given('que existe um CNPJ válido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Given('que existe um CNPJ inválido {string}', function(this: TestWorld, cnpj: string) {
  this.inputCnpj = cnpj;
});

Given('que já existe empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
  try {
    empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Existente' });
  } catch (e) {
    import { Given, When, Then } from '@cucumber/cucumber';
    import { EmpresaService } from '../support/services/empresa.service';
    import { TestWorld } from '../support/world';

    const empresaService = new EmpresaService();

    Given('que existe um CNPJ válido {string}', function(this: TestWorld, cnpj: string) {
      this.inputCnpj = cnpj;
    });

    Given('que existe um CNPJ inválido {string}', function(this: TestWorld, cnpj: string) {
      this.inputCnpj = cnpj;
    });

    Given('que já existe empresa cadastrada com CNPJ {string}', function(this: TestWorld, cnpj: string) {
      try {
        empresaService.createCompany({ cnpj, razaoSocial: 'Empresa Existente' });
      } catch (e) {
        // ignore duplicate create
      }
    });

    When('eu cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
      try {
        this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
      } catch (e: any) {
        this.createError = e.message || String(e);
      }
    });

    When('eu tentar cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
      try {
        this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
      } catch (e: any) {
        this.createError = e.message || String(e);
      }
    });

    Then('o cadastro deve ser bem sucedido', function(this: TestWorld) {
      if (!this.createResult || !this.createResult.ok) throw new Error('esperado sucesso');
    });

    Then('o cadastro deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
      if (!this.createError) throw new Error('esperado erro');
      if (!this.createError.includes(motivo)) throw new Error(`motivo esperado ${motivo} mas foi ${this.createError}`);
    });

    When('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
      this.queryResult = empresaService.getCompanyByCnpj(cnpj);
    });

    Then('a resposta deve conter razão social {string}', function(this: TestWorld, razao: string) {
      if (!this.queryResult || this.queryResult.razaoSocial !== razao) throw new Error('razão social diferente ou não encontrada');
    });

    Then('a resposta deve ser vazia', function(this: TestWorld) {
      if (this.queryResult) throw new Error('esperado vazio');
    });

    Then('a resposta deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
      if (this.queryResult) throw new Error('esperado falha');
    });

    Then('a resposta não deve expor dados sensíveis', function(this: TestWorld) {
      if (!this.queryResult) throw new Error('nenhum resultado');
      // Esperamos que o serviço oculte ou mascarar o CNPJ
      if (typeof this.queryResult.cnpj === 'string' && this.queryResult.cnpj.replace(/\D/g, '').length === 14) {
        throw new Error('CNPJ completo exposto');
      }
    });

    Then('o status da empresa deve ser {string}', function(this: TestWorld, status: string) {
      if (!this.createResult || !this.createResult.company || this.createResult.company.status !== status) throw new Error('status diferente');
    });
  }
});

When('eu cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

When('eu tentar cadastrar uma empresa com CNPJ {string} e razão social {string}', function(this: TestWorld, cnpj: string, razao: string) {
  try {
    this.createResult = empresaService.createCompany({ cnpj, razaoSocial: razao });
  } catch (e: any) {
    this.createError = e.message || String(e);
  }
});

Then('o cadastro deve ser bem sucedido', function(this: TestWorld) {
  if (!this.createResult || !this.createResult.ok) throw new Error('esperado sucesso');
});

Then('o cadastro deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  if (!this.createError) throw new Error('esperado erro');
  if (!this.createError.includes(motivo)) throw new Error(`motivo esperado ${motivo} mas foi ${this.createError}`);
});

When('eu consultar a empresa pelo CNPJ {string}', function(this: TestWorld, cnpj: string) {
  this.queryResult = empresaService.getCompanyByCnpj(cnpj);
});

Then('a resposta deve conter razão social {string}', function(this: TestWorld, razao: string) {
  if (!this.queryResult || this.queryResult.razaoSocial !== razao) throw new Error('razão social diferente ou não encontrada');
});

Then('a resposta deve ser vazia', function(this: TestWorld) {
  if (this.queryResult) throw new Error('esperado vazio');
});

Then('a resposta deve falhar com motivo {string}', function(this: TestWorld, motivo: string) {
  // Aqui tratamos como ausência por validação
  if (this.queryResult) throw new Error('esperado falha');
});

Then('a resposta não deve expor dados sensíveis', function(this: TestWorld) {
  if (!this.queryResult) throw new Error('nenhum resultado');
  if (this.queryResult.cnpj && this.queryResult.cnpj.length === 14) throw new Error('CNPJ completo exposto');
});

Then('o status da empresa deve ser {string}', function(this: TestWorld, status: string) {
  if (!this.createResult || this.createResult.company.status !== status) throw new Error('status diferente');
});
