import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const findCustomerEmail = await this.customersRepository.findByEmail(email);

    if (findCustomerEmail) {
      throw new AppError('Email already exists.');
    }

    const costumer = await this.customersRepository.create({
      email,
      name,
    });

    return costumer;
  }
}

export default CreateCustomerService;
