import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AccountResponseDto, CreateAccountRequestDto } from './account.dto';
import { IAccountService } from './account.service.interface';

@Controller('/accounts')
export class AccountController {
  constructor(
    @Inject(IAccountService)
    private readonly accountService: IAccountService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'Account successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: CreateAccountRequestDto })
  createAccount(
    @Body() createAccountDto: CreateAccountRequestDto,
  ): Promise<AccountResponseDto> {
    return this.accountService.createAccount(createAccountDto);
  }
}
