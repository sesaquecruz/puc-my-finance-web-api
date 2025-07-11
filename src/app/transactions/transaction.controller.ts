import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
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
}
