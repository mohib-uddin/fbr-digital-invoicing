import { ApiProperty } from '@nestjs/swagger';

export class FbrProvinceResponseDto {
  @ApiProperty({ example: 7 })
  stateProvinceCode: number;

  @ApiProperty({ example: 'PUNJAB' })
  stateProvinceDesc: string;
}

export class FbrDocTypeResponseDto {
  @ApiProperty({ example: 4 })
  docTypeId: number;

  @ApiProperty({ example: 'Sale Invoice' })
  docDescription: string;
}

export class FbrItemCodeResponseDto {
  @ApiProperty({ example: '0101.2100' })
  hsCode: string;

  @ApiProperty({ example: 'Horses' })
  itemDescription: string;
}

export class FbrUomResponseDto {
  @ApiProperty({ example: 'KG' })
  uom: string;

  @ApiProperty({ example: 'Kilogram' })
  uomDescription: string;
}

export class FbrRateResponseDto {
  @ApiProperty({ example: '18%' })
  rate: string;

  @ApiProperty({ example: 'Standard Rate' })
  rateDescription: string;
}

export class FbrScenarioResponseDto {
  @ApiProperty({ example: 'SN001' })
  id: string;

  @ApiProperty({ example: 'Goods at standard rate...' })
  description: string;

  @ApiProperty({ example: 'Goods at Standard Rate' })
  saleType: string;
}
