import { PrismaClient } from '@prisma/client'
import { Account } from '../models/account-model'

const prisma = new PrismaClient()

export class AccountCommand {
    async add(account: Account) {
        return await prisma.account.create({ data: account })
    }
}