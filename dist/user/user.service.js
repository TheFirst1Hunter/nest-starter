"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const globals_types_1 = require("../globals/globals.types");
const client_1 = require("@prisma/client");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUserDto) {
        return this.prisma.user.findMany();
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    async findOneByUsername(username) {
        return await this.prisma.user.findFirst({ where: { username } });
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(globals_types_1.globalProviders.prisma)),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map