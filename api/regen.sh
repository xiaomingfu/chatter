#!/usr/bin/bash

rm -fr prisma/dev.db prisma/dev.db-journal prisma/migrations

npx prisma migrate dev --name init

npx prisma generate

echo "update currentUserId"
