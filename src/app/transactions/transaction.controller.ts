import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TransactionQueryDto, TransactionResponseDto } from './transaction.dto';
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
}
