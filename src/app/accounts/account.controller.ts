import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

import { AccountResponseDto, CreateAccountRequestDto } from './account.dto';
import { IAccountService } from './account.service.interface';

@ApiTags('Accounts')
@Controller('/accounts')
export class AccountController {
  constructor(
    @Inject(IAccountService)
    private readonly accountService: IAccountService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gel all accounts' })
  @ApiResponse({ status: 200, description: 'Accounts successfully retrieved.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getAccounts(): Promise<AccountResponseDto[]> {
    return this.accountService.getAccounts();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gel account by id' })
  @ApiResponse({ status: 200, description: 'Account successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getAccountById(@Param('id') id: number): Promise<AccountResponseDto> {
    return this.accountService.getAccountById(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'Account successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  @ApiBody({ type: CreateAccountRequestDto })
  createAccount(
    @Body() createAccountDto: CreateAccountRequestDto,
  ): Promise<AccountResponseDto> {
    return this.accountService.createAccount(createAccountDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update account by id' })
  @ApiResponse({ status: 200, description: 'Account successfully updated.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  @ApiBody({ type: CreateAccountRequestDto })
  updateAccountById(
    @Param('id') id: number,
    @Body() updateAccountDto: Partial<CreateAccountRequestDto>,
  ): Promise<void> {
    return this.accountService.updateAccountById(id, updateAccountDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete account by id' })
  @ApiResponse({ status: 200, description: 'Account successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  deleteAccountById(@Param('id') id: number): Promise<void> {
    return this.accountService.deleteAccountById(id);
  }
}
