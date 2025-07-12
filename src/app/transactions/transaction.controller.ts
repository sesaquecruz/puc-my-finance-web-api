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
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateTransactionRequestDto,
  TransactionQueryDto,
  TransactionResponseDto,
  UpdateTransactionRequestDto,
} from './transaction.dto';
import { ITransactionService } from './transaction.service.interface';

@ApiTags('Transactions')
@Controller('/transactions')
export class TransactionController {
  constructor(
    @Inject(ITransactionService)
    private readonly transactionService: ITransactionService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all transactions by period date' })
  @ApiResponse({
    status: 200,
    description: 'Transactions successfully retrieved.',
  })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getTransactions(
    @Query() query: TransactionQueryDto,
  ): Promise<TransactionResponseDto[]> {
    return this.transactionService.getTransactions(
      query.startDate,
      query.endDate,
    );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gel transaction by id' })
  @ApiResponse({
    status: 200,
    description: 'Transaction successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getTransactionById(@Param('id') id: number): Promise<TransactionResponseDto> {
    return this.transactionService.getTransactionById(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  @ApiBody({ type: CreateTransactionRequestDto })
  createTransaction(
    @Body() createTransactionDto: CreateTransactionRequestDto,
  ): Promise<TransactionResponseDto> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update transaction by id' })
  @ApiResponse({
    status: 200,
    description: 'Transaction successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  @ApiBody({ type: UpdateTransactionRequestDto })
  updateTransactionById(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionRequestDto,
  ): Promise<void> {
    return this.transactionService.updateTransactionById(
      id,
      updateTransactionDto,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete transaction by id' })
  @ApiResponse({
    status: 200,
    description: 'Transaction successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  deleteTransactionById(@Param('id') id: number): Promise<void> {
    return this.transactionService.deleteTransactionById(id);
  }
}
