import { Rule, RuleType } from '@midwayjs/validate';
export class QueryPaginationDTO {
  @Rule(RuleType.number().min(1).required())
  page: number;

  @Rule(RuleType.number().min(1).required())
  size: number;
}
