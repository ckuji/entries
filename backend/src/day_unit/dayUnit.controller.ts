import { Controller } from "@nestjs/common";
import { DayUnitService } from "./dayUnit.service";

@Controller()
export class DayUnitController {
    constructor(private readonly dayUnitService: DayUnitService) {}
}