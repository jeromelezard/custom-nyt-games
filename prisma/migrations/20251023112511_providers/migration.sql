/*
  Warnings:

  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google', 'Microsoft');

-- DropTable
DROP TABLE "public"."Connection";

-- CreateTable
CREATE TABLE "ConnectionsGame" (
    "connectionsGameId" TEXT NOT NULL,
    "mistakesAllowed" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "ConnectionsGame_pkey" PRIMARY KEY ("connectionsGameId")
);

-- CreateTable
CREATE TABLE "ConnectionsCategory" (
    "connectionsCategoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "connectionsGameId" TEXT NOT NULL,

    CONSTRAINT "ConnectionsCategory_pkey" PRIMARY KEY ("connectionsCategoryId")
);

-- CreateTable
CREATE TABLE "ConnectionsWord" (
    "connectionsWordId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "connectionsCategoryId" TEXT NOT NULL,

    CONSTRAINT "ConnectionsWord_pkey" PRIMARY KEY ("connectionsWordId")
);

-- CreateTable
CREATE TABLE "ConnectionsAttempt" (
    "connectionsAttemptId" TEXT NOT NULL,
    "connectionsGameId" TEXT NOT NULL,
    "puzzleComplete" BOOLEAN NOT NULL DEFAULT false,
    "puzzleWon" BOOLEAN NOT NULL DEFAULT false,
    "mistakes" INTEGER NOT NULL DEFAULT 0,
    "guesses" JSONB NOT NULL,
    "solvedCategories" JSONB NOT NULL,
    "dateAttemptStarted" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ConnectionsAttempt_pkey" PRIMARY KEY ("connectionsAttemptId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- AddForeignKey
ALTER TABLE "ConnectionsCategory" ADD CONSTRAINT "ConnectionsCategory_connectionsGameId_fkey" FOREIGN KEY ("connectionsGameId") REFERENCES "ConnectionsGame"("connectionsGameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionsWord" ADD CONSTRAINT "ConnectionsWord_connectionsCategoryId_fkey" FOREIGN KEY ("connectionsCategoryId") REFERENCES "ConnectionsCategory"("connectionsCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionsAttempt" ADD CONSTRAINT "ConnectionsAttempt_connectionsGameId_fkey" FOREIGN KEY ("connectionsGameId") REFERENCES "ConnectionsGame"("connectionsGameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionsAttempt" ADD CONSTRAINT "ConnectionsAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
